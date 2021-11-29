import React from "react";
import { Typography } from 'antd';
import {HeartFilled} from '@ant-design/icons';

const { Title } = Typography;

export default class Home extends React.Component{
    componentDidMount(){
        document.title="Home";
    }

    render(){
        return(
            <div style={{minHeight:'50vh',textAlign:'center',marginTop:'10rem'}}>
                <Title>Welcome to this page.</Title>
                <Title level={2}>Made with <HeartFilled style={{color:'purple'}}/> by Nabil</Title>
            </div>
        );
    }
}