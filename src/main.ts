import { WebUntis } from "webuntis";
import { configDotenv } from "dotenv";
configDotenv();

const school = process.env.SCHOOL ?? "";
const username = process.env.NAME ?? "";
const password = process.env.PASSWORD ?? "";
const server = process.env.SERVER ?? "";

const untis = new WebUntis(school, username, password, server);

const main = async () => {
  try {
    await untis.login();
    console.log("[SUCCESS] Logged in");
  } catch (error) {
    console.error(error);
  }

  const yersterday = new Date();
  yersterday.setDate(yersterday.getDate() - 2); // -2 für Vorgestern
  const timetable = await untis.getOwnTimetableFor(yersterday);
  const classes = timetable.map((lesson) => lesson.su[0].longname);

  console.log(classes);

  try {
    await untis.logout();
    console.log("[SUCCESS] Logged out");
  } catch (error) {
    console.error(error);
  }
};

main();
