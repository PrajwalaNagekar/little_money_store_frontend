import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Navigate } from 'react-router-dom';
interface MerchantAdminProtectedProps {
    children: ReactNode;
}
const MerchantAdminProtected: React.FC<MerchantAdminProtectedProps> = ({ children }) => {
    const isAuth = useSelector((state: IRootState) => state.userConfig.auth);
    const userType = useSelector((state: IRootState) => state.userConfig.userType);
    if (isAuth && userType == 'merchantAdmin') {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default MerchantAdminProtected;
