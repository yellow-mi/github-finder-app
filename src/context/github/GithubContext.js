import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial users (testing purpose)
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    fetch(`${GITHUB_URL}/search/users?${params}`)
      .then((response) => response.json())
      .then(({ items }) => {
        dispatch({
          type: "GET_USERS",
          payload: items,
        });
      });

    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`,
    //   },
    // })

    // const { items } = await response.json()
  };

  // Clear users from state
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  // Set loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        clearUsers,
        searchUsers,
        loading: state.loading,
        users: state.users,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
