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
            //CreateMap<Car, BlCarToAdd>().ReverseMap();
            CreateMap<Customer, BlSignUpCustomer>().ReverseMap();
            CreateMap<BlLocationToAdd, Location>().ReverseMap();
            CreateMap<BlCar, Car>().ReverseMap();
            CreateMap<Car, BlCar>()
                .ForMember(dest => dest.blLocationToAdd, opt => opt.MapFrom(src => src.Location));
            CreateMap<BlRentalToAdd, Rental>().ReverseMap();
            CreateMap<BlRate, Rate>().ReverseMap();
            CreateMap<Car, CarWithAvailabilityDto>().ReverseMap();
            CreateMap<Rental, BlRentalToAdd>().ReverseMap();
    //        CreateMap<CarFormDto, BlCarToAdd>()
    //.ForMember(dest => dest.Image, opt => opt.Ignore());
            CreateMap<CarFormDto, BlCarToAdd>()
           .ForMember(dest => dest.Image, opt => opt.Ignore()) // נטפל ידנית ב-BL
           .ForMember(dest => dest.Location, opt => opt.MapFrom(src => new BlLocationToAdd { Id = src.Id }));

            CreateMap<CarFormDto, BlCarToAdd>()
     .ForMember(dest => dest.Image, opt => opt.Ignore())
     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location));
            CreateMap<BlLocationToAdd, Location>().ReverseMap();
            CreateMap<BlCarToAdd, Car>()
                .ForMember(dest => dest.LocationId, opt => opt.MapFrom(src => src.Location.Id))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image));
            CreateMap<Car, CarFormDto>()
                .ForMember(dest => dest.Image, opt => opt.Ignore())
                .ForMember(dest => dest.ImageBase64, opt => opt.MapFrom(src => src.Image != null ? Convert.ToBase64String(src.Image) : null));
        }
    }
}
