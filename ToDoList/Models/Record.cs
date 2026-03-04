namespace ToDoList.Models;

public class Record
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
    public DateTime CreatedOn { get; init; }

    public Record(string title, string description)
    {
        Title = title;
        Description = description;
        CreatedOn = DateTime.UtcNow;
    }
}