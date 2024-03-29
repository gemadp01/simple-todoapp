const baseUrl = 'http://localhost:3001/tasks';

export const getAllTodos = async () => {
  const res = await fetch(`${baseUrl}`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo) => {
  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
};

export const markTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const markTodo = await res.json();
  return markTodo;
};

export const searchTaskByName = async (taskName) => {
  const res = await fetch(`${baseUrl}?text=${taskName}`);
  const todos = await res.json();
  return todos;
};
