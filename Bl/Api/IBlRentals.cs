﻿using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IBlRentals
    {
        public bool CreateRentalOrder(BlRentalToAdd rentalOrder);
        public decimal CalculateRentalPrice(BlRentalToAdd rentalOrder);


    }
}
