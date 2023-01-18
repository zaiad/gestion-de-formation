import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const onSubmit = async(e) => {
        e.preventDefault()
        const login = await axios.post('http://localhost:4000/api/auth/login', data)
        .then(e=>{
            const data = JSON.stringify(e.data)
            localStorage.setItem("login",data)
            navigate ('/organisme')
        })
    }

return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="sign-in flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-4xl font-bold text-center text-amber-500">Login in</h1>
                <form className="space-y-4 md:space-y-6">
                    <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange }
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="name@company.com"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange }
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <a href="/Forgot-Password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                    </a>
                    </div>
                    <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-full text-white bg-amber-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                    Sign up
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a href="/Register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Sign up
                    </a>
                    </p>
                </form>
                </div>
            </div>
        </div>
        {/* <ToastContainer /> */}
    </section>
);
}
