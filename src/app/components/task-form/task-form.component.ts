import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() editTaskObj?: TaskModel | null;

  task: TaskModel = {
    id: '',
    title: '',
    description: '',
    category: '',
    priority: 'Orta',
    dueDate: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.editTaskObj) {
      this.task = { ...this.editTaskObj };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTaskObj'] && this.editTaskObj) {
      this.task = { ...this.editTaskObj };
    } else if (changes['editTaskObj'] && !this.editTaskObj) {
      this.clearForm();
    }
  }

  addTask() {
    if (this.task.id) {
      // Güncelleme modunda
      this.taskService.updateTask(this.task);
    } else {
      // Yeni görev ekleme modunda
      this.task.id = this.generateId();
      this.taskService.addTask(this.task);
    }
    this.clearForm();
  }

  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  cancelEdit() {
    this.clearForm();
  }

  clearForm() {
    this.task = {
      id: '',
      title: '',
      description: '',
      category: '',
      priority: 'Orta',
      dueDate: '',
      completed: false
    };
  }
}