import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL+"/users"

export const login = async (username, password) => {
    try {
        const response = await axios.post(baseURL+'/login', {username, password});
        const loginData = response.data;
        console.log(loginData)
        const base64Credentials = Buffer.from(username+':'+password).toString('base64');
        localStorage.setItem('auth', base64Credentials);
        localStorage.setItem('authorities', loginData.authorities);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('authorities');
}