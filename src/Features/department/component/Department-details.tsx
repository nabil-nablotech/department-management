import { useParams } from 'react-router-dom';
import { RootStateOrAny,useSelector } from 'react-redux';
import DepartmentForm from "./Department-form";
import IDepartment from '../../../../models/Department';
import { Collapse,Spin,TreeSelect } from 'antd';
import { useEffect } from 'react';


export default function DepartmentDetails(): JSX.Element{
    const departments = useSelector((state:RootStateOrAny) => state.department.departments);
    const params = useParams();
    const { Panel } = Collapse;

    const checkDescendent:(ancestor:IDepartment,descendant:IDepartment)=>boolean = (ancestor:IDepartment,descendant:IDepartment)=>{
        let parent:IDepartment = departments.find((department:IDepartment)=>{return department.id===descendant.parentDepartmentId});
        
        while(parent!=null){
            if(parent.id === ancestor.id){
                return true;
            }
            parent = departments.find((department:IDepartment)=>{return department.id===parent.parentDepartmentId})
        }                 
        return false;
    }
    const departmentDetails = (departments!==[])?departments.find((department:any)=>{ return department.id===params.id}):undefined;
    const managingDepartmentDetails = (departments!==[])?departments.find((department:any)=>{ return department.id===departmentDetails.parentDepartmentId}):undefined;
    const managedDepartmentDetails = (departments!==[])?departments.filter((department:IDepartment)=>{ return checkDescendent(departmentDetails,department)}):undefined;
    const treeData = managedDepartmentDetails.map((department:IDepartment)=>{ return {id:department.id,pId:department.parentDepartmentId,title:department.name,value:department.id}});

    
    /* const managedDepartmentList = (managedDepartmentDetails.length>0)?managedDepartmentDetails.map((item:any) => {
        return(               
        <div key={item.id} style={{backgroundColor: 'rgb(191,197,202,0.4)',padding:'10px', marginTop:'10px'}}>
                <p><b>Department Id: </b> {item.id}</p>
                <p><b>Department name: </b>{item.name}</p>
                <p><b>Department description: </b>{item.description}</p>
        </div>
        );
    }):undefined; */


    const constructTree = (departments:IDepartment[])=>{        
        
        if(departments!==[]){
            let tree:any = [];
            let rootNodes  = [];
            let totalNodes:number = 0;

            for(let i=0;i<departments.length;i++){
                if(departments[i].parentDepartmentId===null){
                    rootNodes.push({parent:null,value:departments[i]});
                }
            }
    
            if(rootNodes!==[]){
                tree.push(rootNodes);
                totalNodes = rootNodes.length;
                while(departments.length!==totalNodes){
                    let nodeLevels = [];
                    for(let i = 0; i<tree[tree.length-1].length; i++){
                        let children = departments.filter((department)=>{return department.parentDepartmentId===tree[tree.length-1][i].value.id}).map((item)=>{return {parent:i,value:item}});
                        nodeLevels.push(...children);
                    }
                    tree.push(nodeLevels);
                    totalNodes += nodeLevels.length;                    
                }
                
                return tree;
                
            } else{
                return [];
            }

        }
        else{
            return [];
        }
               
    }

    useEffect(()=>{document.title="Department details";},[]);


    if(departments===[]){
        console.log('I have loadded')
        return <div><Spin size="large"/></div>;
    }
    return (
        <div>
        <DepartmentForm mode='edit' id={params.id}/>        
        <Collapse accordion>
            <Panel header='Your managing department' key="1">
                {!managingDepartmentDetails && <p><b>Department Name: </b>No managing department....Boss <span style={{fontSize:'20px'}}>&#128521;</span></p>}
                
                {managingDepartmentDetails && <p><b>Department Id: </b>{managingDepartmentDetails.id}</p>}
                {managingDepartmentDetails && <p><b>Department Name: </b>{managingDepartmentDetails.name}</p>}
                {managingDepartmentDetails && <p><b>Department description: </b>{managingDepartmentDetails.description}</p>}
            </Panel>
            <Panel header='Departments under your administration' key="2">
                {(treeData.length>=0)?
                                        <TreeSelect                
                                            treeData={treeData}
                                            treeDataSimpleMode
                                            placeholder="Select managing department"
                                        />
                                        :<p>No departments under your management.</p>}
            </Panel>
        </Collapse>
        
        </div>
    );

}