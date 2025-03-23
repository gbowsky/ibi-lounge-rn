//
//  LessonPlace.swift
//  IBILounge
//
//  Created by Григорий Горбовской on 23.03.2025.
//
import SwiftUI

struct LessonPlaceView: View {
  var classroom: String?;
  var is_online: Bool?;
  
  var body: some View {
    HStack {
      if classroom != nil {
        if is_online != nil {
          if is_online! {
            Text("schedules.is_online")
          } else {
            Text(classroom!)
          }
        } else {
          Text(classroom!)
        }
      }
    }
    .font(.system(size: 9))
    .textCase(.uppercase)
    .padding(EdgeInsets(top: 2, leading: 3, bottom: 2, trailing: 3))
    .background(.purple.opacity(0.2))
    .cornerRadius(4)
  }
}
