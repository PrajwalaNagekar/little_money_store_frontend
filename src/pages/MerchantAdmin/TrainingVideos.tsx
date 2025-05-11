import React, { useEffect, useState } from 'react';
import IconSearch from '../../components/Icon/IconSearch';

const TrainingVideos = () => {
    const [search, setSearch] = useState('');
    const [contactList] = useState([
        {
            id: 1,
            youtubelink: 'https://www.youtube.com/embed/AQDiykpGguU',
            title: 'KOTAK',
            description: 'Bring your crazy dreams to Kotak BizLabs',
        },
        {
            id: 2,
            youtubelink: 'https://www.youtube.com/embed/2mVf7LNSSF0',
            title: 'SBI',
            description: '#NicobarIslands: SBI Branch in Nancowry',
        },
        {
            id: 3,
            youtubelink: 'https://www.youtube.com/embed/pr3vdlDkY18',
            title: 'SBI',
            description: 'No matter what your financial goals are, your #BFF is always there to support you.',
        },
        {
            id: 4,
            youtubelink: 'https://www.youtube.com/embed/gZz9sTiye_Y',
            title: 'HDFC Bank',
            description: 'FinanciallyEverAfter | What happens when Finance meets Romance?',
        },
    ]);
    const [filteredItems, setFilteredItems] = useState(contactList);

    useEffect(() => {
        setFilteredItems(contactList.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, contactList]);

    return (
        <div className="container mx-auto p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Training Materials</h2>
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search Videos"
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500">
                        <IconSearch />
                    </button>
                </div>
            </div>

            <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg ">
                {/* <h6 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📄 Download Related Documents</h6> */}

                {/* Document Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: 'Order Process Guide', file: '/documents/order_guide.pdf' },
                        { name: 'Payment Policy', file: '/documents/payment_policy.pdf' },
                        { name: 'Compliance Rules & Regulations', file: '/documents/compliance_rules.pdf' },
                    ].map((doc, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
                            <span className="text-4xl">📄</span>
                            <h5 className="text-lg font-bold text-gray-800 dark:text-white mt-3">{doc.name}</h5>
                            <a href={doc.file} download className="mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                📥 Download PDF
                            </a>
                        </div>
                    ))}
                    {/* */}
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                        <iframe title={video.title} src={video.youtubelink} className="w-full h-56"></iframe>
                        <div className="p-4">
                            <h5 className="text-lg font-bold text-gray-800 dark:text-white">{video.title}</h5>
                            <p className="text-gray-600 dark:text-gray-300">{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingVideos;
