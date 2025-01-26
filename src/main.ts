import { configDotenv } from "dotenv";
configDotenv();

import { getTimeTableForDate } from "./api/lesson/getTimetable.js";
import { userInterface } from "./frontend/frontend.js";

const main = async () => {
  const dayplustwo = new Date();
  dayplustwo.setDate(dayplustwo.getDate() +2);
  const data = await getTimeTableForDate(dayplustwo);
  userInterface(data);
};

main();
