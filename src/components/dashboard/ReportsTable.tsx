import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Download, Eye } from 'lucide-react';
import type { Report } from '@/types/schema';
import { formatDate, formatReportTerm, formatScore } from '@/utils/formatters';

interface ReportsTableProps {
  reports: Report[];
  onViewReport?: (reportId: string) => void;
  onDownloadReport?: (reportId: string) => void;
}

export function ReportsTable({ reports, onViewReport, onDownloadReport }: ReportsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 body-small font-semibold">Subject</th>
                <th className="text-left py-3 px-4 body-small font-semibold">Term</th>
                <th className="text-left py-3 px-4 body-small font-semibold">Score</th>
                <th className="text-left py-3 px-4 body-small font-semibold">Grade</th>
                <th className="text-left py-3 px-4 body-small font-semibold">Date</th>
                <th className="text-left py-3 px-4 body-small font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
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
                    {formatDate(report.date)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewReport?.(report.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="View report"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDownloadReport?.(report.id)}
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
  );
}