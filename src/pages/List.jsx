import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Table, Button, Space, message } from 'antd';
import moment from 'moment'
import './less/List.less'
import { ArticleListApi ,ArticleDelApi} from '../request/api';



function MyTitle(props){
  return(
    <div>
      <a className='table_title' href={'http://codesohigh.com:8765/article/'+props.id}>{props.title}</a>
          <p>{props.subTitle}</p>
    </div>
  )
}

export default function List() {
  const navigate=useNavigate()
  // 列表数组
  const [arr,setArr] = useState([])
    //删除后请求更新使用 
  const [update,setUpdate] = useState(1)
  // 请求文章列表
  useEffect(()=>{
    ArticleListApi().then(res=>{
      if(res.errCode===0){
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let myArr=[]
        newArr.map(item=>{
          let obj ={
            key:item.id,
            date:moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
            mytitle:<MyTitle 
            title={item.title} 
            subTitle={item.subTitle}
            id={item.id}
            />
          }
          myArr.push(obj)
        })
        setArr(myArr)
      }
    })
  },[update])
  // 删除
  const delFn=(id)=>{
    ArticleDelApi({id}).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        // 重新刷页面window.reload
        // 重新请求列表数据
        setUpdate(update+1)
      }
    })
  }
  const columns = [
    {
      dataIndex: 'mytitle',
      width:'60%',
      key: 'mytitle',
      render: text => <div>{text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text=> <p>{text}</p>
    },
    {
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type='primary' onClick={()=>navigate('/edit/'+text.key)}>编辑</Button>
          <Button type='danger' onClick={()=>delFn(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='list_table'>
      <Table size='small' showHeader={false} columns={columns} dataSource={arr} />
    </div>
  )
}
