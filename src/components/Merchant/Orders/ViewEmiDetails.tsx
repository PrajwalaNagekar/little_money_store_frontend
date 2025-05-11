import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import EmiDetails from './EmiDetails';
import QR from '../../../assets/QR/Loan-Apply.png';

const ViewEmiDetails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Emi Details'));
    });
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/merchant/orders" className="text-primary hover:underline">
                        Orders
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>View EMI Details</span>
                </li>
            </ul>
            <div className="border border-gray-300 rounded-md p-2">
                <EmiDetails />
                <div className="flex justify-center items-center mt-1">
                    <img src={QR} alt="Loan Apply QR Code" className="w-48 h-48 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default ViewEmiDetails;
