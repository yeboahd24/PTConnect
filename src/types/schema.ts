import type { UserRole, AttendanceStatus, ReportTerm, MessageStatus, NotificationType, EventStatus } from "./enums";

// Props types (data passed to components)
export interface RootProps {
  initialRoute?: string;
}

export interface ChildOverviewProps {
  child: {
    id: string;
    name: string;
    class: string;
    photo: string;
    recentPerformance: number;
    attendance: number;
    teacher: string;
  };
}

export interface ReportTableProps {
  reports: Report[];
  onViewReport?: (reportId: string) => void;
  onDownloadReport?: (reportId: string) => void;
}

export interface AttendanceChartProps {
  data: AttendanceRecord[];
}

export interface MessageListProps {
  conversations: Conversation[];
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId?: string;
}

export interface ChatWindowProps {
  messages: Message[];
  conversationId: string;
  onSendMessage: (content: string) => void;
}

export interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

// Store types (global state data)
export interface StoreTypes {
  user: User | null;
  notifications: Notification[];
  unreadCount: number;
  darkMode: boolean;
  setUser: (user: User | null) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  toggleDarkMode: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  token: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Query types (API response data)
export interface QueryTypes {
  children: Child[];
  reports: Report[];
  attendance: AttendanceRecord[];
  messages: Message[];
  conversations: Conversation[];
  events: Event[];
  announcements: Announcement[];
  students: Student[];
  teachers: Teacher[];
  analytics: Analytics;
}

export interface Child {
  id: string;
  name: string;
  class: string;
  photo: string;
  parentId: string;
  parentName: string;
  recentPerformance: number;
  attendance: number;
  teacher: string;
  dateOfBirth: Date;
  address: string;
  phone: string;
}

export interface Report {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  term: ReportTerm;
  score: number;
  maxScore: number;
  grade: string;
  remark: string;
  teacherName: string;
  date: Date;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: AttendanceStatus;
  notes: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: UserRole;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: EventStatus;
  organizer: string;
  isSubscribed: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  priority: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  photo: string;
  parentId: string;
  parentName: string;
  dateOfBirth: Date;
  address: string;
  phone: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  class: string;
  photo: string;
  email: string;
  phone: string;
}

export interface Analytics {
  activeUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  averageAttendance: number;
  reportsGenerated: number;
  messagesExchanged: number;
}