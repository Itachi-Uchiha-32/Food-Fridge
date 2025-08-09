import axios from 'axios';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const {user, logOut} = use(AuthContext)
    axiosInstance.interceptors.request.use(config =>{
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config
    })
    axios.interceptors.response.use(response => {
        return response
    }, error => {
        if(error.status === 401 || error.status === 403){
            logOut().then(() =>{
                console.log('Logout the user for 401')
            }).catch(error =>{
                console.log(error)
            })
            
        }
        return Promise.reject(error)
    })
    return axiosInstance
};

export default useAxiosSecure;