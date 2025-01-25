import boxen from "boxen";
import { TimetableData } from "../api/lesson/getTimetable.js";

export function userInterface(data: TimetableData) {
  const lessonText: string[] = [];

  for (let i = 0; i < data.lessons.length; i++) {
    lessonText.push(`Lesson ${i + 1}: ${data.lessons[i].subject}`);
    lessonText.push(` - From: ${data.lessons[i].startTime}`);
    lessonText.push(` - Until: ${data.lessons[i].endTime}`);
    lessonText.push(
      ` - Teacher: ${data.lessons[i].orignalTeacher ? `(${data.lessons[i].orignalTeacher}) ` : ""}${data.lessons[i].teacher}`,
    );
    lessonText.push(""); // Leerzeile zwischen den Stunden
  }

  const boxContent = lessonText.join("\n");

  console.log(
    boxen(boxContent, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
      align: "left",
    }),
  );
}
