using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Contracts;
using ToDoList.DataAccess;
using ToDoList.Models;

namespace ToDoList.Controllers;

[ApiController()]
[Route("api/[controller]")]
public class RecordsController : ControllerBase
{
    private readonly RecordsDbContext _dbContext;

    public RecordsController(RecordsDbContext dbContext) => _dbContext = dbContext;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRecordRequest request, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(request.Title.Trim()) || string.IsNullOrEmpty(request.Description.Trim()))
            return BadRequest();
        var record = new Record(request.Title, request.Description, false);
        
        await _dbContext.Records.AddAsync(record, ct);
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetRecordsRequest request, CancellationToken ct)
    {
        var recordsQuery = _dbContext.Records
            .Where(r => string.IsNullOrWhiteSpace(request.Search) ||
                        r.Title.ToLower().Contains(request.Search.ToLower()));
        
        Expression<Func<Record, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => r => r.CreatedOn,
            "title" => r => r.Title,
            _ => r => r.Id
        };

        recordsQuery = request.SortOrder == "desc"
            ? recordsQuery.OrderByDescending(selectorKey)
            : recordsQuery.OrderBy(selectorKey);

        var records = await recordsQuery
            .Select(r => new RecordDto(r.Id, r.Title, r.Description, r.CreatedOn, r.IsCompleted))
            .ToListAsync(ct);
        
        return Ok(new GetRecordsResponse(records));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var record = await _dbContext.Records.FindAsync([id, ct], cancellationToken: ct);
        
        if(record is null)
            return NotFound();
        
        _dbContext.Records.Remove(record);
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok();
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Patch(Guid id, [FromBody] PutRecordRequest request, CancellationToken ct)
    {
        var record = await _dbContext.Records.FindAsync([id, ct], cancellationToken: ct);
        
        if(record is null)
            return NotFound();
        
        _dbContext.Records.Remove(record);
        await _dbContext.SaveChangesAsync(ct);
        
        _dbContext.Records.Add(new(request.Title, request.Description, request.IsCompleted));
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok(record);
    }
}