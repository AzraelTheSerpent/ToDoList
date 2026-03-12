using System.ComponentModel.DataAnnotations;

namespace ToDoList.Contracts;

public record PutRecordRequest(
    [Required, MinLength(1)] string Title, 
    [Required, MinLength(1)] string Description, 
    [Required] bool IsCompleted
    );