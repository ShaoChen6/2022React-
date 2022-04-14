import React ,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';


export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setKey] =useState('')
    useEffect(()=>{
        let path=location.pathname
        let key = path.split('/')[1]
        setKey(key)
    })
    const handleClick = e => {
        navigate('/'+e.key);
    };
    return (
        <Menu
            onClick={handleClick}
            style={{ width:200}}
            selectedKeys={[defaultKey]}
            mode="inline"
            theme='dark'
        >
            <Menu.Item key="list"><ReadOutlined /> 查看文章列表</Menu.Item>
            <Menu.Item key="edit"><EditOutlined /> 文章修改</Menu.Item>
            <Menu.Item key="means"><DatabaseOutlined /> 修改资料</Menu.Item>
        </Menu>
    )
}
