using Microsoft.EntityFrameworkCore;
using ToDoList.DataAccess;
using ToDoList.Interfaces;
using ToDoList.Repositories;
using ToDoList.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RecordsDbContext>(dbContextOptionsBuilder => 
    dbContextOptionsBuilder.UseMySQL(
    builder.Configuration.GetConnectionString("Database")!,
    mysqlOptions => mysqlOptions.EnableRetryOnFailure(
        maxRetryCount: 10,
        maxRetryDelay: TimeSpan.FromSeconds(30),
        errorNumbersToAdd: null
    ))
);

builder.Services.AddScoped<IRecordService, RecordService>();
builder.Services.AddScoped<IRecordRepository, RecordRepository>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<RecordsDbContext>();
try
{
    await dbContext.Database.EnsureCreatedAsync();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.MapControllers();

app.Run();