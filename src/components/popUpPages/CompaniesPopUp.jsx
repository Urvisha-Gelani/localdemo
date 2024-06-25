import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { CompanySchema } from '../validationschema/FormError';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addCompanies, clearComapnyError, updateCompnay } from '../userfeatures/UserSlice';
import { apiToken } from '../../commonJs/Common';

function CompaniesPopUp(props) {
    let initialValues = {
        name: (props.data === undefined) ? "" : props.data.name,
        location: (props.data === undefined) ? "" : props.data.location,
        about: (props.data === undefined) ? "" : props.data.about,
        type: (props.data === undefined) ? "" : props.data.type
    }

    const options = [
        { value: 'IT', label: 'IT' },
        { value: 'Non IT', label: 'Non IT' }];
    const dispatch = useDispatch()
    const { addCopmaniError, signInSuccess } = useSelector(state => state.Users)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: CompanySchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            if (props.data !== undefined) {
                dispatch(updateCompnay({ id: props.data.id, value: values, token: apiToken(), page: props.page }))
            } else {
                dispatch(addCompanies({ values: values, token: apiToken(), page: props.page }))
            }
            resetForm()

        }
    })
    useEffect(() => {
        if (signInSuccess) {
            props.close()
        }
    }, [signInSuccess])
    return (
        <>
            <div className="modal w-full">
                <div>
                    <div className='flex justify-between text-center'>
                        <h1 className='w-11/12 text-center text-2xl'><b>{props.title}</b></h1>
                        <button onClick={() => { props.close() }} className='text-right w-1/12'><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div>

                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Name{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Company Name"
                                            id="name"
                                            name='name'
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete='off'
                                            onInput={() => dispatch(clearComapnyError())}
                                        />
                                        {(errors.name && touched.name) ? <p className=' text-red-600'>{errors.name}</p> : null}
                                        {(addCopmaniError !== "") ? <p className='text-red-600'>{addCopmaniError.errors.name}</p> : <p></p>}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="location" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Location{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Company Location"
                                            id="location"
                                            name='location'
                                            value={values.location}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete='off'
                                        />
                                        {(errors.location && touched.location) ? <p className=' text-red-600'>{errors.location}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="address" className="text-base font-medium text-gray-900">
                                        {' '}
                                        About{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            cols="30"
                                            placeholder="About"
                                            name='about'
                                            value={values.about}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="address"
                                            autoComplete='off'
                                        />
                                        {(errors.about && touched.about) ? <p className=' text-red-600'>{errors.about}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 pb-3">
                                <div>
                                    <label htmlFor="address" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Company type{' '}
                                    </label>
                                    <div className="mt-1">
                                        <Select
                                            options={options}
                                            type={"text"}
                                            name='type'
                                            value={values.FieldValue}
                                            onChange={(selectedOption) => {
                                                setFieldValue("type", selectedOption.value ? selectedOption.value : '');
                                            }}
                                            defaultValue={(props.data !== undefined) ? (options ? options.find(option => option.value === props.data.type) : '') : ""}


                                        />
                                        {(errors.type && touched.type) ? <p className=' text-red-600'>{errors.type}</p> : null}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 gap-1 text-center flex flex-wrap justify-center">
                                <button
                                    type="submit"
                                    className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5 "
                                >
                                    {(props.data !== undefined) ? "Update" : "Add"}
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

export default CompaniesPopUp;
