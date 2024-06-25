import React from 'react';
import { useDispatch } from 'react-redux';
import { UserLogOut, deleteCompany, deleteDepartmentAPI, deleteDepartmentEmployees } from '../userfeatures/UserSlice';
import { useNavigate } from 'react-router-dom';
import { apiToken } from '../../commonJs/Common';

function DeleteCompanyPopUp(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const companyDelete = (id) => {
        if (id === undefined) {
            dispatch(UserLogOut())
            navigate("/logIn")
        } else {
            if (props.comapny_id === undefined) {
                if (props.employees_id !== undefined) {
                    dispatch(deleteDepartmentEmployees({ employees_id: props.employees_id, department_id: props.department_id, page: props.page ,company_id : props.company_id , companyAllEmployees:props.companyAllEmployees, companies:props.companies}))
                } else {

                    dispatch(deleteCompany({ id: id, token: apiToken(), currentPage: props.currentPage }))
                }
            } else {
                dispatch(deleteDepartmentAPI({ id: id, comapny_id: props.comapny_id, page: props.page, companies: props.companies }))
            }
        }


        props.close()
    }
    return (
        <>
            <div className='text-center'>
                <p>{props.message}</p>
                <div className='flex flex-wrap justify-center gap-1 mt-5'>
                    <button
                        type="submit"
                        className="relative inline-flex  items-center justify-center 
                                                 bg-blue-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:text-black w-1/5"
                        onClick={() => companyDelete(props.id)}
                    >
                        Yes
                    </button>
                    <button
                        type="submit"
                        className="relative inline-flex  items-center justify-center 
                                                 bg-red-700 rounded-md  px-5 py-2 font-semibold text-white transition-all duration-200 hover:bg-red-500 hover:text-black focus:bg-black-100 w-1/5"
                        onClick={() => { props.close() }}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteCompanyPopUp;
