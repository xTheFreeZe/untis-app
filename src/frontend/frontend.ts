import boxen from "boxen"
import { TimetableData, Lesson } from "../api/lesson/getTimetable.js"

const lessonText: string[] = []
let lessonnum = 1

function lessonTextGen(lesson: Lesson) {
  lessonText.push(`Lesson ${lessonnum}: ${lesson.subject}`)
  lessonText.push(` - From: ${lesson.startTime}`)
  lessonText.push(` - Until: ${lesson.endTime}`)
  lessonText.push(
    ` - Teacher: ${lesson.orignalTeacher ? `(${lesson.orignalTeacher}) ` : ""}${
      lesson.teacher
    }`
  )
  lessonText.push("") // Leerzeile zwischen den Stunden
  lessonnum++
}

export function userInterface(data: TimetableData) {
  data.lessons.forEach((lesson) => {
    lessonTextGen(lesson)
  })

  const boxContent = lessonText.join("\n")

  console.log(
    boxen(boxContent, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
      align: "left",
    })
  )
}
