import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
export const sendPaymentNotification = async (emailData) => {
    await axios.post(baseURL+'/notification/send', emailData);
}

