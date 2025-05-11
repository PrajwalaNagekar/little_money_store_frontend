import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
// import QR from '../../../../assets/QR/Loan-Apply.png";
import QR from '../../../../src/assets/QR/Loan-Apply.png';
import QRCodeGenerate from '../../form/QRCodeGenerate';

const MySwal = withReactContent(Swal);

const AddProductDetails = () => {
    const [showQR, setShowQR] = useState(false);
    const dispatch = useDispatch();
    const tenureOptions: string[] = ['3 months', '6 months', '12 months', '24 months'];
    const rowData = [
        { id: 1, Category: 'Mobile', Brand: 'Samsung', Model: 'Galaxy S22' },
        { id: 2, Category: 'Laptop', Brand: 'Apple', Model: 'MacBook Pro M2' },
        { id: 3, Category: 'TV', Brand: 'Sony', Model: 'Bravia XR A95K' },
        { id: 4, Category: 'Tablet', Brand: 'Microsoft', Model: 'Surface Pro 9' },
        { id: 5, Category: 'Smartwatch', Brand: 'Garmin', Model: 'Fenix 7' },
        { id: 6, Category: 'Camera', Brand: 'Canon', Model: 'EOS R5' },
        { id: 7, Category: 'Headphones', Brand: 'Bose', Model: 'QuietComfort Ultra' },
        { id: 8, Category: 'Gaming Console', Brand: 'Sony', Model: 'PlayStation 5' },
        { id: 9, Category: 'Smart Speaker', Brand: 'Amazon', Model: 'Echo Studio' },
        { id: 10, Category: 'Drone', Brand: 'DJI', Model: 'Mavic 3 Pro' },
    ];

    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        model: '',
        loanAmount: '',
        eligibleloanAmount: 15000,
        requireloanAmount: '',
        tenure: '',
        emi: '',
        serialNo: '',
    });

    const [errors, setErrors] = useState({
        category: '',
        brand: '',
        model: '',
        loanAmount: '',
        requireloanAmount: '',
        tenure: '',
        emi: '',
        serialNo: '',
    });

    useEffect(() => {
        dispatch(setPageTitle('Add Product Details'));
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        // Clear error when user starts typing
        setErrors({ ...errors, [id]: '' });
    };

    const handleTenureChange = (selectedTenure: string) => {
        const emiValues: Record<string, number> = {
            '3 months': 12500,
            '6 months': 10852,
            '12 months': 7891,
            '24 months': 5532,
        };

        setFormData({
            ...formData,
            tenure: selectedTenure,
            emi: emiValues[selectedTenure]?.toString() || '',
        });
        setErrors((prev) => ({
            ...prev,
            tenure: '',
        }));
    };

    const showMessage = () => {
        MySwal.fire({
            title: 'Product details added successfully!',
            icon: 'success',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.category) {
            newErrors.category = 'Category is required';
            isValid = false;
        }
        if (!formData.brand) {
            newErrors.brand = 'Brand is required';
            isValid = false;
        }
        if (!formData.model) {
            newErrors.model = 'Model is required';
            isValid = false;
        }
        if (!formData.loanAmount) {
            newErrors.loanAmount = 'Product price is required';
            isValid = false;
        }
        if (!formData.requireloanAmount) {
            newErrors.requireloanAmount = 'Required loan amount is required';
            isValid = false;
        }
        if (Number(formData.requireloanAmount) < 1000) {
            newErrors.requireloanAmount = 'Minimum loan amount required: ₹1000.';
            isValid = false;
        }
        if (Number(formData.requireloanAmount) > formData.eligibleloanAmount) {
            newErrors.requireloanAmount = 'Requested loan amount must not exceed the eligible loan limit.';
            isValid = false;
        }

        if (Number(formData.requireloanAmount) > Number(formData.loanAmount)) {
            newErrors.requireloanAmount = 'Requested loan amount cannot exceed the eligible product amount.';
            isValid = false;
        }
        if (Number(formData.requireloanAmount) > formData.eligibleloanAmount && Number(formData.requireloanAmount) > Number(formData.loanAmount)) {
            newErrors.requireloanAmount = 'Requested loan amount cannot exceed the eligible or available loan limit.';
            isValid = false;
        }
        if (!formData.tenure) {
            newErrors.tenure = 'Tenure is required';
            isValid = false;
        }
        if (!formData.emi) {
            newErrors.emi = 'EMI is required';
            isValid = false;
        }
        if (!formData.serialNo) {
            newErrors.serialNo = 'Serial number is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const requiredloan: number = Number(formData.requireloanAmount);
        const eligibleAmount: number = formData.eligibleloanAmount;
        const loanAmount: number = Number(formData.loanAmount);
        const minAmount: number = 1000;

        if (!validateForm()) {
            return;
        }

        // if (requiredloan > eligibleAmount || requiredloan > loanAmount) {
        //     Swal.fire({
        //         title: 'Requested loan amount cannot exceed the eligible or available loan limit.',
        //         icon: 'error',
        //         toast: true,
        //         position: 'top-right',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         showCloseButton: true,
        //     });
        //     return;
        // }

        // if (requiredloan < minAmount) {
        //     Swal.fire({
        //         title: 'Minimum loan amount required: ₹1000.',
        //         icon: 'error',
        //         toast: true,
        //         position: 'top-right',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         showCloseButton: true,
        //     });
        //     return;
        // }

        showMessage();

        console.log('Submitted Data:', formData);

        setTimeout(() => {
            setShowQR(true);
        }, 2000);
    };

    return (
        <div className='mb-8'>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/merchant/orders" className="text-primary hover:underline">
                        Orders
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Product Details</span>
                </li>
            </ul>

            <div className="min-w-screen">
                <table className="border-collapse border border-gray-300 w-full max-w-md text-left">
                    <tbody>
                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Name</td>
                            <td className="p-2">Amit Sharma</td>
                        </tr>
                        <tr className="border border-gray-300">
                            <td className=" font-semibold">Phone</td>
                            <td className="p-2">+91 8978764327</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-white p-6 rounded-lg shadow-md">

                    <h2 className="text-2xl mb-2">Product Details</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                className={`form-input w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.category}
                                onChange={handleChange}
                            // required
                            >
                                <option value="">--Select Category--</option>
                                {rowData.map((item, index) => (
                                    <option key={index} value={item.Category}>
                                        {item.Category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <span className="text-red-500">{errors.category}</span>}
                        </div>

                        <div>
                            <label htmlFor="brand">Brand</label>
                            <select
                                id="brand"
                                className={`form-input w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.brand}
                                onChange={handleChange}
                            // required
                            >
                                <option value="">--Select Brand--</option>
                                {rowData.map((item, index) => (
                                    <option key={index} value={item.Brand}>
                                        {item.Brand}
                                    </option>
                                ))}
                            </select>
                            {errors.brand && <span className="text-red-500">{errors.brand}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="model">Model</label>
                            <select
                                id="model"
                                className={`form-input w-full border ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.model}
                                onChange={handleChange}
                            // required
                            >
                                <option value="">--Select Model--</option>
                                {rowData.map((item, index) => (
                                    <option key={index} value={item.Model}>
                                        {item.Model}
                                    </option>
                                ))}
                            </select>
                            {errors.model && <span className="text-red-500">{errors.model}</span>}
                        </div>

                        <div>
                            <label htmlFor="loanAmount">Product Price</label>
                            <input
                                type="number"
                                id="loanAmount"
                                value={formData.loanAmount}
                                onChange={handleChange}
                                placeholder="Product Price..."
                                className={`form-input w-full border ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
                            // required
                            />
                            {errors.loanAmount && <span className="text-red-500">{errors.loanAmount}</span>}
                        </div>
                        <div>
                            <label htmlFor="serialNo">Serial Number</label>
                            <input
                                type="number"
                                id="serialNo"
                                value={formData.serialNo}
                                onChange={handleChange}
                                placeholder="Enter Serial Number..."
                                className={`form-input w-full border ${errors.serialNo ? 'border-red-500' : 'border-gray-300'}`}
                            // required
                            />
                            {errors.serialNo && <span className="text-red-500">{errors.serialNo}</span>}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">

                    <h2 className="text-2xl mb-2">Loan details</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="requireloanAmount">
                                Required loan Amount <span className="text-gray-500">( Minimum ₹ 1000 )</span>
                            </label>
                            <input
                                type="number"
                                id="requireloanAmount"
                                name="requireloanAmount"
                                value={formData.requireloanAmount}
                                onChange={handleChange}
                                placeholder="Loan Amount..."
                                className={`form-input w-full border ${errors.requireloanAmount ? 'border-red-500' : 'border-gray-300'}`}
                            // required
                            />
                            {errors.requireloanAmount && <span className="text-red-500">{errors.requireloanAmount}</span>}
                        </div>

                        <div>
                            <label className="text-base mt-8 text-green-500" htmlFor="eligibleloanAmount">
                                Eligible Loan Amount ₹ {formData.eligibleloanAmount}
                            </label>
                            {/* <p className="p-2 bg-gray-200 pl-5 rounded-md">{formData.eligibleloanAmount}</p> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Tenure</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {tenureOptions.map((option, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="tenure"
                                            value={option}
                                            checked={formData.tenure === option}
                                            onChange={() => handleTenureChange(option)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.tenure && <span className="text-red-500">{errors.tenure}</span>}
                            {formData.tenure && <p className="mt-3 text-green-600 font-semibold">Your approx. EMI for the selected tenure is ₹ {formData.emi}</p>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-6 w-full lg:w-auto">
                        Submit
                    </button>
                </div>

            </form>

            <Accordion style={{ border: 'none', marginTop: '1rem' }}>
                {showQR && (
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>Scan to Process</AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <QRCodeGenerate />
                            {/* <div className="flex flex-wrap md:flex-row   flex-col justify-center gap-5 md:gap-28 items-center">
                                <div className="flex justify-center items-center mt-9">
                                    <img src={QR} alt="Loan Apply QR Code" className="w-48 h-48 object-contain" />
                                </div>
                                <div className="text-lg">OR</div>
                                <div>
                                    <div className="flex flex-col items-center space-y-3">
                                        <button onClick={() => navigator.clipboard.writeText('#')} className="flex gap-2 px-4 py-2 rounded-lg border gray-indigo-600 hover:bg-gray-100 transition">
                                            <img height={10} width={20} src="/src/assets/icons/copy.png" alt="Copy" />
                                            Copy Link
                                        </button>
                                        <button onClick={() => navigator.clipboard.writeText('#')} className="flex gap-2 px-4 py-2 rounded-lg border gray-indigo-600 hover:bg-gray-100 transition">
                                            <img height={10} width={20} src="/assets/images/icon/share.png" alt="Share" />
                                            Share Link
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </AccordionItemPanel>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    );
};

export default AddProductDetails;