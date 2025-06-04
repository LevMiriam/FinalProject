import axios from 'axios';


const API_URLS = {
    cars: 'https://localhost:7180/api/Cars',
    getCarsByCity: 'https://localhost:7180/api/Cars/GetCarsByCity',

    
   
};
export const getAllCars = async () => {
    const response = await axios.get(API_URLS.cars); 
    return response.data;
};
export const getCarsByCity = async () => {
    const response = await axios.get(API_URLS.cars); 
    return response.data;
};