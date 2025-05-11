import React from 'react';

const RemarkDetails = () => {
    return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Remark Details</h3>
            
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Remark:</label>
                <p className="text-red-600 font-semibold mt-1">Image is not clear</p>
            </div>

            <div>
                <input type="file" id="reupload" className="hidden" />
                <label 
                    htmlFor="reupload" 
                    className="btn btn-outline-primary btn-sm rounded-full cursor-pointer w-fit px-3 py-1 text-sm"
                >
                    Reupload
                </label>
            </div>
        </div>
    );
};

export default RemarkDetails;
