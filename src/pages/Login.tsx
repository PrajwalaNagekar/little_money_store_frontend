import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { setUser } from '../store/userConfigSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from '../components/common/ShowMessage';
import IconPhoneCall from '../components/Icon/IconPhoneCall';
import Logo from '../assets/logo/logo.png'

interface FormValues {
    contactNo: string;
    otp0: string;
    otp1: string;
    otp2: string;
    otp3: string;
}

const Login = () => {
    const [hide, setHide] = useState(true);

    function hidefunction() {
        setHide(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Merchant Login'));
    }, [dispatch]);

    const [countdown, setCountdown] = useState(0);

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleSendOtp = () => {
        setCountdown(30);
        showMessage('OTP sent');
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        formik.handleChange(e);
        if (e.target.value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const key = `otp${index}` as keyof FormValues;
        if (e.key === 'Backspace' && !formik.values[key] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const loginSchema = Yup.object().shape({
        contactNo: Yup.string()
            .required('Contact number is required')
            .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
        otp0: Yup.string().required('Required').length(1, 'Must be 1 character'),
        otp1: Yup.string().required('Required').length(1, 'Must be 1 character'),
        otp2: Yup.string().required('Required').length(1, 'Must be 1 character'),
        otp3: Yup.string().required('Required').length(1, 'Must be 1 character'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            contactNo: '',
            otp0: '',
            otp1: '',
            otp2: '',
            otp3: '',
        },
        validationSchema: loginSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const otp = `${values.otp0}${values.otp1}${values.otp2}${values.otp3}`;

            if (values.contactNo === '9900300011' ) {
                if (otp === '0852') {
                   
                        dispatch(
                            setUser({
                                auth: true,
                                userType: 'merchant',
                            })
                        );
                        showMessage('Logged in successfully');
                        navigate('/merchant/dashboard');
                   
                } else {
                    showMessage('Invalid OTP.', 'error');
                }
            } else {
                showMessage('Invalid contact number.', 'error');
            }
        },
    });

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="background" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="object1" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="object2" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="object3" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="polygon" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="w-36 h-36">
                                <img src={Logo} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Login</h1>

                                <p className="text-base font-bold leading-normal text-white-dark">Enter your contact number and OTP to login</p>
                            </div>

                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                {hide ? (
                                    <div>
                                        <label htmlFor="contactNo">Contact Number</label>
                                        <div className="relative">
                                            <input
                                                id="contactNo"
                                                name="contactNo"
                                                type="text"
                                                placeholder="Enter contact number"
                                                value={formik.values.contactNo}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    if (/^\d*$/.test(value) && value.length <= 10) {
                                                        formik.handleChange(e);
                                                    }
                                                }}
                                                onBlur={formik.handleBlur}
                                                maxLength={10}
                                                style={{ fontSize: '20px', width: '100%', paddingRight: '130px' }}
                                                className="form-input ps-10 placeholder:text-white-dark"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2 pb-16">
                                                <IconPhoneCall fill={true} />
                                            </span>
                                            {/* <br /> */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleSendOtp(), hidefunction();
                                                }}
                                                disabled={!formik.values.contactNo || countdown > 0}
                                                // className="absolute right-0 top-0 h-full px-3 btn btn-success btn-sm"
                                                className="w-full btn-success mt-5 p-3"
                                            >
                                                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Send OTP'}
                                            </button>
                                        </div>

                                        {formik.touched.contactNo && formik.errors.contactNo && <div className="text-danger">{formik.errors.contactNo}</div>}
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label htmlFor="otp">OTP</label>
                                            <div className="flex gap-2 justify-evenly">
                                                {[0, 1, 2, 3].map((index) => {
                                                    const key = `otp${index}` as keyof FormValues;
                                                    return (
                                                        <input
                                                            key={index}
                                                            id={`otp${index}`}
                                                            name={`otp${index}`}
                                                            type="password"
                                                            ref={(el: HTMLInputElement | null) => {
                                                                if (el) {
                                                                    inputRefs.current[index] = el;
                                                                }
                                                            }}
                                                            value={formik.values[key]}
                                                            onChange={(e) => handleChange(e, index)}
                                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                                            maxLength={1}
                                                            className="border rounded p-2 text-center"
                                                            style={{ fontSize: '20px', width: '50px' }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            {(formik.touched.otp0 || formik.touched.otp1 || formik.touched.otp2 || formik.touched.otp3) &&
                                                (formik.errors.otp0 || formik.errors.otp1 || formik.errors.otp2 || formik.errors.otp3) && (
                                                    <div className="text-danger">{(formik.errors.otp0 || formik.errors.otp1 || formik.errors.otp2 || formik.errors.otp3) as string}</div>
                                                )}
                                        </div>

                                        <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                            Login
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
