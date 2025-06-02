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
            CreateMap<Car, BlCarToAdd>().ReverseMap();
            CreateMap<Customer, BlSignUpCustomer>().ReverseMap();
            CreateMap<BlLocationToAdd, Location>().ReverseMap();
            CreateMap<BlCar, Car>().ReverseMap();
            CreateMap<Car, BlCar>()
                .ForMember(dest => dest.blLocationToAdd, opt => opt.MapFrom(src => src.Location));
            CreateMap<BlRentalToAdd, Rental>().ReverseMap();
            CreateMap<BlRate, Rate>().ReverseMap();

        }
    }
}
