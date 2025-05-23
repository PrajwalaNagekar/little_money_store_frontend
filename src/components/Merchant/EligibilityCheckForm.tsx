"use client"

import { useState, useRef } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import { sendOtpForEligibilityCheck, verifyOtpForEligibilityCheck } from "../../api"

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

const EligibilityCheckForm = () => {
    const [step, setStep] = useState(1)
    const [formValues, setFormValues] = useState<FormValues>(initialValues)
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otpError, setOtpError] = useState("")
    const [otpSuccess, setOtpSuccess] = useState(false)
    const inputRefs = Array(6)
        .fill(0)
        .map(() => useRef<HTMLInputElement>(null))

    // Mock function to simulate sending OTP
    const sendOtp = async (phoneNumber: string) => {
        console.log(`Sending OTP to ${phoneNumber}`)
        // In a real app, this would be an API call
        return true
    }

    // Mock function to verify OTP
    const verifyOtp = async (otp: string) => {
        console.log(`Verifying OTP: ${otp}`)
        // For demo purposes, any 6-digit code starting with '1' is valid
        return otp.startsWith("1")
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

                // Check if date is valid and not in the future
                return !isNaN(dobDate.getTime()) && dobDate <= today
            }),
        income: Yup.number()
            .typeError("Income must be a number")
            .min(12000, "Income must be at least ₹12,000")
            .required("Income is required"),
    })

    const handlePhoneSubmit = async (values: FormValues) => {
        setFormValues({
            ...formValues,
            mobileNumber: values.mobileNumber,
        })

        // Send OTP
        const otpSent = await sendOtpForEligibilityCheck({ mobileNumber: values.mobileNumber })
        console.log("🚀 ~ handlePhoneSubmit ~ otpSent:", otpSent)
        if (otpSent) {
            setStep(2)
        }
    }

    const handleOtpSubmit = async (values: OtpFormValues) => {
        const otpString = values.otp.join("");
        console.log("🚀 ~ handleOtpSubmit ~ otpString:", otpString);

        // Reset states
        setOtpError("");
        setOtpSuccess(false);

        try {
            const res = await verifyOtpForEligibilityCheck({
                mobileNumber: formValues.mobileNumber,
                otp: otpString,
            });

            if (res.success) {
                setOtpSuccess(true);
                setPhoneVerified(true);

                // Wait a moment to show success message before proceeding
                setTimeout(() => {
                    setStep(3);
                }, 1500);
            } else {
                setOtpError("Invalid OTP. Please try again or go back to change your phone number.");
            }

        } catch (error) {
            console.error("OTP verification failed:", error);
            setOtpError("Invalid OTP. Please try again or go back to change your phone number.");
        }
    };



    const handleFinalSubmit = (values: FormValues) => {
        // Combine all values
        const finalValues = {
            ...values,
            dob: `${values.dob_year}-${values.dob_month.padStart(2, "0")}-${values.dob_day.padStart(2, "0")}`,
        }

        console.log("Final form submission:", finalValues)
        alert("Form submitted successfully!")

        // Reset form
        setStep(1)
        setFormValues(initialValues)
        setPhoneVerified(false)
    }

    return (
        <div className="flex flex-col items-center justify-center m-1 mb-8">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded p-6">
                    <h5 className="text-2xl font-bold mb-6 text-center">
                        {step === 1 && ""}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Complete Eligibility Check"}
                    </h5>

                    {/* Step indicator */}
                    {/* <div className="flex items-center justify-center mb-6">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            1
                        </div>
                        <div className={`h-1 w-12 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            2
                        </div>
                        <div className={`h-1 w-12 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            3
                        </div>
                    </div> */}

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
                                        className="btn btn-info w-full gap-2"                                    >
                                        Send OTP
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <div>
                            <p className="text-center mb-4">
                                We've sent a verification code to <span className="font-semibold">{formValues.mobileNumber}</span>
                            </p>

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
                                                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            value={values.otp[index] || ""}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/\D/g, "")
                                                                if (val.length <= 1) {
                                                                    // Update the value in Formik
                                                                    const newOtp = [...values.otp]
                                                                    newOtp[index] = val
                                                                    setFieldValue("otp", newOtp)

                                                                    // Move to next input if value is entered
                                                                    if (val && index < 5) {
                                                                        inputRefs[index + 1].current?.focus()
                                                                    }
                                                                }
                                                            }}
                                                            onKeyDown={(e) => {
                                                                // Handle backspace
                                                                if (e.key === "Backspace" && !values.otp[index] && index > 0) {
                                                                    inputRefs[index - 1].current?.focus()
                                                                }
                                                            }}
                                                            onPaste={(e) => {
                                                                e.preventDefault()
                                                                const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6)

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

                                            {otpError && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                                                    <AlertCircle className="h-5 w-5 mr-2" />
                                                    <span>{otpError}</span>
                                                </div>
                                            )}

                                            {otpSuccess && (
                                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                                    <span>OTP verified successfully!</span>
                                                </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                                    Back
                                                </button>

                                                <button
                                                    type="submit"
                                                    disabled={values.otp.join("").length !== 6}
                                                    className="btn btn-info w-full gap-2"                                                >
                                                    Verify OTP
                                                </button>
                                            </div>

                                            <p className="text-center text-sm text-gray-500">
                                                Didn't receive the code?{" "}
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        await sendOtp(formValues.mobileNumber)
                                                        alert("New OTP sent!")
                                                    }}
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    Resend OTP
                                                </button>
                                            </p>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    )}

                    {/* Step 3: Complete Profile */}
                    {step === 3 && (
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
                                        <label className="block text-sm font-medium mb-1">First Name</label>
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
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
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
                                            {/* Day */}
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

                                            {/* Month */}
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

                                            {/* Year */}
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

                                    <button
                                        type="submit"
                                        className="btn btn-info w-full gap-2"                                    >
                                        Check Eligibility
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EligibilityCheckForm
