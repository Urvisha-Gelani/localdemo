import React, { useEffect, useState } from 'react';
import UsersNavbar from './UsersNavbar';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { closeSUccessPopUp, getCompaniesList, usersAllEmployees } from '../userfeatures/UserSlice';
import Popup from 'reactjs-popup';
import EmplyeesPopUp from '../popUpPages/EmplyeesPopUp';
import Spinner from '../spinner/Spinner';
import { apiToken, convertDate } from '../../commonJs/Common';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';

function UserEmployees() {
    const [currentPage, setCurrentPage] = useState(1)
    const { employees, btnDisable, EmployeeSpinner, companies, departmentSuccess, departmentDeleteSuccess } = useSelector(state => state.Users)
    const dispatch = useDispatch()
    const handlePagination = (data) => {
        setCurrentPage(data.selected + 1)
        dispatch(usersAllEmployees(data.selected + 1))
        dispatch(getCompaniesList({ apiToken: apiToken(), page: 1 }))
    }
    if (departmentDeleteSuccess || departmentSuccess) {
        setTimeout(() => {
            dispatch(closeSUccessPopUp())
        }, 1000);
    }
    useEffect(() => {
        dispatch(usersAllEmployees(currentPage))
        dispatch(getCompaniesList({ apiToken: apiToken(), page: 1 }))
    }, [])

    return (
        <>
            {console.log(employees, companies, "**********employees , companies**************")}
            <UsersNavbar />
            <div className='text-right mt-3 mr-3'>
                {(departmentSuccess || departmentDeleteSuccess) ? <SuccessfullyPopUp sucessfullMsg={(departmentSuccess) ? "Employees added successfully" : (departmentDeleteSuccess) ? "Employees deleted successfully" : ""} /> : ""}
            </div>
            <div className='w-11/12 mx-auto pt-4'>
                <div className='flex flex-wrap justify-between'>
                    <div>
                        <h1 className='text-3xl text-blue-950'>Employees</h1>
                    </div>
                    <div>
                        <div className=''>
                            <Popup trigger={<button
                                type="button"
                                className={(btnDisable) ? "hidden" : "rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"}
                            >
                                + Add
                            </button>}>
                                {close => (
                                    <EmplyeesPopUp close={close} title="Add employees" page={currentPage} companies={companies} />
                                )}
                            </Popup>
                        </div>
                    </div>

                </div>
                <div>
                    {(EmployeeSpinner) ? <Spinner loading={EmployeeSpinner} /> : <div>
                        {(employees.length === 0) ? <div className='text-center  text-gray-400 mt-5'><p>No employees Found</p></div> : <div className='mt-5'>
                            <table className='w-full '>
                                <thead>
                                    <tr className='text-center bg-sky-900 text-white'>
                                        <td className='border-2 border-white'>Employee name</td>
                                        <td className='border-2 border-white'>phone Number</td>
                                        <td className='border-2 border-white'>Deparment name</td>
                                        <td className='border-2 border-white pt-2 pb-2'>Company Name</td>
                                        <td className='border-2 border-white'>Created </td>
                                        <td className='border-2 border-white'>Updated </td>
                                        <td colSpan={3} className='border-2 border-white'>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((ele, index) => {
                                            return (
                                                <tr className='text-center even:bg-blue-50 odd:bg-blue-100' key={index}>
                                                    <td className='border-2 border-white'>{ele.name}</td>
                                                    <td className='border-2 border-white'>{ele.phone}</td>
                                                    <td className='border-2 border-white'>{ele.department.name}</td>

                                                    <td className='border-2 border-white pt-2 pb-2'>{ele.department.company.name}</td>
                                                    <td className='border-2 border-white'>{convertDate(ele.created)}</td>
                                                    <td className='border-2 border-white'>{convertDate(ele.updated)}</td>
                                                    <Popup trigger={<td className='border-2 border-white px-4 py-3'><button
                                                            type="button"
                                                            className="fa-solid fa-pen-to-square text-sky-900 "
                                                        >
                                                        </button></td>}>
                                                            {close => (
                                                                <EmplyeesPopUp close={close} data={ele} title="Update employees" page={currentPage}  companies={companies} />
                                                            )}
                                                        </Popup>
                                                    <Popup trigger={<td className='border-2 border-white px-4 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                                                            {close => (

                                                                <DeleteCompanyPopUp close={close} id={ele.id} employees_id={ele.id} message="Are you sure you want to delete employees?" page={currentPage}  companies={companies} />
                                                            )}
                                                        </Popup>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>}
                    </div>}
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

            </div>
        </>
    );
}

export default UserEmployees;
