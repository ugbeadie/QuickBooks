export const useGetUserInfo = () => {
  const { userId, name, picture } = JSON.parse(localStorage.getItem("auth"));
  return { userId, name, picture };
};
