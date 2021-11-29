import 'antd/dist/antd.css';
import {Link,Outlet,Routes,Route} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './Features/department/pages/Home';
import Departments from './Features/department/pages/Departments';
import DepartmentForm from './Features/department/component/Department-form';
import DepartmentList from './Features/department/component/Department-list';
import DepartmentDetails from './Features/department/component/Department-details';


const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
    
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/departments">Department</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 30px' }}>
      <div className="site-layout-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="departments" element={<Departments />}>
          <Route index element={<DepartmentList/> } />
          <Route path="new" element={<DepartmentForm mode='new'/>}/>
          <Route path=":id" element={<DepartmentDetails/>}/>
        </Route>
      </Routes>
      <Outlet/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default App;
