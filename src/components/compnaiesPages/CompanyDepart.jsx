import React, { useEffect, useState } from 'react';
import UsersNavbar from '../userPages/UsersNavbar';
import Popup from 'reactjs-popup';
import DepartmentPopUp from '../popUpPages/DepartmentPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { closeSUccessPopUp, getCompanyDepartment } from '../userfeatures/UserSlice';
import { company, convertDate } from '../../commonJs/Common';
import { Link, useParams } from 'react-router-dom';
import SuccessfullyPopUp from '../popUpPages/SuccessfullyPopUp';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';
import Spinner from '../spinner/Spinner';

function CompanyDepart() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { CompanyId } = useParams()
  const { department, departmentSuccess, departmentDeleteSuccess, loading } = useSelector(state => state.Users)

  
  if (departmentDeleteSuccess || departmentSuccess) {
    setTimeout(() => {
      dispatch(closeSUccessPopUp())
    }, 1000);
  }
  useEffect(() => {
    dispatch(getCompanyDepartment({ companyID: CompanyId, page: currentPage }))
  }, [])
  return (
    <>
      <UsersNavbar />
      <div className='text-right mt-3 mr-3'>
        {(departmentSuccess || departmentDeleteSuccess) ? <SuccessfullyPopUp sucessfullMsg={(departmentSuccess) ? "Department added successfully" : (departmentDeleteSuccess) ? "Department deleted successfully" : ""} /> : ""}
      </div>

      <div className='w-4/5 mx-auto py-4'>
        {(loading) ? <Spinner loading={loading}/> : <div>
          <div className='flex flex-wrap justify-between'>
            <div>
              <Link to={`/companies/${company().id}`}><button className='rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right'>
                <i className="fa-solid fa-arrow-left"></i>  Back
              </button></Link>
            </div>
            <div className='text-3xl'>
              <p>{company().name}</p>
            </div>
            <div>
              <Popup trigger={<button
                type="button"
                className="rounded-md bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 text-right"

              >
                + Add
              </button>}>
                {close => (
                  <DepartmentPopUp close={close} title="Add Department" page={currentPage} />
                )}
              </Popup>
            </div>
          </div>
          {(department.length === 0) ? <div className='text-center  text-gray-400 mt-10'><p>No Company departments Found</p></div> : <div className='mt-5'>
            <table className='w-full'>
              <thead>
                <tr className='text-center bg-sky-900 text-white'>
                  <td className='border-2 border-white pt-2 pb-2'>Department Name</td>
                  <td className='border-2 border-white'>Department description</td>
                  <td className='border-2 border-white'>Added Time</td>
                  <td className='border-2 border-white'>Updated Time</td>
                  <td colSpan={3} className='border-2 border-white'>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  department.map((ele, index) => {
                    return (
                      <tr className='text-center even:bg-blue-50 odd:bg-blue-100' key={index}>
                        <td className='border-2 border-white pt-2 pb-2'>{ele.name}</td>
                        <td className='border-2 border-white pt-2 pb-2'>{ele.description}</td>
                        <td className='border-2 border-white pt-2 pb-2'>{convertDate(ele.created)}</td>
                        <td className='border-2 border-white pt-2 pb-2'>{convertDate(ele.updated)}</td>
                        <Popup trigger={<td className='border-2 border-white px-2 py-3'><button
                          type="button"
                          className="fa-solid fa-pen-to-square text-sky-900 "
                        >
                        </button></td>}>
                          {close => (
                            <DepartmentPopUp close={close} data={ele} title="Update department" page={currentPage} />
                          )}
                        </Popup>
                        <Popup trigger={<td className='border-2 border-white px-2 py-3 cursor-pointer'><i className="fa-solid fa-trash text-red-600" ></i></td>}>
                          {close => (

                            <DeleteCompanyPopUp close={close} id={ele.id} comapny_id={company().id} message="Are you sure you want to delete department?" page={currentPage} />
                          )}
                        </Popup>
                        <td className='border-2 border-white px-2 py-3'><Link to={`/companies/${company().id}/departments/${ele.id}/employees`}><i className="fa-solid fa-eye"></i></Link></td>
                      </tr>
                    )
                  })
                }
              </tbody>

            </table>

          </div>}
        </div>}
      </div>
    </>
  );
}

export default CompanyDepart;
