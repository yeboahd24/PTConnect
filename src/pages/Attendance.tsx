import { useState } from 'react';
import { Calendar as CalendarIcon, Download, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatDate, formatAttendanceStatus } from '@/utils/formatters';
import { useAuthStore } from '@/store/authStore';
import { UserRole, AttendanceStatus } from '@/types/enums';
import { toast } from 'react-hot-toast';

export function Attendance() {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(
    mockQuery.students.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      status: AttendanceStatus.PRESENT,
      notes: ''
    }))
  );

  const isTeacher = user?.role === UserRole.TEACHER;

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };

  const handleSaveAttendance = () => {
    toast.success('Attendance saved successfully!');
  };

  const handleExportAttendance = () => {
    toast.success('Attendance exported successfully!');
  };

  // Get attendance for selected date
  const _dateAttendance = mockQuery.attendance.filter(
    (record) =>
      new Date(record.date).toDateString() === selectedDate.toDateString()
  );

  // Calculate statistics
  const totalDays = mockQuery.attendance.length / mockQuery.students.length;
  const presentCount = mockQuery.attendance.filter(
    (r) => r.status === AttendanceStatus.PRESENT
  ).length;
  const absentCount = mockQuery.attendance.filter(
    (r) => r.status === AttendanceStatus.ABSENT
  ).length;
  const lateCount = mockQuery.attendance.filter(
    (r) => r.status === AttendanceStatus.LATE
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Attendance</h1>
          <p className="body-normal text-muted-foreground">
            {isTeacher
              ? 'Mark and manage student attendance'
              : 'View attendance records and history'}
          </p>
        </div>
        <button
          onClick={handleExportAttendance}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="caption text-muted-foreground mb-1">Total Days</p>
            <p className="heading-2 text-primary">{totalDays}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="caption text-muted-foreground mb-1">Present</p>
            <p className="heading-2 text-success">{presentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="caption text-muted-foreground mb-1">Absent</p>
            <p className="heading-2 text-destructive">{absentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="caption text-muted-foreground mb-1">Late</p>
            <p className="heading-2 text-warning">{lateCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Select Date</CardTitle>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Attendance for {formatDate(selectedDate)}
            </CardTitle>
            {isTeacher && (
              <button
                onClick={handleSaveAttendance}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save Attendance
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 body-small font-semibold">Student Name</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Class</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Status</th>
                  {isTeacher && (
                    <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
                  )}
                  <th className="text-left py-3 px-4 body-small font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item) => {
                  const student = mockQuery.students.find((s) => s.id === item.studentId);
                  
                  return (
                    <tr key={item.studentId} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 body-normal">{item.studentName}</td>
                      <td className="py-3 px-4 body-small text-muted-foreground">
                        {student?.class}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full body-small font-medium ${
                            item.status === AttendanceStatus.PRESENT
                              ? 'bg-success/10 text-success'
                              : item.status === AttendanceStatus.ABSENT
                              ? 'bg-destructive/10 text-destructive'
                              : item.status === AttendanceStatus.LATE
                              ? 'bg-warning/10 text-warning'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {formatAttendanceStatus(item.status)}
                        </span>
                      </td>
                      {isTeacher && (
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleStatusChange(item.studentId, AttendanceStatus.PRESENT)
                              }
                              className={`p-2 rounded-lg transition-colors ${
                                item.status === AttendanceStatus.PRESENT
                                  ? 'bg-success text-success-foreground'
                                  : 'hover:bg-muted'
                              }`}
                              aria-label="Mark present"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.studentId, AttendanceStatus.ABSENT)
                              }
                              className={`p-2 rounded-lg transition-colors ${
                                item.status === AttendanceStatus.ABSENT
                                  ? 'bg-destructive text-destructive-foreground'
                                  : 'hover:bg-muted'
                              }`}
                              aria-label="Mark absent"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-4">
                        {isTeacher ? (
                          <input
                            type="text"
                            value={item.notes}
                            onChange={(e) =>
                              setAttendanceData((prev) =>
                                prev.map((i) =>
                                  i.studentId === item.studentId
                                    ? { ...i, notes: e.target.value }
                                    : i
                                )
                              )
                            }
                            placeholder="Add notes..."
                            className="w-full px-2 py-1 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring body-small"
                          />
                        ) : (
                          <span className="body-small text-muted-foreground">
                            {item.notes || '-'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      {!isTeacher && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockQuery.attendance.slice(0, 10).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="body-normal font-medium">{formatDate(record.date)}</p>
                    {record.notes && (
                      <p className="body-small text-muted-foreground mt-1">{record.notes}</p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full body-small font-medium ${
                      record.status === AttendanceStatus.PRESENT
                        ? 'bg-success/10 text-success'
                        : record.status === AttendanceStatus.ABSENT
                        ? 'bg-destructive/10 text-destructive'
                        : record.status === AttendanceStatus.LATE
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {formatAttendanceStatus(record.status)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}