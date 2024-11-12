import React, { useState, useEffect } from 'react';
import './MiddleSection.css';

function MiddleSection({ handleAddTask, handleUpdateTask, editingTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!task.title) {
      alert("Please enter a task title");
      return;
    }

    if (editingTask) {
      handleUpdateTask(task);
    } else {
      handleAddTask(task);
    }

    // Reset form
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
  };

  return (
    <div className="middle-section">
      <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <div className="task-form">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleSubmit}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </div>
  );
}

export default MiddleSection;
