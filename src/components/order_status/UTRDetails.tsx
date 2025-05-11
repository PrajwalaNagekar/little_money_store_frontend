import React from 'react';

const UTRDetails = () => {
    return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">UTR Status</h3>

            <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-gray-600 font-medium">UTR Number:</p>
                <p className="text-lg font-bold text-blue-600 mt-1">UTR123456789012</p>
            </div>
        </div>
    );
};

export default UTRDetails;
