import Head from 'next/head';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import { getAllTodos } from '@/api';
import { useEffect, useState } from 'react';

export default function Home() {
  // const tasks = await getAllTodos();
  const [tasks, setTasks] = useState([]);
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getAllTodos();
        setTasks(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const fetchTimeZone = async () => {
      try {
        const timeZoneData = await fetch('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
        const data = await timeZoneData.json();
        const time = data.datetime.split('T')[1].split('.')[0];
        setTimeZone(time);
      } catch (error) {
        console.error('Error fetching time zone:', error);
      }
    };

    fetchData();
    fetchTimeZone();

    const interval = setInterval(() => {
      fetchTimeZone();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Head>
        <title>Simple Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Todo List App</h1>
          <h1>{timeZone}</h1>
          <AddTask />
        </div>
        <TodoList tasks={tasks} />
      </main>
    </>
  );
}
