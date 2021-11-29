import { useParams } from 'react-router-dom';
import { RootStateOrAny,useSelector } from 'react-redux';
import DepartmentForm from "./Department-form";
import { Collapse,Spin } from 'antd';
import { useEffect } from 'react';


export default function DepartmentDetails(): JSX.Element{
    const departments = useSelector((state:RootStateOrAny) => state.department.departments);
    const params = useParams();
    const { Panel } = Collapse;

    const departmentDetails = (departments!==[])?departments.find((department:any)=>{ return department.id===params.id}):undefined;
    const managingDepartmentDetails = (departments!==[])?departments.find((department:any)=>{ return department.id===departmentDetails.parentDepartmentId}):undefined;
    const managedDepartmentDetails = (departments!==[])?departments.filter((department:any)=>{ return department.parentDepartmentId===departmentDetails.id}):undefined;
    
    const managedDepartmentList = (managedDepartmentDetails.length>0)?managedDepartmentDetails.map((item:any) => {
        return(               
        <div key={item.id} style={{backgroundColor: 'rgb(191,197,202,0.4)',padding:'10px', marginTop:'10px'}}>
                <p><b>Department Id: </b> {item.id}</p>
                <p><b>Department name: </b>{item.name}</p>
                <p><b>Department description: </b>{item.description}</p>
        </div>
        );
    }):undefined;

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
                {(managedDepartmentList)?managedDepartmentList:<p>No departments under your management.</p>}
            </Panel>
        </Collapse>
        </div>
    );

}