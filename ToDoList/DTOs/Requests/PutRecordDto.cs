using System.ComponentModel.DataAnnotations;

namespace ToDoList.DTOs.Requests;

public record PutRecordDto(
    [Required, MinLength(1)] string Title, 
    [Required, MinLength(1)] string Description, 
    [Required] bool IsCompleted
    );