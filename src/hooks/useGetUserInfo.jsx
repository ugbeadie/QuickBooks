export const useGetUserInfo = () => {
  const { name, email, picture, userId, userIsAuthenticated } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, email, picture, userId, userIsAuthenticated };
};
