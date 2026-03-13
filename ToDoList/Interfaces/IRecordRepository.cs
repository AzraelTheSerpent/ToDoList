using ToDoList.DTOs.Responses;
using ToDoList.Entities;
using ToDoList.Models.Filters;

namespace ToDoList.Interfaces;

public interface IRecordRepository
{
    public Task<List<RecordDto>> GetAsync(GetRecordsFilter filter, CancellationToken ct);
    public Task<Record?> GetAsync(Guid id, CancellationToken ct);
    public Task AddAsync(Record record, CancellationToken ct);
    public void Delete(Record record);
    public Task SaveChangesAsync(CancellationToken ct);
}