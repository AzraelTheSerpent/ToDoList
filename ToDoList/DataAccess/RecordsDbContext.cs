using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.DataAccess;

public class RecordsDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public RecordsDbContext(IConfiguration configuration) => _configuration = configuration;

    public DbSet<Record> Records => Set<Record>();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseMySQL(
            _configuration.GetConnectionString("Database"),
            mysqlOptions => mysqlOptions.EnableRetryOnFailure(
                maxRetryCount: 10,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null
            )
        );
}