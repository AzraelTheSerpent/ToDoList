using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.DataAccess;

public class RecordsDbContext : DbContext
{
    public DbSet<Record> Records => Set<Record>();
    
    public RecordsDbContext(DbContextOptions<RecordsDbContext> options) : base(options) { }
}