//
//  daily_widgetBundle.swift
//  daily-widget
//
//  Created by g.gorbovskoy on 05.08.2023.
//

import WidgetKit
import SwiftUI

extension View {
  func widgetBackground(_ color: Color) -> some View {
    if #available(iOSApplicationExtension 17.0, macOSApplicationExtension 14.0, *) {
      return containerBackground(color, for: .widget)
    } else {
      return background(color)
    }
  }
}

struct DailyWidgetTimelineEntry: TimelineEntry {
  var date: Date
  let lessons: [Lesson]?
  let error: Errors?
  let dayIndex: Int;
  let isEmpty: Bool;
  let left: Int;
}

struct DailyWidgetTimelineProvider: TimelineProvider {
  typealias Entry = DailyWidgetTimelineEntry
  let schedules: DaysRequestResult = .error(.unknown_error)
  
  // Provides a timeline entry representing a placeholder version of the widget.
  func placeholder(in context: Context) -> DailyWidgetTimelineEntry {
    return DailyWidgetTimelineEntry(
      date: .now,
      lessons: [.init(text: "ЛинАлгИГеом", time_start: "09:00", time_end: "10:40", additional: .init(is_online: false, type: .consultation, classroom: "МС-34", teacher_name: "Павлушеов И.В."))],
      error: nil,
      dayIndex: 0,
      isEmpty: false,
      left: 2
    )
  }
  
  // Provides a timeline entry that represents the current time and state of a widget.
  func getSnapshot(in context: Context, completion: @escaping (DailyWidgetTimelineEntry) -> Void) {
    completion(
      DailyWidgetTimelineEntry(
        date: .now,
        lessons: [.init(text: "ЛинАлгИГеом", time_start: "09:00", time_end: "10:40", additional: .init(is_online: false, type: .consultation, classroom: "МС-34", teacher_name: "Павлушков И.В."))],
        error: nil,
        dayIndex: 0,
        isEmpty: false,
        left: 0
      )
    )
  }
  
  private func getMode() -> String {
    return UserDefaults.standard.string(forKey: "mode") ?? "student";
  }
  
  private func getTeacher() -> String {
    let teacher = UserDefaults.standard.object(forKey: "teacher") as? StoredItem ?? StoredItem.init(id: "0", name: "Любой");
    
    print("Teacher now is \(teacher)")
    return teacher.id;
  }
  
  private func getGroup() -> String {
    let group = UserDefaults.standard.object(forKey: "group") as? StoredItem ?? StoredItem.init(id: "2352", name: "113-ПИвЭ");
    
    print("Group now is \(group)")
    return group.id;
  }
  
