namespace ToDoList.Entities;

public class Record
{
    public Guid Id { get; init; }
    public string Title { get; private set; }
    public string Description { get; private set; }
    public DateTime CreatedOn { get; init; }
    public bool IsCompleted { get; private set; }
    
    public Record(string title, string description)
    {
        Title = title;
        Description = description;
        CreatedOn = DateTime.UtcNow;
        IsCompleted = false;
    }
    
    public void Update(string title, string description, bool isCompleted) => 
        (Title, Description, IsCompleted) = (title, description, isCompleted);
}