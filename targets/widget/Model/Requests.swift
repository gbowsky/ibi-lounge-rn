//
//  NewSchedulesModel.swift
//
//  Created by g.gorbovskoy on 06.08.2023.
//

import Foundation

let domain = "https://lounge.utme.space";
let schedulesEndpoint = "\(domain)/schedules";

struct StoredItem: Codable {
  var id: String;
  var name: String;
}

struct Day: Codable {
  var day: String;
  var month: String;
  var week_day: String;
  var lessons: Array<Lesson>;
  
  enum CodingKeys: CodingKey {
    case day
    case month
    case week_day
    case lessons
  }
}

struct Lesson: Codable, Identifiable {
  var text: String;
  var time_start: String;
  var time_end: String;
  
  var additional: AdditionalLesson?;
  
  var id: String {
    return "\(time_start)t\(additional?.teacher_name ?? text)s\(additional?.subgroup?.first ?? "NS")g\(additional?.group?.first ?? "NG")"
  }
  
  enum CodingKeys: CodingKey {
    case text
    case time_start
    case time_end
    case additional
  }
}

struct AdditionalLesson: Codable, Identifiable {
  let id = UUID().uuidString
  var is_online: Optional<Bool>;
  var url: String?;
  var type: LessonType?;
  var subgroup: [String]?;
  var group: [String]?;
  var classroom: String?;
  var teacher_name: String?;
  var compensation: String?;
  var classroom_details: ClassroomDetails?;
  var teacher_groups: [String]?;
  
  var compiledSubgroups: String? {
    if subgroup != nil && group != nil {
      let groups = subgroup?.compactMap({ sg in
        return sg + group!.first!
      })
      
      return groups?.joined(separator: ", ")
    }
    
    return nil;
  }
  
  enum CodingKeys: CodingKey {
    case is_online
    case url
    case type
    case group
    case subgroup
    case classroom
    case teacher_name
    case classroom_details
    case teacher_groups
  }
}

struct ClassroomDetails: Codable {
  var address: String;
  var classroom_number: String;
  var computer_classroom: Bool;
  var online_classroom: Bool;
}

enum LessonType: String, Codable {
  case practice
  case lecture
  case library_day
  case project_work
  case exam
  case subject_report
  case consultation
  case subject_report_with_grade
  case meeting
  case unknown

  var emoji: String {
    switch self {
    case .practice:
      return "🔨"
    case .lecture:
      return "📖"
    case .library_day:
      return "📚"
    case .project_work:
      return "👥"
    case .exam:
      return "🚨"
    case .subject_report:
      return "⚠️"
    case .consultation:
      return "ℹ️"
    case .subject_report_with_grade:
      return "⚠️"
    case .meeting:
      return "👥"
    case .unknown:
      return "❓"
    }
  }
}

enum DaysRequestResult {
  case response([Day?])
  case error(Errors)
}

extension DaysRequestResult: Decodable {
  init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    if let error = try? container.decode(RequestError.self) {
      self = .error(error.error)
    } else {
      self = .response(try container.decode([Day].self))
    }
  }
}

struct RequestError: Decodable {
  var error: Errors;
}

enum Errors: String, Codable {
  case bad_error
  case bad_error_159
  case bad_error_169
  case bad_error_184
  case bad_error_185
  case no_education_level_specified
  case no_schedules
  case no_groups
  case no_grades
  case unknown_error
  case network_error
  case timed_out
  case loading
  
  var title: String {
    switch self {
    case .bad_error, .bad_error_159, .bad_error_169, .bad_error_184, .bad_error_185:
      return "error.unknown_error"
    default:
      return "error.\(self.rawValue)";
    }
  }
  
  var description: String {
    switch self {
    case .bad_error, .bad_error_159, .bad_error_169, .bad_error_184, .bad_error_185:
      return "error.unknown_error.desc"
    default:
      return "error.\(self.rawValue).desc";
    }
  }
  
  var icon: String {
    switch self {
    case .no_grades, .no_groups, .no_schedules:
      return "exclamationmark.bubble"
    case .network_error:
      return "wifi.slash"
    case .timed_out:
      return "exclamationmark.arrow.circlepath"
    default:
      return "questionmark.app.dashed"
    }
  }
}

class Requests {
  let decoder = JSONDecoder()
  
  init() {
    decoder.dateDecodingStrategy = .formatted(DateFormatter.iso8601Full);
  }
  
  func fetchSchedules(from: Date = .now, to: Date = .now, group: String?, teacher: String?) async -> DaysRequestResult {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "dd.MM.YYYY";
    
    guard group != nil else {
      return .error(.bad_error);
    }
    
    do {
      guard let url = URL(string: "\(schedulesEndpoint)?dateStart=\(dateFormatter.string(from: from))&dateEnd=\(dateFormatter.string(from: to))&group=\(group!)") else {
        fatalError("Missing URL")
      }
      let urlRequest = URLRequest(url: url)
      
      let (data, response) = try await URLSession.shared.data(for: urlRequest)
      guard (response as? HTTPURLResponse)?.statusCode == 200 else {
        return .error(.bad_error);
      }
      
      let decodedData = try decoder.decode(DaysRequestResult.self, from: data)
      return decodedData;
    } catch {
      if let err = error as? URLError, err.code  == URLError.Code.notConnectedToInternet {
        switch err.code {
        case URLError.Code.notConnectedToInternet:
          return .error(.network_error)
        case URLError.Code.timedOut:
          return .error(.timed_out)
        default:
          return .error(.unknown_error);
        }
      } else {
        print("[fetchSchedules] Error fetching data from rasp-back: \(error)")
        return .error(.unknown_error)
      }
    }
  }
}
