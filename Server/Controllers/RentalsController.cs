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
                string result = await _blManager.BlRental.CreateRentalOrderAsync(rentalOrder);

                if (result.Equals("Failed to create rental order."))
                    return BadRequest("Failed to create rental order.");

                decimal totalPrice = await _blManager.BlRental.CalculateRentalPriceAsync(rentalOrder);


               //את הפונקציה של התשלום מזמנים בריאקט
                return Ok(new BlRentalOrderResult
                {
                    Message = $"Rental order created successfully.",
                    TotalPrice = totalPrice,
                    Email = rentalOrder.customerEmail
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("calculate-price")]
        //public async Task<IActionResult> CalculateRentalPrice([FromBody] BlRentalToAdd rentalOrder)
        //{
        //    if (rentalOrder == null)
        //        return BadRequest("Invalid rental order.");

        //    if (_blManager == null || _blManager.BlRental == null)
        //        return StatusCode(500, "Internal server error: BL is null.");

        //    var rentalPrice = await _blManager.BlRental.CalculateRentalPriceAsync(rentalOrder);

        //    if (rentalPrice > 0)
        //        return Ok(new { price = rentalPrice });
        //    else
        //        return BadRequest("Failed to calculate rental price.");
        //}

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

        [HttpPost("pay")]
        public IActionResult Pay([FromBody] BlPaymentRequest request)
        {
            bool result = _blManager.BlRental.ProcessPayment(request.Email, request.Amount);
            if (result)
                return Ok("Payment successful and invoice sent.");
            else
                return BadRequest("Payment failed.");
        }

        [HttpGet("history/{userId}")]
        public IActionResult GetRentalHistory(int userId)
        {
            var rentals = _blManager.BlRental.GetUserRentalHistory(userId);
            if (rentals == null || rentals.Count == 0)
            {
                return NotFound("No rental history found for this user.");
            }
            return Ok(rentals);
        }

        [HttpGet("active-today")]
        public IActionResult GetActiveRentalsToday()
        {
            var activeRentals = _blManager.BlRental.GetActiveRentalsToday();
            var count = activeRentals.Count;
            if (activeRentals == null || activeRentals.Count == 0)
            {
                return NotFound("No active rentals found for today.");
            }
            else
                return Ok(new
                {
                    Rentals = activeRentals,
                    Count = count
                });
        }
        [HttpGet("cars-availability")]
        public async Task<IActionResult> GetCarsAvailability([FromQuery] DateOnly? start, [FromQuery] DateOnly? end)
        {
            var carsWithAvailability = await _blManager.BlRental.GetAllCarsWithAvailabilityAsync(start, end);
            return Ok(carsWithAvailability);
        }
    }
}
