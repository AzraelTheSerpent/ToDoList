using ToDoList.DTOs.Requests;
using ToDoList.DTOs.Responses;
using ToDoList.Entities;
using ToDoList.Interfaces;
using ToDoList.Models.Filters;

namespace ToDoList.Services;

public class RecordService : IRecordService
{
    private readonly IRecordRepository _repo;

    public RecordService(IRecordRepository repo) => _repo = repo;

    public async Task<List<RecordDto>> GetAsync(GetRecordsDto dto, CancellationToken ct) => 
        await _repo.GetAsync(new GetRecordsFilter(dto.Search, dto.SortItem, dto.SortOrder), ct);

    public async Task DeleteAsync(Guid id, CancellationToken ct)
    {
        var record = await _repo.GetAsync(id, ct);
        if (record is null)
            throw new KeyNotFoundException($"Entity with id {id} not found.", new(nameof(record)));
        _repo.Delete(record);
        await _repo.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Guid id, PutRecordDto dto, CancellationToken ct)
    {
        var record = await _repo.GetAsync(id, ct);
        if(record is null)
            throw new KeyNotFoundException($"Entity with id {id} not found.", new(nameof(record)));
        record.Update(dto.Title, 
                dto.Description, 
                dto.IsCompleted);
        await _repo.SaveChangesAsync(ct);
    }

    public async Task CreateAsync(CreateRecordDto dto, CancellationToken ct)
    {
        await _repo.AddAsync(new Record(dto.Title, dto.Description), ct);
        await _repo.SaveChangesAsync(ct);
    }
}