import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (testing purpose)
  const fetchUsers = () => {
    setLoading()
    
    fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'GET_USERS',
          payload: data
        })
      });
  };

  // Set loading
  const setLoading = () => dispatch({
    type: 'SET_LOADING'
  })

  return (
    <GithubContext.Provider
      value={{
        fetchUsers,
        loading: state.loading,
        users: state.users,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext
