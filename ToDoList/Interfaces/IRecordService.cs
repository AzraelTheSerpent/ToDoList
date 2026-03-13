using ToDoList.DTOs.Requests;
using ToDoList.DTOs.Responses;
using ToDoList.Entities;

namespace ToDoList.Interfaces;

public interface IRecordService
{
    public Task<List<RecordDto>> GetAsync(GetRecordsDto dto, CancellationToken ct);
    public Task DeleteAsync(Guid id, CancellationToken ct);
    public Task UpdateAsync(Guid id, PutRecordDto dto, CancellationToken ct);
    public Task CreateAsync(CreateRecordDto dto, CancellationToken ct);
}