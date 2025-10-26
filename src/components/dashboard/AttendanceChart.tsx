import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import type { AttendanceRecord } from '@/types/schema';
import { AttendanceStatus } from '@/types/enums';
import { formatDate } from '@/utils/formatters';

interface AttendanceChartProps {
  data: AttendanceRecord[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  // Transform data for chart
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((record) => ({
      date: formatDate(record.date),
      attendance: record.status === AttendanceStatus.PRESENT || record.status === AttendanceStatus.LATE ? 100 : 0
    }));

  // Calculate attendance percentage
  const attendancePercentage = (
    (data.filter(r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE).length / data.length) * 100
  ).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attendance History</CardTitle>
          <div className="text-right">
            <p className="caption text-muted-foreground">Overall</p>
            <p className="heading-4 text-primary">{attendancePercentage}%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <AreaChart
            width={600}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="var(--chart-1)"
              fillOpacity={1}
              fill="url(#colorAttendance)"
            />
          </AreaChart>
        </div>
      </CardContent>
    </Card>
  );
}