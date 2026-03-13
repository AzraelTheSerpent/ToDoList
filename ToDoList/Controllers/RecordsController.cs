using Microsoft.AspNetCore.Mvc;
using ToDoList.DTOs.Requests;
using ToDoList.Interfaces;

namespace ToDoList.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecordsController : ControllerBase
{
    private readonly IRecordService _service;

    public RecordsController(IRecordService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRecordDto dto, CancellationToken ct)
    {
        try
        {
            await _service.CreateAsync(dto, ct);
            return Created();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500);
        }
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetRecordsDto dto, CancellationToken ct)
    {
        try
        {
            var recordDtos = await _service.GetAsync(dto, ct);
            return Ok(recordDtos);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500);
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        try
        {
            await _service.DeleteAsync(id, ct);
            return Ok();
        }
        catch (KeyNotFoundException ex)
        {
            Console.WriteLine(ex.Message);
            return NotFound();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500);
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] PutRecordDto dto, CancellationToken ct)
    {
        try
        {
            await _service.UpdateAsync(id, dto, ct);
            return Ok();
        }
        catch (KeyNotFoundException ex)
        {
            Console.WriteLine(ex.Message);
            return NotFound();
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return StatusCode(500);
        }
    }
}