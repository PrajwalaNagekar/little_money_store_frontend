import { Link } from 'react-router-dom';
import DataTableComponent from '../../common/DataTableComponent';
const rowData = [
    { id: 1, name: 'sibarchan', phone: '6372809867', dob: '23-01-2001', pan: 'CHGPKRIOWN', action: true },
    { id: 2, name: 'darshan', phone: '8105055340', dob: '11-01-1999', pan: 'PHGPKUIOWN', action: false },
];
const columns = [
    { accessor: 'id', title: 'ID', sortable: true },
    { accessor: 'name', title: 'NAME', sortable: true },
    { accessor: 'phone', title: 'PHONE', sortable: true },
    { accessor: 'dob', title: 'DOB', sortable: true },
    { accessor: 'pan', title: 'PAN NUMBER', sortable: true },
    {
        accessor: 'action',
        title: 'Actions',
        sortable: false,
        render: ({ id, action }: { id: number; action: boolean }) => (
            <div className="flex items-center ">
                {action ? (
                    <button type="button" className="btn btn-outline-success rounded-full btn-sm">
                        Product Details Not Added
                    </button>
                ) : (
                    <button type="button" className="btn btn-outline-primary btn-sm rounded-full">
                        View Emi Details
                    </button>
                )}
            </div>
        ),
    },
];
const BranchDetails = () => {
    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant-admin/dashboard" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/merchant-admin/branches" className="text-primary hover:underline">
                        Branches
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Details</span>
                </li>
            </ul>
            <div>
                <DataTableComponent data={rowData} columns={columns} createPage="" />
            </div>
        </>
    );
};

export default BranchDetails;
