import React, { useEffect } from 'react';
import UsersNavbar from '../userPages/UsersNavbar';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiToken } from '../../commonJs/Common';
import { getCompanydetails } from '../userfeatures/UserSlice';
import Spinner from '../spinner/Spinner';

function CompanyPage() {
    const { CompanyId } = useParams()
    const dispatch = useDispatch()
    const { company, loading } = useSelector(state => state.Users)
    useEffect(() => {
        dispatch(getCompanydetails({ id: CompanyId, token: apiToken() }))

    }, [])
    localStorage.setItem("company", JSON.stringify(company))
    return (
        <>
            <UsersNavbar />
            {(loading) ? <Spinner loading={loading}/> : <div className=" w-4/5 mx-auto bg-white py-4">
                <div className="flex flex-wrap ">
                    <div className="w-2/4 px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                        <div className='w-full'>

                            <div className='mt-8'>
                                <p className='text-3xl text-black inline-block font-bold tracking-tight text-black md:text-4xl lg:text-4xl'>{company.name}</p>
                            </div>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                <div className='w-1/4 py-2 px-2 bg-blue-50 rounded-md font-bold'>
                                    type
                                </div>
                                <div className='w-2/4 py-2 px-2 bg-blue-50 rounded-md'>
                                    {company.type}
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                <div className='w-1/4 py-2 px-2 bg-blue-50 rounded-md font-bold'>
                                    About
                                </div>
                                <div className='w-2/4 py-2 px-2 bg-blue-50 rounded-md'>
                                    {company.about}
                                </div>
                            </div>
                            <p className="mt-8 text-lg text-gray-700">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
                                dolores quasi eaque explicabo!
                            </p>

                            <div className='mt-4 flex flex-wrap gap-4'>
                                <div>
                                    <Link to="/companies"><button className='rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right'>
                                        <i className="fa-solid fa-arrow-left"></i>  Back
                                    </button></Link>
                                </div>
                                <div>
                                    <Link to={`/companies/${CompanyId}/departments`}> <button className='rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right'>Departments</button></Link>
                                </div>
                                <div>
                                    <Link to={`/companies/${CompanyId}/employees`}> <button className='rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right'>Employees</button></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-2/4">
                        <img
                            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[500px] xl:aspect-[16/9]"
                            src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default CompanyPage;
