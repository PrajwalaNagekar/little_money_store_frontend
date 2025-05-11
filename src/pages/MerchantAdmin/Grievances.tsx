import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
const rowData = [
    { id: 1, customerName: 'sibarchan', phone: '6372809867', message: 'Details...', action: true },
    { id: 2, customerName: 'darshan', phone: '8105055340', message: 'Details...', action: false },
];
const columns = [
    { accessor: 'id', title: 'ID', sortable: true },
    { accessor: 'customerName', title: 'CUSTOMER NAME', sortable: true },
    { accessor: 'phone', title: 'PHONE', sortable: true },
    { accessor: 'message', title: 'Message', sortable: true },
];
const Support = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Support'));
    });
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant-admin/dashboard" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Support</span>
                </li>
            </ul>
            <div>
                <DataTableComponent data={rowData} columns={columns} createPage="" />
            </div>
        </div>
    );
};

export default Support;
