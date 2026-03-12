using ToDoList.Contracts;
using ToDoList.Entities;

namespace ToDoList.Interfaces;

public interface IRecordRepository
{
    public Task<List<RecordDto>> GetAsync(GetRecordsRequest request, CancellationToken ct);
    public Task<Record?> GetAsync(Guid id, CancellationToken ct);
    public Task CreateAsync(Record record, CancellationToken ct);
    public void Delete(Record record);
    public Task SaveChangesAsync(CancellationToken ct);
}