import React, { useReducer } from "react";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // подключаем наш редьюсер
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search users
  // fetch user list from GitHub API
  const searchUsers = async (text) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const resJSON = await res.json();
    dispatch({ type: SEARCH_USERS, payload: resJSON.items });
  };

  // fetch single GitHub user
  const getUser = async (username) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const resJSON = await res.json();
    dispatch({ type: GET_USER, payload: resJSON });
  };

  // get repos
  // get user repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:desc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const resJSON = await res.json();
    dispatch({ type: GET_REPOS, payload: resJSON });
  };

  // clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // return Provider
  // всё, к чему нужен доступ глобально
  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        setLoading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
