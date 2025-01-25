import { WebUntis } from "webuntis"
import { getUserData } from "../../util/getUserData"

export interface Lesson {
  className: string
  startTime: number
  endTime: number
  room: string
  roomShort: string
  teacher: string
  teacherShort: string
  orignalTeacher?: string
  subject: string
  subjectShort: string
}

export interface TimetableData {
  lessons: Lesson[]
}

export const getTimetableForToday = async (): Promise<TimetableData> => {
  const userData = getUserData()

  const untisInstance = new WebUntis(
    userData.SCHOOL,
    userData.NAME,
    userData.PASSWORD,
    userData.SERVER
  )

  try {
    await untisInstance.login()
  } catch (error) {
    console.error(`[ERROR] While trying to log in: \n${error}`)
  }

  let data: TimetableData = { lessons: [] }

  try {
    const temp = await untisInstance.getOwnTimetableForToday()

    // No lessons today
    if (temp.length == 0) {
      console.log("No lessons today")
    } else {
      temp.sort((a, b) => a.startTime - b.startTime)
      for (let i = 0; i < temp.length; i++) {
        const lesson = temp[i]
        const currentLesson: Lesson = {
          className: lesson.kl[0].longname,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          room: lesson.ro[0].longname,
          roomShort: lesson.ro[0].name,
          teacher: lesson.te[0].longname,
          teacherShort: lesson.te[0].name,
          orignalTeacher: lesson.te[0].orgname,
          subject: lesson.su[0].longname,
          subjectShort: lesson.su[0].name,
        }
        data.lessons.push(currentLesson)
      }
    }
  } catch (error) {
    console.error(`[ERROR] While trying to get timetable: \n${error}`)
  }
  await untisInstance.logout()
  return data
}

export const getTimeTableForDate = async (
  date: Date
): Promise<TimetableData> => {
  const userData = getUserData()

  const untisInstance = new WebUntis(
    userData.SCHOOL,
    userData.NAME,
    userData.PASSWORD,
    userData.SERVER
  )

  try {
    await untisInstance.login()
  } catch (error) {
    console.error(`[ERROR] While trying to log in: \n${error}`)
  }

  let data: TimetableData = { lessons: [] }

  try {
    const temp = await untisInstance.getOwnTimetableFor(date)

    if (temp.length == 0) {
      console.log("No lessons for that day")
    } else {
      temp.sort((a, b) => a.startTime - b.startTime)
      for (let i = 0; i < temp.length; i++) {
        const lesson = temp[i]
        const currentLesson: Lesson = {
          className: lesson.kl[0].longname,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          room: lesson.ro[0].longname,
          roomShort: lesson.ro[0].name,
          teacher: lesson.te[0].longname,
          teacherShort: lesson.te[0].name,
          orignalTeacher: lesson.te[0].orgname,
          subject: lesson.su[0].longname,
          subjectShort: lesson.su[0].name,
        }
        data.lessons.push(currentLesson)
      }
    }
  } catch (error) {
    console.error(`[ERROR] While trying to get timetable: \n${error}`)
  }
  await untisInstance.logout()
  return data
}
