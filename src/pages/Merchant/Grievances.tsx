import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const MerchantSupport = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        query: '',
        file: null,
    });

    useEffect(() => {
        dispatch(setPageTitle('Support'));
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target; // Extract id and value
    
        if ((e.target as HTMLInputElement).files) {
            const files = (e.target as HTMLInputElement).files;
            setFormData((prev) => ({
                ...prev,
                [id]: files ? files[0] : value, // Handle file uploads
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: value, // Handle normal inputs & selects
            }));
        }
    };
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.category || !formData.query) {
            alert('Please fill all required fields.');
            return;
        }
        console.log('Form Data:', formData);
        // Add logic to submit the form data (e.g., API call)
    };
    

    return (
        <div className="mb-16">
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant/dashboard" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Support</span>
                </li>
            </ul>
            <div>
                <div className="panel mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Title..."
                                    className="form-input w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="form-select w-full"
                                >
                                    <option value="">Select an option</option>
                                    <option value="order">Order Related</option>
                                    <option value="payment">Payment Related</option>
                                    <option value="compliance">Compliance Related</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className="mb-5">
                            <label htmlFor="query">Query</label>
                            <textarea
                                id="query"
                                value={formData.query}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter Query"
                                className="form-textarea resize-none w-full"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-5 mt-10">
                            <label htmlFor="file" className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                                Upload File
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-green-500 file:text-white
                                   hover:file:bg-green-600
                                   focus:outline-none"
                            />
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Create
                        </button>
                    </form>
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <div className="mb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-[#1c232f] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
                                <div className="flex justify-between mb-5 border-b-2 border-gray-200 dark:border-gray-600">
                                    <h6 className="text-black font-semibold text-base dark:text-white-light">Order Related</h6>
                                    <span className="badge bg-primary/10 text-primary py-1.5 dark:bg-primary dark:text-white">IN PROGRESS</span>
                                </div>
                                <div className="mb-5">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Your order is currently being processed. If you experience any delays, please check your order status in the dashboard. For issues related to incorrect items, missing products, or order cancellations, kindly reach out to our support team. We strive to ensure a smooth and hassle-free shopping experience.
                                    </p>
                                </div>
                                <div className="text-right text-gray-500 dark:text-gray-400">Raised: 24-02-2025, 17:20:00</div>
                            </div>
                            <div className="bg-white dark:bg-[#1c232f] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
                                <div className="flex justify-between mb-5 border-b-2 border-gray-200 dark:border-gray-600">
                                    <h6 className="text-black font-semibold text-base dark:text-white-light">Payment Related</h6>
                                    <span className="badge bg-primary/10 text-primary py-1.5 dark:bg-primary dark:text-white">IN PROGRESS</span>
                                </div>
                                <div className="mb-5">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        If you encounter issues with your payment, such as failed transactions, incorrect charges, or refund delays, please check your payment history in your account. For further assistance, contact our support team with the transaction details. We ensure secure and seamless payment processing for all transactions.
                                    </p>
                                </div>
                                <div className="text-right text-gray-500 dark:text-gray-400">Raised: 24-02-2025, 17:20:00</div>
                            </div>
                            <div className="bg-white dark:bg-[#1c232f] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
                                <div className="flex justify-between mb-5 border-b-2 border-gray-200 dark:border-gray-600">
                                    <h6 className="text-black font-semibold text-base dark:text-white-light">Compliance Related</h6>
                                    <span className="badge bg-success/10 text-success py-1.5 dark:bg-success dark:text-white">RESOLVED</span>
                                </div>
                                <div className="mb-5">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        We adhere to strict regulatory and compliance standards to ensure a safe and transparent experience for our users. If you need help with verification, document submission, or compliance-related concerns, please refer to our guidelines or reach out to our compliance team for support.
                                    </p>
                                </div>
                                <div className="text-right text-gray-500 dark:text-gray-400">Raised: 24-02-2025, 17:20:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantSupport;