import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, NavLink } from 'react-router-dom';
import DataTableComponent from '../../components/common/DataTableComponent';
const rowData = [
    
        {
            id: 1,
            name: 'Priya Verma',
            phone: '9876543210',
            'Eligible Price': '15000',
            Category: 'Mobile',
            Brand: 'Samsung',
            Model: 'Galaxy S22',
            Amount: 75000,
            'Loan Amount': 50000,
            Tenure: '12 months',
            action: 'add',
            'Product Price': 60000,
        },
        // {
        //     id: 2,
        //     name: 'Amit Sharma',
        //     phone: '8765432109',
        //     'Eligible Price': '15000',
        //     Category: 'Laptop',
        //     Brand: 'Dell',
        //     Model: 'Inspiron 15',
        //     Amount: 60000,
        //     'Loan Amount': 40000,
        //     Tenure: '24 months',
        //     action: 'add',
        //     'Product Price': 45000,
        // },
        // {
        //     id: 3,
        //     name: 'Rohit Singh',
        //     phone: '7654321098',
        //     'Eligible Price': '15000',
        //     Category: 'TV',
        //     Brand: 'Sony',
        //     Model: 'Bravia 55 inch',
        //     Amount: 85000,
        //     'Loan Amount': 60000,
        //     Tenure: '6 months',
        //     action: 'Rejected',
        //     'Product Price': 70000,
        // },
        // {
        //     id: 4,
        //     name: 'Neha Gupta',
        //     phone: '6543210987',
        //     'Eligible Price': '15000',
        //     Category: 'Gadgets',
        //     Brand: 'Apple',
        //     Model: 'iPad Air',
        //     Amount: 50000,
        //     'Loan Amount': 30000,
        //     Tenure: '3 months',
        //     action: 'emi',
        //     'Product Price': 35000,
        // },
        // {
        //     id: 5,
        //     name: 'Vikram Patil',
        //     phone: '5432109876',
        //     'Eligible Price': '15000',
        //     Category: 'Mobile',
        //     Brand: 'OnePlus',
        //     Model: 'OnePlus 11',
        //     Amount: 58000,
        //     'Loan Amount': 35000,
        //     Tenure: '12 months',
        //     action: 'Rejected',
        //     'Product Price': 43000,
        // },
        // {
        //     id: 6,
        //     name: 'Rajesh Nair',
        //     phone: '4321098765',
        //     'Eligible Price': '15000',
        //     Category: 'Laptop',
        //     Brand: 'HP',
        //     Model: 'Pavilion x360',
        //     Amount: 72000,
        //     'Loan Amount': 50000,
        //     Tenure: '24 months',
        //     action: 'add',
        //     'Product Price': 57000,
        // },
        // {
        //     id: 7,
        //     name: 'Anjali Mehta',
        //     phone: '3210987654',
        //     'Eligible Price': '15000',
        //     Category: 'TV',
        //     Brand: 'LG',
        //     Model: 'OLED 65 inch',
        //     Amount: 120000,
        //     'Loan Amount': 80000,
        //     Tenure: '6 months',
        //     action: 'emi',
        //     'Product Price': 105000,
        // },
    
    // { id: 1, name: 'sibarchan', phone: '6372809867', dob: '23-01-2001', pan: 'CHGPKRIOWN', action: 'add' },
    // { id: 2, name: 'darshan', phone: '8105055340', dob: '11-01-1999', pan: 'PHGPKUIOWN', action: 'emi' },
    // { id: 2, name: 'Asutosh', phone: '7867895437', dob: '11-01-1989', pan: 'PHGPKUIUIN', action: 'rejected' },
];
const columns = [
    { accessor: 'id', title: 'ID', sortable: true },
    { accessor: 'name', title: 'NAME', sortable: true },
    { accessor: 'phone', title: 'PHONE', sortable: true },
    { accessor: 'Eligible Price', title: 'ELIGIBLE PRICE', sortable: true },
    // { accessor: 'Category', title: 'CATEGORY', sortable: true },
    // { accessor: 'Brand', title: 'BRAND', sortable: true },
    // { accessor: 'Model', title: 'MODEL', sortable: true },
    // { accessor: 'Product Price', title: 'PRODUCT PRICE', sortable: true },
    // { accessor: 'Loan Amount', title: 'LOAN AMOUNT', sortable: true },
    // { accessor: 'Tenure', title: 'TENURE', sortable: true },
    // { accessor: 'pan', title: 'PAN NUMBER', sortable: true },
    {
        accessor: 'action',
        title: 'ACTIONS',
        sortable: false,
        render: ({ id, action }: { id: number; action: string }) => (
            <div className="flex items-center ">
                {action == 'add' ? (
                    <NavLink to="/merchant/setcustomer/add-product-details" className="flex hover:text-info">
                        <button type="button" className="btn btn-outline-success rounded-full btn-sm">
                            Add Product Details
                        </button>
                    </NavLink>
                ) : action == 'emi' ? (
                    <NavLink to="/merchant/setcustomer/view-emi-details" className="flex hover:text-info">
                        <button type="button" className="btn btn-outline-primary btn-sm rounded-full">
                            View Emi Details
                        </button>
                    </NavLink>
                ) : (
                    <button type="button" className="btn btn-outline-danger btn-sm rounded-full">
                        Rejected
                    </button>
                )}
            </div>
        ),
    },
];
const SetOrders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Orders'));
    }, [dispatch]);
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Orders</span>
                </li>
            </ul>
            <div>
                <DataTableComponent data={rowData} columns={columns} createPage="/merchant/orders/create" />
            </div>
        </div>
    );
};

export default SetOrders;