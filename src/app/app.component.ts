import { Component } from '@angular/core';
import { TaskModel } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editTaskObj: TaskModel | null = null;

  onEditTask(task: TaskModel) {
    this.editTaskObj = { ...task };
  }
}