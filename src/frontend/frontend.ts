import { Lesson } from "webuntis";
import { TimetableData } from "../api/lesson/getTimetable";

enum boxCharTypes {
  Vertical = 0,
  Horizontal,
  Upperleft,
  Upperright,
  Lowerleft,
  Lowerright,
}
const type = boxCharTypes;

const boxChars = ["║", "═", "╔", "╗", "╚", "╝"];

function createAsciiBox(lessons: string[]): string {
  const maxLineLength = Math.max(...lessons.map((line) => line.length));
  const boxWidth = maxLineLength + 2;

  const topBorder = `${boxChars[type.Upperleft]}${boxChars[
    type.Horizontal
  ].repeat(boxWidth)}${boxChars[type.Upperright]}`;

  const bottom = `${boxChars[type.Lowerleft]}${boxChars[type.Horizontal].repeat(
    boxWidth,
  )}${boxChars[type.Lowerright]}`;

  const lessonLines = lessons.map((line) => {
    const padding = " ".repeat(boxWidth - line.length);
    return `${boxChars[type.Vertical]}${line}${padding}${
      boxChars[type.Vertical]
    }`;
  });

  return [topBorder, ...lessonLines, bottom].join("\n");
}

export function userInterface(data: TimetableData) {
  var lessonText: string[];

  console.log("Yo");

  lessonText = [""];
  for (let i = 0; i < data.lessons.length; i++) {
    if (i == 0) {
      lessonText = [`Lesson ${i + 1}: ${data.lessons[i].subject}`];
    }
    lessonText.push(` - from: ${data.lessons[i].startTime}`);
    lessonText.push(` - until: ${data.lessons[i].endTime}`);
    if (data.lessons[i].orignalTeacher != undefined) {
      lessonText.push(
        ` - teacher: (${data.lessons[i].orignalTeacher}) ${data.lessons[i].teacher}`,
      );
    } else {
      lessonText.push(` - teacher: ${data.lessons[i].teacher}`);
    }
  }

  console.log(createAsciiBox(lessonText));
}
