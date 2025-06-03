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

        [HttpPost("order")]
        public async Task<IActionResult> CreateRentalOrder([FromBody] BlRentalToAdd rentalOrder)
        {
            if (rentalOrder == null)
                return BadRequest("Invalid rental order.");

            if (_blManager == null || _blManager.BlRental == null)
                return StatusCode(500, "Internal server error: BL is null.");

            // Prevent ordering for past dates
            if (rentalOrder.RentalDate < DateOnly.FromDateTime(DateTime.Today))
                return BadRequest("Cannot order for a past date.");

            try
            {
                bool result = await _blManager.BlRental.CreateRentalOrderAsync(rentalOrder);

                if (result)
                    return Ok(new { message = "Rental order created successfully." });
                else
                    return BadRequest("Failed to create rental order.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("calculate-price")]
        public async Task<IActionResult> CalculateRentalPrice([FromBody] BlRentalToAdd rentalOrder)
        {
            if (rentalOrder == null)
                return BadRequest("Invalid rental order.");

            if (_blManager == null || _blManager.BlRental == null)
                return StatusCode(500, "Internal server error: BL is null.");

            var rentalPrice = await _blManager.BlRental.CalculateRentalPriceAsync(rentalOrder);

            if (rentalPrice > 0)
                return Ok(new { price = rentalPrice });
            else
                return BadRequest("Failed to calculate rental price.");
        }

        [HttpGet("unavailable-dates")]
        public async Task<IActionResult> GetUnavailableDates(int year, int month)
        {
            try
            {
                var dates = await _blManager.BlRental.GetUnavailableDatesAsync(year, month);
                return Ok(dates); // מחזיר List<UnavailableDateModel>
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה: {ex.Message}");
            }
        }
    }
}
