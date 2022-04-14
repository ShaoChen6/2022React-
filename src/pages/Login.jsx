import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "./less/Login.less"
import logoImg from "../assets/img/logo.png"
import { LoginApi } from '../request/api';

export default function Login() {
    const navigate =useNavigate()

    const onFinish = (values: any) => {
        LoginApi({
            username:values.username,
            password:values.password
        }).then(res=>{
            if(res.errCode===0){
                message.success(res.message)
                //存储数据
                localStorage.setItem('avatar',res.data.avatar)
                localStorage.setItem('cms-token',res.data['cms-token'])
                localStorage.setItem('editable',res.data.editable)
                localStorage.setItem('player',res.data.player)
                localStorage.setItem('username',res.data.username)
                // 跳转页面
                setTimeout(()=>{
                    navigate('/')
                },1500)
            }else{
                message.error(res.message)
            }
        })
    };
    return (
        <div className="login">
            <div className="login_box">
                <img src={logoImg} alt="" />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">
                            No account yet, register now!</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                         <br /> 
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
