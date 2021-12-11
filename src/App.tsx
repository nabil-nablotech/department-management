
import './App.css';
import { Layout, Menu } from 'antd';
import { Routes,Route,Link,Outlet,useLocation } from 'react-router-dom';
import Home from './features/department/pages/home';
import Departments from './features/department/pages/departments';

import { NotFound } from './features/department/pages/404notFound';

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/departments"><Link to="/departments">Departments</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/departments" element={<Departments/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Outlet/>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default App;
