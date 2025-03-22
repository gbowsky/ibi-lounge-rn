# IBI Lounge

Приложение для студентов и преподавателей МБИ

## Структура

- `app`: страницы приложения
- `components`: компоненты (с бизнес логикой кроме `ui`)
- `modules`: нативные модули
  - `schedules-settings`: нативный модуль для обновления UserDefaults
- `lib`: хелперы и прочее
- `stores`: Zustand сторы
  - `GradesSlice`: хранилище оценок
  - `SchedulesSlice`: хранилище расписания
  - `ApiStore`: api хранилище (объединение слайсов выше)
  - `SchedulesModalStore`: хранилище для расписания внутри модального окна
  - `UserPrefs`: хранилище настроек
- `targets`:
  - `widget`: iOS виджет
