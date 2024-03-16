import { Component, OnInit  } from '@angular/core';
import { TasksService} from '../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  taskList: Task[] = [];
  newTask: Task = new Task();
  currentTask: Task = new Task();

  constructor(private activatedRoute: ActivatedRoute, private tasksService: TasksService, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe(task => {
    this.taskList = JSON.parse(JSON.stringify(task));
    console.log(JSON.stringify(task));
    });
  }

  prompt() { 
    this.dialogService.showPrompt('Enter new task: ').subscribe(response => {
      this.newTask.title = response;  
      this.newTask.completed = false; 
      this.tasksService.createTask(this.newTask).subscribe(() => {
        console.log(this.newTask);
        this.tasksService.getAllTasks().subscribe(task => {
        this.taskList = JSON.parse(JSON.stringify(task));
        });
      });    
  })
  } 

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe(response => {
      this.tasksService.getAllTasks().subscribe(task => {
        this.taskList = JSON.parse(JSON.stringify(task));
      });
    });
  }

  statusChange(taskId: string) {
    this.tasksService.getTask(taskId).subscribe(foundTask => {
      this.currentTask = foundTask;
    
      if (this.currentTask.completed === false){
        this.currentTask.completed = true;
      } else {
        this.currentTask.completed = false;
      };
      const editedTask = this.currentTask;
      
      this.tasksService.editTask(taskId, editedTask).subscribe(editedTask => {
        console.log(editedTask);
      });
    });
    
  }

}
