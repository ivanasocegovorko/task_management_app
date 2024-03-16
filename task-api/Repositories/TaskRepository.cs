using task_api.Models;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace task_api.Repositories;

public class TaskRepository : ITaskRepository 
{
    private readonly TaskDbContext _context;

    public TaskRepository(TaskDbContext context)
    {
        _context = context;
    }


    public Models.Task CreateTask(Models.Task newTask)
    {
        _context.Task.Add(newTask);
        _context.SaveChanges();
        return newTask;
    }

    public void DeleteTaskById(int taskId)
    {
        var Task = _context.Task.Find(taskId);
        if (Task != null) {
            _context.Task.Remove(Task); 
            _context.SaveChanges(); 
        }
    }

    public IEnumerable<Models.Task> GetAllTasks()
    {
        return _context.Task.ToList();
    }

    public Models.Task? GetTaskById(int taskId)
    {
        return _context.Task.SingleOrDefault(c => c.TaskId == taskId);
    }

    public Models.Task? UpdateTask(Models.Task newTask)
    {
        var originalTask = _context.Task.Find(newTask.TaskId);
        if (originalTask != null) {
            originalTask.Title = newTask.Title;
            originalTask.Completed = newTask.Completed;
            _context.SaveChanges();
        }
        return originalTask;
    }
    
}
