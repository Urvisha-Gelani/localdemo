import { setNestedObjectValues, useFormik } from 'formik';
import React, { useEffect } from 'react';
import Select from 'react-select';
import { DepartmentEmployeesSchema, EmployeesSchema, allEmployeesSchema } from '../validationschema/FormError';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartmentEmployees, clearComapnyError, getCompanyDepartment, updateDepartmentEmployees } from '../userfeatures/UserSlice';

function EmplyeesPopUp(props) {
    const { CompanyId, departmentId } = useParams()
    const dispatch = useDispatch()
    const { departmentSuccess, departmentError, department } = useSelector(state => state.Users)

    const initialValues = {
        name: (props.data === undefined) ? "" : props.data.name,
        email: (props.data === undefined) ? "" : props.data.email,
        address: (props.data === undefined) ? "" : props.data.address,
        phone: (props.data === undefined) ? "" : props.data.phone,
        about: (props.data === undefined) ? "" : props.data.about,
        position: (props.data === undefined) ? "" : props.data.position,
        company_id: (props.companies !== undefined && props.data !== undefined) ? props.data.department.company.id : "",
        department_id: (props.companies !== undefined && props.data !== undefined) ? props.data.department.id : ((props.data === undefined) ? "" : localStorage.getItem(`${props.data.department}`)),


    }
    const positionOptions = [
        { value: 'Manager', label: 'Manager' },
        { value: 'Software Developer', label: 'Software Developer' },
        { value: 'Project Leader', label: 'Project Leader' },
    ]
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, companies } = useFormik({
        initialValues: initialValues,
        validationSchema: (props.companyAllEmployees !== undefined) ? DepartmentEmployeesSchema : ((props.companies !== undefined) ? allEmployeesSchema : EmployeesSchema),
        onSubmit: (values) => {
            if (props.companyAllEmployees !== undefined) {
                values["company_id"] = Number(CompanyId)
            } else {
                values.company_id = (props.companies !== undefined) ? values.company_id : Number(CompanyId)
                values.department_id = (props.companies !== undefined) ? values.department_id : Number(departmentId)
            }
            if (props.data !== undefined) {
                dispatch(updateDepartmentEmployees({ id: props.data.id, value: values, page: props.page, companyAllEmployees: props.companyAllEmployees, companies: props.companies }))
            } else {

                dispatch(addDepartmentEmployees({ value: values, page: props.page, companyAllEmployees: props.companyAllEmployees, companies: props.companies }))
            }



        }
    })
    useEffect(() => {
        if (props.companies !== undefined && props.data !== undefined) {
            dispatch(getCompanyDepartment({ companyID: props.data.department.company.id, page: 1 }))
        }
        if (departmentSuccess) {
            props.close()
        }
    }, [departmentSuccess])

    return (
        <>
            <div className="modal w-full">
                <div>
                    <div className='flex justify-between text-center'>
                        <h1 className='w-11/12 text-center text-2xl'><b>{props.title}</b></h1>
                        <button onClick={() => { props.close() }} className='text-right w-1/12'><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div>
                        <form className="mt-3" onSubmit={handleSubmit}>
                            <div className='space-y-5 pb-3'>
                                <div className="flex flex-wrap gap-1 justify-evenly">
                                    {(props.companyAllEmployees !== undefined) ?
                                        <div className='w-11/12'>
                                            <label htmlFor="company" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Department{' '}
                                            </label>
                                            <div className="mt-1">
                                                <select id="department" name="department_id" value={values.department_id} className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                                    onChange={(e) => {
                                                        setFieldValue('department_id', e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {
                                                        department.map((ele) => {
                                                            localStorage.setItem(`${ele.name}`, `${ele.id}`)
                                                            return <option value={ele.id} key={ele.id} className='mb-4' >{ele.name}</option>
                                                        })
                                                    }

                                                </select>
                                                {(errors.department_id && touched.department_id) ? <p className=' text-red-600'>{errors.department_id}</p> : null}
                                            </div>


                                        </div> : null}


                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                name='name'
                                                placeholder="Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                            />
                                        </div>
                                        {(errors.name && touched.name) ? <p className=' text-red-600'>{errors.name}</p> : null}
                                    </div>
                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                placeholder="Email"
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                                onInput={() => dispatch(clearComapnyError())}
                                            />
                                        </div>
                                        {(errors.email && touched.email) ? <p className=' text-red-600'>{errors.email}</p> : null}
                                        {(departmentError !== undefined) ? <p className='text-red-600'>{departmentError.email}</p> : null}
                                    </div>
                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Address"
                                                name='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                            />
                                        </div>
                                        {(errors.address && touched.address) ? <p className=' text-red-600'>{errors.address}</p> : null}
                                    </div>
                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Phone Number{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="number"
                                                placeholder=" Phone Number"
                                                name='phone'
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                            />
                                        </div>
                                        {(errors.phone && touched.phone) ? <p className=' text-red-600'>{errors.phone}</p> : null}
                                    </div>
                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            About{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="About"
                                                name='about'
                                                value={values.about}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete='off'
                                            />
                                        </div>
                                        {(errors.about && touched.about) ? <p className=' text-red-600'>{errors.about}</p> : null}
                                    </div>
                                    <div className='w-5/12'>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Position{' '}
                                        </label>
                                        <div className="mt-2">
                                            <Select
                                                options={positionOptions}
                                                type={"text"}
                                                name='position'
                                                value={values.FieldValue}
                                                onChange={(selectedOption) => {
                                                    setFieldValue("position", selectedOption.value ? selectedOption.value : '');
                                                }}
                                                // onFocus={() => dispatch(clearComapnyError())}
                                                defaultValue={(props.data !== undefined) ? (positionOptions ? positionOptions.find(option => option.value === props.data.position) : '') : ""}


                                            />
                                        </div>
                                        {(errors.position && touched.position) ? <p className=' text-red-600'>{errors.position}</p> : null}
                                    </div>
                                    {(props.companies !== undefined) ? <div className='w-full flex flex-wrap justify-around'>
                                        <div className='w-5/12'>
                                            <label htmlFor="company" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Company{' '}
                                            </label>
                                            <div className="mt-1">
                                                <select id="company" name="company_id" value={values.company_id} className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                                    onChange={(e) => {
                                                        setFieldValue('company_id', e.target.value)
                                                        setFieldValue('department_id', "")
                                                        dispatch(getCompanyDepartment({ companyID: e.target.value, page: 1 }))
                                                        
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {
                                                        props.companies.map((ele) => {
                                                            // localStorage.setItem(`${ele.name}`, `${ele.id}`)
                                                            return <option value={ele.id} key={ele.id} className='mb-4' name={ele.name}>{ele.name}</option>
                                                        })
                                                    }

                                                </select>
                                                {(errors.company_id && touched.company_id) ? <p className=' text-red-600'>{errors.company_id}</p> : null}
                                            </div>


                                        </div>
                                        <div className='w-5/12'>
                                            <label htmlFor="deparment" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Department{' '}
                                            </label>
                                            <div className="mt-1">
                                                <select id="deparment" name="department_id" value={values.department_id} className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                                    onChange={(e) => {
                                                        setFieldValue('department_id', e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    {(department !== undefined) ?
                                                        department.map((ele) => {
                                                            // localStorage.setItem(`${ele.name}`, `${ele.id}`)
                                                            return <option value={ele.id} key={ele.id} className='mb-4' >{ele.name}</option>
                                                        }) : ""
                                                    }

                                                </select>
                                                {(errors.department_id && touched.department_id) ? <p className=' text-red-600'>{errors.department_id}</p> : null}
                                            </div>


                                        </div>


                                    </div>

                                        : null}
                                    <div className="mt-3 gap-1 text-center flex flex-wrap justify-center">
                                        <button
                                            type="submit"
                                            className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-10 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5 "
                                        >
                                            {(props.data === undefined) ? "Add" : "Update"}
                                        </button>
                                        <button
                                            type="submit"
                                            className="relative inline-flex  items-center justify-center 
                                                 bg-red-700 rounded-md  px-10 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:text-black focus:bg-black-100 focus:text-black w-1/5"
                                            onClick={() => { props.close() }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmplyeesPopUp;
