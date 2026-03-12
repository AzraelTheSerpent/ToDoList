using Microsoft.EntityFrameworkCore;
using ToDoList.Entities;

namespace ToDoList.DataAccess;

public class RecordsDbContext : DbContext
{
    public DbSet<Record> Records { get; set; }
    
    public RecordsDbContext(DbContextOptions<RecordsDbContext> options) : base(options) { }
}