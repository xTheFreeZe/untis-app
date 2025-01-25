import { configDotenv } from "dotenv";
configDotenv();

import {
  getTimetableForToday,
  getTimeTableForDate,
} from "./api/lesson/getTimetable";

const main = async () => {
  const dayplustwo = new Date();
  dayplustwo.setDate(dayplustwo.getDate() + 2);

  const data = await getTimeTableForDate(dayplustwo);
  console.log(data.lessons);

  const dataToday = await getTimetableForToday();
  console.log(dataToday.lessons);
};

main();
