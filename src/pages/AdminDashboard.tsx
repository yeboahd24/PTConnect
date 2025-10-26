import { useState } from 'react';
import { Users, GraduationCap, UserCheck, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatPercentage } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

type ManagementTab = 'students' | 'teachers' | 'parents';

export function AdminDashboard() {
  const { analytics } = mockQuery;
  const [activeTab, setActiveTab] = useState<ManagementTab>('students');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    toast.success(`${activeTab.slice(0, -1)} added successfully!`);
    setShowAddModal(false);
  };

  const handleEdit = (_id: string) => {
    toast.success(`Editing ${activeTab.slice(0, -1)}`);
  };

  const handleDelete = (_id: string) => {
    toast.success(`${activeTab.slice(0, -1)} deleted successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1 mb-2">Admin Dashboard</h1>
        <p className="body-normal text-muted-foreground">
          System overview and management tools.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Active Users</p>
                <p className="heading-3">{analytics.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Students</p>
                <p className="heading-3">{analytics.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Teachers</p>
                <p className="heading-3">{analytics.totalTeachers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="caption text-muted-foreground">Parents</p>
                <p className="heading-3">{analytics.totalParents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="body-normal">Average Attendance</span>
                <span className="body-normal font-semibold text-primary">
                  {formatPercentage(analytics.averageAttendance)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="body-normal">Reports Generated</span>
                <span className="body-normal font-semibold">
                  {analytics.reportsGenerated}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="body-normal">Messages Exchanged</span>
                <span className="body-normal font-semibold">
                  {analytics.messagesExchanged}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <Plus className="w-5 h-5 text-primary" />
                <span className="body-normal">Add New Student</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <Plus className="w-5 h-5 text-success" />
                <span className="body-normal">Add New Teacher</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left">
                <MessageSquare className="w-5 h-5 text-accent" />
                <span className="body-normal">Send Announcement</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add {activeTab.slice(0, -1)}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2 body-normal font-medium transition-colors ${
                activeTab === 'students'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-4 py-2 body-normal font-medium transition-colors ${
                activeTab === 'teachers'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Teachers
            </button>
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-4 py-2 body-normal font-medium transition-colors ${
                activeTab === 'parents'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Parents
            </button>
          </div>

          {/* Students Table */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 body-small font-semibold">Name</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Class</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Parent</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockQuery.students.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="body-normal">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 body-normal">{student.class}</td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {student.parentName}
                      </td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {student.phone}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(student.id)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Teachers Table */}
          {activeTab === 'teachers' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 body-small font-semibold">Name</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Subject</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Class</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Email</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockQuery.teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={teacher.photo}
                            alt={teacher.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="body-normal">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 body-normal">{teacher.subject}</td>
                      <td className="py-3 px-4 body-normal">{teacher.class}</td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {teacher.email}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(teacher.id)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(teacher.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Parents Table */}
          {activeTab === 'parents' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 body-small font-semibold">Name</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Children</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Address</th>
                    <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockQuery.students.map((student) => (
                    <tr key={student.parentId} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 body-normal">{student.parentName}</td>
                      <td className="py-3 px-4 body-normal">{student.name}</td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {student.phone}
                      </td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {student.address}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(student.parentId)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.parentId)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add {activeTab.slice(0, -1)}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block body-small font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1234567890"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add
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