import {  useFormik } from 'formik';
import React, { useEffect } from 'react';
import Select from 'react-select';
import { AllDepartmentSchema, DepartmentSchema } from '../validationschema/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { clearComapnyError, departmentAPI, updateDepartAPI } from '../userfeatures/UserSlice';
import {  company } from '../../commonJs/Common';

function DepartmentPopUp(props) {
    
    const options = [
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Marketing and Sales', label: 'Marketing and Sales' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Production/Operations', label: 'Production/Operations' },
        { value: 'Research and Development', label: 'Research and Development' },
        { value: 'Customer Service', label: 'Customer Service' }
    ];
    let initialValues =  {
        name: (props.data === undefined) ? "" : props.data.name,
        description: (props.data === undefined) ? "" : props.data.description,
        company_id: (props.data === undefined) ? "" : props.data.company.id

    }
    const dispatch = useDispatch()

    const { departmentError, departmentSuccess, companies } = useSelector(state => state.Users)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: (props.companies === undefined) ?DepartmentSchema  : AllDepartmentSchema,
        onSubmit: (values) => {
            const departments = (props.companies === undefined) ? {
                name: values.name,
                description: values.description,
                company_id: company().id
            } : {
                name: values.name,
                description: values.description,
                company_id: values.company_id 
            };
            if (props.data === undefined) {
                dispatch(departmentAPI({ value: departments, page: props.page, companies: props.companies }))
            } else {
                dispatch(updateDepartAPI({ id: props.data.id, value: departments, page: props.page, companies: props.companies }))
            }

        }
    })
    
    useEffect(() => {
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
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="address" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Department Name{' '}
                                    </label>
                                    <div className="mt-1">
                                        <Select
                                            options={options}
                                            type={"text"}
                                            name='name'
                                            value={values.FieldValue}
                                            onChange={(selectedOption) => {
                                                setFieldValue("name", selectedOption.value ? selectedOption.value : '');

                                            }}
                                            onFocus={() => dispatch(clearComapnyError())}
                                            defaultValue={(props.data !== undefined) ? (options ? options.find(option => option.value === props.data.name) : '') : ""}


                                        />
                                        {(errors.name && touched.name) ? <p className=' text-red-600'>{errors.name}</p> : null}
                                        {(departmentError !== undefined) ? <p className='text-red-600'>{departmentError.non_field_errors}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="address" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Description{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            cols="30"
                                            placeholder="About"
                                            name='description'
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="address"
                                            autoComplete='off'
                                        />
                                        {(errors.description && touched.description) ? <p className=' text-red-600'>{errors.description}</p> : null}
                                    </div>
                                </div>
                            </div>
                            {(props.companies !== undefined ) ? <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="company" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Company{' '}
                                    </label>
                                    <div className="mt-1">
                                        <select id="company" name="company_id" value={ values.company_id} className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                            onChange={(e) => {
                                                setFieldValue('company_id', e.target.value)
                                            }}
                                        >
                                            <option >Select</option>
                                            {
                                                companies.map((ele) => {
                                                    return <option value={ele.id} key={ele.id} className='mb-4' >{ele.name}</option>
                                                })
                                            }

                                        </select>
                                        {(errors.company_id && touched.company_id) ? <p className=' text-red-600'>{errors.company_id}</p> : null}
                                    </div>
                                </div>
                            </div> : null}
                            <div className="mt-3 gap-1 text-center flex flex-wrap justify-center">
                                <button
                                    type="submit"
                                    className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5 "
                                >
                                    {(props.data === undefined) ? "Add" : "Update"}
                                </button>
                                <button
                                    type="submit"
                                    className="relative inline-flex  items-center justify-center 
                                                 bg-red-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:text-black focus:bg-black-100 focus:text-black w-1/5"
                                    onClick={() => { props.close() }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DepartmentPopUp;
