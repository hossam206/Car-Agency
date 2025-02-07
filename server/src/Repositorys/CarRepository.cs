using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;

namespace Server.Models
{
    public interface ICarRepository
    {
        Task<object> GetAll(int page);
        Task<Car> GetById(int id);
        Task<bool> Add(Car car);
        Task<bool> Delete(int id);
        Task<bool> Update(Car car, int id);
        Task<int> Count();
    }
    public class CarRepository : ICarRepository
    {
        private readonly ApplicationContextDb _context;
        private readonly IMapper _mapper;

        public CarRepository(ApplicationContextDb context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Add(Car car)
        {
            try
            {
                await _context.Cars.AddAsync(car);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var car = await _context.Cars.FindAsync(id);
                if (car == null)
                    return false;
                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<object> GetAll(int page)
        {
            var cars = await _context.Cars.ToListAsync();
            if (cars == null)
                return null;
            var carDto = _mapper.Map<List<CarDto>>(cars);
            var result = Pagination(page, carDto);
            return result;
        }

        public async Task<Car> GetById(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return null;
            return car;
        }

        private object Pagination(int pageNum, List<CarDto> cars)
        {
            int page = Math.Max(pageNum, 1);
            var result = cars.Skip((page - 1) * 10).Take(10);
            int totalPages = (int)Math.Ceiling(cars.Count / (double)10);
            return new
            {
                TotalCar = cars.Count,
                TotalPages = totalPages,
                CurrentPage = page,
                RemainPages = Math.Max(cars.Count - 10 * page, 0),
                LimitPage = 10,
                Car = result
            };
        }

        public async Task<bool> Update(Car car, int id)
        {
            var result = await _context.Cars.FindAsync(id);
            if (result == null)
                return false;

            car.Id = id;
            _context.Entry(result).CurrentValues.SetValues(car);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> Count() {
            var count = await _context.Cars.ToListAsync();
            if (count == null)
                return 0;
            return count.Count;
        }


    }
}
