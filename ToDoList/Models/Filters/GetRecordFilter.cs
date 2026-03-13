namespace ToDoList.Models.Filters;

public record GetRecordsFilter(
    string? Search, 
    string? SortItem, 
    string? SortOrder
    );