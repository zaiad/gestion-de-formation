import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { BiReset } from "react-icons/bi"
import Sidebar from '../Sidebar/Sidebar'
// import Generator from "../../helpes/Generator"
import { ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom'

function Employe() {
    const navigate = useNavigate()
    const [employe, setEmploye] = useState([])
    const [organisme, setOrganisme] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [updatModal, setUpdatModal] = useState(false);
    const [add_employe, setAddEmploye] = useState({username: "", email: "", organisme: ""})

    useEffect(()=> {
        const userData = JSON.parse(localStorage.getItem('login'))
        if(!userData){
            navigate('/Login')
        }
        getEmploye()
    }, [])
    const getEmploye = async () => {
        const employes = await axios.get('http://localhost:4000/admin/employe')
        setEmploye(employes.data.employe)
        setOrganisme(employes.data.organisme)
    }

    const onChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setAddEmploye({...add_employe, [e.target.name]: value})
    }

    const addEmploye = async(e) => {
        e.preventDefault()
        const employeAdd = await axios.post('http://localhost:4000/admin/add-employe', add_employe)
            if(!employeAdd.data.message){
                alert(employeAdd.data)
            } else{
                alert(employeAdd.data)
            }
    }

    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="w-full h-screen">
                <div className="relative w-full h-screen p-5 shadow-md overflw-x-auto sm:rounded-lg">
                    <div className="bg-white py-7">
                        <div className="flex items-center justify-between py-4">
                            <h1 className="ml-2 text-xl font-bold">Employe</h1>
                            {/* <input type="text" id="table-search-users" className="block w-40 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search For meal" /> */}
                            <button className="flex px-4 py-1 mr-4 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">
                                {/* <IoIosAdd size={26} className="pt-1" /> */}
                                <button type='button' onClick={() => setShowModal(true)}>Add Employe</button>
                            </button>
                        </div>
                        <table className="w-full text-sm text-center text-gray-500">
                            <thead className="text-gray-700 uppercase w-text-xs bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Full Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Organisme</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employe.map((data) => (
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <td className="w-4 p-4">{data.username}</td>
                                        <td className="w-4 p-4">{data.email}</td>
                                        <td className="w-4 p-4">{data.organisme_id[0].name}</td>
                                        <td className={`w-4 p-4 text-gray-500 ${!(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button'
                                                // onClick={()=>{setUpdateOrganisme(data);setShowModalEdit(true)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineEdit /></button>
                                                <button type='button' 
                                                // onClick={(e) => {e.preventDefault(); onDelete(data._id)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                        <td className={`w-4 p-4 text-gray-500 ${(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button'
                                                //  onClick={(e) => {e.preventDefault();  onDelete(data._id)}} 
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
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                                    <h3 className="text-3xl font-semibold">Add New Category</h3>
                                    <button className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none" onClick={() => setShowModal(false)}>
                                        <button type='button'
                                        //  onClick={() => setUpdatModal(false)}
                                            className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none hover:text-amber-500">x</button>
                                    </button>
                                </div>
                                <div className="relative flex-auto px-6 py-2">
                                    <form className="text-lg leading-relaxed text-slate-500">
                                        <div className="flex flex-col">
                                            <div className='mt-2'>
                                                <label htmlFor="username" className='block mb-1 text-sm font-medium text-gray-900'>Name</label>
                                                <input type="text" name="username" id="username" placeholder="User Name"
                                                onChange={onChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                            </div>
                                            <div className='mt-2'>
                                                <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-900'>Email</label>
                                                <input type="email" name="email" id="email" placeholder="email"
                                                // onChange={(e) => setName (e.target.value)}
                                                onChange={onChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                            </div>
                                            <div className='mt-2'>
                                                <label htmlFor="organisme" className='block mb-1 text-sm font-medium text-gray-900'>Organisme</label>
                                                <select onChange={onChange} name="organisme" id="organisme" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                                    <option value=''>Select Organisme</option>
                                                    {organisme.map((c) => (
                                                        <option value={c.name}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                            <button
                                                onClick={addEmploye}
                                                className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500" type="submit">Add Employe
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {updatModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 ">
                                    <h3 className="text-3xl font-semibold">Update Employe</h3>
                                    <button className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none" onClick={() => setShowModal(false)}>
                                        <button type='button'
                                        //  onClick={() => setUpdatModal(false)} 
                                            className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none hover:text-amber-500">x</button>
                                    </button>
                                </div>
                                <div className="relative flex-auto px-6 py-2">
                                    <form className="text-lg leading-relaxed text-slate-500">
                                        <div className="flex flex-col">
                                            <div className='mt-2'>
                                                <label htmlFor="employe" className='block mb-1 text-sm font-medium text-gray-900'>employe</label>
                                                <input type="text"
                                                //  value={updatName.name}
                                                //   onChange={(e)=>setUpdatName({ ...updatName, [e.target.name]: e.target.value })}
                                                    name="name" id="employe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                            <button
                                                // onClick={updateCategorie}
                                                className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500" type="submit">Update Employe
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            <ToastContainer/>
        </div>
    )
}

export default Employe