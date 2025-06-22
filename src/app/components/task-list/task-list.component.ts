import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: TaskModel[] = [];
  @Output() editTaskEvent = new EventEmitter<TaskModel>();
  @Output() deleteTaskEvent = new EventEmitter<string>();

  categoryFilter: string = 'all';
  priorityFilter: string = 'all';
  sortOrder: 'default' | 'asc' | 'desc' = 'default';
  completedFilter: 'all' | 'completed' | 'uncompleted' = 'all';

  deleteConfirmId: string | null = null;

  setCategoryFilter(category: string) {
    this.categoryFilter = category;
  }

  setPriorityFilter(priority: string) {
    this.priorityFilter = priority;
  }

  toggleCompleted(task: TaskModel) {
    task.completed = !task.completed;
    // Tamamlama güncellemesini parent'a iletmek için Output eklenebilir.
  }

  editTask(task: TaskModel) {
    this.editTaskEvent.emit(task);
  }

  showDeleteConfirm(task: TaskModel) {
    this.deleteConfirmId = task.id;
  }

  deleteTask(task: TaskModel) {
    this.deleteTaskEvent.emit(task.id);
    this.deleteConfirmId = null;
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
    this.categoryFilter = 'all';
    this.completedFilter = 'all';
    this.sortOrder = 'default';
    this.priorityFilter = 'all';
  }

  get filteredTasks(): TaskModel[] {
    let filtered = this.tasks;
    if (this.categoryFilter && this.categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === this.categoryFilter);
    }
    if (this.priorityFilter && this.priorityFilter !== 'all') {
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
    if (category.toLowerCase().includes('okul')) return 'category-school';
    if (category.toLowerCase().includes('ev')) return 'category-home';
    return 'category-other';
  }
}
