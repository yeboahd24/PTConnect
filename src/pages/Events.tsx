import { useState } from 'react';
import { Calendar, MapPin, User, Plus, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatDateTime, formatEventStatus } from '@/utils/formatters';
import { useAuthStore } from '@/store/authStore';
import { UserRole, EventStatus } from '@/types/enums';
import { toast } from 'react-hot-toast';

export function Events() {
  const { user } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [subscribedEvents, setSubscribedEvents] = useState<string[]>(
    mockQuery.events.filter((e) => e.isSubscribed).map((e) => e.id)
  );

  const isAdmin = user?.role === UserRole.ADMIN;

  const handleSubscribe = (eventId: string) => {
    if (subscribedEvents.includes(eventId)) {
      setSubscribedEvents((prev) => prev.filter((id) => id !== eventId));
      toast.success('Unsubscribed from event');
    } else {
      setSubscribedEvents((prev) => [...prev, eventId]);
      toast.success('Subscribed to event');
    }
  };

  const handleCreateEvent = () => {
    toast.success('Event created successfully!');
    setShowCreateModal(false);
  };

  // Filter events by status
  const upcomingEvents = mockQuery.events.filter(
    (e) => e.status === EventStatus.UPCOMING
  );
  const ongoingEvents = mockQuery.events.filter(
    (e) => e.status === EventStatus.ONGOING
  );
  const completedEvents = mockQuery.events.filter(
    (e) => e.status === EventStatus.COMPLETED
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Events</h1>
          <p className="body-normal text-muted-foreground">
            {isAdmin
              ? 'Manage school events and announcements'
              : 'View and subscribe to upcoming events'}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        )}
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="heading-3 mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary body-small font-medium">
                      {formatEventStatus(event.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="body-normal text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 body-small">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDateTime(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 body-small">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 body-small">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  {!isAdmin && (
                    <button
                      onClick={() => handleSubscribe(event.id)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        subscribedEvents.includes(event.id)
                          ? 'bg-success text-success-foreground'
                          : 'border border-border hover:bg-muted'
                      }`}
                    >
                      {subscribedEvents.includes(event.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Subscribed
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <div>
          <h2 className="heading-3 mb-4">Ongoing Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success body-small font-medium">
                      {formatEventStatus(event.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="body-normal text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 body-small">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDateTime(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 body-small">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Events */}
      {completedEvents.length > 0 && (
        <div>
          <h2 className="heading-3 mb-4">Past Events</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {completedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div>
                      <p className="body-normal font-medium">{event.title}</p>
                      <p className="body-small text-muted-foreground">
                        {formatDateTime(event.date)} • {event.location}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-muted-foreground body-small font-medium">
                      {formatEventStatus(event.status)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Announcements */}
      <div>
        <h2 className="heading-3 mb-4">Announcements</h2>
        <div className="space-y-4">
          {mockQuery.announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{announcement.title}</CardTitle>
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-warning/10 text-warning body-small font-medium">
                    {announcement.priority}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-normal text-muted-foreground mb-3">
                  {announcement.content}
                </p>
                <div className="flex items-center gap-4 body-small text-muted-foreground">
                  <span>By {announcement.author}</span>
                  <span>•</span>
                  <span>{formatDateTime(announcement.date)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateEvent();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block body-small font-medium mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Parent-Teacher Meeting"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter event description..."
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., School Auditorium"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block body-small font-medium mb-2">Organizer</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., School Administration"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Create Event
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