namespace ToDoList.DTOs.Responses;

public record RecordDto(Guid Id, string Title, string Description, DateTime CreatedOn, bool IsCompleted);