import React,{useEffect} from "react";
import { Row, Col,Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { Link,Outlet } from "react-router-dom";




export default function Departments (){

    return(
            <div style={{width:'100%'}} >
                <Row>
                    <Col  span={24}>
                        <Button style={{margin:'20px'}} type="primary"><Link to='new'><PlusOutlined />New Department</Link></Button>
                    </Col>
                </Row>
                <Row style={{minHeight:'70vh'}}>
                    <Col  span={24} style={{backgroundColor:'#E1E7E7',marginLeft:'10px'}}>
                       <Outlet/> 
                    </Col>
                </Row>
            </div>
        );
    
}