import React, { useState } from 'react'
import AddProductDetails from '../Merchant/Orders/AddProductDetails'

const ViewProductDetails = () => {
  const tenureOptions: string[] = ['3 months', '6 months', '12 months', '24 months'];
  
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
       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
              const { id, value } = e.target;
              setFormData({ ...formData, [id]: value });
              // Clear error when user starts typing
              setErrors({ ...errors, [id]: '' });
          };
  return (
    <div>
      <form className="space-y-4" >
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

                    {/* <button type="submit" className="btn btn-primary mt-6 w-full lg:w-auto">
                        Submit
                    </button> */}
                </div>

            </form>
    </div>
  )
}

export default ViewProductDetails
