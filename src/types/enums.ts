// Role types for user authentication and authorization
export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  PARENT = "parent"
}

// Attendance status options
export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  EXCUSED = "excused"
}

// Report term/period types
export enum ReportTerm {
  TERM_1 = "term_1",
  TERM_2 = "term_2",
  TERM_3 = "term_3",
  MIDTERM = "midterm",
  FINAL = "final"
}

// Message status
export enum MessageStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read"
}

// Notification types
export enum NotificationType {
  MESSAGE = "message",
  REPORT = "report",
  ATTENDANCE = "attendance",
  EVENT = "event",
  ANNOUNCEMENT = "announcement",
  SYSTEM = "system"
}

// Event status
export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

// Filter time ranges
export enum TimeRange {
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  CUSTOM = "custom"
}