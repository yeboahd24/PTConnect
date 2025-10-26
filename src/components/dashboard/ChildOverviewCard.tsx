import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { User } from 'lucide-react';
import type { Child } from '@/types/schema';
import { formatPercentage } from '@/utils/formatters';

interface ChildOverviewCardProps {
  child: Child;
}

export function ChildOverviewCard({ child }: ChildOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Child Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          {/* Photo */}
          {child.photo ? (
            <img
              src={child.photo}
              alt={child.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h4 className="heading-4 mb-1">{child.name}</h4>
            <p className="body-small text-muted-foreground mb-3">{child.class}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="caption text-muted-foreground">Performance</p>
                <p className="body-normal font-semibold text-success">
                  {formatPercentage(child.recentPerformance)}
                </p>
              </div>
              <div>
                <p className="caption text-muted-foreground">Attendance</p>
                <p className="body-normal font-semibold text-primary">
                  {formatPercentage(child.attendance)}
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <p className="caption text-muted-foreground">Teacher</p>
              <p className="body-small font-medium">{child.teacher}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}