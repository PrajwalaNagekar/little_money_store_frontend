import React from 'react'

const RejectedRemark = () => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Rejected <span className="text-red-500 text-sm">(Loan not approved!)</span></h3>

            <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-red-600  font-medium">Remarks:</p>
                <p className="text-lg font-bold mt-1">Name mismatch</p>
            </div>
        </div>
  )
}

export default RejectedRemark