using task_api.Models;
using Microsoft.EntityFrameworkCore;

public class TaskDbContext : DbContext
{
    public DbSet<task_api.Models.Task> Task { get; set; }

    public TaskDbContext(DbContextOptions<TaskDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<task_api.Models.Task>(entity =>
        {
            entity.HasKey(e => e.TaskId);
            entity.Property(e => e.Title);
            entity.Property(e => e.Completed);
        });

        modelBuilder.Entity<task_api.Models.Task>().HasData(
            new task_api.Models.Task { 
                TaskId = 1,
                Title = "This is my first Task",
                Completed = false,
            },
            new task_api.Models.Task { 
                TaskId = 2,
                Title = "This is my SECOND Task",
                Completed = true,
            }
        );

   }
}