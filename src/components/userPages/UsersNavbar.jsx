import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import DeleteCompanyPopUp from '../popUpPages/DeleteCompanyPopUp';
function UsersNavbar() {

    return (
        <>
            <div className="relative w-full bg-blue-950 sticky top-0">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <div className="hidden lg:block">
                        <ul className="inline-flex space-x-8">
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="text-sm font-semibold  hover:text-white-900 text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/companies"
                                    className="text-sm font-semibold hover:text-white-900 text-white"
                                >
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/departments"
                                    className="text-sm font-semibold hover:text-white-900 text-white"
                                >
                                    Departments
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/employees"
                                    className="text-sm font-semibold hover:text-white-900 text-white"
                                >
                                    Employees
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Popup trigger={<button
                            type="button"
                            className="rounded-md px-5 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                        >
                            Log Out
                        </button>}>
                            {close => (

                                <DeleteCompanyPopUp close={close}  message="Are you sure you want to logout?" />
                            )}
                        </Popup>
                    </div>

                </div>
            </div>
        </>
    );
}

export default UsersNavbar;
