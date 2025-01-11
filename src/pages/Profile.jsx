import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthor, postAuthorDetails } from "../features/authorSlice";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const googleAccessToken = Cookies.get("googleTodo_access_token") || "";
  const { author } = useSelector((state) => state.author);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (googleAccessToken) {
        try {
          //Retrive user info
          const userResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${googleAccessToken}`,
              },
            }
          );

          setUserData(userResponse?.data);
        } catch (error) {
          window.location.href = "/";
          console.log(error);
          console.log(JSON.stringify(error, undefined, 2));
        }
      } else if (location.pathname.includes("v2")) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/user/profile/google`
          );

          setUserData(response?.data?.user);
        } catch (error) {
          if (error.status === 403 || error.status === 500) {
            window.location.href = "/";
          }
        }
      } else {
        window.location.href = "/";
      }
    })();
  }, [googleAccessToken]);

  useEffect(() => {
    if (userData) {
      if (author.length === 0) {
        dispatch(
          postAuthorDetails({
            name: userData.name,
            email: userData.email,
            profilePic: userData.picture,
            id: userData.id,
          })
        );
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      dispatch(fetchAuthor(userData?.id));
    }
  }, [userData]);

  return <></>;
};

export default Profile;
