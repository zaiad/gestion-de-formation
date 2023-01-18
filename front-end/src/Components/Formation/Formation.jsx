import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
// import Generator from "../Generator"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';

function Formation() {
    const navigate  = useNavigate()
    const [formation, setFormation] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [add_formation, setAddFormation] = useState({name: '', date_debut: '', date_fin: '', description: ''})
    const [update_formation, setUpdateFormation] = useState({name: '', date_debut: '', date_fin: '', description: ''})

    const urlImage = 'http://localhost:4000/images'


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('login'))
        if(!userData){
            navigate('/Login')
        }
        getformation()
    },[])

    const getformation = async() =>{
        const get_formation = await axios.get('http://localhost:4000/formation')
        setFormation(get_formation.data.allFormation)
    }

    const onChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setAddFormation({...add_formation, [e.target.name]: value})
    }

    const onChangeFile = (e) => {
        e.preventDefault()
        const value = e.target.files[0]
        setAddFormation({...add_formation, image: value})
    }

    const addFormation = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', add_formation.image)
        formData.append('name', add_formation.name)
        formData.append('description', add_formation.description)
        formData.append('date_debut', add_formation.date_debut)
        formData.append('date_fin', add_formation.date_fin)
        const add_formations = await axios.post('http://localhost:4000/formation/add-formation', formData)
        if(!add_formations.data.message){
            console.log(add_formations.data)
        }
        else {
            console.log(add_formations.data.message)
            setTimeout(() => { window.location.reload(false) }, "1000")
        }
    }

    const onDelete = async(id) => {
        const delete_formation = await axios.delete(`http://localhost:4000/formation/delete-formation/${id}`)
        console.log(delete_formation.data)
    }

    const updateFormation = async(e) => {
        e.preventDefault()
        const update_form = await axios.put(`http://localhost:4000/formation/update-formation/${update_formation._id}`, update_formation)
        console.log(update_form.data)
        if(update_form.data.message) {
            alert(update_form.data.message)
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
                            <h1 className="ml-2 text-xl font-bold">Formations</h1>
                            <button className="flex px-4 py-1 mr-4 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">
                                {/* <IoIosAdd size={26} className="pt-1" /> */}
                                <button type='button' onClick={() => setShowModal(true)}>Add Formation</button>
                            </button>
                        </div>
                        <table className="w-full text-sm text-center text-gray-500 ">
                            <thead className="text-gray-700 uppercase w-text-xs bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Date_Debut</th>
                                    <th scope="col" className="px-6 py-3">Date_fin</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {formation.map((data, i) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={i}>
                                        <td className="w-24 h-24 rounded-full"><img src={`${urlImage}/${data.image}`} /></td>
                                        <td className="w-4 p-4">{data.name}</td>
                                        <td className="w-4 p-4">{data.description}</td>
                                        <td className="w-4 p-4">{data.date_debut}</td>
                                        <td className="w-4 p-4">{data.date_fin}</td>
                                        <td className={`w-4 p-4 text-gray-500 ${!(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button'
                                                onClick={()=>{setUpdateFormation(data);setShowModalEdit(true)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineEdit /></button>
                                                <button type='button' 
                                                onClick={(e) => {e.preventDefault(); onDelete(data._id)}}
                                                    className='text-xl hover:text-amber-500'><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                        <td className={`w-4 p-4 text-gray-500 ${(data.status) ? 'hidden' : ''}`}>
                                            <div className='flex justify-evenly'>
                                                <button type='button'
                                                onClick={(e) => {e.preventDefault();  onDelete(data._id)}} 
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
                                <h3 className="text-3xl font-semibold">Add New Formation</h3>
                                <button className="float-right p-1 ml-8 text-3xl font-semibold leading-none text-gray-300 bg-transparent border-0 outline-none opacity-1 focus:outline-none" onClick={() => setShowModal(false)}>
                                    <span className="block w-6 h-6 text-2xl text-gray-300 outline-none focus:outline-none hover:text-amber-500">x</span>
                                </button>
                            </div>
                            <div className="relative flex-auto px-6 py-2">
                                <form className="text-lg leading-relaxed text-slate-500">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-center w-full mt-3">
                                            <label htmlFot="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg aria-hidden="true" className="w-10 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                </div>
                                                <input type="file" onChange={onChangeFile} name="image" id="dropzone-file" accept=".png, .jpg, .jpeg" className="hidden" />
                                            </label>
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900'>Name</label>
                                            <input type="text"
                                             onChange={onChange}
                                              name="name" id="name" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="description" className='block mb-1 text-sm font-medium text-gray-900'>description</label>
                                            <textarea name="description"
                                             onChange={onChange}
                                              id="description" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="date_debut" className='block mb-1 text-sm font-medium text-gray-900'>date_debut</label>
                                            <input type="text"
                                             onChange={onChange}
                                             name="date_debut" id="date_debut" placeholder="Date_debut" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="date_fin" className='block mb-1 text-sm font-medium text-gray-900'>date_fin</label>
                                            <input type="text"
                                             onChange={onChange}
                                             name="date_fin" id="date_fin" placeholder="Date_fin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                        <button type="submit"
                                         onClick={addFormation}
                                          className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">Add Organisme</button>
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
                                        {/* <div className="flex items-center justify-center w-full mt-3">
                                            <label htmlFot="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg aria-hidden="true" className="w-10 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                </div>
                                                <input type="file" onChange={onChangeFile} name="image" id="dropzone-file" accept=".png, .jpg, .jpeg" className="hidden" />
                                            </label>
                                        </div> */}
                                        <div>
                                            <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900'>name</label>
                                            <input type="text" name="name" 
                                            value={update_formation.name} onChange={(e)=>setUpdateFormation({ ...update_formation, [e.target.name]: e.target.value })}
                                             id="name" placeholder="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="description" className='block mb-1 text-sm font-medium text-gray-900'>description</label>
                                            <textarea type="text" name="description"
                                             value={update_formation.description} onChange={(e)=>setUpdateFormation({ ...update_formation, [e.target.name]: e.target.value })}
                                              id="description" placeholder="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="date_debut" className='block mb-1 text-sm font-medium text-gray-900'>date_debut</label>
                                            <input type="text" name="date_debut" 
                                            value={update_formation.date_debut} onChange={(e)=>setUpdateFormation({ ...update_formation, [e.target.name]: e.target.value })}
                                             id="date_debut" placeholder="date_debut" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="date_fin" className='block mb-1 text-sm font-medium text-gray-900'>date_fin</label>
                                            <input type="text" name="date_fin"
                                             value={update_formation.date_fin} onChange={(e)=>setUpdateFormation({ ...update_formation, [e.target.name]: e.target.value })}
                                              id="date_fin" placeholder="date_fin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 border-t border-solid rounded-b border-slate-200">
                                        <button type="submit" 
                                        onClick={updateFormation}
                                         className="flex px-4 py-1 font-bold text-white border-2 rounded-md bg-amber-500 hover:text-amber-500 hover:bg-white border-amber-500">Update Organisme</button>
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

export default Formation