const API_URLS = {
    cars: 'https://localhost:7180/api/Cars',
    getCarsByCity: 'https://localhost:7180/api/Cars/GetCarsByCity',
    SearchCars: 'https://localhost:7180/api/Cars/GetCars',
    addCar: 'https://localhost:7180/api/Cars/AddCar',
    deleteCar: (id) => `https://localhost:7180/api/Cars/DeleteCarById?id=${id}`,
    updateCar: (id) => `https://localhost:7180/api/Cars/updateCar/${id}`, // This is correct

    order: 'https://localhost:7180/api/Rentals/order',
    unavailableDates: 'https://localhost:7180/api/Rentals/unavailable-dates',

    pay: 'https://localhost:7180/api/Rentals/pay',
    fetchRentalHistory: (userId) => `https://localhost:7180/api/Rentals/history/${userId}`,
    fetchActiveRentalsToday: 'https://localhost:7180/api/Rentals/active-today',
    fetchCarsAvailability: 'https://localhost:7180/api/Rentals/cars-availability',
    getAllLocations: 'https://localhost:7180/api/Rentals/getAllLocations',
};

export default API_URLS;
