import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';

const Update = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    const [data, setData] = useState({ name: '', subject: '', mark: 0 });

    useEffect(() => {
        Axios.get(`http://127.0.0.1:3030/datas/${id}`)
            .then((resp) => {
                setData(resp.data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const updateHandler = (evt) => {
        setData({ ...data, [evt.target.name]: evt.target.value });
    };

    const submitHandler = (evt) => {
        evt.preventDefault();
        Axios.put(`http://127.0.0.1:3030/datas/${id}`, data)
            .then((resp) => {
                console.log('Data updated:', resp.data);
                navigate('/admin'); // Navigate to a different route or show a success message
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    return (
        <div className='mt-5'>
            <div className="container">
                <h1>Update The Data</h1>
                <form onSubmit={submitHandler}>
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
                                        <td>
                                            <input
                                                type="text"
                                                onChange={updateHandler}
                                                name='name'
                                                value={data.name}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                onChange={updateHandler}
                                                name='subject'
                                                value={data.subject}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                onChange={updateHandler}
                                                name='mark'
                                                value={data.mark}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='btn  btn-success' type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
