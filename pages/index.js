import axios from 'axios';
import { use, useEffect, useState } from 'react';
import useSWR from 'swr';
import TodoList from '../components/todos/TodoList';
import TodoForm from '../components/todos/AddNewTodo';

// const fetcher = async () => {
//   const { data } = await axios.get('/api/todos');
//   return data;
// };

export default function Home() {
  //   const { error, data } = useSWR('getTodos', fetcher);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('/api/todos')
      .then((res) => {
        setData(res.data.todos);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then((res) => {
        setData(data.filter((t) => t.id !== parseInt(id)));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const addTodo = (e, todo) => {
    e.preventDefault();
    axios
      .post(`/api/todos/`, { todo })
      .then(({ data }) => {
        setData(data.todos);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // if (error) return <div>some error occurd!</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen ">
      <nav className="w-full bg-white shadow-sm flex justify-center py-4 mb-6">
        <h1 className="font-bold">TodoList App using Next.js & TailwindCSS</h1>
      </nav>
      <div className="container p-2 xl:max-w-screen-xl mx-auto">
        <section className="flex md:flex-row md:items-start md:justify-center gap-x-8 flex-col gap-y-8 ">
          <TodoForm onAdd={addTodo} />
          <TodoList data={data} onDelete={deleteTodo} />
        </section>
      </div>
    </div>
  );
}
