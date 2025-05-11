import React from 'react';

const InvoiceDetails = () => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

            {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="flex flex-col items-center">
          <p className="font-medium">Product Image</p>
          <img 
            src="https://www.zdnet.com/a/img/resize/c2e212aaab7bef7c02c0c8e37d64f26e349386e1/2025/01/17/8c7d39ed-e018-4445-b904-abe84e940905/dsc03493.jpg?auto=webp&fit=crop&height=900&width=1200" 
            alt="Product" 
            className="w-40 h-40 object-cover border rounded-md mt-2"
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="font-medium">Invoice</p>
          <img 
            src="https://marketplace.canva.com/EAGCxMXySx4/1/0/1131w/canva-simple-minimalist-business-invoice-aBb_N6_4CUg.jpg" 
            alt="Invoice" 
            className="w-52 h-40 object-cover border rounded-md mt-2"
          />
        </div>
      </div> */}
           <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
    {/* Document Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
            {
                name: 'Photo',
                file: '/assets/images/invoicePdf/photo.pdf',
                preview: '/assets/images/invoicePdf/photo.jpg', // Image preview
            },
            {
                name: 'Invoice',
                file: '/assets/images/invoicePdf/invoice.pdf',
                preview: '/assets/images/invoicePdf/invoice-thumbnail.png', // Thumbnail for PDF
            },
        ].map((doc, index) => (
            <div 
                key={index} 
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center text-center h-72 w-full"
            >
                {/* Check if it's a PDF or Image */}
                {doc.file.endsWith('.pdf') ? (
                    <iframe 
                        src={doc.file} 
                        className="w-full h-44 rounded-md border-none"
                        title={doc.name}
                    ></iframe>
                ) : (
                    <img 
                        src={doc.preview} 
                        alt={doc.name} 
                        className="w-32 h-32 object-cover rounded-md"
                    />
                )}

                <h5 className="text-base font-semibold text-gray-900 dark:text-white mt-3">{doc.name}</h5>
                <a 
                    href={doc.file} 
                    download 
                    className="mt-2 text-blue-500 font-medium hover:underline text-sm"
                >
                    📥 Download
                </a>
            </div>
        ))}
    </div>
</div>



        </div>
    );
};

export default InvoiceDetails;
// file: '/public/assets/images/invoicePdf/photo.pdf',
// file: '/public/assets/images/invoicePdf/invoice.pdf',
