import React, { useEffect, useState } from 'react';
import UsersNavbar from './UsersNavbar';
import { useDispatch, useSelector } from 'react-redux';

import { apiToken, company, convertDate } from '../../commonJs/Common';
import { closeSUccessPopUp, getAllDepartmentList, getCompaniesList } from '../userfeatures/UserSlice';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import DepartmentPopUp from '../popUpPages/DepartmentPopUp';
import { ClipLoader } from 'react-spinners';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import Spinner from '../spinner/Spinner';

function UserDepartments() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { department, companies, departmentLoading,btnDisable, departmentSuccess, departmentDeleteSuccess } = useSelector(state => state.Users)
  const handlePagination = (data) => {
    setCurrentPage(data.selected + 1)
    dispatch(getAllDepartmentList(data.selected + 1))
    dispatch(getCompaniesList({ apiToken: apiToken(), page: 1 }))
  }
  useEffect(() => {
    dispatch(getAllDepartmentList(currentPage))
    dispatch(getCompaniesList({ apiToken: apiToken(), page: 1 }))
  }, [])
  if (departmentDeleteSuccess || departmentSuccess) {
    setTimeout(() => {
      dispatch(closeSUccessPopUp())
    }, 2000);
  }
  return (
    <>
      <UsersNavbar />
      <div className='text-right mt-3 mr-3 absolute top-0 w-full'>
        {(departmentSuccess || departmentDeleteSuccess) ? <SuccessfullyPopUp sucessfullMsg={(departmentSuccess) ? "Department added successfully" : (departmentDeleteSuccess) ? "Department deleted successfully" : ""} /> : ""}
      </div>
      
      <div className='w-4/5 mx-auto mt-4'>

        <div className='flex flex-wrap justify-between'>
          <h1 className='text-3xl text-center text-blue-950'>Departments</h1>
          <div className=''>
            <Popup trigger={<button
              type="button"
              className={(btnDisable) ? "hidden" : "rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"}
            >
              + Add
            </button>}>
              {close => (
                <DepartmentPopUp close={close} title="Add Department" page={currentPage} companies={companies} />
              )}
            </Popup>
          </div>
        </div>
        {(departmentLoading) ? <Spinner loading={departmentLoading}/>
        : <div>
          {(department.length === 0) ? <div className='text-center  text-gray-400 mt-5'><p>No departments Found</p></div> : <div className='mt-5'>
            <table className='w-full '>
              <thead>
                <tr className='text-center bg-sky-900 text-white'>
                  <td className='border-2 border-white pt-2 pb-2'>Department Name</td>
                  {/* <td className='border-2 border-white'>Department desctiption</td> */}
                  <td className='border-2 border-white'>Company name</td>
                  <td className='border-2 border-white'>Company type</td>
                  <td className='border-2 border-white'>Created</td>
                  <td className='border-2 border-white'>Updated </td>
                  <td colSpan={3} className='border-2 border-white'>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  department.map((ele, index) => {
                    return (
                      <tr className='text-center even:bg-blue-50 odd:bg-blue-100' key={index}>
                        <td className='border-2 border-white pt-2 pb-2'>{ele.name}</td>
                        <td className='border-2 border-white'>{ele.company.name}</td>
                        <td className='border-2 border-white'>{ele.company.type}</td>
                        <td className='border-2 border-white'>{convertDate(ele.created)}</td>
                        <td className='border-2 border-white'>{convertDate(ele.updated)}</td>
                        <Popup trigger={<td className='border-2 border-white px-4 py-3'><button
                          type="button"
                          className="fa-solid fa-pen-to-square text-sky-900 "
                        >
                        </button></td>}>
                          {close => (
                            <DepartmentPopUp close={close} data={ele} title="Update department" page={currentPage} companies={companies} />
                          )}
                        </Popup>
                        <Popup trigger={<td className='border-2 border-white px-4 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                          {close => (

                            <DeleteCompanyPopUp close={close} id={ele.id} comapny_id={ele.company.id} message="Are you sure you want to delete department?" page={currentPage} companies={companies} />
                          )}
                        </Popup>

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
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
    </>
  );
}

export default UserDepartments;
