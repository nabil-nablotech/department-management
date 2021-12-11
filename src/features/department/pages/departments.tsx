import { RootState } from '../../../store';
import { useDispatch,useSelector } from 'react-redux';
import { Table, Space, Button,Spin,notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Department  from '../../../model/department';
import { getDepartment} from '../reducer/department.reducer';
import { useEffect, useState } from 'react';
import { DepartmentForm } from '../component/department-form';

export default function Departments(){

  const departments: Department[] = useSelector((state:RootState)=>state.departments);
  const dispatch = useDispatch();
  const data:Department[] = departments;
  const [selectedDepartment,setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [formType,setFormType] = useState<"new" | "update" | null>(null);
  const [drawerVisible,setDrawerVisible] = useState<boolean>(false);
  const [loadingData,setLoadingData] = useState<boolean>(true);


  //all event handler goes below

  const showDrawer = () => {
    setDrawerVisible(!drawerVisible);
  }

  const onNewDepartment = ()=>{
    setFormType('new');
    showDrawer();
  }

  const onViewDepartment = (id:string) =>{
    setFormType('update');
    setSelectedDepartment(departments.find((department)=>{return department.id === id }));
    showDrawer();
  }

  // end of event handlers 


  useEffect(()=>{
    const asyncDispatcher = async ()=>{
      return await dispatch(getDepartment);
    }
    asyncDispatcher().then(()=>setLoadingData(false)).catch((err)=>{
                                                                      notification.error({
                                                                        message: `Failed to retrieve departments`,
                                                                        description: err+'.',
                                                                        placement:"bottomRight"
                                                                      });
                                                                      setLoadingData(false)
                                                                  }); 
    
  },[]);
  
  const columns = [
                    {
                      title: 'Department id',
                      dataIndex: 'id',
                      key: 'id',
                    },
                    {
                      title: 'Department name',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Department description',
                      dataIndex: 'description',
                      key: 'description',
                    },
                    {
                      title: 'Managing department',
                      key: 'parentDepartmentId',
                      dataIndex: 'parentDepartmentId',
                      render: (parentDepartmentId:string) => {
                        const parent: Department | undefined = data.find((item:Department)=>{return item.id===parentDepartmentId});
                        return (
                          <>
                            {(parent?parent.name:"None")}
                          </>
                        );
                      },
                    },
                    {
                      title: 'Action',
                      key: 'action',
                      render: (text:any, record:any) => (
                        <Space size="middle">
                          <Button type="primary" onClick={()=>{onViewDepartment(record.id);}}>View</Button>
                        </Space>
                      ),
                    }
                ]; 

    return (
      <>
        <div className="mt-6">
          <Button type="primary" onClick={onNewDepartment} icon={<PlusOutlined/>}>New department</Button>
        </div>
        <Spin tip="Loading..." spinning={loadingData}>
          <Table className="mt-12" columns={columns} dataSource={data} />
        </Spin>
        
        {formType!=null && <DepartmentForm formType={formType} visibility={drawerVisible} visibilityToggler={()=>{showDrawer(); setFormType(null);}} selectedDepartment={selectedDepartment}/>}        
      </>
    );
}