import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import IconSearch from '../../components/Icon/IconSearch';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const Branches = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Branches'));
    });
    const [search, setSearch] = useState<any>('');
    const [addBranchModal, setAddBranchModal] = useState<any>(false);
    const [addCeditsModal, setAddCeditsModal] = useState<any>(false);
    const [contactList] = useState<any>([
        {
            id: 1,
            path: 'profile-35.png',
            shopName: 'Alan Green',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+91 6578987656',
            settled: 25,
            total: '5K',
            onGoing: 500,
        },
        {
            id: 2,
            path: 'profile-35.png',
            shopName: 'Linda Nelson',
            email: 'linda@mail.com',
            location: 'Sydney, Australia',
            phone: '+91 6578987656',
            settled: 25,
            total: '21.5K',
            onGoing: 350,
        },
        {
            id: 3,
            path: 'profile-35.png',
            shopName: 'Lila Perry',
            email: 'lila@mail.com',
            location: 'Miami, USA',
            phone: '+91 6578987656',
            settled: 20,
            total: '21.5K',
            onGoing: 350,
        },
        {
            id: 4,
            path: 'profile-35.png',
            shopName: 'Andy King',
            email: 'andy@mail.com',
            location: 'Tokyo, Japan',
            phone: '+91 6578987656',
            settled: 25,
            total: '21.5K',
            onGoing: 300,
        },
        {
            id: 5,
            path: 'profile-35.png',
            shopName: 'Jesse Cory',
            email: 'jesse@mail.com',
            location: 'Edinburgh, UK',
            phone: '+91 6578987656',
            settled: 30,
            total: '20K',
            onGoing: 350,
        },
        {
            id: 6,
            path: 'profile-35.png',
            shopName: 'Xavier',
            email: 'xavier@mail.com',
            location: 'New York, USA',
            phone: '+91 6578987656',
            settled: 25,
            total: '21.5K',
            onGoing: 350,
        },
        {
            id: 7,
            path: 'profile-35.png',
            shopName: 'Susan',
            email: 'susan@mail.com',
            location: 'Miami, USA',
            phone: '+91 6578987656',
            settled: 40,
            total: '21.5K',
            onGoing: 350,
        },
        {
            id: 8,
            path: 'profile-35.png',
            shopName: 'Raci Lopez',
            email: 'traci@mail.com',
            location: 'Edinburgh, UK',
            phone: '+91 6578987656',
            settled: 25,
            total: '21.5K',
            onGoing: 350,
        },
        {
            id: 9,
            path: 'profile-35.png',
            shopName: 'Steven Mendoza',
            email: 'sokol@verizon.net',
            location: 'Monrovia, US',
            phone: '+91 6578987656',
            settled: 40,
            total: '21.8K',
            onGoing: 300,
        },
        {
            id: 10,
            path: 'profile-35.png',
            shopName: 'James Cantrell',
            email: 'sravani@comcast.net',
            location: 'Michigan, US',
            phone: '+91 6578987656',
            settled: 100,
            total: '28K',
            onGoing: 520,
        },
    ]);
    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    const [defaultParams] = useState({
        id: null,
        shopName: '',
        email: '',
        phone: '',
        // role: '',
        location: '',
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const saveUser = () => {
        if (!params.shopName) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.shopName = params.shopName;
            user.email = params.email;
            user.phone = params.phone;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                shopName: params.shopName,
                email: params.email,
                phone: params.phone,
                location: params.location,
                settled: 20,
                total: '5K',
                onGoing: 500,
            };
            filteredItems.splice(0, 0, user);
        }

        showMessage('User has been saved successfully.');
        setAddBranchModal(false);
    };

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.shopName.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);
    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddBranchModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/merchant-admin/dashboard" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Branches</span>
                </li>
            </ul>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Branches</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                            <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                            Add Branch
                        </button>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Shop Name" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
                {filteredItems.map((contact: any, index: number) => {
                    return (
                        <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={contact.id}>
                            <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                                <div
                                    className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                                    style={{
                                        backgroundImage: `url('/assets/images/notification-bg.png')`,
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <img className="object-contain w-4/5 max-h-40 mx-auto" src={`/assets/images/${contact.path}`} alt="contact_image" />
                                </div>
                                <div className="px-6 pb-24 -mt-10 relative">
                                    <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                        <Link to="details" className="text-xl text-blue-500">
                                            {contact.shopName}
                                        </Link>
                                        <div className="text-white-dark">MERCHANT00{index + 1}</div>
                                        <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                                            <div className="flex-auto">
                                                <div className="text-info">{contact.settled}</div>
                                                <div>Settled</div>
                                            </div>
                                            <div className="flex-auto">
                                                <div className="text-info">{contact.onGoing}</div>
                                                <div>On Going</div>
                                            </div>
                                            <div className="flex-auto">
                                                <div className="text-info">{contact.total}</div>
                                                <div>Total</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                            <div className="truncate text-white-dark">{contact.email}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                            <div className="text-white-dark">{contact.phone}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                                            <div className="text-white-dark">{contact.location}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 py-6 px-1">
                                    <button type="button" className="btn btn-outline-primary w-1/3" onClick={() => editUser(contact)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-danger w-1/3" onClick={() => deleteUser(contact)}>
                                        Delete
                                    </button>
                                    <button type="button" className="btn btn-outline-success w-1/3" onClick={() => setAddCeditsModal(true)}>
                                        Credits
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Transition appear show={addBranchModal} as={Fragment}>
                <Dialog as="div" open={addBranchModal} onClose={() => setAddBranchModal(false)} className="relative z-[51]">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddBranchModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Branch' : 'Add Branch'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="shopName">Shop Name</label>
                                                <input id="shopName" type="text" placeholder="Enter Name" className="form-input" value={params.shopName} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="address">Address</label>
                                                <textarea
                                                    id="location"
                                                    rows={3}
                                                    placeholder="Enter Address"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.location}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddBranchModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={addCeditsModal} as={Fragment}>
                <Dialog as="div" open={addCeditsModal} onClose={() => setAddCeditsModal(false)} className="relative z-[51]">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddCeditsModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">ADD CREDITS</div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="credits">Credits</label>
                                                <input id="credits" type="number" placeholder="Enter Credits..." className="form-input" />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="multiple">Multiple</label>
                                                <input id="multiple" type="number" placeholder="Enter Multiple Value..." className="form-input" />
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddCeditsModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setAddCeditsModal(false)}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Branches;
