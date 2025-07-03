//using Bl.Models;
//using Bl;
//using Bl.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Server.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        public readonly IBlManager _blManager;
//        public AuthController(IBlManager blManager)
//        {
//            _blManager = blManager;
//        }


//        ////[HttpPost("signup")]
//        ////public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
//        ////{
//        ////	bool success = _blManager.BlCustomers.SignUp(customer);
//        ////	return success ? Ok("Registered successfully") : BadRequest("Registration failed");
//        ////}

//        //[HttpPost("signup")]
//        //public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
//        //{
//        //    // נניח שיש לך פונקציה שמוודאת אם המשתמש כבר קיים לפי שם משתמש או אימייל
//        //    bool userExists = _blManager.BlCustomers.UserExists(customer.Name);
//        //    if (userExists)
//        //        return BadRequest("User already exists");

//        //    bool success = _blManager.BlCustomers.SignUp(customer);

//        //    if (!success)
//        //        return BadRequest("Registration failed");

//        //    // אפשר להחזיר גם מידע נוסף, או פשוט הודעה
//        //    return Ok("Registered successfully");
//        //}


//        ////[HttpPost("login")]
//        ////public IActionResult LogIn([FromBody] int id)
//        ////{
//        ////	var customer = _blManager.BlCustomers.LogIn(id);

//        ////	if (customer != null)
//        ////	{
//        ////		return Ok($"Welcome {customer.Name}!");
//        ////	}
//        ////	else
//        ////	{
//        ////		return StatusCode(299, "Customer not found. Please sign up");
//        ////	}
//        ////}
//        //[HttpPost("login")]
//        //public IActionResult Login([FromBody] int id, [FromServices] JwtService jwtService)
//        //{
//        //    var customer = _blManager.BlCustomers.LogIn(id);
//        //    if (customer == null)
//        //        return Unauthorized("User not found");

//        //    var token = jwtService.GenerateToken(customer.Id, customer.Role, customer.Name);
//        //    return Ok(new { token });
//        //}


//        [HttpPost("signup")]
//        public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
//        {
//            bool userExists = _blManager.BlCustomers.UserExists(customer.Email); // Check by email instead of Name
//            if (userExists)
//                return BadRequest("User already exists");

//            // Hash password before storing
//            customer.Password = BCrypt.Net.BCrypt.HashPassword(customer.Password); // Using BCrypt for hashing
//            bool success = _blManager.BlCustomers.SignUp(customer);

//            if (!success)
//                return BadRequest("Registration failed");

//            return Ok("Registered successfully");
//        }

//        [HttpPost("login")]
//        public IActionResult Login([FromBody] BlLoginCustomer loginCustomer, [FromServices] JwtService jwtService)
//        {
//            var customer = _blManager.BlCustomers.LogIn(loginCustomer.Email, loginCustomer.Password); // Assuming you change to accept email & password
//            if (customer == null)
//                return Unauthorized("User not found");

//            var token = jwtService.GenerateToken(customer.Id, customer.Role, customer.Name);
//            return Ok(new { token });
//        }

//    }
//}
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
        private readonly IBlManager _blManager;

        public AuthController(IBlManager blManager)
        {
            _blManager = blManager;
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
        {
            bool userExists = _blManager.BlCustomers.UserExists(customer.Email);
            if (userExists)
                return BadRequest("User already exists");

            customer.PasswordHash = BCrypt.Net.BCrypt.HashPassword(customer.PasswordHash); // Hash the password before storing
            bool success = _blManager.BlCustomers.SignUp(customer); // Ensure the DAL method Save

            if (!success)
                return BadRequest("Registration failed");

            return Ok("Registered successfully");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] BlLoginCustomer loginCustomer, [FromServices] JwtService jwtService)
        {
            var customer = _blManager.BlCustomers.LogIn(loginCustomer.Email, loginCustomer.Password);
            if (customer == null)
                return Unauthorized("User not found");

            var token = jwtService.GenerateToken(customer.Id, customer.Role, customer.Name);
            return Ok(new { token });
        }
    }
}
