using Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly ILogger<AuthController> _logger;
        public ItemController(IItemService itemService, ILogger<AuthController> logger)
        {
            _itemService = itemService;
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

        // Add item
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] Item car)
        {
            return await ExecuteAction(async () =>
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid data", errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
                }

                var result = await _itemService.Add(car);
                if (result == false)
                    return BadRequest(new { message = "Something Error" });
                return Ok(new { message = "Add Successfully" });
            });
        }

        // Delete item
        [HttpDelete("remove/{carId}")]
        public async Task<IActionResult> Delete([FromRoute] int carId)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _itemService.Delete(carId);
                if (result == false)
                    return NotFound(new { message = "Something Error" });
                return Ok(new { message = "Delete Successfully" });
            });
        }

        // Update item
        [HttpPut("update/{carId}")]
        public async Task<IActionResult> Update([FromBody] Item car, [FromRoute] int carId)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _itemService.Update(car, carId);
                if (result == false)
                    return BadRequest(new { message = "Something Error" });
                return Ok(new { message = "Update Successfully" });
            });
        }

        // Get all items
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _itemService.GetAll(page);
                if (result == null)
                    return NotFound(new { message = "Something Error" });
                return Ok(new { message = "Get Items Successfully" , Car = result });
            });
        }

        // Get item By id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return await ExecuteAction(async () =>
            {
                var result = await _itemService.GetById(id);
                if (result == null)
                    return NotFound(new { message = "Something Error" });
                return Ok(new { message = "Get Item Successfully" , Car = result });
            });
        }

        // Get item By id
        [HttpGet("create/{id}")]
        public async Task<IActionResult> CreateCertificate([FromRoute] int id) {
            return await ExecuteAction(async () =>
            {
                var result = await _itemService.GetById(id);
                if (result == null)
                    return NotFound(new { message = "Something Error" });
                _itemService.GenerateCertificate(result);
                return Ok(new { message = "Create Successfully", Car = result });
            });

        }

    }
}
