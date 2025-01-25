interface UserData {
  NAME: string;
  PASSWORD: string;
  SCHOOL: string;
  SERVER: string;
}

/**
 * Get the user data from the environment variables
 * @returns UserData
 */
export const getUserData = (): UserData => {
  const school = process.env.SCHOOL ?? "";
  const username = process.env.NAME ?? "";
  const password = process.env.PASSWORD ?? "";
  const server = process.env.SERVER ?? "";

  return { NAME: username, PASSWORD: password, SCHOOL: school, SERVER: server };
};
