import React from 'react';
import { BarChart3, PieChart, Calendar, TrendingUp } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const Analytics: React.FC = () => {
  const { tasks } = useTask();

  // Calculate analytics data
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const todoTasks = tasks.filter(task => task.status === 'todo');

  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

  // Priority distribution
  const priorityStats = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length,
  };

  // Tasks completed this week
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const thisWeekCompleted = completedTasks.filter(task => {
    const completedDate = new Date(task.updatedAt);
    return completedDate >= weekStart && completedDate <= weekEnd && task.status === 'done';
  }).length;

  // Overdue tasks
  const overdueTasks = tasks.filter(task => {
    if (!task.deadline || task.status === 'done') return false;
    return new Date(task.deadline) < new Date();
  }).length;

  const statusData = [
    { label: 'Completed', count: completedTasks.length, color: 'bg-green-500', percentage: (completedTasks.length / totalTasks) * 100 },
    { label: 'In Progress', count: inProgressTasks.length, color: 'bg-blue-500', percentage: (inProgressTasks.length / totalTasks) * 100 },
    { label: 'To Do', count: todoTasks.length, color: 'bg-gray-500', percentage: (todoTasks.length / totalTasks) * 100 },
  ];

  const priorityData = [
    { label: 'High', count: priorityStats.high, color: 'bg-red-500', percentage: (priorityStats.high / totalTasks) * 100 },
    { label: 'Medium', count: priorityStats.medium, color: 'bg-yellow-500', percentage: (priorityStats.medium / totalTasks) * 100 },
    { label: 'Low', count: priorityStats.low, color: 'bg-green-500', percentage: (priorityStats.low / totalTasks) * 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="w-7 h-7 mr-3 text-blue-600" />
          Analytics Dashboard
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Tasks</p>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completion Rate</p>
              <p className="text-3xl font-bold">{Math.round(completionRate)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">This Week</p>
              <p className="text-3xl font-bold">{thisWeekCompleted}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Overdue</p>
              <p className="text-3xl font-bold">{overdueTasks}</p>
            </div>
            <Calendar className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Task Status Distribution</h3>
          </div>

          <div className="space-y-4">
            {statusData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">
                    {item.count} ({Math.round(item.percentage)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
          </div>

          <div className="space-y-4">
            {priorityData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.label} Priority</span>
                  <span className="text-sm text-gray-500">
                    {item.count} ({Math.round(item.percentage)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">{completedTasks.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Tasks Completed</p>
            <p className="text-xs text-gray-500">Great job!</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">In Progress</p>
            <p className="text-xs text-gray-500">Keep it up!</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-yellow-600">{todoTasks.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">To Do</p>
            <p className="text-xs text-gray-500">Let's tackle these!</p>
          </div>
        </div>
      </div>
    </div>
  );
};