import React, { useState, Fragment } from 'react'
import './assets/base.css'
import { Button } from 'antd'
import {Outlet} from 'react-router-dom'

export default function App() {
    const [num,setNum] = useState(1)
    const addNum=()=>{
        setNum((num)=>num+1)
    }
    return (
        <Fragment>
            <h2>num:{num}</h2>
            <Button type="primary" onClick={addNum}>+1</Button>
            <Outlet/>
        </Fragment>
    )
}
