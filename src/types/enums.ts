// Role types for user authentication and authorization
export const UserRole = {
  ADMIN: "admin",
  TEACHER: "teacher",
  PARENT: "parent"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Attendance status options
export const AttendanceStatus = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  EXCUSED: "excused"
} as const;

export type AttendanceStatus = typeof AttendanceStatus[keyof typeof AttendanceStatus];

// Report term/period types
export const ReportTerm = {
  TERM_1: "term_1",
  TERM_2: "term_2",
  TERM_3: "term_3",
  MIDTERM: "midterm",
  FINAL: "final"
} as const;

export type ReportTerm = typeof ReportTerm[keyof typeof ReportTerm];

// Message status
export const MessageStatus = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read"
} as const;

export type MessageStatus = typeof MessageStatus[keyof typeof MessageStatus];

// Notification types
export const NotificationType = {
  MESSAGE: "message",
  REPORT: "report",
  ATTENDANCE: "attendance",
  EVENT: "event",
  ANNOUNCEMENT: "announcement",
  SYSTEM: "system"
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

// Event status
export const EventStatus = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
} as const;

export type EventStatus = typeof EventStatus[keyof typeof EventStatus];

// Filter time ranges
export const TimeRange = {
  TODAY: "today",
  THIS_WEEK: "this_week",
  THIS_MONTH: "this_month",
  CUSTOM: "custom"
} as const;

export type TimeRange = typeof TimeRange[keyof typeof TimeRange];