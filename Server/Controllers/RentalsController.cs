using Bl;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        public readonly IBlManager _blManager;
        public RentalsController(IBlManager blManager)
        {
            _blManager = blManager;
        }
        [HttpPost]
        public IActionResult CreateRentalOrder([FromBody] BlRentalToAdd rentalOrder)
        {
            if (rentalOrder == null)
            {
                return BadRequest("Invalid rental order.");
            }

            if (_blManager == null)
            {
                return StatusCode(500, "Internal server error: _blManager is null.");
            }

            if (_blManager.BlRental == null)
            {
                return StatusCode(500, "Internal server error: BlRental is null.");
            }

            decimal rentalPrice = _blManager.BlRental.CalculateRentalPrice(rentalOrder);

            if (rentalPrice > 0)
            {
                return Ok(new { message = "Rental order created successfully.", price = rentalPrice });
            }
            else
            {
                return BadRequest("Failed to create rental order.");
            }
        }
    }
}
