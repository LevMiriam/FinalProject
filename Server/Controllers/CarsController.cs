using Bl;
using Bl.Models;
using Dal.models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpPost("AddCar")]
        public IActionResult AddCar(BlCarToAdd car)
        {
            bool success = _blManager.BlCars.AddCar(car);
            return success ? Ok("Registered successfully") : BadRequest("Registration failed");
        }

        [HttpDelete("DeleteCarById")]
        public IActionResult DeleteCarById(int id)
        {
            return _blManager.BlCars.DeleteCarById(id)
                ? Ok("The car deleted successfully.")
                : BadRequest("The delete failed.");
        }

        [HttpPut("updateCar/{id}")]
        public IActionResult UpdateCar(int id, [FromBody] BlCarToAdd updateCar)
        {
            if (updateCar == null)
            {
                return BadRequest("The updateCar field is required.");
            }

            if (id != updateCar.Id)
            {
                return BadRequest("Car ID mismatch.");
            }

            try
            {
                bool success = _blManager.BlCars.UpdateCarDetails(updateCar);
                if (success)
                {
                    return Ok("Car details updated successfully.");
                }

                return NotFound("Car not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
