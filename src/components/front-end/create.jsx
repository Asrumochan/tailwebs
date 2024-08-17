import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios  from 'axios';

const Create = () => {
    const [data,setData]=useState({name:'',subject:'',mark:0})
    const navigate = useNavigate()
    const updateHandler=(evt)=>{
        setData({...data,[evt.target.name]:evt.target.value})
    }
    const addHandler=()=>{
        Axios.post("http://127.0.0.1:3030/datas",data)
      .then((resp)=>{
        console.log(resp.data)
        navigate('/admin')
      })
      .catch((err)=>{
        alert("Data exists")
        navigate('/admin')
      })
    }
  return (
    <div className='mt-5'>
    <div className="container">

    <h1>Add New Data</h1>
      <div className="row">
        <div className="col">
          <table className='table table-striped'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Subject</td>
                <td>Mark</td>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" onChange={updateHandler} name='name'/></td>
                    <td><input type="text" onChange={updateHandler} name='subject' /></td>
                    <td><input type="number" onChange={updateHandler} name='mark' /></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className='btn btn-success' onClick={addHandler}>Add</button>
    </div>
  </div>
  )
}

export default Create