
import { Calendar, Users, UserCheck, StickyNote } from 'lucide-react';

interface EventCardProps {
  date: string;
  event: string;
  volunteers: string;
  backup: string;
  notes: string;
}

const EventCard = ({ date, event, volunteers, backup, notes }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    try {
      // Handle both dot and slash formats: "5.1.2025" or "5/1/2025"
      const parts = dateStr.includes('.') ? dateStr.split('.') : dateStr.split('/');
      const [day, month, year] = parts;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return {
        dayName: date.toLocaleDateString('fi-FI', { weekday: 'short' }),
        day: day.padStart(2, '0'),
        month: date.toLocaleDateString('fi-FI', { month: 'short' })
      };
    } catch {
      return { dayName: '', day: dateStr, month: '' };
    }
  };

  const formattedDate = formatDate(date);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 animate-fade-in hover:shadow-md transition-shadow">
      {/* Date Section */}
      <div className="flex items-center mb-3">
        <div className="bg-sro-olive text-white rounded-lg p-3 mr-4 min-w-[60px] text-center">
          <div className="text-xs font-medium uppercase">{formattedDate.dayName}</div>
          <div className="text-lg font-bold">{formattedDate.day}</div>
          <div className="text-xs uppercase">{formattedDate.month}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-sro-granite mb-1 leading-tight">
            {event}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-3">
        {volunteers && (
          <div className="flex items-start space-x-3">
            <Users className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite">Vapaaehtoiset</div>
              <div className="text-sm text-gray-600">{volunteers}</div>
            </div>
          </div>
        )}

        {backup && (
          <div className="flex items-start space-x-3">
            <UserCheck className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite">Varahenkilö</div>
              <div className="text-sm text-gray-600">{backup}</div>
            </div>
          </div>
        )}

        {notes && (
          <div className="flex items-start space-x-3">
            <StickyNote className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite">Lisätiedot</div>
              <div className="text-sm text-gray-600">{notes}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
