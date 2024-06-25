import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import UsersNavbar from '../userPages/UsersNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeSUccessPopUp, getCompaniesList } from '../userfeatures/UserSlice';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import CompaniesPopUp from '../popUpPages/CompaniesPopUp';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';
import { apiToken, convertDate } from '../../commonJs/Common';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Spinner from '../spinner/Spinner';

function UsersCompanies() {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const { loading, companies, signInSuccess,btnDisable, deleteSuccessfully } = useSelector(state => state.Users)

    useEffect(() => {
        dispatch(getCompaniesList({ apiToken: apiToken(), page: 1 }))
    }, [])
    const handlePagination = (data) => {
        setCurrentPage(data.selected + 1)
        dispatch(getCompaniesList({ apiToken: apiToken(), page: data.selected + 1 }))
    }
    if (signInSuccess || deleteSuccessfully) {
        setTimeout(() => {
            dispatch(closeSUccessPopUp())
        }, 2000);
    }
   

    return (
        <>
            <UsersNavbar />
            <div className='text-right mt-3 mr-3'>
                {(signInSuccess || deleteSuccessfully) ? <SuccessfullyPopUp sucessfullMsg={(deleteSuccessfully) ? "Company deleted secessfully" : (signInSuccess) ? "Company added sucessfully" : ""} /> : ""}
            </div>
            <div className='mx-3'>
                <div className='w-11/12 mx-auto'>
                    <div className='flex flex-wrap justify-between mb-2 mt-5'>
                        <div className='text-3xl'>
                            <h1>Companies </h1>
                        </div>
                        <div className=''>
                            <Popup trigger={<button
                                type="button"
                                className={(btnDisable) ? "hidden" : "rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"}
                            >
                                + Add
                            </button>}>
                                {close => (
                                    <CompaniesPopUp close={close} title="Add Company" page={currentPage} />
                                )}
                            </Popup>
                        </div>
                    </div>
                    {(loading) ? <Spinner loading={loading}/> : <div>
                        {(companies.length === 0) ? <div className='text-center  text-gray-400'><p>No Companies Found</p></div> : <div className='mt-5'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='text-center bg-sky-900 text-white'>
                                        <td className='border-2 border-white pt-2 pb-2'>Company Name</td>
                                        <td className='border-2 border-white'>Address</td>
                                        <td className='border-2 border-white px-2 py-3'>Service</td>
                                        <td className='border-2 border-white px-2 py-3'>Type</td>
                                        <td className='border-2 border-white'>Created</td>
                                        <td className='border-2 border-white'>Updated </td>
                                        <td colSpan={3} className='border-2 border-white'>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {console.log(currentPage ,"*********cpage*********")} */}
                                    {
                                        companies.map((ele, index) => {
                                            return (
                                                <tr className='text-center even:bg-blue-50 odd:bg-blue-100' key={index}>
                                                    <td className='border-2 border-white pt-2 pb-2'>{ele.name}</td>
                                                    <td className='border-2 border-white'>{ele.location}</td>
                                                    <td className='border-2 border-white px-3 py-3'>{ele.about}</td>
                                                    <td className='border-2 border-white px-3 py-3'>{ele.type}</td>
                                                    <td className='border-2 border-white'>{convertDate(ele.created)}</td>
                                                    <td className='border-2 border-white'>{convertDate(ele.updated)}</td>
                                                    <Popup trigger={<td className='border-2 border-white px-4 py-3 cursor-pointer' ><button
                                                        type="button"
                                                        className="fa-solid fa-pen-to-square text-sky-900 "
                                                    >
                                                    </button></td>}>
                                                        {close => (
                                                            <CompaniesPopUp close={close} data={ele} title="Update company " page={currentPage} />
                                                        )}
                                                    </Popup>
                                                    <Popup trigger={<td className='border-2 border-white px-4 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                                                        {close => (

                                                            <DeleteCompanyPopUp close={close} id={ele.id} message="Are you sure you want to delete Company?" currentPage={currentPage} />
                                                        )}
                                                    </Popup>
                                                    <td className='border-2 border-white px-4 py-3'><Link to={`/companies/${ele.id}`}><i className="fa-solid fa-eye"></i></Link></td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>}
                    </div>}


                </div>
            </div>
            <div className='w-3/5 mx-auto mt-5'>

                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePagination}
                    previousClassName={'hidden'}
                    nextClassName={'hidden'}
                    activeLinkClassName={'bg-blue-600 text-white'}
                    containerClassName={'flex items-center justify-center'}
                    pageLinkClassName={'mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'}

                />
            </div>

        </>
    );
}

export default UsersCompanies;
