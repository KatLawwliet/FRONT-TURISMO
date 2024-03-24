import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const credentials = localStorage.getItem('auth');
export const sendPaymentNotification = async (emailData) => {
    await axios.post(baseURL+'/notification/send', emailData,{
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    });
}

