import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import { FiBook, FiBox, FiCreditCard, FiDollarSign, FiFileText, FiGift, FiGrid, FiPlusSquare, FiSettings, FiShoppingBag, FiShoppingCart, FiSquare, FiUsers, FiVideo, FiUser } from 'react-icons/fi';
import { MdOutlineLoyalty } from "react-icons/md";
import Logo from '../../assets/logo/logo.png';
import { FaQuestionCircle } from 'react-icons/fa';
// import Logo from 'src/assets/logo/logo.png'
const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const isAuth = useSelector((state: IRootState) => state.userConfig.auth);
    const userType = useSelector((state: IRootState) => state.userConfig.userType);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo  flex items-center shrink-0 justify-center">
                            <img className=" ml-[5px] w-36 flex-none" src={Logo} alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            {isAuth && userType == 'merchant' && (
                                <li className="nav-item">
                                    <ul>
                                        <li className="nav-item">
                                            <NavLink to="/merchant/dashboard" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiGrid className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Dashboard')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/create" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Create Order')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink to="/merchant/create-order-form" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Create Order')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/setcustomer" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiUsers className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Self Applied')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink to="/merchant/orders-management" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiShoppingCart className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Order Management')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/Support" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiBook className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Support')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                            <NavLink to="/merchant/training-videos" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiVideo className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Training Materials')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/reports" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiFileText className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Reports & Payouts')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant/Loyalty" className="group">
                                                <div className="flex items-center gap-2">
                                                    <MdOutlineLoyalty className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Loyalty')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/settings" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiSettings className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Settings')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                        {/* <li className="nav-item">
                                            <NavLink to="/merchant/FAQ" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FaQuestionCircle className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('FAQ')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant/QR" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiSquare className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('QR')}</span>
                                                </div>
                                            </NavLink>
                                        </li> */}
                                    </ul>
                                </li>
                            )}
                            {isAuth && userType == 'merchantAdmin' && (
                                <li className="nav-item">
                                    <ul>
                                        <li className="nav-item">
                                            <NavLink to="/merchant-admin/dashboard" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiGrid className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Dashboard')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant-admin/products" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiBox className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Product Management')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant-admin/branches" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiShoppingBag className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Branches')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant-admin/Support" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiBook className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Support')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/merchant-admin/training-videos" className="group">
                                                <div className="flex items-center gap-2">
                                                    <FiVideo className="group-hover:!text-primary shrink-0" />
                                                    <span>{t('Training Videos')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
