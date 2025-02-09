import { configDotenv } from "dotenv";
configDotenv();

import { getTimeTableForDate } from "./api/lesson/getTimetable.js";
import { userInterface } from "./frontend/frontend.js";

const main = async () => {
  const dayplustwo = new Date();
  dayplustwo.setDate(dayplustwo.getDate());
  const data = await getTimeTableForDate(dayplustwo);

  if (data.lessons.length == 0) {
    console.log(`Checked ${dayplustwo.toLocaleDateString()}`);
    return;
  }

  userInterface(data);
};

main();
