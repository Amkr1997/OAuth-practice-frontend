import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  useAddAuthorMutation,
  useGetAllTodosQuery,
  useGetAuthorQuery,
  useGetInfoQuery,
  useGetProfileQuery,
} from "../features/apiSlice";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const googleAccessToken = Cookies.get("googleTodo_access_token") || "";
  const { data: allTodos, isLoading: todoLoading } = useGetAllTodosQuery();
  const { data: profileInfo, isLoading } = useGetInfoQuery(undefined, {
    skip: googleAccessToken === "",
  });
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: googleAccessToken !== "",
  });
  const { data: authorData, refetch: refetchUserData } = useGetAuthorQuery(
    userData?.id,
    { skip: !userData?.id }
  );
  const [addAuthor] = useAddAuthorMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileInfo) {
      setUserData(profileInfo);
    } else if (profileData) {
      setUserData(profileData?.user);
    }
  }, [profileInfo, profileData]);

  useEffect(() => {
    (async () => {
      try {
        if (userData && authorData) {
          if (authorData?.[0]?.id !== userData?.id) {
            await addAuthor({
              name: userData.name,
              email: userData.email,
              profilePic: userData.picture,
              id: userData.id,
            });
          }

          refetchUserData();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [authorData, userData]);

  const handleLogout = () => {
    Cookies.remove("googleTodo_access_token");
    navigate("/");
  };

  const authorTodos = allTodos?.todos?.filter(
    (todos) => todos.author === authorData?.[0]?._id
  );

  return (
    <>
      <Navbar />
      <main className="container text-center mt-4">
        <h1 className="fw-medium">Todo Author Data</h1>
        {!isLoading ? (
          <section className="mt-4">
            <div className="card w-50 mx-auto border border-3">
              <div className="d-flex align-items-center justify-content-center gap-4 py-4">
                <img
                  src={authorData?.[0]?.profilePic}
                  alt="profile-image"
                  className="rounded-circle"
                />
                <button
                  className="btn btn-danger btn-sm mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
              <h4>
                Name:{" "}
                <span className="text-danger">
                  {authorData?.[0]?.name || "Log in"}
                </span>
              </h4>
              <h4>
                Email:{" "}
                <span className="text-danger">
                  {authorData?.[0]?.email || "Log in"}
                </span>
              </h4>
            </div>

            <div className="my-2 w-50 mx-auto">
              <h2 className="py-3">Author Todos</h2>

              <ul className="list-group">
                {!todoLoading ? (
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
        ) : (
          <h2 className="text-center mt-4">Loading...</h2>
        )}
      </main>
    </>
  );
};

export default Profile;
