import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../../types';
import { useTask } from '../../context/TaskContext';
import { TaskCard } from '../Tasks/TaskCard';
import { TaskModal } from '../Tasks/TaskModal';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-50 border-gray-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 border-blue-200' },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200' },
];

export const KanbanBoard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    moveTask(taskId, newStatus);
  };

  return (
    <div className="h-full overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-xl border-2 border-dashed p-4 ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as Task['status'])}
          >
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              {column.title}
              <span className="ml-2 bg-white px-2 py-1 rounded-full text-sm">
                {getTasksByStatus(column.id as Task['status']).length}
              </span>
            </h3>

            <div className="space-y-3">
              {getTasksByStatus(column.id as Task['status']).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-move"
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                    draggable
                  />
                </div>
              ))}
              
              {getTasksByStatus(column.id as Task['status']).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No tasks yet</p>
                  <p className="text-xs mt-1">Drag tasks here or create new ones</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};