import React, { useEffect } from 'react';
import LoanApplyForm from './LoanApplyForm';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Link } from 'react-router-dom';

const AddCustomer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Add Customer'));
    });
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                {/* <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/merchant/orders" className="text-primary hover:underline">
                        Orders
                    </Link>
                </li> */}
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create</span>
                </li>
            </ul>
            <LoanApplyForm />
        </div>
    );
};

export default AddCustomer;
