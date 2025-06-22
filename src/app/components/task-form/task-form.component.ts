import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() editTaskObj: any;
  @Output() taskAdded = new EventEmitter<any>();
  @Output() taskUpdated = new EventEmitter<any>();

  task: any = {
    title: '',
    description: '',
    category: '',
    priority: 'Orta',
    dueDate: '',
    completed: false
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editTaskObj'] && this.editTaskObj) {
      this.task = { ...this.editTaskObj };
    }
  }

  addTask() {
    if (this.task.dueDate) {
      const year = new Date(this.task.dueDate).getFullYear();
      if (!/^\d{4}$/.test(String(year))) {
        alert('Tarih kısmında yıl sadece 4 haneli olmalı!');
        return;
      }
      if (year < 1900 || year > 2100) {
        alert('Yıl 1900 ile 2100 arasında olmalı!');
        return;
      }
    }
    if (!this.task.category) {
      alert('Kategori seçiniz!');
      return;
    }
    if (this.task.id) {
      this.taskUpdated.emit(this.task);
    } else {
      this.task.id = Date.now() + Math.random();
      this.taskAdded.emit({ ...this.task });
    }
    this.resetForm();
  }

  setPriority(priority: string) {
    this.task.priority = priority;
  }

  setCategory(category: string) {
    this.task.category = category;
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.task = {
      title: '',
      description: '',
      category: '',
      priority: 'Orta',
      dueDate: '',
      completed: false
    };
  }
}
