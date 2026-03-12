using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ToDoList.Contracts;

public record CreateRecordRequest(
    [Required, MinLength(1)] string Title, 
    [Required, MinLength(1)] string Description
    );