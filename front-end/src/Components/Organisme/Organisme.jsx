import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import privateRoute from "../PrivateRoutes"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';

function Organisme() {
    const navigate = useNavigate()
    const [organismes, setOrganisme] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [add_organisme, setAddOrganisme] = useState({name:'', ville:'', address:'', phone:''})
    const [updateOrganisme, setUpdateOrganisme] = useState({name:'', ville:'', address:'', phone:''})

    const onChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        // console.log(value)
        setAddOrganisme({...add_organisme, [e.target.name]: value})
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('login'))
        if(!userData){
            navigate('/Login')
        }
        getData()
    },[])

    const getData = async() => {
        const get_data = await axios.get('http://localhost:4000/organisme/organisme')
            setOrganisme(get_data.data.organisme)
    }

    const postData = async(e) => {
        e.preventDefault()
        const organisme = await axios.post('http://localhost:4000/organisme/add-organisme', add_organisme)
            if (organisme.data.message) {
            setShowModal(false)
            setTimeout(() => { window.location.reload(false) }, "1000")
        }
        else console.log(organisme.data)
    }

    const onDelete = async(id) => {
        const delete_organisme = await axios.delete(`http://localhost:4000/organisme/delete-organisme/${id}`)
        alert(delete_organisme.data.message)
    }

    const updateOrg = async(e) => {
        e.preventDefault()
        const update_organisme = await axios.put(`http://localhost:4000/organisme/update-organisme/${updateOrganisme._id}`, updateOrganisme)
        if(update_organisme.data.message) {
            alert(update_organisme.data.message)
            setTimeout(() => { window.location.reload(false) }, "1000")
        }
    }

    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="w-full h-screen">
                <div className="relative w-full h-screen p-5 shadow-md overflw-x-auto sm:rounded-lg">
                    <div className="bg-white py-7">
                        <div className="flex items-center justify-between py-4">
                            <h1 className="ml-2 text-xl font-bold">Organismes</h1>
                            <button className="flex px-4 py-1 mr-4 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">
                                {/* <IoIosAdd size={26} className="pt-1" /> */}
                                <button type='button' onClick={() => setShowModal(true)}>Add Organisme</button>
                            </button>
                        </div>
                        <table className="w-full text-sm text-center text-gray-500 ">
                            <thead className="text-gray-700 uppercase w-text-xs bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">name</th>
                                    <th scope="col" className="px-6 py-3">ville</th>
                                    <th scope="col" className="px-6 py-3">Address</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {organismes.map((data, i) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                                        <td className="w-4 p-4">{data.name}</td>
                                        <td className="w-4 p-4">{data.ville}</td>
                                        <td className="w-4 p-4">{data.address}</td>
                                        <td className="w-4 p-4">{data.phone}</td>
                                        <td className={`w-4 p-4 text-gray-500 ${!(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button'
                                                onClick={()=>{setUpdateOrganisme(data);setShowModalEdit(true)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineEdit /></button>
                                                <button type='button' 
                                                onClick={(e) => {e.preventDefault(); onDelete(data._id)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                        <td className={`w-4 p-4 text-gray-500 ${(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button' onClick={(e) => {e.preventDefault();  onDelete(data._id)}} 
                                                    className='text-xl hover:text-amber-500'><BiReset /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {showModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                                <h3 className="text-3xl font-semibold">Add new Organisme</h3>
                                <button className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none" onClick={() => setShowModal(false)}>
                                    <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none hover:text-amber-500">x</span>
                                </button>
                            </div>
                            <div className="relative flex-auto px-6 py-2">
                                <form className="text-lg leading-relaxed text-slate-500">
                                    <div className="flex flex-col">
                                        <div>
                                            <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900'>name</label>
                                            <input type="text" onChange={onChange} name="name" id="name" placeholder="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="ville" className='block mb-1 text-sm font-medium text-gray-900'>ville</label>
                                            <input type="text" onChange={onChange} name="ville" id="ville" placeholder="ville" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="address" className='block mb-1 text-sm font-medium text-gray-900'>Address</label>
                                            <input name="address" onChange={onChange} id="address" placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="phone" className='block mb-1 text-sm font-medium text-gray-900'>Phone</label>
                                            <input type="text" onChange={onChange} name="phone" id="phone" placeholder="Phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                        <button type="submit" onClick={postData} className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">Add Organisme</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {showModalEdit ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                                <h3 className="text-3xl font-semibold">Update Organisme</h3>
                                <button className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none" onClick={() => setShowModalEdit(false)}>
                                    <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none hover:text-amber-500">x</span>
                                </button>
                            </div>
                            <div className="relative flex-auto px-6 py-2">
                                <form className="text-lg leading-relaxed text-slate-500">
                                    <div className="flex flex-col">
                                        <div>
                                            <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900'>name</label>
                                            <input type="text" name="name" value={updateOrganisme.name} onChange={(e)=>setUpdateOrganisme({ ...updateOrganisme, [e.target.name]: e.target.value })} id="name" placeholder="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="ville" className='block mb-1 text-sm font-medium text-gray-900'>ville</label>
                                            <input type="text" name="ville" value={updateOrganisme.ville} onChange={(e)=>setUpdateOrganisme({ ...updateOrganisme, [e.target.name]: e.target.value })} id="ville" placeholder="ville" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="address" className='block mb-1 text-sm font-     text-gray-900'>Address</label>
                                            <input type="text" name="address" value={updateOrganisme.address} onChange={(e)=>setUpdateOrganisme({ ...updateOrganisme, [e.target.name]: e.target.value })} id="address" placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="phone" className='block mb-1 text-sm font-medium text-gray-900'>Phone</label>
                                            <input type="text" name="phone" value={updateOrganisme.phone} onChange={(e)=>setUpdateOrganisme({ ...updateOrganisme, [e.target.name]: e.target.value })} id="phone" placeholder="Phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                        <button type="submit" onClick={updateOrg} className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">Update Organisme</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <ToastContainer />
        </div>
    )
}

export default Organisme