import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  getTasks(): TaskModel[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks: TaskModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(task: TaskModel): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: TaskModel): void {
    let tasks = this.getTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.saveTasks(tasks);
  }

  deleteTask(id: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== id);
    this.saveTasks(tasks);
  }
}