import { Component } from '@angular/core';
import { TaskModel } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: TaskModel[] = [];
  editTaskObj: TaskModel | null = null;

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  onTaskAdded(newTask: TaskModel) {
    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onEditTask(task: TaskModel) {
    this.editTaskObj = { ...task };
  }

  onTaskUpdated(updatedTask: TaskModel) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    this.editTaskObj = null;
  }

  // SİLME FONKSİYONU – task-list.component.ts'den gelen silme eventini işler
  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
