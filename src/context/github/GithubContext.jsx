import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  return (
    <GithubContext.Provider
      value={{
        fetchUsers,
        loading,
        users,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext
