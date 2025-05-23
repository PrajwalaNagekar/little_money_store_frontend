import React from 'react'
import QRCodeGenerate from '../form/QRCodeGenerate'
import QR from '../../../src/assets/QR/Loan-Apply.png';


const ProductDetailsStatic = () => {
    const productDetails = {
        Category: "Mobile",
        Brand: "Samsung",
        Model: "Galaxy S22",
        Serial_Number: "7865",
        Product_Price: "45000"
    }
    const LoanDetails = {
        requiredLoanAmount: "14000",
        eligibleLoanAmount: "15000",
        tenure: "6 Months"
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-gray-300 rounded-md shadow-lg p-6 pt-16 relative w-full max-w-2xl mt-11">

                <h2 className="text-center text-2xl font-semibold mb-4">Product Details</h2>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Product Info */}
                    <div className="space-y-3 flex-1">
                        <p>
                            <strong>Category:</strong> {productDetails.Category}
                        </p>
                        <p>
                            <strong>Brand:</strong> {productDetails.Brand}
                        </p>
                        <p>
                            <strong>Model:</strong> {productDetails.Model}
                        </p>
                        <p>
                            <strong>Serial Number:</strong> {productDetails.Serial_Number}
                        </p>
                        <p>
                            <strong>Product Price:</strong> {productDetails.Product_Price}
                        </p>
                    </div>

                    {/* QR Code */}
                    <div className="flex-shrink-0">
                        <img
                            src={QR}
                            alt="Loan Apply QR Code"
                            className="w-40 h-40 object-contain mx-auto md:mx-0"
                        />
                    </div>
                </div>

            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow-md "> */}

            <div className="border border-gray-300 rounded-md shadow-lg p-6 pt-16 relative w-full max-w-2xl mt-11">

                <h2 className="text-center text-2xl font-semibold mb-4">Loan Details</h2>
                <div className="space-y-3">
                    <p>
                        <strong>Required loan Amount:</strong> {LoanDetails.requiredLoanAmount}
                    </p>
                    <p>
                        <strong>Eligible loan Amount:</strong> {LoanDetails.eligibleLoanAmount}
                    </p>
                    <p>
                        <strong>Tenure:</strong> {LoanDetails.tenure}
                    </p>

                </div>
            </div>
            {/* </div> */}



        </div>
    )
}

export default ProductDetailsStatic