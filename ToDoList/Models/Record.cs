namespace ToDoList.Models;

public class Record
{
    public Guid Id { get; init; }
    public string Title { get; private set; }
    public string Description { get; private set; }
    public DateTime CreatedOn { get; init; }
    public bool IsCompleted { get; private set; }
    
    public Record(string title, string description, bool isCompleted)
    {
        Title = title;
        Description = description;
        CreatedOn = DateTime.UtcNow;
        IsCompleted = isCompleted;
    }
    
    public void Update(string title, string description, bool isCompleted)
    {
        if (string.IsNullOrEmpty(title.Trim()))
            throw new ArgumentException("Title cannot be null or empty", nameof(title));
        if (string.IsNullOrEmpty(description.Trim()))
            throw new ArgumentException("Description cannot be null or empty", nameof(description));
        (Title, Description, IsCompleted) = (title, description, isCompleted);
    }
}