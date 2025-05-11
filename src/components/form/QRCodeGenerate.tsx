import React from 'react';
// import QR from '../../../assets/QR/Loan-Apply.png';
import QR from '../../../src/assets/QR/Loan-Apply.png';
import Copy from '../../../src/assets/icons/copy.png';

const QRCodeGenerate: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-wrap md:flex-row flex-col justify-center gap-5 md:gap-28 items-center">
      <div className="flex justify-center items-center mt-9">
        <img src={QR} alt="Loan Apply QR Code" className="w-48 h-48 object-contain" />
      </div>
      <div className="text-lg">OR</div>
      <div>
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={() => copyToClipboard('#')}
            className="flex gap-2 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-100 transition"
          >
            <img height={10} width={20} src={Copy} alt="Copy" />
            Copy Link
          </button>
          <button
            onClick={() => copyToClipboard('#')}
            className="flex gap-2 px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-100 transition"
          >
            <img height={10} width={20} src="/assets/images/icon/share.png" alt="Share" />
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerate;