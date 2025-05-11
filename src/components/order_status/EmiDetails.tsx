import React, { useState } from 'react';

const EmiDetails = () => {
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [invoiceUploaded, setInvoiceUploaded] = useState(false);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setUploaded: (value: boolean) => void) => {
        if (event.target.files && event.target.files.length > 0) {
            setUploaded(true);
        }
    };
    const emiDetails = {
        productName: 'iPhone 12',
        loanAmount: 60000,
        emiAmount: 10000,
        tenure: '6 months',
        startDate: '01-01-2025',
        endDate: '01-06-2025',
        status: 'Active',
        paymentHistory: [
            { paymentNo: 1, paymentDate: '01-01-2025', amountPaid: 10000, status: 'Paid' },
            { paymentNo: 2, paymentDate: '01-02-2025', amountPaid: 10000, status: 'Pending' },
        ],
    };
    return (

        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* EMI Details Card */}
                <div className="border border-gray-300 rounded-md shadow-lg p-6 pt-16 relative w-full max-w-2xl mt-11">
                    {/* <div className="bg-primary absolute text-white left-6 -top-8 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto">
                    <img className="w-16 h-16 rounded-full overflow-hidden object-cover" src="/assets/images/profile-12.jpeg" alt="Product" />
                </div> */}
                    <h2 className="text-center text-2xl font-semibold mb-4">EMI Details for {emiDetails.productName}</h2>
                    <div className="space-y-3">
                        <p>
                            <strong>Loan Amount:</strong> {emiDetails.loanAmount}
                        </p>
                        <p>
                            <strong>EMI Amount:</strong> {emiDetails.emiAmount}
                        </p>
                        <p>
                            <strong>Tenure:</strong> {emiDetails.tenure}
                        </p>
                        <p>
                            <strong>EMI Start Date:</strong> {emiDetails.startDate}
                        </p>
                        <p>
                            <strong>EMI End Date:</strong> {emiDetails.endDate}
                        </p>
                        <p>
                            <strong>Status:</strong> {emiDetails.status}
                        </p>
                    </div>
                </div>

                {/* Payment History Table */}
                <div className="mt-8 w-full max-w-3xl">
                    <h3 className="text-xl font-semibold mb-4">Payment History</h3>
                    <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Payment No.</th>
                                <th className="py-2 px-4 text-left">Payment Date</th>
                                <th className="py-2 px-4 text-left">Amount Paid</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emiDetails.paymentHistory.map((payment, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2 px-4">{payment.paymentNo}</td>
                                    <td className="py-2 px-4">{payment.paymentDate}</td>
                                    <td className="py-2 px-4">{payment.amountPaid}</td>
                                    <td className="py-2 px-4">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <div className="m-4 p-4 border rounded-md shadow-sm bg-white"> */}
                    <div className="mt-8 w-full max-w-3xl border rounded-md shadow-sm bg-white  p-4 flex  justify-center gap-6 ">
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-gray-700 font-medium text-lg">Upload Photo</h3>
                            <input type="file" id="uploadPhoto" className="hidden" onChange={(e) => handleFileChange(e, setPhotoUploaded)} />
                            <label htmlFor="uploadPhoto" className="btn btn-outline-primary btn-sm rounded-full cursor-pointer w-fit px-4 py-2 text-sm">
                                {photoUploaded ? '✔ Uploaded' : 'Upload'}
                            </label>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-gray-700 font-medium text-lg">Upload Invoice</h3>
                            <input type="file" id="uploadInvoice" className="hidden" onChange={(e) => handleFileChange(e, setInvoiceUploaded)} />
                            <label htmlFor="uploadInvoice" className={`btn btn-outline-primary btn-sm rounded-full cursor-pointer w-fit px-4 py-2 text-sm`}>
                                {invoiceUploaded ? '✔ Uploaded' : 'Upload'}
                            </label>
                        </div>
                    </div>
                </div>
            </div>{' '}
        </div>
    );
};

export default EmiDetails;
