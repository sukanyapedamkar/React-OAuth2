import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (loggedIn === true) {
        try {
          // Get posts from server
          const {
            data: { posts },
          } = await axios.get(`${serverUrl}/user/posts`);
          setPosts(posts);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`);
      // Check login state again
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <p>...Loading</p>
      ) : (
        <div>
          <h3>Dashboard</h3>
          <button className='btn' onClick={handleLogout}>
            Logout
          </button>
          <h4>{user?.name}</h4>
          <br />
          <p>{user?.email}</p>
          <br />
          <img src={user?.picture} alt={user?.name} />
          <br />
          <div>
            {posts.map((post, idx) => (
              <div>
                <h5>{post?.title}</h5>
                <p>{post?.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
