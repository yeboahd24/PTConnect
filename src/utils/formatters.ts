import { UserRole, AttendanceStatus, ReportTerm, MessageStatus, NotificationType, EventStatus } from "@/types/enums";

export const formatUserRole = (role: UserRole): string => {
  const roleMap: Record<UserRole, string> = {
    [UserRole.ADMIN]: "Administrator",
    [UserRole.TEACHER]: "Teacher",
    [UserRole.PARENT]: "Parent"
  };
  return roleMap[role];
};

export const formatAttendanceStatus = (status: AttendanceStatus): string => {
  const statusMap: Record<AttendanceStatus, string> = {
    [AttendanceStatus.PRESENT]: "Present",
    [AttendanceStatus.ABSENT]: "Absent",
    [AttendanceStatus.LATE]: "Late",
    [AttendanceStatus.EXCUSED]: "Excused"
  };
  return statusMap[status];
};

export const formatReportTerm = (term: ReportTerm): string => {
  const termMap: Record<ReportTerm, string> = {
    [ReportTerm.TERM_1]: "Term 1",
    [ReportTerm.TERM_2]: "Term 2",
    [ReportTerm.TERM_3]: "Term 3",
    [ReportTerm.MIDTERM]: "Midterm",
    [ReportTerm.FINAL]: "Final"
  };
  return termMap[term];
};

export const formatMessageStatus = (status: MessageStatus): string => {
  const statusMap: Record<MessageStatus, string> = {
    [MessageStatus.SENT]: "Sent",
    [MessageStatus.DELIVERED]: "Delivered",
    [MessageStatus.READ]: "Read"
  };
  return statusMap[status];
};

export const formatNotificationType = (type: NotificationType): string => {
  const typeMap: Record<NotificationType, string> = {
    [NotificationType.MESSAGE]: "New Message",
    [NotificationType.REPORT]: "New Report",
    [NotificationType.ATTENDANCE]: "Attendance Update",
    [NotificationType.EVENT]: "Event Notification",
    [NotificationType.ANNOUNCEMENT]: "Announcement",
    [NotificationType.SYSTEM]: "System Notification"
  };
  return typeMap[type];
};

export const formatEventStatus = (status: EventStatus): string => {
  const statusMap: Record<EventStatus, string> = {
    [EventStatus.UPCOMING]: "Upcoming",
    [EventStatus.ONGOING]: "Ongoing",
    [EventStatus.COMPLETED]: "Completed",
    [EventStatus.CANCELLED]: "Cancelled"
  };
  return statusMap[status];
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return formatDate(dateObj);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatScore = (score: number, maxScore: number = 100): string => {
  return `${score}/${maxScore}`;
};