import axios from 'axios';

export const sendPaymentNotification = async (emailData) => {
    await axios.post('http://localhost:8080/notification/send', emailData);
}

