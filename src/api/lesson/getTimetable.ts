import { WebUntis } from "webuntis";
import { getUserData } from "../../util/getUserData.js";

interface Lesson {
  className: string;
  startTime: string;
  endTime: string;
  room: string;
  roomShort: string;
  teacher: string;
  teacherShort: string;
  orignalTeacher?: string;
  subject: string;
  subjectShort: string;
}

export interface TimetableData {
  lessons: Lesson[];
}

export const getTimeTableForDate = async (
  date: Date,
): Promise<TimetableData> => {
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

  let data: TimetableData = { lessons: [] };

  try {
    const temp = await untisInstance.getOwnTimetableFor(date);

    if (temp.length == 0) {
      console.log("No lessons for that day");
    } else {
      temp.sort((a, b) => a.startTime - b.startTime);
      for (let i = 0; i < temp.length; i++) {
        // This regex inserts a ":" after the first two digits - for time formatting since the API returns time as 1234
        let insertRegex = /(\d{2})/;
        if (temp[i].startTime.toString().length === 3) {
          // In case the time is only 3 digits long, insert a ":" after the first digit
          insertRegex = /(\d{1})/;
        }
        const lesson = temp[i];
        const currentLesson: Lesson = {
          className: lesson.kl[0].longname,
          startTime: lesson.startTime.toString().replace(insertRegex, "$1:"),
          endTime: lesson.endTime.toString().replace(insertRegex, "$1:"),
          room: lesson.ro[0].longname,
          roomShort: lesson.ro[0].name,
          teacher: lesson.te[0].longname,
          teacherShort: lesson.te[0].name,
          orignalTeacher: lesson.te[0].orgname,
          subject: lesson.su[0].longname,
          subjectShort: lesson.su[0].name,
        };
        data.lessons.push(currentLesson);
      }
    }
  } catch (error) {
    console.error(`[ERROR] While trying to get timetable: \n${error}`);
  }
  await untisInstance.logout();
  return data;
};
