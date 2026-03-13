namespace ToDoList.DTOs.Requests;

public record GetRecordsDto(
    string Search, 
    string SortItem, 
    string SortOrder
    );