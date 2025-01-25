import { WebUntis, Lesson } from "webuntis";
import { getUserData } from "../../util/getUserData";

interface TimetableData {
  data: number;
  startTime: number;
  endTime: number;
  activityType?: string;
  code?: string;
  info?: string;
  subjectStringArrary: string[];
  roomStringArray: string[];
}

export const getTimetableForToday = async (): Promise<TimetableData | null> => {
  const userData = getUserData();

  const untisInstance = new WebUntis(
    userData.SCHOOL,
    userData.NAME,
    userData.PASSWORD,
    userData.SERVER,
  );

  try {
    await untisInstance.login();
  } catch (error) {
    console.error(`[ERROR] While trying to log in: \n${error}`);
  }

  let data: TimetableData | null = null;

  try {
    const temp = await untisInstance.getOwnTimetableForToday();

    // No lessons today
    if (temp.length == 0) {
      console.log("No lessons today");
      await untisInstance.logout();
    } else {
      console.log(temp);
      console.log(temp[0].kl);
      console.log(temp[0].te);
      console.log(temp[0].su);
      console.log(temp[0].ro);
    }
  } catch (error) {
    console.error(`[ERROR] While trying to get timetable: \n${error}`);
    return null;
  }
  await untisInstance.logout();
  return data;
};

export const getTimeTableForDate = async (
  date: Date,
): Promise<TimetableData | null> => {
  const userData = getUserData();

  const untisInstance = new WebUntis(
    userData.SCHOOL,
    userData.NAME,
    userData.PASSWORD,
    userData.SERVER,
  );

  try {
    await untisInstance.login();
  } catch (error) {
    console.error(`[ERROR] While trying to log in: \n${error}`);
  }

  let data: TimetableData | null = null;

  try {
    const temp = await untisInstance.getOwnTimetableFor(date);

    // No lessons today
    if (temp.length == 0) {
      console.log("No lessons for that day");
      await untisInstance.logout();
    } else {
      console.log(temp);
      console.log("kl data", temp[0].kl);
      console.log("te data", temp[0].te);
      console.log("su data", temp[0].su);
      console.log("ro data", temp[0].ro);
    }
  } catch (error) {
    console.error(`[ERROR] While trying to get timetable: \n${error}`);
    return null;
  }
  await untisInstance.logout();
  return data;
};
