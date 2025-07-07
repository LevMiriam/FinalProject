using Bl;
using Bl.Models;
using Dal.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CarsController : Controller
    {
        public readonly IBlManager _blManager;
        public CarsController(IBlManager blManager)
        {
            _blManager = blManager;
        }

        [HttpGet]
        public IActionResult GetAllCars()
        {
            return Ok(_blManager.BlCars.GetAllCars());
        }

        [HttpGet("GetCarById")]
        public IActionResult GetCarById(int id)
        {
            return Ok(_blManager.BlCars.GetCarById(id));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("AddCar")]
        public async Task<IActionResult> AddCar([FromForm] CarFormDto carForm)
        {
            bool success = await _blManager.BlCars.AddCarAsync(carForm);
            return success ? Ok("Registered successfully") : BadRequest("Registration failed");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteCarById")]
        public IActionResult DeleteCarById(int id)
        {
            return _blManager.BlCars.DeleteCarById(id)
                ? Ok("The car deleted successfully.")
                : BadRequest("The delete failed.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateCar/{id}")]
        public async Task<IActionResult> UpdateCar(int id, [FromForm] CarFormDto updateCar)
        {
            if (updateCar == null)
                return BadRequest("The updateCar field is required.");

            if (id != updateCar.Id)
                return BadRequest("Car ID mismatch.");

            try
            {
                bool success = await _blManager.BlCars.UpdateCarDetailsAsync(updateCar);
                if (success)
                    return Ok("Car details updated successfully.");

                return NotFound("Car not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("GetCarsByCity")]
        public IActionResult GetCarCountByCity(string city)
        {
            if (string.IsNullOrEmpty(city))
            {
                return BadRequest("City parameter is required.");
            }

            List<BlCar> carCount = _blManager.BlCars.GetCarsByCity(city);

            if (carCount.Count > 0)
            {
                return Ok(carCount); 
            }
            else
            {
                return NotFound("No cars found in the specified city.");
            }
        }

        [HttpGet("GetCars")]
        public IActionResult GetCars(string city = null, string neighborhood = null, int? seats = null, string model = null)
        {
         
            List<CarFormDto> cars = _blManager.BlCars.GetCars(city, neighborhood, seats, model);

            if (cars != null && cars.Count > 0)
            {
                return Ok(cars);
            }
            else
            {
                return NotFound("No cars found with the specified filters.");
            }
        }
    }
}
