import React, { useEffect ,useState}from 'react'
import { Form, Input, Button, message,Upload } from 'antd';
import { GetUserDataApi ,ChangeUserDataApi} from '../request/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './less/means.less'


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 限制图片大小
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function Means() {
  const [loading,setLoading] =useState('')
  const [imgUrl,setImgUrl] =useState('')
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = (values) => {
    console.log('Success:', values);
    if(values.username&&
      values.username!==sessionStorage.getItem('username')&&
      values.password.trim()!==''){
        // 表单提交
        ChangeUserDataApi({
          username:values.username,
          password:values.password
        }).then(res=>{
          console.log(res)
        })
    }
  };
  
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
          setLoading(false)
          setImgUrl(imageUrl)
          // 存储图片名称
          localStorage.setItem('avatar',info.file.response.data.filePath)
        }
      );
    }
  };
  useEffect(()=>{
    GetUserDataApi().then(res=>{
      console.log(res)
      if(res.errCode===0){
        message.success(res.message)
        sessionStorage.setItem('username',res.data.username)
      }
    })
  },[])
  return (
    <div className='means'>
      <Form
        style={{width:"400px"}}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{

        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"
        >
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"
        >
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{float:"right"}} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{"cms-token":localStorage.getItem('cms-token')}}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}
