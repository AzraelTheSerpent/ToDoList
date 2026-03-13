using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ToDoList.DataAccess;
using ToDoList.DTOs.Responses;
using ToDoList.Interfaces;
using ToDoList.Entities;
using ToDoList.Models.Filters;

namespace ToDoList.Repositories;

public class RecordRepository : IRecordRepository
{
    private readonly RecordsDbContext _context;

    public RecordRepository(RecordsDbContext context) => _context = context;

    public async Task<List<RecordDto>> GetAsync(GetRecordsFilter filter, CancellationToken ct)
    {
        var recordsQuery = _context.Records
            .Where(r => string.IsNullOrWhiteSpace(filter.Search) || 
                        r.Title.ToLower().Contains(filter.Search.ToLower()));
        
        
        Expression<Func<Record, object>> selectorKey = filter.SortItem?.ToLower() switch
        {
            "date" => r => r.CreatedOn,
            "title" => r => r.Title,
            _ => r => r.Id
        };
        
        recordsQuery = filter.SortOrder == "desc"
            ? recordsQuery.OrderByDescending(selectorKey)
            : recordsQuery.OrderBy(selectorKey);
        
        return await recordsQuery
            .Select(r => new RecordDto(r.Id, r.Title, r.Description, r.CreatedOn, r.IsCompleted))
            .ToListAsync(ct);
    }

    public async Task<Record?> GetAsync(Guid id, CancellationToken ct) =>
        await _context.Records.FindAsync([id, ct], ct);
    
    public async Task AddAsync(Record record, CancellationToken ct) => 
        await _context.Records.AddAsync(record, ct);

    public void Delete(Record record) => 
        _context.Records.Remove(record);

    public async Task SaveChangesAsync(CancellationToken ct) => 
        await _context.SaveChangesAsync(ct);
}