import axios from "axios";

const USER_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const createUserService = async(userData) => {
    try {
        const res = await USER_INSTANCE.post('/register', userData)
        return res.data
    } catch(error){ throw error }

}

export const loginUserService = async (loginData) => {
    try {
        const res = await USER_INSTANCE.post('/login', loginData);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
    }
}