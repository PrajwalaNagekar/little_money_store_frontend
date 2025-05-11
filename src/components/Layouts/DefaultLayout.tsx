import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import Footer from './Footer';
import Header from './Header';
import Setting from './Setting';
import Sidebar from './Sidebar';
import Portals from '../../components/Portals';
import { FaWhatsapp } from 'react-icons/fa';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showLoader, setShowLoader] = useState(true);
    const [showTopButton, setShowTopButton] = useState(false);
    const [support, setSuppopr] = useState(false);

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const onScrollHandler = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    function WhatsappSupport() {
        setSuppopr(!support);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);

        const screenLoader = document.getElementsByClassName('screen_loader');
        if (screenLoader?.length) {
            screenLoader[0].classList.add('animate__fadeOut');
            setTimeout(() => {
                setShowLoader(false);
            }, 200);
        }

        return () => {
            window.removeEventListener('onscroll', onScrollHandler);
        };
    }, []);

    return (
        <App>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                {/* sidebar menu overlay */}
                <div className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 bg-[black]/60 z-50 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>
                {/* screen loader */}
                {showLoader && (
                    <div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
                        <svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#4361ee">
                            <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite" />
                            </path>
                            <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                                <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                )}
                <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
                {support ? (
    <div className="absolute bg-green-600 text-white p-4 rounded-lg w-64 shadow-lg 
                    right-12 bottom-11  flex flex-col items-start">
        {/* Triangle Pointer - Aligned Right */}
        <div className="absolute -right-2 top-14 w-0 h-0 
                        border-l-8 border-l-green-600 
                        border-t-8 border-b-8 border-transparent">
        </div>

        <p className="text-lg font-semibold">WhatsApp Support</p>
        <p className="text-md font-bold">No: <span className="font-medium">+91 9876432118</span></p>
    </div>
) : null}


                    <button
                        type="button"
                        className="border flex items-center gap-2 px-2 py-2 mb-2 rounded-full 
               bg-[#25D366] text-white font-semibold shadow-lg
               hover:bg-[#1DA851] transition-all duration-300 ease-in-out animate-pulse"
                        onClick={WhatsappSupport}
                    >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M12 1.999c-5.523 0-10 4.477-10 10 0 1.736.444 3.377 1.208 4.81L2 22l5.422-1.282C8.872 21.25 10.36 22 12 22c5.523 0 10-4.477 10-10s-4.477-10-10-10Zm-.726 2.024c4.551-.377 8.362 3.362 8.362 7.976 0 4.39-3.582 7.976-7.976 7.976-1.462 0-2.834-.385-4.024-1.067L4 19.051l1.428-3.359c-.872-1.234-1.38-2.765-1.38-4.398 0-4.47 3.856-8.275 8.226-7.271Zm.568 4.562c-.223-.009-.472-.02-.728.187-.256.207-.841.82-1.028 1.15-.187.33-.384.482-.214.854.17.371.64 1.057.77 1.194.129.137.568.783 1.36 1.13.792.348 1.237.453 1.5.38.264-.072.84-.372 1.022-.82.183-.448.213-.828.149-.906-.064-.078-.24-.129-.5-.24s-1.236-.607-1.428-.773c-.193-.166-.365-.349-.272-.551.092-.202.413-.717.557-.94.144-.224.192-.369.028-.54-.165-.172-.522-.601-.717-.763-.195-.163-.398-.201-.62-.211Zm1.573 4.624Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {showTopButton ? (
                        <button type="button" className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary" onClick={goToTop}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                            </svg>
                        </button>
                    ) :
                    <div className='h-8'> </div>
                    }
                </div>

                {/* BEGIN APP SETTING LAUNCHER */}
                <Setting />
                {/* END APP SETTING LAUNCHER */}

                <div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}

                    <div className="main-content flex flex-col min-h-screen">
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <Suspense>
                            <div className={`${themeConfig.animation} p-6 animate__animated`}>{children}</div>
                        </Suspense>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <Footer />
                        {/* END FOOTER */}
                        <Portals />
                    </div>
                </div>
            </div>
            
        </App>
    );
};

export default DefaultLayout;
