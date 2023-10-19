import axios from "axios"
const API_URL = '/api/slots/'

export const addSlots = async (slots) => {
    try {
        const response = await axios.post(API_URL, slots)
        console.log(response);
    } catch (error) {
        console.log(error, 'error in posting slots');
    }


}