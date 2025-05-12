using Bl;
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
        [HttpPost("AddCar")]
        public IActionResult AddCar(BlCar car)
        {
            bool success = _blManager.BlCars.AddCar(car);
            return success ? Ok("Registered successfully") : BadRequest("Registration failed");
        }
    }
}
