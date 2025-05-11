import React from "react";
import QR from "../../assets/QR/Loan-Apply.png";

const MerchantQR = () => {
    return (
        <>
        <div className="flex justify-center items-center mt-9">
            <img src={QR} alt="Loan Apply QR Code" className="w-48 h-48 object-contain" />
        </div>
        </>
    );
};

export default MerchantQR;
