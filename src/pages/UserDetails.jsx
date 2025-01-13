import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useGetAllTodosQuery } from "../features/apiSlice";

const UserDetails = () => {
  const { state } = useLocation();
  const { data: allTodos, isLoading } = useGetAllTodosQuery();

  const authorTodos = allTodos?.todos?.filter(
    (todo) => todo.author === state?._id
  );

  return (
    <>
      <Navbar />
      <main className="container text-center mt-4">
        <h1 className="fw-medium">User Details</h1>
        <section className="mt-4">
          <div className="card w-50 mx-auto border border-3">
            <div className="d-flex align-items-center justify-content-center gap-4 py-4">
              <img
                src={state?.profilePic}
                alt="profile-image"
                className="rounded-circle text-center"
                style={{ height: "4rem", width: "4rem" }}
              />
            </div>
            <h4>
              Name: <span className="text-danger">{state?.name}</span>
            </h4>
            <h4>
              Email: <span className="text-danger">{state?.email}</span>
            </h4>
          </div>

          <div className="my-2 w-50 mx-auto">
            <h2 className="py-3">Author Todos</h2>

            <ul className="list-group">
              {!isLoading ? (
                authorTodos?.map((todo) => {
                  return (
                    <li
                      className="list-group-item fs-4 text-capitalize fw-medium"
                      key={todo._id}
                    >
                      {todo.todo}
                    </li>
                  );
                })
              ) : (
                <h3 className="text-center mt-4">Loading...</h3>
              )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDetails;
