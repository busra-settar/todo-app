export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: 'Yüksek' | 'Orta' | 'Düşük';
  dueDate: string;
  completed: boolean;
}