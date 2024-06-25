import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogInSchema } from '../validationschema/FormError';
import { errorTimeOut, logInUser } from '../userfeatures/UserSlice';
import UserDashBoard from '../userPages/UserDashBoard';
import { apiToken } from '../../commonJs/Common';

const initialValues = {
    email_or_username: "",
    password: "",
}

function LogInForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userLogIn, logInSuccess } = useSelector(state => state.Users)
    const {setValues,setTouched, values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LogInSchema,
        onSubmit: async (values) => {
            dispatch(logInUser(values))
        }
    })
    const handleResetForm = () => {
        setValues({
            email_or_username : "",
            password : ""
        })
        setTouched({
            email_or_username :false,
            password : false
        })
    }
    useEffect(() => {
        if (logInSuccess && (apiToken())) {
            handleResetForm()
            navigate("/dashboard")
        }
    }, [logInSuccess])


    return (
        <>
             {(logInSuccess && (apiToken()))? <UserDashBoard/>:<section className=''>
                <div className=' px-6 py-4 w-2/6 mx-auto my-20'>
                    <div className="flex items-center justify-center">
                        <div className=" px-5 py-5  w-full text-black border-2 border-blue-950 rounded-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl text-center mt-1"><i className="fa-solid fa-user text-2xl"></i>  Login</h2>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    {(userLogIn !== undefined) ? <p className='text-red-600'>{userLogIn.non_fields_errors}</p> : null}
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address OR Username{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Email / Username"
                                                name="email_or_username"
                                                value={values.email_or_username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                onInput={() => dispatch(errorTimeOut())}
                                            />
                                        </div>
                                        {(errors.email_or_username && touched.email_or_username) ? <p className=' text-red-600'>{errors.email_or_username}</p> : null}
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Password{' '}
                                            </label>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                placeholder="Password"
                                                name='password'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                onInput={() => dispatch(errorTimeOut())}
                                            />
                                        </div>
                                        {(errors.password && touched.password) ? <p className=' text-red-600'>{errors.password}</p> : null}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Log In
                                        </button>
                                        <p className="mt-2 text-sm text-black">
                                            Don&apos;t have an account?{' '}
                                            <Link
                                                to="/signUp"
                                                title=""
                                                className="font-semibold text-black transition-all duration-200 hover:underline"
                                            >
                                                Create New account
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}

        </>
    );
}

export default LogInForm;

