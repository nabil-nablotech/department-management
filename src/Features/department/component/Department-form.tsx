import { useEffect, useState} from "react";
import { Form, Input, Button, Select,message } from 'antd';
import { RootStateOrAny,useDispatch,useSelector }  from 'react-redux';
import {createDepartment,getDepartments,updateDepartment} from '../store/reducer';
import { useNavigate } from 'react-router-dom';

interface IProps {
    mode: "new" | "edit";
    id?:string;
}


export default function DepartmentForm (props:IProps): JSX.Element{

    const [isSuccess,setSuccess] = useState<boolean|null>(null);
    const [isSubmitting,setSubmitting] = useState<boolean|null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const departments = useSelector((state:RootStateOrAny) => state.department.departments);
    const [form] = Form.useForm();
    const successMsg = props.mode==='new'? 'Department registered successfully.' : 'Department details updated successfully.';
    const errorMsg = props.mode==='new'? 'Connection to the server failed. Sorry could not register new department. Please try again later.' : 'Connection to the server failed. Sorry could not update department details. Please try again later.';

    let departmentDetails = null;

    if(Array.isArray(departments) && (departments.length>0) && (props.mode==='edit')){
      departmentDetails = departments.find((department:any)=>{ return department.id===props.id});
      form.setFieldsValue({
        name: departmentDetails.name,
        description:departmentDetails.description,
        parentDepartmentId:departmentDetails.parentDepartmentId
      });
    }
    
    const successStateModifer = (value:boolean)=>{setSuccess(value)};
    const onFinish = (value:any)=>{       
      setSubmitting(true);
      if(props.mode==='new'){
        dispatch(createDepartment(value,successStateModifer));
      }
      if(props.mode==='edit'){
        dispatch(updateDepartment({id:props.id,...value},successStateModifer));
      }    
    }

    const goBack = ()=>{
      navigate('../');
    }

    useEffect(() => {
      dispatch(getDepartments());
      },[]);

    useEffect(() => {
        if(isSubmitting===false){
          setSuccess(null);
        }
      
      },[isSubmitting]);

    useEffect(() => {
      if(isSuccess){
        message.success(successMsg);
        setSubmitting(false); 
        {props.mode==='new' && navigate('../')};
        {props.mode==='edit' && dispatch(getDepartments())};
      }else if(isSuccess===false){
        message.error(errorMsg);
        setSubmitting(false); 
      }    
    },[isSuccess]);

    return (
        <>
        {(props.mode==='edit') && <Button type="primary" onClick={goBack} style={{margin:'20px'}} danger>Go back</Button> }
        {(props.mode==='new')?<h2 style={{textAlign:'center',marginTop:'2px'}}>New department registration</h2>:<h2 style={{textAlign:'center',marginTop:'20px'}}>Department details</h2>}
        <Form form={departmentDetails?form:undefined} onFinish={onFinish} autoComplete="off" labelCol={{span: 7}} wrapperCol={{span:15}} style={{padding:'100px'}}>
          <Form.Item name="name" label="Department name"
            rules={[
                {
                  required:true,
                  message:"Department name is required"
                },
                {
                  whitespace:true,
                  message:"Department name cannot be empty"
                }
            ]}
            hasFeedback
          >
            <Input placeholder="Enter department name"/>
          </Form.Item>

          <Form.Item   name="description" label="Description"
            rules={[
              {
                required:true,
                message:"Description is required"
              },
              {
                whitespace:true,
                message:"Description cannot be empty"
              }
            ]}
            hasFeedback
          >
            <Input.TextArea placeholder="Enter the description of the department"/>
          </Form.Item>

          <Form.Item name="parentDepartmentId" label="Managing department">
            <Select listHeight={150} placeholder="Select managing department">
              { departments.filter((department:any)=>{return department.id!==props.id}).map((department:any)=>{return(<Select.Option key={department.id} value={department.id}>{department.name}</Select.Option>);})}
            </Select>
          </Form.Item>

          <Form.Item>
          {props.mode==='new'&&<Button loading = {isSubmitting? true:false} style={{marginLeft:'50%'}} type="primary" htmlType="submit">Register department</Button>}
            {props.mode==='edit'&&<Button loading = {isSubmitting? true:false} style={{marginLeft:'50%'}} type="primary" htmlType="submit">Update</Button>}
          </Form.Item>
        </Form>
        </>
    );
    
}