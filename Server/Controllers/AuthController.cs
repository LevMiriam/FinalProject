using Bl.Models;
using Bl;
using Bl.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IBlManager _blManager;
        public AuthController(IBlManager blManager)
        {
            _blManager = blManager;
        }


        //[HttpPost("signup")]
        //public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
        //{
        //	bool success = _blManager.BlCustomers.SignUp(customer);
        //	return success ? Ok("Registered successfully") : BadRequest("Registration failed");
        //}

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
        {
            // נניח שיש לך פונקציה שמוודאת אם המשתמש כבר קיים לפי שם משתמש או אימייל
            bool userExists = _blManager.BlCustomers.UserExists(customer.Name);
            if (userExists)
                return BadRequest("User already exists");

            bool success = _blManager.BlCustomers.SignUp(customer);

            if (!success)
                return BadRequest("Registration failed");

            // אפשר להחזיר גם מידע נוסף, או פשוט הודעה
            return Ok("Registered successfully");
        }


        //[HttpPost("login")]
        //public IActionResult LogIn([FromBody] int id)
        //{
        //	var customer = _blManager.BlCustomers.LogIn(id);

        //	if (customer != null)
        //	{
        //		return Ok($"Welcome {customer.Name}!");
        //	}
        //	else
        //	{
        //		return StatusCode(299, "Customer not found. Please sign up");
        //	}
        //}
        [HttpPost("login")]
        public IActionResult Login([FromBody] int id, [FromServices] JwtService jwtService)
        {
            var customer = _blManager.BlCustomers.LogIn(id);
            if (customer == null)
                return Unauthorized("User not found");

            var token = jwtService.GenerateToken(customer.Id, customer.Role, customer.Name);
            return Ok(new { token });
        }
    }
}
