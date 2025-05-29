
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPageTitle } from "../../store/themeConfigSlice"
import { Link } from "react-router-dom"
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io"
import { IoMdArrowDropdownCircle } from "react-icons/io"
import { IoMdArrowDroprightCircle } from "react-icons/io"
import { Loader2, CheckCircle2, QrCode } from "lucide-react"
import QRCode from "react-qr-code"

// Import your components
import ProductDetailsStatic from "../../components/order_status/ProductDetailsStatic"
import EmiDetails from "../../components/order_status/EmiDetails"
import InvoiceDetails from "../../components/order_status/InvoiceDetails"
import RemarkDetails from "../../components/order_status/RemarkDetails"
import UTRDetails from "../../components/order_status/UTRDetails"
import RejectedRemark from "../../components/order_status/RejectedRemark"
import CompletedStatusEmiDetails from "../../components/order_status/CompletedStatusEmiDetails"
import { fetchAllOrders, updateOrderById, searchOrderByPhoneNumber } from "../../api"

interface AccordionContentProps {
    status: string
    orderId?: string
    qrUrl?: string
    onCompleteOrder?: (orderId: string) => void
    isCompletingOrder?: boolean
}

const AccordionContent = ({ status, orderId, qrUrl, onCompleteOrder, isCompletingOrder }: AccordionContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleExpand = () => setIsExpanded(!isExpanded)

    const handleQRClick = () => {
        // On click, redirect to FatakPay login URL
        window.open("https://web.fatakpay.com/authentication/login?utm_source=556_JQG70&utm_medium=", "_blank")
    }

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            {status === "QR Generated" && (
                <div className="space-y-4">
                    {qrUrl ? (
                        <div className="flex flex-col items-center gap-20">
                            {/* QR Code Section */}
                            <div className="flex flex-col items-center space-y-3 p-4 bg-white rounded-lg border border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-800">Scan QR Code</h4>
                                <div
                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={handleQRClick}
                                    title="Click to open QR"
                                >
                                    <QRCode value={qrUrl} size={150} />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm text-gray-600">Scan with your phone camera</p>
                                    <p className="text-xs text-gray-500">or click QR code to open in browser</p>
                                </div>
                            </div>

                            {/* Buttons Section - centered */}
                            <div className="flex flex-col items-center justify-center space-y-3 w-full max-w-xs">
                                <button
                                    onClick={() => orderId && onCompleteOrder?.(orderId)}
                                    disabled={isCompletingOrder}
                                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isCompletingOrder ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Completing...
                                        </>
                                    ) : (
                                        "Complete Order"
                                    )}
                                </button>

                                <button
                                    onClick={handleQRClick}
                                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <QrCode className="h-4 w-4" />
                                    Open QR Link
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800 text-sm">QR Code not available for this order.</p>
                        </div>
                    )}
                </div>
            )}


            {status === "Completed" && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Order Completed Successfully!</span>
                    </div>
                    {/* <InvoiceDetails /> */}
                    <button className="flex items-center gap-2 text-blue-500 font-semibold" onClick={toggleExpand}>
                        {isExpanded ? (
                            <>
                                <IoMdArrowDropdownCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Hide details
                                </span>
                            </>
                        ) : (
                            <>
                                {/* <IoMdArrowDroprightCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    View more
                                </span> */}
                            </>
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-4 mt-4">
                            <CompletedStatusEmiDetails />
                            <ProductDetailsStatic />
                        </div>
                    )}
                </div>
            )}

            {status === "Processed" && (
                <div className="space-y-4">
                    <EmiDetails />
                    <button className="flex items-center gap-2 text-blue-500 font-semibold" onClick={toggleExpand}>
                        {isExpanded ? (
                            <>
                                <IoMdArrowDropdownCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Hide details
                                </span>
                            </>
                        ) : (
                            <>
                                <IoMdArrowDroprightCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    View more
                                </span>
                            </>
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-4 mt-4">
                            <ProductDetailsStatic />
                        </div>
                    )}
                </div>
            )}

            {status === "On Hold" && (
                <div className="space-y-4">
                    <RemarkDetails />
                    <button className="flex items-center gap-2 text-blue-500 font-semibold" onClick={toggleExpand}>
                        {isExpanded ? (
                            <>
                                <IoMdArrowDropdownCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Hide details
                                </span>
                            </>
                        ) : (
                            <>
                                <IoMdArrowDroprightCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    View more
                                </span>
                            </>
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-4 mt-4">
                            <EmiDetails />
                            <ProductDetailsStatic />
                        </div>
                    )}
                </div>
            )}

            {status === "Settled" && (
                <div className="space-y-4">
                    <UTRDetails />
                    <button className="flex items-center gap-2 text-blue-500 font-semibold" onClick={toggleExpand}>
                        {isExpanded ? (
                            <>
                                <IoMdArrowDropdownCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Hide details
                                </span>
                            </>
                        ) : (
                            <>
                                <IoMdArrowDroprightCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    View more
                                </span>
                            </>
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-4 mt-4">
                            <InvoiceDetails />
                            <EmiDetails />
                            <ProductDetailsStatic />
                        </div>
                    )}
                </div>
            )}

            {status === "Rejected" && (
                <div className="space-y-4">
                    <RejectedRemark />
                    <button className="flex items-center gap-2 text-blue-500 font-semibold" onClick={toggleExpand}>
                        {isExpanded ? (
                            <>
                                <IoMdArrowDropdownCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Hide details
                                </span>
                            </>
                        ) : (
                            <>
                                <IoMdArrowDroprightCircle className="text-2xl" />
                                <span className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    View more
                                </span>
                            </>
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-4 mt-4">
                            <ProductDetailsStatic />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const OrdersDemo = () => {
    const dispatch = useDispatch()
    const [expandedRow, setExpandedRow] = useState<string | null>(null)
    const [orders, setOrders] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [completingOrders, setCompletingOrders] = useState<Set<string>>(new Set())
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setPageTitle("Orders"))
    }, [dispatch])

    const loadAllOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetchAllOrders()
            console.log("🚀 ~ loadOrders ~ response:", response)
            setOrders(response.data.data)
        } catch (err: any) {
            setError("Failed to load orders.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (phoneNumber: string) => {
        console.log("🚀 ~ handleSearch ~ phoneNumber:", phoneNumber)
        setSearchLoading(true)
        setError(null)
        setIsSearchMode(true)

        try {
            const response = await searchOrderByPhoneNumber(phoneNumber)
            console.log("🚀 ~ handleSearch ~ response:", response)
            setOrders(response || [])
        } catch (err: any) {
            console.error("Search error:", err)
            setError(typeof err === "string" ? err : "Failed to search orders.")
            setOrders([])
        } finally {
            setSearchLoading(false)
        }
    }

    const handleClearSearch = () => {
        setSearch("")
        setIsSearchMode(false)
        setError(null)
        loadAllOrders()
    }

    useEffect(() => {
        loadAllOrders()
    }, [])

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim()) {
                handleSearch(search.trim())
            } else {
                // If search is empty, load all orders
                setIsSearchMode(false)
                loadAllOrders()
            }
        }, 500) // 500ms debounce

        return () => clearTimeout(timeoutId)
    }, [search])

    // Clear success message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [successMessage])

    const toggleRow = (rowId: string) => {
        console.log("Toggling row:", rowId, "Current expanded:", expandedRow)
        setExpandedRow(expandedRow === rowId ? null : rowId)
    }

    const handleCompleteOrder = async (orderId: string) => {
        try {
            // Add to completing orders set
            setCompletingOrders((prev) => new Set(prev).add(orderId))

            console.log("Completing order:", orderId)

            // Call API to update order status
            const response = await updateOrderById(orderId)

            if (response.data.success) {
                // Update the local state to reflect the status change
                setOrders((prevOrders) =>
                    prevOrders.map((order) => {
                        const currentOrderId = order.id || order.orderId
                        if (currentOrderId === orderId) {
                            return { ...order, status: "Completed" }
                        }
                        return order
                    }),
                )

                // Show success message
                setSuccessMessage(`Order ${orderId} completed successfully!`)

                console.log("Order completed successfully:", orderId)
            } else {
                throw new Error("Failed to complete order")
            }
        } catch (error: any) {
            console.error("Error completing order:", error)

            // Show error message
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to complete order"
            setError(errorMessage)

            // Clear error after 5 seconds
            setTimeout(() => setError(null), 5000)
        } finally {
            // Remove from completing orders set
            setCompletingOrders((prev) => {
                const newSet = new Set(prev)
                newSet.delete(orderId)
                return newSet
            })
        }
    }

    const getStatusButton = (status: string) => {
        let btnClass = "btn btn-outline-primary btn-sm rounded-full w-full"
        if (status === "Completed") btnClass = "btn btn-outline-success btn-sm rounded-full w-full"
        else if (status === "Rejected") btnClass = "btn btn-outline-danger btn-sm rounded-full w-full"
        else if (status === "On Hold") btnClass = "btn btn-outline-warning btn-sm rounded-full w-full"

        return (
            <button type="button" className={btnClass} disabled={status === "Rejected"}>
                {status}
            </button>
        )
    }

    const formatDateTime = (dateTime: string) => {
        try {
            return new Date(dateTime).toLocaleString()
        } catch {
            return dateTime
        }
    }

    const filteredOrders = orders

    return (
        <div className="mb-8 px-4 sm:px-0">
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="/merchant" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Orders</span>
                </li>
            </ul>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{successMessage}</span>
                </div>
            )}



            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

            {/* Search Section */}
            <div className="mb-4">
                <div className="flex gap-2">
                    <div className="relative w-[600px]">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search by Phone Number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            </div>
                        )}
                        {search && (
                            <button
                                onClick={handleClearSearch}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                {isSearchMode && (
                    <div className="mt-2 text-sm text-gray-600">
                        {searchLoading
                            ? "Searching..."
                            : `Found ${orders.length} order${orders.length !== 1 ? "s" : ""} for "${search}"`}
                    </div>
                )}
            </div>

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading orders...</span>
                </div>
            )}

            {!loading && !error && (
                <>
                    {/* Responsive Table View for All Devices */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg shadow">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">ID</th>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">
                                        Status
                                    </th>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">
                                        Date & Time
                                    </th>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">Name</th>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">
                                        Phone
                                    </th>
                                    <th className="border border-gray-300 p-2 sm:p-3 text-center font-semibold text-xs sm:text-sm">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="border border-gray-300 p-8 text-center text-gray-500">
                                            {isSearchMode ? `No orders found for phone number "${search}"` : "No orders found."}
                                        </td>
                                    </tr>
                                )}
                                {filteredOrders.map((row) => {
                                    const rowId = row.id || row.orderId
                                    const isCompleting = completingOrders.has(rowId)

                                    return (
                                        <React.Fragment key={rowId}>
                                            <tr className="border border-gray-300 hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">
                                                    {row.orderId || row.id}
                                                </td>
                                                <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">
                                                    {getStatusButton(row.status)}
                                                </td>
                                                <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">
                                                    {formatDateTime(row.createdAt)}
                                                </td>
                                                <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">{row.name}</td>
                                                <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">{row.number}</td>
                                                <td className="border border-gray-300 p-2 sm:p-3 text-center">
                                                    <button
                                                        onClick={() => toggleRow(rowId)}
                                                        className="text-xl sm:text-2xl focus:outline-none hover:text-primary transition-colors"
                                                    >
                                                        {expandedRow === rowId ? <IoIosArrowDropdown /> : <IoIosArrowDropright />}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedRow === rowId && (
                                                <tr>
                                                    <td colSpan={6} className="border border-gray-300 p-0">
                                                        <AccordionContent
                                                            status={row.status}
                                                            orderId={rowId}
                                                            qrUrl={row.qrUrl}
                                                            onCompleteOrder={handleCompleteOrder}
                                                            isCompletingOrder={isCompleting}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default OrdersDemo
