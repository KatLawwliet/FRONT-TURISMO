import axios from 'axios';

export const sendPaymentNotification = async (emailData) => {
    await axios.post('https://turismo-back-k5g5kslg2a-rj.a.run.app/notification/send', emailData);
}

