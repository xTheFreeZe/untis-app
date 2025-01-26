import boxen from "boxen";
import chalk from "chalk";
import { TimetableData, Lesson } from "../api/lesson/getTimetable.js";

const lessonTextGen = (lesson: Lesson, lessonnum: number): string => {
  const lessonText: string[] = [];
  if (lesson.code === "cancelled") {
    const text = chalk.red(
      `Lesson ${lessonnum} got ${chalk.bold("cancelled")}:`,
    );
    lessonText.push(text);
  } else if (lesson.code === "irregular") {
    const text = chalk.yellow(
      `Lesson ${lessonnum} is ${chalk.bold("irregular")}:`,
    );
    lessonText.push(text);
  } else {
    lessonText.push(`Lesson ${lessonnum}:`);
  }
  lessonText.push(` - From: ${lesson.startTime}`);
  lessonText.push(` - Until: ${lesson.endTime}`);
  lessonText.push(
    ` - Teacher: ${lesson.orignalTeacher ? `(${lesson.orignalTeacher}) ` : ""}${
      lesson.teacher
    }`,
  );
  return lessonText.join("\n");
};

export const userInterface = (data: TimetableData) => {
  const lessonBoxes: string[] = [];
  let lessonnum = 1;

  for (const lesson of data.lessons) {
    if (lesson.code === "cancelled" || lesson.code === "irregular") {
      const lessonText = lessonTextGen(lesson, lessonnum);
      const lessonBox = boxen(lessonText, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: `${lesson.code === "cancelled" ? "red" : "yellow"}`,
        align: "left",
      });
      lessonBoxes.push(lessonBox);
      lessonnum++;
    } else {
      // just the normal lesson
      const lessonText = lessonTextGen(lesson, lessonnum);
      lessonBoxes.push(lessonText);
      lessonnum++;
      lessonBoxes.push("");
    }
  }

  const allLessonsBox = boxen(lessonBoxes.join("\n"), {
    padding: 0.5,
    margin: 0.5,
    borderStyle: "round",
    borderColor: "green",
    align: "left",
  });

  console.log(allLessonsBox);
};
