import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFilter, TaskLabel } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  filter: TaskFilter;
  setFilter: React.Dispatch<React.SetStateAction<TaskFilter>>;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Initial sample tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finalize the project proposal for the client meeting',
    completed: false,
    label: 'work',
    dueDate: new Date(Date.now() + 86400000), // tomorrow
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Grocery shopping',
    description: 'Buy fruits, vegetables, and milk',
    completed: false,
    label: 'shopping',
    dueDate: new Date(Date.now() + 172800000), // day after tomorrow
    createdAt: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: '3',
    title: 'Morning workout',
    description: '30 minutes of cardio and strength training',
    completed: true,
    label: 'health',
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
];

const initialFilter: TaskFilter = {
  searchTerm: '',
  labels: [],
  showCompleted: true,
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filter, setFilter] = useState<TaskFilter>(initialFilter);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Apply filters to tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (!filter.showCompleted && task.completed) return false;
    
    // Filter by labels
    if (filter.labels.length > 0 && !filter.labels.includes(task.label)) return false;
    
    // Filter by search term
    if (filter.searchTerm && !task.title.toLowerCase().includes(filter.searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        addTask, 
        updateTask, 
        deleteTask, 
        toggleTaskCompletion,
        filter,
        setFilter,
        filteredTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};