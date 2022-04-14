import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Bread() {
    const {pathname} = useLocation()
    const [breadName,setBreadName] = useState('')
    useEffect(()=>{
        switch(pathname){
            case'/list':
                setBreadName('查看文章列表')
                break;
            case'/edit':
                setBreadName('文章修改')
                break;
            case'/means':
                setBreadName('修改资料')
                break;
            default:
                setBreadName(pathname.includes('edit')?'文章修改':'')
                break;
        }
    },[pathname])
    return (
        <Breadcrumb>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            <Breadcrumb.Item>
                {breadName}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}
