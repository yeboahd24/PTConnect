import { ChildOverviewCard } from '@/components/dashboard/ChildOverviewCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { ReportsTable } from '@/components/dashboard/ReportsTable';
import { mockQuery } from '@/data/mockData';
import { toast } from 'react-hot-toast';

export function ParentDashboard() {
  const child = mockQuery.children[0];
  const reports = mockQuery.reports.slice(0, 5);
  const attendance = mockQuery.attendance;

  const handleViewReport = (reportId: string) => {
    toast.success(`Viewing report ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    toast.success(`Downloading report ${reportId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1 mb-2">Parent Dashboard</h1>
        <p className="body-normal text-muted-foreground">
          Welcome back! Here's an overview of your child's progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChildOverviewCard child={child} />
        <AttendanceChart data={attendance} />
      </div>

      <ReportsTable
        reports={reports}
        onViewReport={handleViewReport}
        onDownloadReport={handleDownloadReport}
      />
    </div>
  );
}