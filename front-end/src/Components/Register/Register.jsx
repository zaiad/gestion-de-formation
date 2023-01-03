import { useState } from 'react'
import axios from 'axios'
// import Generator from '../Generator'
// import {navigate, useNavigate} from 'react-router-dom'
// import { ToastContainer } from "react-toastify";


const Register = () => {
    // const navigate = useNavigate();
    const [name, setName] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const onChange = (e) => {
        setName({...name, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/auth/register', name)
        .then((e) => {
            if(e.data.message) {
                // navigate("/login", {state: e.data})
                console.log(e)
            } else {
                // Generator("error",e.data)
                console.log('nooo')
            }
        })
        .catch(() => {
            console.log("Error");
        });
    }


    return (
        <div className="mt-10 sm:mt-0 flex justify-center">
            <div className="md:grid md:grid  md:gap-6">
                <div className="mt-10 md:col-span-2">
                <form onSubmit={onSubmit} action="#" method="POST">
                    <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label for="first-name" className="block text-sm font-medium text-gray-700">Full name</label>
                            <input onChange={onChange} value={name.name} type="text" name="name" id="name" className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder='Full Name' />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label for="last-name" className="block text-sm font-medium text-gray-700">Address Email</label>
                            <input onChange={onChange} value={name.email} type="email" name="email" id="email" className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder='Adress Email' />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label for="email-address" className="block text-sm font-medium text-gray-700">Password</label>
                            <input onChange={onChange} value={name.password} type="password" name="password" id="password" className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder='Password' />
                        </div>

                        <div className="col-span-6">
                            <label for="street-address" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input onChange={onChange} value={name.confirm_password} type="password" name="confirm_password" id="confirm_password" className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder='Confirmation Password' />
                        </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>

  )
}

export default Register