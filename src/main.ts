import { configDotenv } from "dotenv";
configDotenv();

import {
  getTimetableForToday,
  getTimeTableForDate,
} from "./api/lesson/getTimetable";

const main = async () => {
  const data = await getTimetableForToday();
  console.log(data);

  const dayplustwo = new Date();
  dayplustwo.setDate(dayplustwo.getDate() + 2);

  const data2 = await getTimeTableForDate(dayplustwo);
  console.log(data2);
};

main();
