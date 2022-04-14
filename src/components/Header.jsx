import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/img/logo.png'
import { Menu, Dropdown,message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import defaultAvatar from '../assets/img/defaultAvatar.png'


export default function Header() {
    const navigate = useNavigate()
    const [avatar,setAvatar] = useState(defaultAvatar)
    const [username,setUsername] = useState("无名氏")

    // 等同于类组件中componentDidMount
    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if(username1){
            setUsername(username1)
        }
        if(avatar1){
            setAvatar('http://47.93.114.103:6688/'+avatar1)
        }
    },[])
    // 退出登录
    const logout =()=>{
        localStorage.clear()
        message.success('退出成功，返回登录页')
        setTimeout(() => {
            navigate("./login")
        }, 1500);
    }
    const menu = (
        <Menu>
          <Menu.Item>修改资料</Menu.Item>
          <Menu.Divider/>
          <Menu.Item onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );
    return (
        <header>
            <img src={logoImg} alt="" className='logo' />
            <Dropdown overlay={menu} className="dropdown">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <img className='avatar' src={avatar} alt="" />
                    <span>{username}</span> 
                    <CaretDownOutlined />
                </a>
            </Dropdown>
        </header>
    )
}