  // Provides an array of timeline entries for the current time and, optionally, any future times to update a widget.
  func getTimeline(in context: Context, completion: @escaping (Timeline<DailyWidgetTimelineEntry>) -> Void) {
    Task.init {
      do {
        let result = getMode() == "student" ? await Requests().fetchSchedules(from: .now, to: Date().advanced(by: 3600 * 24), group: getGroup(), teacher: nil) : await Requests().fetchSchedules(from: .now, to: Date().advanced(by: 3600 * 24), group: nil, teacher: getTeacher());
        
        switch result {
        case .error(let error):
          let entry = DailyWidgetTimelineEntry(date: .now, lessons: [], error: error, dayIndex: 1, isEmpty: false, left: 0)
          let timeline = Timeline(entries: [entry], policy: .after(Date().getNext15Minutes()))
          completion(timeline)
        case .response(let days):
          let dfmatter = DateFormatter();
          let year = Calendar(identifier: .gregorian).dateComponents([.year], from: .now).year
          dfmatter.dateFormat = "dd.MM.yyyy HH:mm";
          
          if days.isEmpty {
            let entry = DailyWidgetTimelineEntry(date: .now, lessons: [], error: nil, dayIndex: 1, isEmpty: true, left: 0)
            let timeline = Timeline(entries: [entry], policy: .after(Date().getNext15Minutes()))
            completion(timeline);
            return;
          }
          
          let firstDayIncomplete = days[0]?.lessons.filter { first in
            let dateStr = "\(days[0]!.day).\(days[0]!.month).\(year!) \(first.time_end)";
            let time_end = dfmatter.date(from: dateStr);
            print(time_end!, Date.now);
            
            return !(time_end! < .now);
          } ?? [];
          
          var nextDayIncomplete: [Lesson] = [];
          
          if days.count == 2 {
            nextDayIncomplete = days[1]?.lessons.filter { second in
              let dateStr = "\(days[1]!.day).\(days[1]!.month).\(year!) \(second.time_end)";
              let time_end = dfmatter.date(from: dateStr)
              print(time_end!, Date.now);
              
              return !(time_end! < .now);
            } ?? []
          }
          
          let isFirstNotToday = Int(days[0]?.day ?? "0")! != Calendar(identifier: .gregorian).dateComponents([.day], from: .now).day!;
          
          var lessons = !firstDayIncomplete.isEmpty ? firstDayIncomplete : nextDayIncomplete;
          let dayIndex = (isFirstNotToday || firstDayIncomplete.isEmpty) ? 1 : 0;
          var left = 0;
          
          let lesCount = lessons.count;
          
          if lesCount > 2 {
            lessons = Array(lessons[0...2])
            left = lesCount - 3;
          }
          
          let entry = DailyWidgetTimelineEntry(
            date: .now,
            lessons: lessons,
            error: nil,
            dayIndex: dayIndex,
            isEmpty: lessons.isEmpty,
            left: left
          )
          let timeline = Timeline(entries: [entry], policy: .after(Date().getNext15Minutes()))
          
          completion(timeline)
        }
      }
    }
  }
}

struct DailyWidgetEntryView: View {
  var entry: DailyWidgetTimelineProvider.Entry
  
  var body: some View {
    VStack(spacing: 0) {
      Text(entry.dayIndex == 0 ? "Пары на сегодня" : "Пары на завтра")
        .font(.caption)
        .fontWeight(.medium)
        .foregroundStyle(.blue)
        .frame(maxWidth: .infinity)
        .padding(.top, 6)
      VStack(alignment: .leading, spacing: 3) {
        if entry.error != nil {
          if (entry.error == .no_schedules) {
            NoSchedules()
          } else {
            Image(systemName: entry.error!.icon)
              .resizable(resizingMode: .stretch)
              .frame(width: 32, height: 32)
            Text(LocalizedStringKey(entry.error!.title))
          }
        } else if entry.isEmpty {
          NoSchedules()
        } else {
          ForEach(entry.lessons!) { lesson in
            WidgetLesson(lesson: lesson)
          }
          
          if entry.left != 0 {
            Text(String(localized: "\(entry.left) widget.left"))
              .font(.caption2)
              .foregroundStyle(.tertiary)
          }
        }
      }
      .padding(.all, 10)
      .frame(
        minWidth: 0,
        maxWidth: .infinity,
        minHeight: 0,
        maxHeight: 148,
        alignment: .topLeading
      )
      .background(Color("BackgroundPrimary"))
      .cornerRadius(20)
    }
    .widgetBackground(Color("BackgroundSecondary"))
  }
}

struct DailyWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(
      kind: "space.utme.raspisansu.daily-widget",
      provider: DailyWidgetTimelineProvider()) { entry in
        DailyWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("widget.name")
      .description("widget.description")
      .supportedFamilies([.systemSmall, .systemMedium])
      .contentMarginsDisabled()
  }
}

#Preview(as: .systemSmall) {
  DailyWidget()
} timeline: {
  DailyWidgetTimelineEntry(date: .now, lessons: [Lesson(text: "ЛинАлгИГеом", time_start: "09:00", time_end: "10:40", additional: .init(is_online: false, type: LessonType.lecture, classroom: "MC-54")), Lesson(text: "КакаяТоДлиннаяПара", time_start: "10:40", time_end: "10:40", additional: .init(is_online: false, type: LessonType.lecture, classroom: "MC-54")), Lesson(text: "КакаяТоДлиннаяПара", time_start: "12:10", time_end: "10:40", additional: .init(is_online: false, type: LessonType.lecture, classroom: "MC-54"))], error: nil, dayIndex: 0, isEmpty: false, left: 1)
}
