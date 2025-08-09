import axios from "axios"

export const myItems = async(email, accessToken) => {
    const response = await axios.get(`http://localhost:3000/foods?email=${email}`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    return response.data; 
}