// Base URL configuration for different environments
const getBaseUrl = () => {
    if (import.meta.env.PROD) {
        // Production - Railway deployment
        return import.meta.env.VITE_API_URL || 'https://your-backend-railway-app.railway.app';
    } else {
        // Development - local server
        return 'https://localhost:7180';
    }
};

const BASE_URL = getBaseUrl();

const API_URLS = {
    cars: `${BASE_URL}/api/Cars`,
    getCarsByCity: `${BASE_URL}/api/Cars/GetCarsByCity`,
    SearchCars: `${BASE_URL}/api/Cars/GetCars`,
    addCar: `${BASE_URL}/api/Cars/AddCar`,
    deleteCar: (id) => `${BASE_URL}/api/Cars/DeleteCarById?id=${id}`,
    updateCar: (id) => `${BASE_URL}/api/Cars/updateCar/${id}`,

    order: `${BASE_URL}/api/Rentals/order`,
    unavailableDates: `${BASE_URL}/api/Rentals/unavailable-dates`,

    pay: `${BASE_URL}/api/Rentals/pay`,
    fetchRentalHistory: (userId) => `${BASE_URL}/api/Rentals/history/${userId}`,
    fetchActiveRentalsToday: `${BASE_URL}/api/Rentals/active-today`,
    fetchCarsAvailability: `${BASE_URL}/api/Rentals/cars-availability`,
};

export default API_URLS;
