import { lazy } from 'react';
import MerchantDashboard from '../pages/Merchant/Dashboard';
import MerchantOrders from '../pages/Merchant/Orders';
import MerchantSetOrders from '../pages/Merchant/setOrder';
import Products from '../pages/MerchantAdmin/Products';
import MerchantReports from '../pages/Merchant/Reports';
import MerchantSettings from '../pages/Merchant/Settings';
import MerchantSignUp from '../pages/Merchant/SignUp';
import Login from '../pages/Login';
import MerchantProtected from '../components/Protected/MerchantProtected';
import MerchantQR from '../pages/Merchant/MerchantQR';
import AddCustomer from '../components/Merchant/Orders/AddCustomer';
import AddProductDetails from '../components/Merchant/Orders/AddProductDetails';
import ViewEmiDetails from '../components/Merchant/Orders/ViewEmiDetails';
import MerchantAdminProtected from '../components/Protected/MerchantAdminProtected';
import Branches from '../pages/MerchantAdmin/Branches';
import BranchDetails from '../components/MerchantAdmin/Branches/BranchDetails';
import TrainingVideos from '../pages/MerchantAdmin/TrainingVideos';
import Grievances from '../pages/MerchantAdmin/Grievances';
import MerchantGrievances from '../pages/Merchant/Grievances';
import SeltEnteredCustomer from '../components/Merchant/Orders/SeltEnteredCustomer';
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    //Merchant Pages
    {
        path: '/merchant/signup',
        element: <MerchantSignUp />,
        layout: 'blank',
    },
    {
        path: '/',
        element: (
            <MerchantProtected>
                <MerchantDashboard />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/dashboard',
        element: (
            <MerchantProtected>
                <MerchantDashboard />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/setcustomer',
        element: (
            <MerchantProtected>
                <MerchantSetOrders />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/orders',
        element: (
            <MerchantProtected>
                <MerchantOrders />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/create',
        element: (
            <MerchantProtected>
                <AddCustomer />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/setcustomer/add-product-details',
        element: (
            <MerchantProtected>
                <AddProductDetails />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/setcustomer/view-emi-details',
        element: (
            <MerchantProtected>
                <ViewEmiDetails />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/orders/add-product-details',
        element: (
            <MerchantProtected>
                <AddProductDetails />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/orders/view-emi-details',
        element: (
            <MerchantProtected>
                <ViewEmiDetails />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/Support',
        element: (
            <MerchantProtected>
                <MerchantGrievances />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/grievances',
        element: (
            <MerchantProtected>
                <MerchantGrievances />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/training-videos',
        element: (
            <MerchantProtected>
                <TrainingVideos />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/reports',
        element: (
            <MerchantProtected>
                <MerchantReports />
            </MerchantProtected>
        ),
    },
    
    {
        path: '/merchant/Loyalty',
        element: (
            <MerchantProtected>
                <MerchantSettings />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/settings',
        element: (
            <MerchantProtected>
                <MerchantSettings />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/FAQ',
        element: (
            <MerchantProtected>
                <MerchantSettings />
            </MerchantProtected>
        ),
    },
    {
        path: '/merchant/QR',
        element: (
            <MerchantProtected>
                <MerchantQR />
            </MerchantProtected>
        ),
    },
    // merchant admin
    {
        path: '/merchant-admin/dashboard',
        element: (
            <MerchantAdminProtected>
                <div>Dashboard</div>
            </MerchantAdminProtected>
        ),
    },
    {
        path: '/merchant-admin/products',
        element: (
            <MerchantAdminProtected>
                <Products />
            </MerchantAdminProtected>
        ),
    },
    {
        path: '/merchant-admin/branches',
        element: (
            <MerchantAdminProtected>
                <Branches />
            </MerchantAdminProtected>
        ),
    },
    {
        path: '/merchant-admin/branches/details',
        element: (
            <MerchantAdminProtected>
                <BranchDetails />
            </MerchantAdminProtected>
        ),
    },
    {
        path: '/merchant-admin/grievances',
        element: (
            <MerchantAdminProtected>
                <Grievances />
            </MerchantAdminProtected>
        ),
    },
    {
        path: '/merchant-admin/training-videos',
        element: (
            <MerchantAdminProtected>
                <TrainingVideos />
            </MerchantAdminProtected>
        ),
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //customer apply for loan
    // {
    //     path: '/customer/apply/loan',
    //     element: <LoanApplyForm />,
    //     layout: 'blank',
    // },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];
// change demo
export { routes };
