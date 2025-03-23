//
//  LessonType.swift
//  IBILounge
//
//  Created by Григорий Горбовской on 23.03.2025.
//
import SwiftUI

struct LessonTypeView: View {
  var type: LessonType;
  
  var body: some View {
    HStack {
      Text(LocalizedStringKey(String("schedules.\(type.rawValue)")))
        .font(.system(size: 9))
        .textCase(.uppercase)
    }
    .padding(EdgeInsets(top: 2, leading: 3, bottom: 2, trailing: 3))
    .background(.indigo.opacity(0.2))
    .cornerRadius(4)
  }
}
