# API Documentation

# API calls for timetable data

## `getTimetableForDate(date: Date): Promise<TimetableData>`
```ts
import { getTimeTableForDate } from "./api/lesson/getTimetable";

// This call expects a date object as parameter and returns a promise with the timetable data for the given date.
const data = await getTimeTableForDate(new Date()); // returns a promise with the timetable data for today
```

If you want to request the data for let's say tomorrow, you can do it like this:
```ts
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const data = await getTimeTableForDate(tomorrow); // returns a promise with the timetable data for tomorrow
```

# Structures

## TimetableData
```ts
interface TimetableData {
  lessons: Lesson[];
}
```

## Lesson
```ts
interface Lesson {
  className: string;
  startTime: number;
  endTime: number;
  room: string;
  roomShort: string;
  teacher: string;
  teacherShort: string;
  orignalTeacher?: string;
  subject: string;
  subjectShort: string;
}
```
