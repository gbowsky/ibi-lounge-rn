//
//  Lesson.swift
//  DailyWidget
//
//  Created by g.gorbovskoy on 06.08.2023.
//

import SwiftUI

struct WidgetLesson: View {
  var lesson: Lesson;
  
  var body: some View {
    VStack(alignment: .leading, spacing: 0) {
      HStack(spacing: 3) {
        if lesson.additional?.type != nil {
          LessonTypeView(type: (lesson.additional!).type!)
        }
        LessonPlaceView(classroom: lesson.additional?.classroom, is_online: lesson.additional?.is_online)
      }
      .font(.caption2)
      .frame(minWidth: 0, maxWidth: .infinity, alignment: .topLeading)
      HStack {
        Text(lesson.text)
          .lineLimit(1)
          .font(.caption2.weight(.semibold))
          .frame(minWidth: 0, maxWidth: .infinity, alignment: .topLeading)
        Text(lesson.time_start)
          .font(.caption2)
          .foregroundStyle(.secondary)
      }
    }
  }
}

struct WidgetLesson_Previews: PreviewProvider {
    static var previews: some View {
      WidgetLesson(lesson: Lesson(
        text: "Операц.сист",
        time_start: "09:00",
        time_end: "10:40",
        additional:
          AdditionalLesson(
            is_online: false,
            type: LessonType.lecture,
            classroom: "MC-54",
            teacher_name: "Андреев И.В."
          )
      ))
    }
}
