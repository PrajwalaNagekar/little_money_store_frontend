import React from 'react'

const ProductDetailsStatic = () => {
  const productDetails={
    Category:"Mobile",
    Brand:"Samsung",
    Model:"Galaxy S22",
    Serial_Number:"7865",
    Product_Price:"45000"
  }
  const LoanDetails={
    requiredLoanAmount:"14000",
    eligibleLoanAmount:"15000",
    tenure:"6 Months"
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border border-gray-300 rounded-md shadow-lg p-6 pt-16 relative w-full max-w-2xl mt-11">
                
                <h2 className="text-center text-2xl font-semibold mb-4">Product  Details</h2>
                <div className="space-y-3">
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