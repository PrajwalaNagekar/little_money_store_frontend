
import axios from 'axios'
const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const api = axios.create({
    baseURL: VITE_BACKEND_LOCALHOST_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const mobileVerify = async (payload: any) => {
    try {
        const res = await api.post('/mobile-verification', payload)
        return res.data;
    } catch (error:any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}

export const verifyOtp=async(payload:any)=>{
    try {
        const res=await api.post('/otp-verify',payload);
        return res.data;
    } catch (error:any) {
         console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}