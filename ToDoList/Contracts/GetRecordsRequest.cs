namespace ToDoList.Contracts;

public record GetRecordsRequest(
    string? Search, 
    string? SortItem, 
    string? SortOrder
    );