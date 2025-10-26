import { useState } from 'react';
import { Users, FileText, Calendar, MessageSquare, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatDate } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

export function TeacherDashboard() {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const handlePostAnnouncement = () => {
    toast.success('Announcement posted successfully!');
    setShowAnnouncementModal(false);
  };

  const myClasses = ['Grade 5A', 'Grade 5B', 'Grade 6A'];
  const totalStudents = mockQuery.students.length;
  const pendingReports = 8;
  const unreadMessages = 5;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Teacher Dashboard</h1>
          <p className="body-normal text-muted-foreground">
            Welcome back! Manage your classes and students.
          </p>
        </div>
        <button
          onClick={() => setShowAnnouncementModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Post Announcement
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="caption text-muted-foreground">My Classes</p>
                <p className="heading-3">{myClasses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Students</p>
                <p className="heading-3">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Reports Due</p>
                <p className="heading-3">{pendingReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Messages</p>
                <p className="heading-3">{unreadMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Classes */}
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myClasses.map((className) => (
              <div
                key={className}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <h3 className="heading-4 mb-2">{className}</h3>
                <p className="body-small text-muted-foreground">
                  {Math.floor(totalStudents / myClasses.length)} students
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockQuery.students.slice(0, 5).map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="body-normal font-medium">{student.name}</p>
                  <p className="body-small text-muted-foreground">{student.class}</p>
                </div>
                <button className="px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors body-small">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="body-normal">Mark Attendance</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <FileText className="w-5 h-5 text-success" />
                <span className="body-normal">Upload Report</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <MessageSquare className="w-5 h-5 text-accent" />
                <span className="body-normal">Send Message</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockQuery.announcements.map((announcement) => (
                <div key={announcement.id} className="p-3 rounded-lg border border-border">
                  <p className="body-normal font-medium mb-1">{announcement.title}</p>
                  <p className="body-small text-muted-foreground mb-2">
                    {announcement.content.substring(0, 100)}...
                  </p>
                  <p className="caption text-muted-foreground">
                    {formatDate(announcement.date)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Post Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Post Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePostAnnouncement();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block body-small font-medium mb-2">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Announcement title"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Content</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your announcement..."
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Priority</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}