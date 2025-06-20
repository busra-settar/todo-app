import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: TaskModel[] = [];
  categoryFilter: string = '';
  priorityFilter: string = 'all';
  sortOrder: 'default' | 'asc' | 'desc' = 'default';
  completedFilter: 'all' | 'completed' | 'uncompleted' = 'all';

  deleteConfirmId: string | null = null;

  @Output() editTaskEvent = new EventEmitter<TaskModel>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  toggleCompleted(task: TaskModel) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  // DÜZENLE BUTONUNU BASINCA OLAYI YAYINLA
  editTask(task: TaskModel) {
    this.editTaskEvent.emit(task);
  }

  showDeleteConfirm(task: TaskModel) {
    this.deleteConfirmId = task.id;
  }
  deleteTask(task: TaskModel) {
    this.taskService.deleteTask(task.id);
    this.deleteConfirmId = null;
    this.loadTasks();
  }
  cancelDelete() {
    this.deleteConfirmId = null;
  }

  setSortOrder(order: 'asc' | 'desc') {
    if (this.sortOrder === order) {
      this.sortOrder = 'default';
    } else {
      this.sortOrder = order;
    }
  }

  clearFilters() {
    this.categoryFilter = '';
    this.completedFilter = 'all';
    this.sortOrder = 'default';
    this.priorityFilter = 'all';
  }

  get filteredTasks(): TaskModel[] {
    let filtered = this.tasks;
    if (this.categoryFilter) {
      filtered = filtered.filter(task =>
        task.category.toLowerCase().includes(this.categoryFilter.toLowerCase())
      );
    }
    if (this.priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }
    if (this.completedFilter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (this.completedFilter === 'uncompleted') {
      filtered = filtered.filter(task => !task.completed);
    }
    return filtered;
  }

  get sortedTasks(): TaskModel[] {
    const tasksToSort = [...this.filteredTasks];
    if (this.sortOrder === 'asc') {
      return tasksToSort.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB;
      });
    } else if (this.sortOrder === 'desc') {
      return tasksToSort.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateB - dateA;
      });
    } else {
      return tasksToSort;
    }
  }

  getPriorityClass(priority: string | undefined) {
    switch (priority) {
      case 'Yüksek': return 'priority-high';
      case 'Orta': return 'priority-medium';
      case 'Düşük': return 'priority-low';
      default: return '';
    }
  }

  getCategoryClass(category: string | undefined) {
    if (!category) return '';
    if (category.toLowerCase().includes('iş')) return 'category-business';
    if (category.toLowerCase().includes('kişisel')) return 'category-personal';
    return 'category-other';
  }
}