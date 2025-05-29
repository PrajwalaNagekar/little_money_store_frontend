"use client"

import { useState, useRef, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import QRCode from "react-qr-code"
import {
    createOrderForEligible,
    eligibleCheckApi,
    sendOtpForEligibilityCheck,
    verifyOtpForEligibilityCheck,
} from "../../api"

interface FormValues {
    mobileNumber: string
    first_name: string
    last_name: string
    pan: string
    pincode: string
    dob_day: string
    dob_month: string
    dob_year: string
    income: string
}

interface OtpFormValues {
    otp: string[]
}

interface PersistedState {
    step: number
    formValues: FormValues
    phoneVerified: boolean
    eligibilityAmount: number | null
    eligibilityTenure: number | null
    qrUrl: string
    isEligibleCustomer: boolean
}

const initialValues: FormValues = {
    mobileNumber: "",
    first_name: "",
    last_name: "",
    pan: "",
    pincode: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    income: "",
}

const initialOtpValues: OtpFormValues = {
    otp: Array(6).fill(""),
}

const STORAGE_KEY = "eligibility_form_state"

const EligibilityCheckForm = () => {
    const [step, setStep] = useState(1)
    const [formValues, setFormValues] = useState<FormValues>(initialValues)
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otpError, setOtpError] = useState("")
    const [otpSuccess, setOtpSuccess] = useState(false)
    const [eligibilityAmount, setEligibilityAmount] = useState<number | null>(null)
    const [eligibilityTenure, setEligibilityTenure] = useState<number | null>(null)
    const [qrUrl, setQrUrl] = useState<string>("")
    const [eligibilityError, setEligibilityError] = useState("")
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const [isCustomerNotEligible, setIsCustomerNotEligible] = useState(false)
    const [isEligibleCustomer, setIsEligibleCustomer] = useState(false)

    // Loading states
    const [isLoadingOtp, setIsLoadingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)
    const [isResendingOtp, setIsResendingOtp] = useState(false)
    const [isGeneratingQR, setIsGeneratingQR] = useState(false)

    const inputRefs = useRef<(HTMLInputElement | null)[]>([
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]).current

    // Load persisted state on component mount
    useEffect(() => {
        const savedState = localStorage.getItem(STORAGE_KEY)
        if (savedState) {
            try {
                const parsedState: PersistedState = JSON.parse(savedState)
                setStep(parsedState.step)
                setFormValues(parsedState.formValues)
                setPhoneVerified(parsedState.phoneVerified)
                setEligibilityAmount(parsedState.eligibilityAmount)
                setEligibilityTenure(parsedState.eligibilityTenure)
                setQrUrl(parsedState.qrUrl)
                setIsEligibleCustomer(parsedState.isEligibleCustomer || false)

                // If we're on step 4 and have eligibility data, mark as verified
                if (parsedState.step === 4 && parsedState.eligibilityAmount) {
                    setIsOtpVerified(true)
                    setOtpSuccess(true)
                }
            } catch (error) {
                console.error("Error loading saved state:", error)
                localStorage.removeItem(STORAGE_KEY)
            }
        }
    }, [])

    // Save state to localStorage whenever relevant state changes
    useEffect(() => {
        const stateToSave: PersistedState = {
            step,
            formValues,
            phoneVerified,
            eligibilityAmount,
            eligibilityTenure,
            qrUrl,
            isEligibleCustomer,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    }, [step, formValues, phoneVerified, eligibilityAmount, eligibilityTenure, qrUrl, isEligibleCustomer])

    // Clear persisted state and reset all states
    const clearPersistedState = () => {
        localStorage.removeItem(STORAGE_KEY)
        setStep(1)
        setFormValues(initialValues)
        setPhoneVerified(false)
        setQrUrl("")
        setEligibilityAmount(null)
        setEligibilityTenure(null)
        setOtpError("")
        setOtpSuccess(false)
        setEligibilityError("")
        setIsOtpVerified(false)
        setIsCustomerNotEligible(false)
        setIsEligibleCustomer(false)
    }

    // Reset states when starting new application
    const handleNewApplication = () => {
        clearPersistedState()
        setEligibilityAmount(null)
        setOtpSuccess(false)
        setOtpError("")
    }

    const phoneValidationSchema = Yup.object({
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Mobile number is required"),
    })

    const fullFormValidationSchema = Yup.object({
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Mobile number is required"),
        first_name: Yup.string()
            .matches(/^[A-Za-z]+$/, "First name must contain only letters")
            .required("First name is required"),
        last_name: Yup.string()
            .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
            .required("Last name is required"),
        pan: Yup.string()
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format (e.g., ABCDE1234F)")
            .required("PAN is required"),
        pincode: Yup.string()
            .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
            .required("Pincode is required"),
        dob_day: Yup.string().required("Day is required"),
        dob_month: Yup.string().required("Month is required"),
        dob_year: Yup.string()
            .matches(/^[0-9]{4}$/, "Year must be 4 digits")
            .required("Year is required")
            .test("valid-date", "Invalid date of birth", function (value) {
                const { dob_day, dob_month } = this.parent
                if (!dob_day || !dob_month || !value) return true

                const dob = `${value}-${dob_month.padStart(2, "0")}-${dob_day.padStart(2, "0")}`
                const dobDate = new Date(dob)
                const today = new Date()

                return !isNaN(dobDate.getTime()) && dobDate <= today
            }),
        income: Yup.number()
            .typeError("Income must be a number")
            .min(12000, "Income must be at least ₹12,000")
            .required("Income is required"),
    })

    const handlePhoneSubmit = async (values: FormValues) => {
        setIsLoadingOtp(true)
        // Reset states when starting new phone verification
        setOtpError("")
        setOtpSuccess(false)
        setEligibilityAmount(null)
        setIsOtpVerified(false)
        setIsCustomerNotEligible(false)
        setIsEligibleCustomer(false)

        try {
            setFormValues({
                ...formValues,
                mobileNumber: values.mobileNumber,
            })

            const otpSent = await sendOtpForEligibilityCheck({ mobileNumber: values.mobileNumber })
            console.log("🚀 ~ handlePhoneSubmit ~ otpSent:", otpSent)
            if (otpSent) {
                setStep(2)
            }
        } catch (error) {
            console.error("Error sending OTP:", error)
            alert("Failed to send OTP. Please try again.")
        } finally {
            setIsLoadingOtp(false)
        }
    }

    const handleOtpSubmit = async (values: OtpFormValues) => {
        const otpString = values.otp.join("")
        console.log("🚀 ~ handleOtpSubmit ~ otpString:", otpString)

        setIsVerifyingOtp(true)
        setOtpError("")
        setOtpSuccess(false)

        try {
            const res = await verifyOtpForEligibilityCheck({
                mobileNumber: formValues.mobileNumber,
                otp: otpString,
            })

            console.log("🚀 ~ handleOtpSubmit ~ res:", res)

            if (res.success) {
                setOtpSuccess(true)
                setPhoneVerified(true)
                setIsOtpVerified(true)

                if (res.max_eligibility_amount) {
                    setEligibilityAmount(res.max_eligibility_amount)
                    setEligibilityTenure(res.tenure || 12)
                    setIsEligibleCustomer(true)

                    // Generate QR code for eligible customer
                    setIsGeneratingQR(true)
                    try {
                        const order = await createOrderForEligible({ customerId: res.customerId })
                        if (order?.data?.order?.qrUrl) {
                            setQrUrl(order.data.order.qrUrl)
                        }
                    } catch (error) {
                        console.error("Error creating order for eligible customer:", error)
                    } finally {
                        setIsGeneratingQR(false)
                    }
                } else {
                    setTimeout(() => {
                        setStep(3)
                    }, 1500)
                }
            } else {
                if (res.message === "Customer not eligible") {
                    setOtpError(res.message)
                    setIsCustomerNotEligible(true)
                } else if (res.message === "Eligibility expired") {
                    setOtpError(res.message)
                    setTimeout(() => {
                        setStep(3)
                    }, 1500)
                }
            }
        } catch (error: any) {
            const errMsg = error?.response?.data?.message || error?.message || "Something went wrong during OTP verification."
            console.error("OTP verification failed:", errMsg)
            setOtpError(errMsg)
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    const handleFinalSubmit = async (values: FormValues) => {
        setIsCheckingEligibility(true)
        setEligibilityError("")

        const finalValues = {
            ...values,
            dob: `${values.dob_year}-${values.dob_month.padStart(2, "0")}-${values.dob_day.padStart(2, "0")}`,
        }

        console.log("Final form submission:", finalValues)

        try {
            const response = await eligibleCheckApi(finalValues)
            console.log("Eligibility check response:", response.data)

            if (response.data.success) {
                const customerId = response.data.data._id
                const eligibilityData = response.data.data

                // Set eligibility amount and tenure from API response
                if (eligibilityData.max_eligibility_amount) {
                    setEligibilityAmount(eligibilityData.max_eligibility_amount)
                }
                if (eligibilityData.tenure) {
                    setEligibilityTenure(eligibilityData.tenure)
                }

                console.log("🚀 ~ handleFinalSubmit ~ customerId:", customerId)
                const order = await createOrderForEligible({ customerId })
                if (order?.data?.order?.qrUrl) {
                    console.log("QR URL:", order.data.order.qrUrl)
                    setQrUrl(order.data.order.qrUrl)
                }
                setStep(4)
                console.log("🚀 ~ handleFinalSubmit ~ order:", order)
            } else {
                setEligibilityError(response.data.message || "Not eligible.")
                setEligibilityError("You are not eligible. This PAN is already in use.")
            }
        } catch (error: any) {
            console.error("Eligibility API error:", error)

            // Handle specific error cases
            const errorMessage = error?.response?.data?.message || error?.message

            if (errorMessage?.includes("PAN already exists") || errorMessage?.includes("PAN already in use")) {
                setEligibilityError("This PAN card is already registered with another account.")
            } else if (errorMessage?.includes("not eligible")) {
                setEligibilityError("You are not eligible for a loan at this time.")
            } else {
                setEligibilityError("You are not eligible. This PAN is already in use.")
            }
        } finally {
            setIsCheckingEligibility(false)
        }
    }

    const handleResendOtp = async () => {
        setIsResendingOtp(true)
        // Clear previous states when resending
        setOtpError("")
        setOtpSuccess(false)
        setEligibilityAmount(null)
        setIsCustomerNotEligible(false)
        setIsEligibleCustomer(false)

        try {
            await sendOtpForEligibilityCheck({ mobileNumber: formValues.mobileNumber })
            alert("New OTP sent!")
        } catch (error) {
            console.error("Error resending OTP:", error)
            alert("Failed to resend OTP. Please try again.")
        } finally {
            setIsResendingOtp(false)
        }
    }

    const handleProceedToStep4 = () => {
        setStep(4)
    }

    // Full screen loader for step 3
    if (isCheckingEligibility) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
                    <h3 className="text-xl font-semibold text-gray-800">Checking Your Eligibility</h3>
                    <p className="text-gray-600">Please wait while we process your information...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center m-1 mb-8">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded p-6">
                    <h5 className="text-2xl font-bold mb-6 text-center">
                        {step === 1 && "Enter Mobile Number"}
                        {step === 2 && (isEligibleCustomer ? "QR Generated" : "Verify OTP")}
                        {step === 3 && "Complete Eligibility Check"}
                        {step === 4 && "QR Generated"}
                    </h5>

                    {/* Step 1: Phone Number */}
                    {step === 1 && (
                        <Formik
                            initialValues={{ mobileNumber: formValues.mobileNumber }}
                            validationSchema={phoneValidationSchema}
                            onSubmit={handlePhoneSubmit}
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                        <Field name="mobileNumber">
                                            {({ field, form }: any) => (
                                                <input
                                                    {...field}
                                                    maxLength={10}
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    placeholder="Enter 10 digit mobile number"
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, "")
                                                        if (val.length <= 10) {
                                                            form.setFieldValue("mobileNumber", val)
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoadingOtp}
                                        className="btn btn-info w-full gap-2 flex items-center justify-center"
                                    >
                                        {isLoadingOtp ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Sending OTP...
                                            </>
                                        ) : (
                                            "Send OTP"
                                        )}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {/* Step 2: OTP Verification or QR Display for Eligible Customers */}
                    {step === 2 && (
                        <div>
                            <p className="text-center mb-4">
                                We've sent a verification code to <span className="font-semibold">{formValues.mobileNumber}</span>
                            </p>

                            {/* Show OTP form only if customer is not eligible yet */}
                            {!isEligibleCustomer && (
                                <Formik initialValues={initialOtpValues} onSubmit={handleOtpSubmit}>
                                    {({ values, setFieldValue }) => {
                                        return (
                                            <Form className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Enter 6-digit OTP</label>
                                                    <div className="flex justify-between gap-2">
                                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                                            <input
                                                                key={index}
                                                                ref={inputRefs[index]}
                                                                maxLength={1}
                                                                inputMode="numeric"
                                                                pattern="[0-9]*"
                                                                disabled={isVerifyingOtp || isOtpVerified}
                                                                className="w-10 h-10 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                                value={values.otp[index] || ""}
                                                                onChange={(e) => {
                                                                    const val = e.target.value.replace(/\D/g, "")
                                                                    if (val.length <= 1) {
                                                                        const newOtp = [...values.otp]
                                                                        newOtp[index] = val
                                                                        setFieldValue("otp", newOtp)

                                                                        if (val && index < 5) {
                                                                            inputRefs[index + 1].current?.focus()
                                                                        }
                                                                    }
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Backspace" && !values.otp[index] && index > 0) {
                                                                        inputRefs[index - 1].current?.focus()
                                                                    }
                                                                }}
                                                                onPaste={(e) => {
                                                                    e.preventDefault()
                                                                    const pastedData = e.clipboardData
                                                                        .getData("text/plain")
                                                                        .replace(/\D/g, "")
                                                                        .slice(0, 6)

                                                                    if (pastedData) {
                                                                        const newOtp = Array(6).fill("")
                                                                        for (let i = 0; i < pastedData.length; i++) {
                                                                            newOtp[i] = pastedData[i]
                                                                        }
                                                                        setFieldValue("otp", newOtp)
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {otpError && !isCustomerNotEligible && (
                                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                                                        <AlertCircle className="h-5 w-5 mr-2" />
                                                        <span>{otpError}</span>
                                                    </div>
                                                )}

                                                {isCustomerNotEligible && (
                                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                                                        <AlertCircle className="h-5 w-5 mr-2" />
                                                        <span>Customer not eligible</span>
                                                    </div>
                                                )}

                                                {otpSuccess && !isEligibleCustomer && (
                                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                                                        <CheckCircle2 className="h-5 w-5 mr-2" />
                                                        <span>OTP verified successfully!</span>
                                                    </div>
                                                )}

                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={handleNewApplication}
                                                        disabled={isVerifyingOtp}
                                                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                                    >
                                                        <ArrowLeft className="h-4 w-4 mr-1" />
                                                        Back
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            values.otp.join("").length !== 6 ||
                                                            isVerifyingOtp ||
                                                            isOtpVerified ||
                                                            isCustomerNotEligible
                                                        }
                                                        className="btn btn-info w-full gap-2 flex items-center justify-center"
                                                    >
                                                        {isVerifyingOtp ? (
                                                            <>
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                Verifying...
                                                            </>
                                                        ) : (
                                                            "Verify OTP"
                                                        )}
                                                    </button>
                                                </div>

                                                <p className="text-center text-sm text-gray-500">
                                                    Didn't receive the code?{" "}
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        disabled={isResendingOtp || isOtpVerified}
                                                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                                                    >
                                                        {isResendingOtp ? "Resending..." : "Resend OTP"}
                                                    </button>
                                                </p>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            )}

                            {/* Show congratulations and QR for eligible customers */}
                            {isEligibleCustomer && (
                                <div className="space-y-6">
                                    {otpSuccess && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                                            <CheckCircle2 className="h-5 w-5 mr-2" />
                                            <span>OTP verified successfully!</span>
                                        </div>
                                    )}

                                    {eligibilityAmount && (
                                        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg text-center">
                                            <h3 className="text-green-600 font-bold text-2xl py-2">🎉 Congratulations!</h3>
                                            <div className="space-y-2">
                                                <p className="text-gray-700 text-lg">
                                                    You are eligible for a loan of up to{" "}
                                                    <span className="font-semibold text-blue-600">₹{eligibilityAmount.toLocaleString()}</span>
                                                </p>
                                                {eligibilityTenure && (
                                                    <p className="text-gray-700 text-base">
                                                        Loan Tenure:{" "}
                                                        <span className="font-semibold text-green-600">30 days</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {isGeneratingQR ? (
                                        <div className="text-center py-8">
                                            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                                            <p className="text-gray-600">Generating your QR code...</p>
                                        </div>
                                    ) : qrUrl ? (
                                        <div className="text-center space-y-4">
                                            <p className="text-gray-600">Scan the QR code below to proceed with your loan application</p>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                                                    <a
                                                        href="https://web.fatakpay.com/authentication/login?utm_source=556_JQG70&utm_medium="
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <QRCode value={qrUrl} size={150} />
                                                    </a>
                                                </div>
                                                <p className="text-sm text-gray-500">Click on QR code to open the application</p>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleNewApplication}
                                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-1" />
                                            Back
                                        </button>

                                        {/* {qrUrl && (
                                            <button
                                                onClick={handleProceedToStep4}
                                                className="btn btn-info w-full gap-2 flex items-center justify-center"
                                            >
                                                Continue
                                            </button>
                                        )} */}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Complete Profile */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <Formik
                                initialValues={{
                                    ...formValues,
                                    first_name: "",
                                    last_name: "",
                                    pan: "",
                                    pincode: "",
                                    dob_day: "",
                                    dob_month: "",
                                    dob_year: "",
                                    income: "",
                                }}
                                validationSchema={fullFormValidationSchema}
                                onSubmit={handleFinalSubmit}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="space-y-4">
                                        {/* Mobile Number (Non-editable) */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                            <div className="flex items-center">
                                                <input
                                                    value={formValues.mobileNumber}
                                                    readOnly
                                                    disabled
                                                    className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                                                />
                                                <div className="ml-2 text-blue-600">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* First Name */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">First Name(As per PAN)</label>
                                            <Field name="first_name">
                                                {({ field, form }: any) => (
                                                    <input
                                                        {...field}
                                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/[^A-Za-z]/g, "")
                                                            form.setFieldValue("first_name", val)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Last Name(As per PAN)</label>
                                            <Field name="last_name">
                                                {({ field, form }: any) => (
                                                    <input
                                                        {...field}
                                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/[^A-Za-z]/g, "")
                                                            form.setFieldValue("last_name", val)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* PAN Card */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">PAN Card</label>
                                            <Field name="pan">
                                                {({ field, form }: any) => (
                                                    <input
                                                        {...field}
                                                        maxLength={10}
                                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                                        onChange={(e) => {
                                                            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                                                            form.setFieldValue("pan", val)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="pan" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Pincode */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Pincode</label>
                                            <Field name="pincode">
                                                {({ field, form }: any) => (
                                                    <input
                                                        {...field}
                                                        maxLength={6}
                                                        inputMode="numeric"
                                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, "")
                                                            form.setFieldValue("pincode", val)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Date of Birth</label>
                                            <div className="flex gap-2">
                                                <Field
                                                    as="select"
                                                    name="dob_day"
                                                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Day</option>
                                                    {[...Array(31)].map((_, i) => (
                                                        <option key={i + 1} value={String(i + 1)}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </Field>

                                                <Field
                                                    as="select"
                                                    name="dob_month"
                                                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Month</option>
                                                    {[
                                                        { value: "01", label: "January" },
                                                        { value: "02", label: "February" },
                                                        { value: "03", label: "March" },
                                                        { value: "04", label: "April" },
                                                        { value: "05", label: "May" },
                                                        { value: "06", label: "June" },
                                                        { value: "07", label: "July" },
                                                        { value: "08", label: "August" },
                                                        { value: "09", label: "September" },
                                                        { value: "10", label: "October" },
                                                        { value: "11", label: "November" },
                                                        { value: "12", label: "December" },
                                                    ].map((month) => (
                                                        <option key={month.value} value={month.value}>
                                                            {month.label}
                                                        </option>
                                                    ))}
                                                </Field>

                                                <div className="flex-1">
                                                    <Field name="dob_year">
                                                        {({ field, form }: any) => (
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                maxLength={4}
                                                                placeholder="Year"
                                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                onChange={(e) => {
                                                                    const val = e.target.value.replace(/\D/g, "")
                                                                    form.setFieldValue("dob_year", val)
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mt-1">
                                                <ErrorMessage name="dob_day" component="div" className="text-red-500 text-sm" />
                                                <ErrorMessage name="dob_month" component="div" className="text-red-500 text-sm" />
                                                <ErrorMessage name="dob_year" component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>

                                        {/* Monthly Income */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
                                            <Field name="income">
                                                {({ field, form }: any) => (
                                                    <input
                                                        {...field}
                                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        inputMode="numeric"
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/[^0-9]/g, "")
                                                            form.setFieldValue("income", val)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="income" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        {/* Error Message Display */}
                                        {eligibilityError && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                                                <AlertCircle className="h-5 w-5 mr-2" />
                                                <span>{eligibilityError}</span>
                                            </div>
                                        )}

                                        <button type="submit" className="btn btn-info w-full gap-2 flex items-center justify-center">
                                            Check Eligibility
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

                    {/* Step 4: QR Code Display */}
                    {step === 4 && (
                        <div className="text-center space-y-6">
                            <div className="space-y-4">
                                <p className="text-gray-600">Scan the QR code below to proceed with your loan application</p>

                                {/* Enhanced Eligibility Information Display */}
                                {eligibilityAmount && (
                                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg text-center">
                                        <h3 className="text-green-600 font-bold text-2xl py-2">🎉 Congratulations!</h3>
                                        <div className="space-y-2">
                                            <p className="text-gray-700 text-lg">
                                                You are eligible for a loan of up to{" "}
                                                <span className="font-semibold text-blue-600">₹{eligibilityAmount.toLocaleString()}</span>
                                            </p>
                                            {eligibilityTenure && (
                                                <p className="text-gray-700 text-base">
                                                    Loan Tenure: <span className="font-semibold text-green-600">30 days</span>
                                                </p>
                                            )}
                                            {/* <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600">
                                                    <strong>Next Steps:</strong> Scan the QR code below to complete your loan application process
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {qrUrl && (
                                        <div className="flex flex-col items-center gap-4 mt-4">
                                            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                                                <a
                                                    href="https://web.fatakpay.com/authentication/login?utm_source=556_JQG70&utm_medium="
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <QRCode value={qrUrl} size={150} />
                                                </a>
                                            </div>
                                            <p className="text-sm text-gray-500">Click on QR code to open the application</p>
                                        </div>
                                    )}

                                    <button
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={handleNewApplication}
                                    >
                                        Start New Application
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EligibilityCheckForm
