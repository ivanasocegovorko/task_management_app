import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseURL: string = "http://localhost:4000/api/task";

  constructor(private http: HttpClient) { }
  
  getAllTasks(): Observable<Task[]> {
    return (this.http.get<Task[]>(this.baseURL));
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(this.baseURL + "/" + taskId);
  }

  createTask(newTask: Task) {
    return this.http.post(this.baseURL, newTask);
  }

  editTask(taskId: string, editedTask: Task): Observable<Task> {
    return this.http.put<Task>(this.baseURL + "/" + taskId, editedTask);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(this.baseURL + "/" + taskId)
  }
}
