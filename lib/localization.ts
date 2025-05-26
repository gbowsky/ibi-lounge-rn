import { I18n } from "i18n-js";
import { shadow } from "react-native-paper";

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  en: {
    screens: {
      schedules: "Schedules",
      grades: "Grades",
      settings: "Settings",
      links: "Links",
      news: "News",
    },
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
      "Here you can view your class schedules, grades and resources of International Banking Institure",
    continue: "Continue",
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
      online: "Online",
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

    no_lessons: {
      title: "No lessons",
      desc: "Or IBI's site decided to go down temporarily",
      try_again: "Reload",
    },

    no_grades: {
      title: "No grades",
      desc: "Or IBI's site decided to go down temporarily",
      try_again: "Reload",
      GRADES_DATA_MISMATCH_title: "Data mismatch",
      GRADES_DATA_MISMATCH_desc:
        "The entered last name does not match the PIN code",
      FST_ERR_VALIDATION_title: "Validation error",
      FST_ERR_VALIDATION_desc: "Please check your input and try again",
    },

    no_links: {
      title: "No links",
      desc: "Or IBI's site decided to go down temporarily",
      try_again: "Reload",
    },

    links: {
      eos: "Unified Digital Learning Environment (Moodle)",
      contacts: "Contacts",
      employees: "Teaching Staff",
    },

    calendar: {
      title: "Add schedule to calendar app",
      description:
        "Copy link below and use it to subscribe inside your calendar app — then your schedule will be available inside your regular calendar app!",
      descriptionIntent:
        "Press the button below to add your schedule into your calendar app",
      subscribe: "Subscribe to ",
      link: "Your link:",
      close: "Cancel",
    },

    settings: {
      features: "Features",
      teacherMode: "Teacher mode",
      dataForGrades: "Data for grades",
      dataForSchedule: "Data for schedule",
      pin: "PIN",
      enterPin: "Enter PIN",
      group: "Group",
      educationLevel: "Education level",
      lastName: "Last name",
      enterLastName: "Enter last name",
      blurEffectsTitle: "Enable blur effects",
      blurEffectsDesc: "May affect performance",
    },

    show_groups_schedule: "Groups schedules",
    show_teachers_schedule: "Teachers schedules",

    lessonNow: "Now",

    news: {
      updated_at: "Last update at",
    },
  },
  ru: {
    screens: {
      schedules: "Расписание",
      grades: "Оценки",
      settings: "Настройки",
      links: "Ссылки",
      news: "Новости",
    },
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
      lecture: "Лекция",
      practice: "Практика",
      consultation: "Консультация",
      subject_report_with_grade: "Диф. зачёт",
      exam: "Экзамен",
      subject_report: "Зачёт",
      course_work_defend: "Защита курсовой",
      library_day: "Библ. день",
      project_work: "Проектная деят.",
      meeting: "Собрание",
      online: "Онлайн",
    },
    icon_types: {
      lecture: "human-male-board",
      practice: "hammer-screwdriver",
      consultation: "alert",
      subject_report_with_grade: "alert",
      exam: "fire-circle",
      subject_report: "alert",
      course_work_defend: "alert",
      library_day: "book-multiple",
      project_work: "hammer-screwdriver",
      meeting: "calendar-account",
      online: "web",
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

    no_lessons: {
      title: "Пар нет",
      desc: "Или МБИ временно отдаёт пустое расписание",
      try_again: "Обновить",
    },

    no_grades: {
      title: "Ничего не найдено",
      desc: "Или МБИ временно не отдаёт список оценок",
      try_again: "Обновить",
      GRADES_DATA_MISMATCH_title: "Неверно введены данные",
      GRADES_DATA_MISMATCH_desc: "Введённая фамилия не соответствует пин-коду",
      FST_ERR_VALIDATION_title: "Неверные данные",
      FST_ERR_VALIDATION_desc: "Проверьте правильность введённых данных",
    },

    no_links: {
      title: "Нет ссылок",
      desc: "Или МБИ временно не отдаёт ссылки",
      try_again: "Обновить",
    },

    schedules: {
      unknown_teacher: "Неизвестный преподаватель",
      lesson_now: "Сейчас",
      compensation_for: "Компенсация за",
    },

    calendar: {
      title: "Добавление в календарь",
      description:
        "Скопируйте ссылку ниже и воспользуйтесь ей для подписки в вашем календарном приложении — так ваше расписание будет доступно внутри обычного календаря!",
      descriptionIntent:
        "Нажмите на кнопку ниже чтобы подписаться на календарь для вашей группы — так ваше расписание будет доступно внутри обычного календаря!",
      subscribe: "Подписаться на расписание ",
      link: "Ваша ссылка:",
      close: "Отмена",
    },

    links: {
      eos: "Единая электронная образовательная среда (ЕЭОС)",
      contacts: "Контакты",
      employees: "Педагогический состав",
    },

    settings: {
      features: "Фишки",
      teacherMode: "Режим преподавателя",
      dataForGrades: "Данные для оценок",
      dataForSchedule: "Данные для расписания",
      pin: "PIN",
      enterPin: "ПИН может быть в вашем студаке или договоре",
      group: "Группа",
      educationLevel: "Уровень образования",
      lastName: "Фамилия",
      enterLastName: "Введите фамилию",
      blurEffectsTitle: "Включить эффекты размытия",
      blurEffectsDesc: "Может повлиять на производительность",
    },

    show_teachers_schedule: "Расписание преподавателей",
    show_groups_schedule: "Расписание групп",

    lessonNow: "Сейчас",

    news: {
      updated_at: "Обновлено в",
    },
  },
});
