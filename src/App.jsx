import React from 'react'
import './assets/base.less'
import {Outlet} from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/Header'
import Aside from './components/Aside'
import Bread from './components/Bread'


const {Footer,Sider, Content } = Layout;
export default function App() {

    return (
        <Layout className='app'>
            <Header/>
            <Layout>
                <Sider><Aside/></Sider>
                <Content>
                    <div className="container_box">
                        <div className="bread"><Bread/></div>
                        <div className="container_content"><Outlet /></div>
                    </div>
                </Content>
            </Layout>
            <Footer className='footer'>Respect|Copyright &copy; 2022 Auther 你单排吧</Footer>
        </Layout>

    )
}
