import { UserRole, AttendanceStatus, ReportTerm, MessageStatus, NotificationType, EventStatus } from "@/types/enums";

// Mock Store Data
export const mockStore = {
  user: {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@ptconnect.com",
    role: UserRole.PARENT,
    avatar: "https://i.pravatar.cc/150?img=12",
    token: "mock-jwt-token-12345"
  },
  notifications: [
    {
      id: "notif-1",
      type: NotificationType.MESSAGE,
      title: "New message from Ms. Sarah",
      message: "Regarding your child's progress",
      timestamp: new Date("2025-01-15T10:30:00"),
      read: false
    },
    // ... existing code ...
  ],
  unreadCount: 2,
  darkMode: false
};

// Mock Query Data (API responses)
export const mockQuery = {
  children: [
    {
      id: "student-1",
      name: "Emma Doe",
      class: "Grade 5A",
      photo: "https://i.pravatar.cc/150?img=25",
      recentPerformance: 85,
      attendance: 95,
      teacher: "Ms. Sarah Johnson",
      parentId: "user-1",
      parentName: "John Doe",
      dateOfBirth: new Date("2014-05-15T00:00:00"),
      address: "123 Main St, City",
      phone: "+1234567890"
    }
  ],
  reports: [
    {
      id: "report-1",
      studentId: "student-1",
      studentName: "Emma Doe",
      subject: "Mathematics",
      term: ReportTerm.TERM_1,
      score: 88,
      maxScore: 100,
      grade: "A",
      remark: "Excellent performance. Shows strong understanding of concepts.",
      teacherName: "Ms. Sarah Johnson",
      date: new Date("2025-01-10T00:00:00")
    },
    // ... existing code ...
  ],
  attendance: [
    {
      id: "att-1",
      studentId: "student-1",
      date: new Date("2025-01-15T00:00:00"),
      status: AttendanceStatus.PRESENT,
      notes: ""
    },
    {
      id: "att-2",
      studentId: "student-1",
      date: new Date("2025-01-14T00:00:00"),
      status: AttendanceStatus.ABSENT,
      notes: "Sick leave"
    },
    {
      id: "att-3",
      studentId: "student-1",
      date: new Date("2025-01-13T00:00:00"),
      status: AttendanceStatus.LATE,
      notes: "Traffic delay"
    }
  ],
  messages: [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "teacher-1",
      senderName: "Ms. Sarah Johnson",
      senderRole: UserRole.TEACHER,
      receiverId: "user-1",
      content: "Hello! I wanted to discuss Emma's progress in Mathematics.",
      timestamp: new Date("2025-01-15T10:30:00"),
      status: MessageStatus.DELIVERED
    },
    // ... existing code ...
  ],
  conversations: [
    {
      id: "conv-1",
      participantId: "teacher-1",
      participantName: "Ms. Sarah Johnson",
      participantRole: UserRole.TEACHER,
      participantAvatar: "https://i.pravatar.cc/150?img=30",
      lastMessage: "Hi Ms. Johnson! I'd love to hear about her progress.",
      lastMessageTime: new Date("2025-01-15T10:35:00"),
      unreadCount: 0
    },
    // ... existing code ...
  ],
  events: [
    {
      id: "event-1",
      title: "Parent-Teacher Meeting",
      description: "Quarterly parent-teacher meeting to discuss student progress",
      date: new Date("2025-01-25T15:00:00"),
      location: "School Auditorium",
      status: EventStatus.UPCOMING,
      organizer: "School Administration",
      isSubscribed: true
    },
    {
      id: "event-2",
      title: "Sports Day",
      description: "Annual sports day event",
      date: new Date("2025-01-16T09:00:00"),
      location: "School Playground",
      status: EventStatus.ONGOING,
      organizer: "Sports Department",
      isSubscribed: false
    },
    {
      id: "event-3",
      title: "Science Fair",
      description: "Student science project exhibition",
      date: new Date("2025-01-10T10:00:00"),
      location: "Science Lab",
      status: EventStatus.COMPLETED,
      organizer: "Science Department",
      isSubscribed: true
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "School Reopening After Winter Break",
      content: "School will reopen on January 20th. Please ensure students are ready.",
      author: "Principal",
      date: new Date("2025-01-05T09:00:00"),
      priority: "high"
    }
  ],
  students: [
    {
      id: "student-1",
      name: "Emma Doe",
      class: "Grade 5A",
      photo: "https://i.pravatar.cc/150?img=25",
      parentId: "user-1",
      parentName: "John Doe",
      dateOfBirth: new Date("2014-05-15T00:00:00"),
      address: "123 Main St, City",
      phone: "+1234567890"
    },
    // ... existing code ...
  ],
  teachers: [
    {
      id: "teacher-1",
      name: "Ms. Sarah Johnson",
      subject: "Mathematics",
      class: "Grade 5A",
      photo: "https://i.pravatar.cc/150?img=30",
      email: "sarah.johnson@school.com",
      phone: "+1234567892"
    },
    // ... existing code ...
  ],
  analytics: {
    activeUsers: 1250,
    totalStudents: 850,
    totalTeachers: 65,
    totalParents: 750,
    averageAttendance: 94.5,
    reportsGenerated: 2340,
    messagesExchanged: 5670
  }
};

// Mock Root Props
export const mockRootProps = {
  initialRoute: "/parent"
};