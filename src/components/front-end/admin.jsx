import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const [datas,setDatas]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    Axios.get("http://127.0.0.1:3030/datas")
    .then((resp)=>{
      setDatas(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[datas])
  const deleteData=(id)=>{
      Axios.delete(`http://127.0.0.1:3030/datas/${id}`)
      .then(()=>{console.log("product deleted")})
      .catch(()=>{})
  }
  const updateData=(id)=>{
    console.log(id)
        navigate('/update',{state:id})
  }
  const addData=()=>{
    navigate('/create')
  }
  return (
    <div className='mt-5'>
      <div className="container">
      <h1>Student Mark List</h1>
      <div className='d-flex justify-content-end'>
      <button className='btn btn-secondary'>Home</button>
      <button className='btn btn-secondary'>LogOut</button>
      </div>
        <div className="row">
          <div className="col">
            <table className='table table-hover'>
              <thead className='table-secondary'>
                <tr>
                  <td>Name</td>
                  <td>Subject</td>
                  <td>Mark</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                  {
                    datas.map((data)=>{
                      return <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.subject}</td>
                        <td>{data.mark}</td>
                        <td><button className='btn btn-warning ' onClick={()=>updateData(data._id)} >Update</button> <button className='btn btn-danger ' onClick={()=>deleteData(data._id)}>Delete</button></td>
                      </tr>
                    })
                  }
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={addData} className='btn btn-primary'>Add</button>
      </div>
    </div>
  )
}

export default Admin
