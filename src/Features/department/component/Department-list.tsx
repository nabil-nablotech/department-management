import {useEffect,useState}  from 'react';
import { Table, Space,Button,Modal,message } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RootStateOrAny,useDispatch,useSelector } from 'react-redux';
import {getDepartments,deleteDepartment} from '../store/reducer';


export default function DepartmentList(): JSX.Element{
    
    const { confirm } = Modal;

    const [refresh,setRefresh] = useState<boolean | null>(null);
    const dispatch = useDispatch();
    const departments = useSelector((state:RootStateOrAny) => state.department.departments);
    const refreshStateModifer = (value:boolean)=>{setRefresh(value)};

    const showDeleteConfirm = (departmentId:any) => {
        confirm({
          title: 'Are you sure you want to delete this item?',
          icon: <ExclamationCircleOutlined />,
          content: 'Removing this department will also remove the departments under its management!',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            dispatch(deleteDepartment(departmentId,refreshStateModifer));;            
          }
        });
      }

    useEffect(() => {
        document.title="Department list";
        dispatch(getDepartments());
        },[]);

    useEffect(() => {
         if(refresh){
            message.success('Department removed successfully.');
            setRefresh(null);
         }else if(refresh===false){
            message.error('An error encountered while removing departments.');
            setRefresh(null);
         }
         
        },[refresh]);
    
    
    const { Column} = Table;

    return(
    <Table dataSource={departments}>
        <Column title="Department Id" dataIndex="id" key="id"  />
        <Column title="Department Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
    
        <Column
        title="Action"
        key="action"
        render={(text, record:any) => (
            <Space size="middle">
                <Button type='primary' ><Link to={record.id}>View</Link></Button>
                <Button type='primary' onClick={ ()=>{ showDeleteConfirm(record.id)} } danger>Delete</Button>
            </Space>
        )}
        />
  </Table>
    );
}