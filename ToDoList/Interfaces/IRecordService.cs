using ToDoList.Contracts;
using ToDoList.Entities;

namespace ToDoList.Interfaces;

public interface IRecordService
{
    public Task<List<RecordDto>> GetAsync(GetRecordsRequest request, CancellationToken ct);
    public Task DeleteAsync(Guid id, CancellationToken ct);
    public Task UpdateAsync(Guid id, PutRecordRequest request, CancellationToken ct);
    public Task CreateAsync(CreateRecordRequest request, CancellationToken ct);
}