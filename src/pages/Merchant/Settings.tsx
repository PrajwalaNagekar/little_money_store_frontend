import React from 'react';

const MerchantSettings = () => {
    const transactions = [
        { id: "T_100", points: "+50", category: "Monthly Credit", date: "01/01/2025", by: "Admin" },
        { id: "T_101", points: "+100", category: "Bonus", date: "01/01/2025", by: "Admin" },
        { id: "T_102", points: "-500", category: "Redeemed", date: "01/01/2025", by: "Merchant" },
    ];
    
    return (
        <div>
            
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 text-center w-64 m-10">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Available Points</h3>
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-md">400</button>
                <br />
                <button className="bg-blue-800 rounded-lg p-4 text-white mt-4 cursor-not-allowed hover:opacity-45" disabled>
                    Redeem
                </button>
            </div>
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 text-left max-w-full  m-10">
                <h3>NOTE</h3>
                <p>* Points will be updated 1st of every month.</p>
                <p>* Minimum 500 points required to redeem.</p>
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}

            {/* <div className="p-6 m-10"> */}
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 m-10" >
                <h1 className="text-3xl font-bold ">History</h1>
                {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}

                <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead className="bg-gray-100">
                <tr className="border border-gray-300">
                    <th className="px-4 py-2">TXN ID</th>
                    <th className="px-4 py-2">Points</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">TXN Date</th>
                    <th className="px-4 py-2">TXN By</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((txn) => (
                    <tr key={txn.id} className="border border-gray-300 text-center">
                        <td className="px-4 py-2">{txn.id}</td>
                        <td className={`px-4 py-2 font-bold ${txn.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                            {txn.points}
                        </td>
                        <td className="px-4 py-2">{txn.category}</td>
                        <td className="px-4 py-2">{txn.date}</td>
                        <td className="px-4 py-2">{txn.by}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </div>
        // </div>
    );
};

export default MerchantSettings;
