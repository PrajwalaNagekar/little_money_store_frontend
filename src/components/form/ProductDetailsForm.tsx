import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface FormData {
    category: string;
    brand: string;
    model: string;
    loanAmount: number;
    eligibleloanAmount: number;
    requireloanAmount: number;
    tenure: string;
    emi: string;
    serialNo: string;
}

interface Errors {
    category: string;
    brand: string;
    model: string;
    loanAmount: string;
    requireloanAmount: string;
    tenure: string;
    emi: string;
    serialNo: string;
}
interface ChildComponentProps {
    func: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductDetailsForm: React.FC<ChildComponentProps> = ({ func }) => {
    const [formData, setFormData] = useState<FormData>({
        category: '',
        brand: '',
        model: '',
        loanAmount: 0,
        eligibleloanAmount: 15000,
        requireloanAmount: 15000,
        tenure: '',
        emi: '',
        serialNo: '',
    });

    const [errors, setErrors] = useState<Errors>({
        category: '',
        brand: '',
        model: '',
        loanAmount: '',
        requireloanAmount: '',
        tenure: '',
        emi: '',
        serialNo: '',
    });

    const tenureOptions: Record<string, number> = {
        '3 months': 12500,
        '6 months': 10852,
        '12 months': 7891,
        '24 months': 5532,
    };

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        const newValue = Number(value);

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));

        let newErrors = { ...errors };

        // Validate Product Price (loanAmount)
        if (id === "loanAmount") {
            if (!value || newValue <= 0) {
                newErrors.loanAmount = "Product price is required and must be greater than 0.";
            } else {
                newErrors.loanAmount = "";
            }
        }

        // Validate Required Loan Amount (requireloanAmount)
        if (id === "requireloanAmount") {
            if (!value) {
                newErrors.requireloanAmount = "Required loan amount is mandatory.";
            } else if (newValue < 1000) {
                newErrors.requireloanAmount = "Required loan amount must be at least ₹1000.";
            } else if (formData.loanAmount && newValue > Number(formData.loanAmount)) {
                newErrors.requireloanAmount = "Required loan amount should be less than product price.";
            } else if (formData.eligibleloanAmount && newValue > Number(formData.eligibleloanAmount)) {
                newErrors.requireloanAmount = "Required loan amount must not be greater than the eligible loan amount.";
            } else {
                newErrors.requireloanAmount = "";
            }
        }

        setErrors(newErrors);
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



    const handleFormSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors: Errors = {
            category: "", // Default empty string to match the expected structure
            brand: "",
            model: "",
            tenure: "",
            emi: "",
            serialNo: "",
            loanAmount:
                formData.loanAmount && Number(formData.loanAmount) > 0
                    ? ""
                    : "Product price is required and must be greater than 0.",
            requireloanAmount:
                formData.requireloanAmount && Number(formData.requireloanAmount) >= 1000
                    ? formData.loanAmount && Number(formData.requireloanAmount) > Number(formData.loanAmount)
                        ? "Required loan amount should be less than product price."
                        : formData.eligibleloanAmount && Number(formData.requireloanAmount) > Number(formData.eligibleloanAmount)
                            ? "Required loan amount must not be greater than the eligible loan amount."
                            : ""
                    : "Required loan amount is mandatory and must be at least ₹1000.",
        };

        // Prevent form submission if there are any errors
        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return; // Stop form submission
        }

        setErrors({
            category: "",  // Include all expected fields
            brand: "",
            model: "",
            tenure: "",
            emi: "",
            serialNo: "",
            loanAmount: "",
            requireloanAmount: "",
        });
        

        Swal.fire({
            title: "Product details added successfully!",
            icon: "success",
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });

        console.log("Submitted Data:", formData);
        func(true);
    };


    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h3>

            <form className="space-y-4" onSubmit={handleFormSubmission}>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">--Select Category--</option>
                            {rowData.map((item) => (
                                <option key={item.id} value={item.Category}>
                                    {item.Category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                            Brand
                        </label>
                        <select id="brand" className={`mt-1 block w-full p-2 border rounded-md ${errors.brand ? 'border-red-500' : 'border-gray-300'}`} value={formData.brand} onChange={handleChange}>
                            <option value="">--Select Brand--</option>
                            {rowData.map((item) => (
                                <option key={item.id} value={item.Brand}>
                                    {item.Brand}
                                </option>
                            ))}
                        </select>
                        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                            Model
                        </label>
                        <select id="model" className={`mt-1 block w-full p-2 border rounded-md ${errors.model ? 'border-red-500' : 'border-gray-300'}`} value={formData.model} onChange={handleChange}>
                            <option value="">--Select Model--</option>
                            {rowData.map((item) => (
                                <option key={item.id} value={item.Model}>
                                    {item.Model}
                                </option>
                            ))}
                        </select>
                        {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="serialNo" className="block text-sm font-medium text-gray-700">
                                Serial Number
                            </label>
                            <input
                                type="number"
                                id="serialNo"
                                value={formData.serialNo}
                                onChange={handleChange}
                                placeholder="Serial Number..."
                                className={`mt-1 block w-full p-2 border rounded-md ${errors.serialNo ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.serialNo && <p className="text-red-500 text-sm mt-1">{errors.serialNo}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
                            Product Price
                        </label>
                        <input
                            type="number"
                            id="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            placeholder="Product Price..."
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
                    </div>
                </div>


                <h2 className="text-2xl">Loan Details</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Required Loan Amount */}
                    <div>
                        <label htmlFor="requireloanAmount" className="block text-sm font-medium text-gray-700">
                            Required Loan Amount <span className="text-gray-500">(Minimum ₹1000)</span>
                        </label>
                        <input
                            type="number"
                            id="requireloanAmount"
                            value={formData.requireloanAmount}
                            onChange={handleChange}
                            placeholder="Loan Amount..."
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.requireloanAmount ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.requireloanAmount && <p className="text-red-500 text-sm mt-1">{errors.requireloanAmount}</p>}
                    </div>

                    {/* Eligible Loan Amount */}
                    <div>
                        <label className="text-base mt-8 text-green-500" htmlFor="eligibleloanAmount">
                            Eligible Loan Amount ₹ {formData.eligibleloanAmount}
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tenure</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {Object.keys(tenureOptions).map((option) => (
                            <label key={option} className="flex items-center space-x-2">
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
                    {errors.tenure && <p className="text-red-500 text-sm mt-1">{errors.tenure}</p>}
                    {formData.tenure && <p className="mt-3 text-green-600 font-semibold">Your approx. EMI for the selected tenure is ₹ {formData.emi}</p>}
                </div>

                <button type="submit" className="w-full lg:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductDetailsForm;
