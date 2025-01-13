import Navbar from "../components/Navbar";
import { useGetAllAuthorsQuery } from "../features/apiSlice";
import { Link } from "react-router-dom";

const Users = () => {
  const {
    data: todoAuthors,
    isLoading,
    isError,
    error,
  } = useGetAllAuthorsQuery();

  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="py-3 text-center text-uppercase">all users</h1>
        <section className="mt-4">
          {isError && <p>{error.message}</p>}
          {!isLoading ? (
            <ul className="list-group">
              {todoAuthors?.authors?.map((author) => (
                <li
                  key={author?._id}
                  className="list-group-item py-2 d-flex align-items-center justify-content-around flex-wrap"
                >
                  <img
                    src={author?.profilePic}
                    alt="Profile pic"
                    className="rounded-circle"
                    style={{ height: "4rem", width: "4rem" }}
                  />
                  <Link
                    to={`/userDetails/${author?._id}`}
                    state={author}
                    style={{ textDecoration: "none" }}
                  >
                    <h3 className="text-dark">
                      Name: <span className="text-danger">{author?.name}</span>
                    </h3>
                  </Link>
                  <h3>
                    Email: <span className="text-danger">{author?.email}</span>
                  </h3>
                </li>
              ))}
            </ul>
          ) : (
            <h1 className="text-center">Loading...</h1>
          )}
        </section>
      </main>
    </>
  );
};

export default Users;
