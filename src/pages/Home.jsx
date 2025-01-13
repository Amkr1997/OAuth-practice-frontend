import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useGetAuthorQuery,
  useGetInfoQuery,
  useGetProfileQuery,
} from "../features/apiSlice";

const Home = () => {
  const [todoVal, setTodoVal] = useState("");
  const [userData, setUserData] = useState(null);
  const googleAccessToken = Cookies.get("googleTodo_access_token") || "";
  const { data: profileInfo } = useGetInfoQuery(undefined, {
    skip: googleAccessToken === "",
  });
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: googleAccessToken !== "",
  });
  const { data: authorData } = useGetAuthorQuery(userData?.id, {
    skip: !userData?.id,
  });
  const [addTodo] = useAddTodoMutation();
  const { data, isLoading, isError, error } = useGetAllTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    if (profileInfo) {
      setUserData(profileInfo);
    } else if (profileData) {
      setUserData(profileData?.user);
    }
  }, [profileInfo, profileData]);

  const handleTodoChange = (e) => {
    const { value } = e.target;

    setTodoVal(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (todoVal !== "") {
        await addTodo({ todo: todoVal, author: authorData?.[0]?._id }).unwrap();
      }
    } catch (error) {
      console.log(error);
    }

    setTodoVal("");
  };

  const handleTodoDeletion = async (todoId) => {
    try {
      await deleteTodo(todoId);
    } catch (error) {
      console.log(error);
    }
  };

  const authorTodos = data?.todos?.filter(
    (todos) => todos.author === authorData?.[0]?._id
  );

  return (
    <main className="container">
      <Navbar />
      <section className="container py-4 d-flex flex-column align-items-center">
        <form onSubmit={handleSubmit} className="text-center">
          <label className="form-label">
            <h2 className="display-4 fw-normal">Add a Todo</h2>
          </label>
          <br />
          <input
            type="text"
            value={todoVal}
            onChange={handleTodoChange}
            className="form-control"
          />
          <br />
          <button type="submit" className="btn btn-info w-100">
            Submit
          </button>
        </form>
        <h1 className="pt-5 pb-2">All Listed Todos</h1>
        {isError && <h2>{error.message}</h2>}
        <ul className="list-group w-50">
          {!isLoading ? (
            authorTodos
              ?.map((todo) => {
                return (
                  <li
                    key={todo._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span className="fs-5">{todo.todo}</span>{" "}
                    <button
                      onClick={() => handleTodoDeletion(todo._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </li>
                );
              })
              .reverse()
          ) : (
            <h1 className="text-center">LOADING...</h1>
          )}
        </ul>
      </section>
    </main>
  );
};

export default Home;
