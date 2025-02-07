using AutoMapper;
using Server.Dtos;
using Server.Models;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Car, CarDto>();
    }
}
