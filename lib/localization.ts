import { I18n } from "i18n-js";

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  en: {
    setup: {
      welcome: "Welcome to\nIBI Lounge!",
      description:
        "Here you can view your class schedules, grades and resources of International Banking Institure",
      step2title: "Are you studying or teaching?",
      iAmStudent: "I'm a student",
      iAmTeacher: "I'm a teacher",
      step3title: "We need some info",
    },
    welcome: "Welcome to\nIBI Lounge!",
    description:
      "Здесь вы сможете просматривать своё расписание и оценки, а также посещать ресурсы Международного банковского института",
    continue: "Продолжить",
    step2title: "Are you studying or teaching?",
    iAmStudent: "I'm a student",
    iAmTeacher: "I'm a teacher",
    step3title: "We need some info",
    educationLevel: "Education level",
    yourGroup: "Your group",
    yourLastName: "Your last name",
    yourPin: "Your PIN",
    teacher: "Teacher",

    grade_types: {
      subject_report_with_grade: "Graded report",
      exam: "Exam",
      subject_report: "Subject report",
      course_work_defend: "Course work defendance",
      offline_course_work: "Course work",
      online_course_work: "Course work (online)",
    },
    types: {
      lecture: "📚Lecture",
      practice: "⚒️Practice",
      consultation: "⚠️Consulation",
      subject_report_with_grade: "⚠️Graded report",
      exam: "🔥Exam",
      subject_report: "⚠️Subject report",
      course_work_defend: "⚠️Course work defendance",
      library_day: "📚Library day",
      project_work: "⚒️Project work",
      meeting: "📅Meeting",
    },
    online: "🌎Online",

    grade: {
      unknown: "Unknown",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      failed: "failed",
      passed: "passed",
      absence: "no-show",
      not_admitted: "not admitted",
    },
  },
  ru: {
    setup: {
      welcome: "Встречайте\nIBI Lounge!",
      description:
        "Здесь вы сможете просматривать своё расписание и оценки, а также посещать ресурсы Международного банковского института им. Анатолия Собчака",
      step2title: "Вы учитесь\nили преподаёте?",
      iAmStudent: "Я студент",
      iAmTeacher: "Я преподаватель",
      step3title: "Введите немного о себе",
    },
    continue: "Продолжить",
    educationLevel: "Уровень образования",
    yourGroup: "Ваша группа",
    yourLastName: "Ваша фамилия",
    yourPin: "Ваш ПИН-код",
    teacher: "Преподаватель",

    types: {
      lecture: "📚Лекция",
      practice: "⚒️Практика",
      consultation: "⚠️Консультация",
      subject_report_with_grade: "⚠️Диф. зачёт",
      exam: "🔥Экзамен",
      subject_report: "⚠️Зачёт",
      course_work_defend: "⚠️Защита курсовой",
      library_day: "📚Библ. день",
      project_work: "⚒️Проектная деят.",
      meeting: "📅Собрание",
    },
    online: "🌎Онлайн",

    grade_types: {
      subject_report_with_grade: "Диф. зачёт",
      exam: "Экзамен",
      subject_report: "Зачёт",
      course_work_defend: "Защита курсовой",
      offline_course_work: "Курсовая работа",
      online_course_work: "Курсовая работа (онлайн)",
    },

    grade: {
      unknown: "Неизвестно",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      failed: "н/з",
      passed: "зачёт",
      absence: "н/я",
      not_admitted: "н/доп.",
    },
  },
});
