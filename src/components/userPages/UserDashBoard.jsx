import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../userfeatures/UserSlice';
import UsersNavbar from '../userPages/UsersNavbar';
import { apiToken } from '../../commonJs/Common';
import Spinner from '../spinner/Spinner';

function UserDashBoard() {
    const {Users, loading } = useSelector(state => state.Users)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUsers(apiToken()))
    }, [])
    return (
        <>
        <UsersNavbar />
            {(loading) ? <Spinner loading={loading}/> : <div> 
                <div>
                    <div className="relative w-full  sticky top-0">
                        <div className=" px-4 py-4 sm:px-6 lg:px-8 text-left text-black">
                            <p className="font-bold text-3xl">Welcome {Users.first_name}</p>
                        </div>
                    </div>
                </div></div>}



        </>
    );

}

export default UserDashBoard;
