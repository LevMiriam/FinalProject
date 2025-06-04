using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
     public class BlPaymentRequest
    {
        public string Email { get; set; }
        public decimal Amount { get; set; }
    }
}
