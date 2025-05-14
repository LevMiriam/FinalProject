using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using Bl.Models;
using Dal.models;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Bl
{
    public class MappingProfile : Profile

    {

        public MappingProfile()

        {

            CreateMap<Car, BlCarToAdd>();
            CreateMap<BlCarToAdd, Car>();
            CreateMap<Customer, BlSignUpCustomer>();
            CreateMap<BlSignUpCustomer, Customer>();
            CreateMap<BlLocationToAdd, Location>();
            CreateMap<Location, BlLocationToAdd>();






        }

    }


}
