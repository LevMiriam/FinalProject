using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
	public class BlSignUpCustomer
	{
		public int Id { get; set; }

		public string Name { get; set; } = null!;

		public string Email { get; set; } = null!;

		public string Phone { get; set; } = null!;

		public string DriverLicenseNumber { get; set; } = null!;
	}
}
