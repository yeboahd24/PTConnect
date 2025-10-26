import { useState } from 'react';
import { Download, Eye, Upload, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatDate, formatReportTerm, formatScore } from '@/utils/formatters';
import { useAuthStore } from '@/store/authStore';
import { UserRole, ReportTerm } from '@/types/enums';
import { toast } from 'react-hot-toast';

export function Reports() {
  const { user } = useAuthStore();
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter reports
  const filteredReports = mockQuery.reports.filter((report) => {
    if (selectedStudent !== 'all' && report.studentId !== selectedStudent) return false;
    if (selectedTerm !== 'all' && report.term !== selectedTerm) return false;
    if (selectedSubject !== 'all' && report.subject !== selectedSubject) return false;
    return true;
  });

  // Get unique values for filters
  const students = Array.from(new Set(mockQuery.reports.map((r) => r.studentId)));
  const subjects = Array.from(new Set(mockQuery.reports.map((r) => r.subject)));

  const handleViewReport = (reportId: string) => {
    toast.success(`Viewing report ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    toast.success(`Downloading report ${reportId}`);
  };

  const handleUploadReport = () => {
    toast.success('Report uploaded successfully!');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Reports</h1>
          <p className="body-normal text-muted-foreground">
            {user?.role === UserRole.TEACHER
              ? 'Manage and upload student reports'
              : 'View student reports and progress'}
          </p>
        </div>
        {user?.role === UserRole.TEACHER && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Report
          </button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle>Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block body-small font-medium mb-2">Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Students</option>
                {students.map((studentId) => {
                  const report = mockQuery.reports.find((r) => r.studentId === studentId);
                  return (
                    <option key={studentId} value={studentId}>
                      {report?.studentName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block body-small font-medium mb-2">Term</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Terms</option>
                <option value={ReportTerm.TERM_1}>Term 1</option>
                <option value={ReportTerm.TERM_2}>Term 2</option>
                <option value={ReportTerm.TERM_3}>Term 3</option>
                <option value={ReportTerm.MIDTERM}>Midterm</option>
                <option value={ReportTerm.FINAL}>Final</option>
              </select>
            </div>

            <div>
              <label className="block body-small font-medium mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 body-small font-semibold">Student</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Subject</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Term</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Score</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Grade</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Teacher</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Date</th>
                  <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 body-normal">{report.studentName}</td>
                    <td className="py-3 px-4 body-normal">{report.subject}</td>
                    <td className="py-3 px-4 body-small text-muted-foreground">
                      {formatReportTerm(report.term)}
                    </td>
                    <td className="py-3 px-4 body-normal font-medium">
                      {formatScore(report.score, report.maxScore)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success body-small font-medium">
                        {report.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 body-small text-muted-foreground">
                      {report.teacherName}
                    </td>
                    <td className="py-3 px-4 body-small text-muted-foreground">
                      {formatDate(report.date)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewReport(report.id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          aria-label="View report"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadReport(report.id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          aria-label="Download report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Upload Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUploadReport();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block body-small font-medium mb-2">Student</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select student</option>
                    {mockQuery.students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Mathematics"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Term</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select term</option>
                    <option value={ReportTerm.TERM_1}>Term 1</option>
                    <option value={ReportTerm.TERM_2}>Term 2</option>
                    <option value={ReportTerm.TERM_3}>Term 3</option>
                    <option value={ReportTerm.MIDTERM}>Midterm</option>
                    <option value={ReportTerm.FINAL}>Final</option>
                  </select>
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Score</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    placeholder="e.g., 85"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Grade</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., A"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Remark</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter remarks..."
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Upload
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