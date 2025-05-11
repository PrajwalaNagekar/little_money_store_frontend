import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconSend from '../../Icon/IconSend';
import Right from '../../../../src/assets/right.jpg';
import Logo from '../../../assets/logo/logo.png';
// import Swal from 'sweetalert2';
// import LoanEligibility from '../../../assets/LoanEligibility.gif';
// import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// import { Input, Select } from '@mantine/core';
// import QR from '../../../assets/QR/Loan-Apply.png';
// import { FaBoxOpen, FaPlus } from 'react-icons/fa';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import QRCodeGenerate from '../../form/QRCodeGenerate';
import ProductDetailsForm from '../../form/ProductDetailsForm';

const LoanApplyForm = () => {
    const [btnColor, setBtnColor] = useState('rgb(33 150 243)');
    const [btn1, setBtn1] = useState('Check Eligibility');
    const [icon1, setIcon1] = useState(<IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" />);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showValue, setShowValue] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [details, setDetails] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Loan Request'));
    }, [dispatch]);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
            setBtnColor('green');
            setBtn1('Eligible');
            setIcon1(<img src={Right} alt="Right" className="w-5 h-5" />);
            setTimeout(() => {
                setShowValue(true);
                setShowForm(true);
            }, 1000);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center m-1 mb-8">
            <div className="xl:w-96 w-full justify-center content-center">
                <div className="panel mb-5">
                    <div className="flex items-center justify-center my-4 text-black dark:text-white shrink-0">{/* <img src={Logo} className="w-20" alt="Logo" /> */}</div>
                    <label htmlFor="reciever-name">Name (as per PAN)</label>
                    <input id="reciever-name" type="text" className="form-input flex-1 mb-2" placeholder="Enter Name" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" type="number" className="form-input flex-1" placeholder="Enter Phone number" onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        <button type="submit" className="btn btn-info w-full gap-2" style={{ backgroundColor: btnColor }} onClick={handleClick} disabled={loading}>
                            {loading ? <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span> : icon1}
                            {btn1}
                        </button>
                    </div>
                </div>
                {showSuccess && (
                    <div className="mt-6 p-6 bg-white shadow-lg shadow-indigo-500/50 rounded-lg text-center">
                        <h3 className="text-green-600 font-bold text-2xl py-2">Congratulations! </h3>
                        <p className="text-gray-700 text-lg">
                            You are eligible for a loan of up to <span className="font-semibold text-blue-600">₹15,000</span>.
                        </p>
                    </div>
                )}
            </div>
            <div className="m-4 w-full">
                <Accordion style={{ border: 'none' }}>
                    {showValue && (
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>Product Details</AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel style={{ padding: '0' }}>
                                {/* <div className="m-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-md"> */}
                                    <div className="p-6 bg-white rounded-lg shadow-md">

                                    <p className="mb-3 text-xl font-semibold text-gray-800">
                                        <span className="text-gray-600 font-medium">Name:</span>
                                        <span className="text-blue-600 font-medium"> {details.name} </span>
                                    </p>
                                    <p className="mb-3 text-xl font-semibold text-gray-800">
                                        <span className="text-gray-600 font-medium">Phone Number:</span>
                                        <span className="text-blue-600 font-medium"> {details.phone} </span>
                                    </p>
                                    <p className="text-xl font-semibold text-gray-800">
                                        <span className="text-gray-600 font-medium">Eligibility:</span>
                                        <span className="text-green-500 font-bold"> ₹15,000 </span>
                                    </p>
                        
                                    {/* </div> */}
                                </div>
                                
                                {/* ==================form  */}
                                <ProductDetailsForm func={setShowQR} />
                            </AccordionItemPanel>
                        </AccordionItem>
                    )}

                    {showQR && (
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>Scan to Process</AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                {/* ===========qr */}
                                <QRCodeGenerate />
                            </AccordionItemPanel>
                        </AccordionItem>
                    )}
                </Accordion>
            </div>
        </div>
    );
};

export default LoanApplyForm;
