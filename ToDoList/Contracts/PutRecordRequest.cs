namespace ToDoList.Contracts;

public record PutRecordRequest(string Title, string Description, bool IsCompleted);