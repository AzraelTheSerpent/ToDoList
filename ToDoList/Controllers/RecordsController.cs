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

    public RecordsController(RecordsDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRecordRequest request, CancellationToken ct)
    {
        var record = new Record(request.Title, request.Description);
        
        await _dbContext.Records.AddAsync(record, ct);
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get(GetRecordsRequest request, CancellationToken ct)
    {
        var recordsQuery = _dbContext.Records
            .Where(r => !string.IsNullOrWhiteSpace(request.Search) &&
                        r.Title.Contains(request.Search, StringComparison.CurrentCultureIgnoreCase));
        
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
            .Select(r => new RecordDto(r.Id, r.Title, r.Description, r.CreatedOn))
            .ToListAsync(ct);
        
        return Ok(new GetRecordsResponse(records));
    }
        
}