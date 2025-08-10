import axios from "axios"

export const myItems = async(email, accessToken) => {
    const response = await axios.get(`https://b11a11-server-side-itachi-uchiha-32.vercel.app/foods?email=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    return response.data; 
}