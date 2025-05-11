import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import ReactApexChart from 'react-apexcharts';
import { IRootState } from '../../store';

const donutChart: any = {
    series: [44, 55, 13],
    options: {
        chart: {
            height: 300,
            type: 'donut',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            show: false,
        },
        labels: ['Approved', 'Rejected', 'Convected'],
        colors: ['#4361ee', '#805dca', '#e2a03f'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
        legend: {
            position: 'bottom',
        },
    },
};

const Dashboard = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const areaChart: any = {
        series: [
            {
                name: 'Product Sale',
                data: [1, 4, 2, 30, 20, 60, 90, 30, 150, 170, 140, 17],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('MERCHANT'));
    }, [dispatch]);
    return (
        <div>
            <div className="panel h-full">
                <div className="flex items-start border-b  border-white-light dark:border-[#1b2e4b] -m-5 mb-5 p-5">
                    <div className="shrink-0 ring-2 ring-white-light dark:ring-dark rounded-full ltr:mr-4 rtl:ml-4">
                        <img src="/assets/images/profile-1.jpeg" alt="profile1" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <div className="font-semibold">
                        <h6>Store Name</h6>
                        <p className="text-xs text-white-dark mt-1">MRCHANT001</p>
                    </div>
                    <div className="font-semibold ml-auto">
                        <h6>Credit points</h6>
                        <p className="text-xs text-white-dark mt-1">300</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-2">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white">Customers</h5>
                        </div>
                        <div className="mb-5">
                            <ReactApexChart series={donutChart.series} options={donutChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="donut" height={300} />
                        </div>
                    </div>
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white">Orders</h5>
                        </div>
                        <div className="mb-5">
                            <ReactApexChart series={areaChart.series} options={areaChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                        </div>
                    </div>
                </div>
                {/*  Recent Transactions  */}
                <div className="panel">
                    <div className="mb-5 text-lg font-bold">Account Details of Payment</div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                    <th>DATE</th>
                                    <th>NAME</th>
                                    <th>AMOUNT</th>
                                    <th>PAYMENT METHOD</th>
                                    <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">#01</td>
                                    <td className="whitespace-nowrap">Oct 08, 2021</td>
                                    <td className="whitespace-nowrap">Eric Page</td>
                                    <td>1,358.75</td>
                                    <td>UPI</td>
                                    <td className="text-center">
                                        <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">#02</td>
                                    <td className="whitespace-nowrap">Dec 18, 2021</td>
                                    <td className="whitespace-nowrap">Nita Parr</td>
                                    <td>1,042.82</td>
                                    <td>DEBIT CARD</td>
                                    <td className="text-center">
                                        <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">#03</td>
                                    <td className="whitespace-nowrap">Dec 25, 2021</td>
                                    <td className="whitespace-nowrap">Carl Bell</td>
                                    <td>1,828.16</td>
                                    <td>IMFC</td>
                                    <td className="text-center">
                                        <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">#04</td>
                                    <td className="whitespace-nowrap">Nov 29, 2021</td>
                                    <td className="whitespace-nowrap">Dan Hart</td>
                                    <td>1,647.55</td>
                                    <td>UPI</td>
                                    <td className="text-center">
                                        <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">#05</td>
                                    <td className="whitespace-nowrap">Nov 24, 2021</td>
                                    <td className="whitespace-nowrap">Jake Ross</td>
                                    <td>927.43</td>
                                    <td>UPI</td>
                                    <td className="text-center">
                                        <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">#06</td>
                                    <td className="whitespace-nowrap">Jan 26, 2022</td>
                                    <td className="whitespace-nowrap">Anna Bell</td>
                                    <td>250.00</td>
                                    <td>UPI</td>
                                    <td className="text-center">
                                        <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
