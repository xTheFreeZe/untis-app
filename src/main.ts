import { configDotenv } from "dotenv";
configDotenv();

import { getTimeTableForDate } from "./api/lesson/getTimetable";
import { userInterface } from "./frontend/frontend";

const main = async () => {
  const dayplustwo = new Date();
  dayplustwo.setDate(dayplustwo.getDate() + 2);
  const data = await getTimeTableForDate(dayplustwo);

  userInterface(data);
};

main();
