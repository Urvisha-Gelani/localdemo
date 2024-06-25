import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { SignupSchema } from '../validationschema/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, closeSUccessPopUp, signUperror } from '../userfeatures/UserSlice';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import { useEffect } from 'react';

const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    password: "",
    password2: ""
}
function SignUpForm() {
    const dispatch = useDispatch();
    const { createUser, signInSuccess } = useSelector((state) => state.Users)
    const { setValues ,setTouched, values, errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps } = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            const user = {
                username: values.username,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                gender: values.gender,
                password: values.password,
                password2: values.password2
            }
            dispatch(addUser(user))
           
        },
    })
    const handleResetForm = () =>{
        setValues({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            gender: "",
            password: "",
            password2: ""
        })
        setTouched({
            username: false,
            first_name: false,
            last_name: false,
            email: false,
            gender: false,
            password: false,
            password2: false
        })
    }
    
    useEffect(() => {
        if(signInSuccess) {
            handleResetForm()
            setTimeout(() => {
                dispatch(closeSUccessPopUp())
            }, 2000);
        }
    },[signInSuccess])

    return (
        <>
            <section className="">
                <div className=' px-6 py-4 w-3/6 mx-auto mt-11'>
                    <div>
                        {(signInSuccess) ? <SuccessfullyPopUp sucessfullMsg="Sign up Sucessfully" /> : <div></div>}
                    </div>
                    <div className="flex items-center justify-center">
                        <div className=" px-5 py-5  w-full text-black border-2 border-blue-950 rounded-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl text-center mt-1"> <i className="fa-solid fa-user text-2xl"></i>  Sign up</h2>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <div className="space-y-5 flex flex-wrap">
                                    <div className='w-2/4'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            UserName {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='username'
                                                type="text"
                                                placeholder="Username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                onInput={() => dispatch(signUperror())}
                                                defaultValue={(!signInSuccess) ? values.username : " "}
                                            />
                                        </div>
                                        {(errors.username && touched.username) ? <p className=' text-red-600'>{errors.username}</p> : null}
                                        {(createUser.success === false) ? <p className='text-red-600 userError'>{createUser.errors.username}</p> : null}
                                    </div>
                                    <div className='w-2/4 margin-0'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            First Name {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='first_name'
                                                type="text"
                                                placeholder="First Name"
                                                value={values.first_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                defaultValue={(!signInSuccess) ? values.first_name : ""}
                                            />
                                        </div>
                                        {(errors.first_name && touched.first_name) ? <p className=' text-red-600'>{errors.first_name}</p> : null}
                                    </div>
                                    <div className='w-2/4'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Last Name {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='last_name'
                                                type="text"
                                                placeholder="Last Name"
                                                value={values.last_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                defaultValue={(!signInSuccess) ? values.last_name : ""}
                                            />
                                        </div>
                                        {(errors.last_name && touched.last_name) ? <p className=' text-red-600'>{errors.last_name}</p> : null}
                                    </div>
                                    <div className='w-2/4'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address {' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                name='email'
                                                value={values.email}
                                                placeholder="Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                onInput={() => dispatch(signUperror())}
                                                defaultValue={(!signInSuccess) ? values.email : ""}
                                            />
                                        </div>
                                        {(errors.email && touched.email) ? <p className=' text-red-600'>{errors.email}</p> : null}
                                        {(createUser.success === false) ? <p className='text-red-600 userError'>{createUser.errors.email}</p> : null}

                                    </div>
                                    <div className='w-3/4'>
                                        <div className='flex'>
                                            <label htmlFor="" className="text-base font-medium text-gray-900 w-1/5">
                                                {' '}
                                                Gender {' '}
                                            </label>
                                            <>
                                                <div role="group" aria-labelledby="my-radio-group" className='w-4/5 flex'>
                                                    <label>
                                                        <input type="radio" name="gender" value="M" onBlur={handleBlur} checked={values.gender === "M" ? true : false}
                                                            onChange={getFieldProps("type").onChange} />
                                                        {' '}Male{' '}
                                                    </label>
                                                    <label className='ml-3'>
                                                        <input type="radio" name="gender" value="F" onBlur={handleBlur} checked={values.gender === "F" ? true : false}
                                                            onChange={getFieldProps("type").onChange} />
                                                        {' '}Female{' '}
                                                    </label>

                                                </div>
                                            </>
                                        </div>
                                        {(errors.gender && touched.gender) ? <p className=' text-red-600'>{errors.gender}</p> : null}
                                    </div>
                                    <div className='w-2/4'>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Password{' '}
                                            </label>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                name='password'
                                                value={values.password}
                                                placeholder="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                defaultValue={(!signInSuccess) ? values.password : ""}
                                            />
                                        </div>
                                        {(errors.password && touched.password) ? <p className=' text-red-600'>{errors.password}</p> : null}
                                    </div>
                                    <div className='w-2/4'>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Confirm  Password{' '}
                                            </label>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-11/12 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                name='password2'
                                                value={values.password2}
                                                placeholder="Confirm Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                defaultValue={(!signInSuccess) ? values.password2 : ""}
                                            />
                                        </div>
                                        {(errors.password2 && touched.password2) ? <p className=' text-red-600'>{errors.password2}</p> : null}
                                    </div>

                                </div>
                                <div className='text-center mt-2'>
                                    <div className='w-3/6 mx-auto'>
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-950 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Sign up
                                        </button>
                                        <p className="mt-2 text-sm text-black">
                                            you have an account?{' '}
                                            <Link
                                                to="/logIn"
                                                title=""
                                                className="font-semibold text-black transition-all duration-200 hover:underline"
                                            >Login
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUpForm;
