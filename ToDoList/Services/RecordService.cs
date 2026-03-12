using ToDoList.Contracts;
using ToDoList.Interfaces;
using ToDoList.Entities;

namespace ToDoList.Services;

public class RecordService : IRecordService
{
    private readonly IRecordRepository _repo;

    public RecordService(IRecordRepository repo) => _repo = repo;

    public async Task<List<RecordDto>> GetAsync(GetRecordsRequest request, CancellationToken ct) => 
        await _repo.GetAsync(request, ct);

    public async Task DeleteAsync(Guid id, CancellationToken ct)
    {
        var record = await _repo.GetAsync(id, ct);
        if (record is null)
            throw new KeyNotFoundException($"Entity with id {id} not found.", new(nameof(record)));
        _repo.Delete(record);
        await _repo.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Guid id, PutRecordRequest request, CancellationToken ct)
    {
        var record = await _repo.GetAsync(id, ct);
        if(record is null)
            throw new KeyNotFoundException($"Entity with id {id} not found.", new(nameof(record)));
        record.Update(request.Title, 
                request.Description, 
                request.IsCompleted);
        await _repo.SaveChangesAsync(ct);
    }

    public async Task CreateAsync(CreateRecordRequest request, CancellationToken ct)
    {
        await _repo.CreateAsync(new(request.Title, request.Description), ct);
        await _repo.SaveChangesAsync(ct);
    }
}