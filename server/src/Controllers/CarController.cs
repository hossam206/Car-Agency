using Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly ILogger<AuthController> _logger;
        public CarController(ICarService carService, ILogger<AuthController> logger)
        {
            _carService = carService;
            _logger = logger;

        }

        private async Task<IActionResult> ExecuteAction(Func<Task<IActionResult>> action)
        {
            try
            {
                return await action();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while executing the action.");
                return StatusCode(500, new { message = "Internal Server Error" });
            }
        }

        // Add car
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] Car car)
        {
            return await ExecuteAction(async () =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid data", errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
                }

                var result = await _carService.Add(car);
                if (result == false)
                    return BadRequest(new { message = "Something Error" });
                return Ok(new { message = "Add Successfully" });
            });
        }

        // Delete car
        [HttpDelete("remove/{carId}")]
        public async Task<IActionResult> Delete([FromRoute] int carId)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _carService.Delete(carId);
                if (result == false)
                    return NotFound(new { message = "Not found Car" });
                return Ok(new { message = "Delete Successfully" });
            });
        }

        // Update car
        [HttpPut("update/{carId}")]
        public async Task<IActionResult> Update([FromBody] Car car, [FromRoute] int carId)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _carService.Update(car, carId);
                if (result == false)
                    return BadRequest(new { message = "Not found Car" });
                return Ok(new { message = "Update Successfully" });
            });
        }

        // Get all cars
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _carService.GetAll(page);
                if (result == null)
                    return NotFound(new { message = "Not found Cars" });
                return Ok(new { message = "Get Cars Successfully" , Car = result });
            });
        }

        // Get car By id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _carService.GetById(id);
                if (result == null)
                    return NotFound(new { message = "Not found Car" });
                return Ok(new { message = "Get Car Successfully" , Car = result });
            });
        }

        // Download Export Certificate 
        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadCertificate([FromRoute] int id)
        {
            var pdfStream = await _carService.GenerateCertificate(id);
            if (pdfStream == null || pdfStream.Length == 0)
                return BadRequest(new { message = "Error generating PDF" });
            return File(pdfStream.ToArray(), "application/pdf", $"Certificate_{id}.pdf");
        }


        // Get count
        [HttpGet("count")]
        public async Task<IActionResult> Count()
        {
            return await ExecuteAction(async () =>
            {
                var result = await _carService.Count();
                if (result == 0)
                    return NotFound(new { message = "Not found Car" });
                return Ok(new { message = "Get count Successfully", Car = result });
            });
        }

    }
}
