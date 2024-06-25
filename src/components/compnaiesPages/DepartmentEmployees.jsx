import React, { useEffect, useState } from 'react';
import UsersNavbar from '../userPages/UsersNavbar';
import { Link, useParams } from 'react-router-dom';
import { company, convertDate } from '../../commonJs/Common';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { closeSUccessPopUp, departmentEmployees, getOneDepartment } from '../userfeatures/UserSlice';
import EmplyeesPopUp from '../popUpPages/EmplyeesPopUp';
import ReactPaginate from 'react-paginate';
import Spinner from '../spinner/Spinner';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';

function DepartmentEmployees() {
    const { CompanyId, departmentId } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const { oneDepartment, loading, employees, departmentSuccess, departmentDeleteSuccess, EmployeeSpinner ,btnDisable } = useSelector(state => state.Users)

    localStorage.setItem("dapartment", JSON.stringify(departmentId))
    const handlePagination = (data) => {
        setCurrentPage(data.selected + 1)
        dispatch(departmentEmployees({ department_id: departmentId, page: data.selected + 1 }))
    }
    if (departmentDeleteSuccess || departmentSuccess) {
        setTimeout(() => {
            dispatch(closeSUccessPopUp())
        }, 1000);
    }

    useEffect(() => {
        dispatch(getOneDepartment(departmentId))
        dispatch(departmentEmployees({ department_id: departmentId, page: currentPage }))
    }, [])

    return (
        <>
            <UsersNavbar />
            <div className='text-right mt-3 mr-3'>
                {(departmentSuccess || departmentDeleteSuccess) ? <SuccessfullyPopUp sucessfullMsg={(departmentSuccess) ? "Employees added successfully" : (departmentDeleteSuccess) ? "Employees deleted successfully" : ""} /> : ""}
            </div>
            <div className='w-4/5 mx-auto mt-5'>
                <div className='flex flex-wrap justify-between'>
                    <div>
                        <Link to={`/companies/${company().id}/departments`}><button className='rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right'>
                            <i className="fa-solid fa-arrow-left"></i>  Back
                        </button></Link>
                    </div>
                    <div className='text-3xl'>
                        {(loading) ? <Spinner loading={loading} /> : <h1> {oneDepartment.name} Department</h1>
                        }
                    </div>
                    <div className=''>
                        <Popup trigger={<button
                            type="button"
                            className={(btnDisable) ? "hidden" :"rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"}
                        >
                            + Add
                        </button>}>
                            {close => (
                                <EmplyeesPopUp close={close} title="Add employees" page={currentPage} CompanyId={CompanyId} departmentId={departmentId} />
                            )}
                        </Popup>
                    </div>
                </div>
                <div>
                    {(EmployeeSpinner) ? <Spinner loading={EmployeeSpinner} /> : <div>
                        {(employees.length === 0) ? <div className='mt-4'><h1 className=' text-xl text-center text-gray-400'>No Employees </h1></div> : <div>
                            <div className='mt-5'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='text-center bg-sky-900 text-white'>
                                            <td className='border-2 border-white pt-2 pb-2'>Employee Name</td>
                                            <td className='border-2 border-white'> Phone number</td>
                                            <td className='border-2 border-white'> Position</td>
                                            <td className='border-2 border-white'>Created Time</td>
                                            <td className='border-2 border-white'>Updated Time</td>
                                            <td colSpan={3} className='border-2 border-white'>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            employees.map((ele, index) => {
                                                return (
                                                    <tr className='text-center even:bg-blue-50 odd:bg-blue-100' key={index}>
                                                        <td className='border-2 border-white pt-2 pb-2'>{ele.name}</td>
                                                        <td className='border-2 border-white pt-2 pb-2'>{ele.phone}</td>
                                                        <td className='border-2 border-white pt-2 pb-2'>{ele.position}</td>
                                                        <td className='border-2 border-white pt-2 pb-2'>{convertDate(ele.created)}</td>
                                                        <td className='border-2 border-white pt-2 pb-2'>{convertDate(ele.updated)}</td>
                                                        <Popup trigger={<td className='border-2 border-white p-2 py-3'><button
                                                            type="button"
                                                            className="fa-solid fa-pen-to-square text-sky-900 "
                                                        >
                                                        </button></td>}>
                                                            {close => (
                                                                <EmplyeesPopUp close={close} data={ele} title="Update employees" page={currentPage} CompanyId={CompanyId} departmentId={departmentId} />
                                                            )}
                                                        </Popup>
                                                        <Popup trigger={<td className='border-2 border-white px-2 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                                                            {close => (

                                                                <DeleteCompanyPopUp close={close} id={ele.id} employees_id={ele.id} message="Are you sure you want to delete employees?" page={currentPage} department_id={departmentId} />
                                                            )}
                                                        </Popup>
                                                        {/* <td className='border-2 border-white'><Link to={`/companies/${company().id}/departments/${ele.id}/employees`}><i className="fa-solid fa-eye"></i></Link></td> */}
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>

                            </div>
                        </div>}</div>}

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

export default DepartmentEmployees;
