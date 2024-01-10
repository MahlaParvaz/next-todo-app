import {
  CheckIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
const TodoList = ({ data, onDelete }) => {
  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(({ data }) => {
        console.log(data.todos);
        setData(data.todos);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-screen-md bg-white p-2 md:p-4 rounded-xl">
      {data.map((todo) => {
        return (
          <div
            key={todo.id}
            className="flex items-center justify-between border 
        border-gray-100 mb-4 p-3 md:p-4 rounded-xl"
          >
            <span>{todo.title}</span>
            <div className=" flex gap-x-3 items-center">
              <button>
                <CheckIcon className="w-6 h-6 stroke-green-400" />
              </button>
              <button onClick={() => onDelete(todo.id)}>
                <TrashIcon className="w-6 h-6 stroke-red-400" />
              </button>
              <button>
                <PencilSquareIcon className="w-6 h-6 stroke-blue-400" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
