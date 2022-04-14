import { PageHeader, Button, Modal, Form, Input,message } from 'antd'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { ArticleAddApi ,ArticleSearchApi,ArticleUpdateApi} from '../request/api'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function Edit() {
  const [title,setTitle]=useState('')
  const [subTitle,setSubTitle]=useState('')
  const navigate=useNavigate()
  // 弹出框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const params= useParams()
  const location= useLocation()

  // 弹出框点击了提交
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // form.resetFields();
        console.log('Received values of form: ', values);
        let {title,subTitle} =values;
        let content=editor.getHtml()
        // 请求
        if(params.id){
          // 更新文章请求
          ArticleUpdateApi({title,subTitle,content,id:params.id}).then(res=>{
            if(res.errCode===0){
              message.success(res.message)
              console.log(res)
              // 调回list
              setTimeout(() => {
                navigate('/list')
              }, 1000);
            }else{
              message.error(res.message)
            }
          })
        }else{
          // 添加文章请求
          ArticleAddApi({title,subTitle,content}).then(res=>{
          if(res.errCode===0){
            message.success(res.message)
            console.log(res)
            // 调回list
            setTimeout(() => {
              navigate('/list')
            }, 1000);
          }else{
            message.error(res.message)
          }
        })
        }
      })
    setIsModalVisible(false);
  };
  const onFinish = (values) => {

    console.log('Success:', values);
  };

  // 富文本编辑器
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    // 根据地址栏id请求
    if(params.id){
      ArticleSearchApi({id:params.id}).then(res=>{
        console.log(res)
        if(res.errCode===0){
          setHtml(res.data.content)
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
  }, [location.pathname])

  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  function insertText() {
    if (editor == null) return
    editor.insertText(' hello ')
  }

  function printHtml() {
    if (editor == null) return
    console.log(editor.getHtml())
  }
  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="文章编辑"
          subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
          extra={<Button onClick={() => setIsModalVisible(true)} key="1" type="primary">提交文章</Button>}
        ></PageHeader>

        <Modal title="填写文章标题"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="提交"
          cancelText="取消"
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4, }}
            wrapperCol={{ span: 18, }}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{title,subTitle}}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="副标题"
              name="subTitle"
              rules={[
                {
                  required: false,
                  message: '请输入副标题',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <>
          <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px' }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={editor => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: '500px' }}
            />
          </div>
        </>
      </div>
    </div>
  )
}
