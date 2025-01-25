import { WebUntisElementType, WebUntis } from "webuntis";
import { configDotenv } from "dotenv";
configDotenv();

import { getUserData } from "../util/getUserData";

const testFunction = async () => {
  const data = getUserData();

  const untisInstance = new WebUntis(
    data.SCHOOL,
    data.NAME,
    data.PASSWORD,
    data.SERVER,
  );

  await untisInstance.login();

  const timetable = await untisInstance.getTimetableFor(
    new Date(),
    0,
    WebUntisElementType.SUBJECT,
  );

  console.log(timetable);

  await untisInstance.logout();
};

testFunction();
