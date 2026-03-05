namespace ToDoList.Models;

public class Record
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
    public DateTime CreatedOn { get; init; }
    public bool IsCompleted { get; init; }
    
    public Record(string title, string description, bool isCompleted)
    {
        Title = title;
        Description = description;
        CreatedOn = DateTime.UtcNow;
        IsCompleted = isCompleted;
    }
}