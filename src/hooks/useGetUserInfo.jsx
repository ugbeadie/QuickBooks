export const useGetUserInfo = () => {
  const { name, email, picture, userId, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, email, picture, userId, isAuth };
};
