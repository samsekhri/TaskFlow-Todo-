import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Tag, Trash2, Edit2 } from 'lucide-react';
import { Task, TaskLabel } from '../../types';
import { useTasks } from '../../context/TaskContext';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
}

const labelColors: Record<TaskLabel, string> = {
  work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  health: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCompletionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (isEditing) {
    return <TaskForm task={task} onClose={() => setIsEditing(false)} />;
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div 
      className={`
        p-4 mb-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 
        ${task.completed 
          ? 'bg-gray-50 dark:bg-gray-900/40 opacity-70' 
          : 'bg-white dark:bg-gray-800 hover:shadow-md dark:hover:bg-gray-750'}
        transition-all duration-200 ease-in-out
        ${isOverdue ? 'border-l-4 border-l-red-500' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <button 
          onClick={handleCompletionToggle}
          className={`mt-1 flex-shrink-0 transition-colors text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 ${
            task.completed ? 'text-indigo-500 dark:text-indigo-400' : ''
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed 
            ? <CheckCircle2 size={20} className="text-indigo-500 dark:text-indigo-400" /> 
            : <Circle size={20} />
          }
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${labelColors[task.label]}`}>
              <Tag size={10} className="mr-1" />
              {task.label}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
              {task.description}
            </p>
          )}
          
          {task.dueDate && (
            <div className={`text-xs flex items-center mt-2 ${
              isOverdue ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              <Clock size={12} className="mr-1" />
              {formatDate(task.dueDate)}
              {isOverdue && !task.completed && (
                <span className="ml-1 font-medium">· Overdue</span>
              )}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleEdit}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;