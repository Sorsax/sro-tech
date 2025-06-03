import { Calendar, Users, UserCheck, StickyNote, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation, Language, translateSheetData } from '@/utils/translations';
import { useState } from 'react';

interface EventCardProps {
  date: string;
  event: string;
  volunteers: string;
  backup: string;
  notes: string;
  onOptIn?: (date: string, name: string) => void;
}

const EventCard = ({ date, event, volunteers, backup, notes, onOptIn }: EventCardProps) => {
  const { userName, language, showVolunteers, showBackup, showNotes } = useSettings();
  const [isOptingIn, setIsOptingIn] = useState(false);
  const t = useTranslation(language as Language);

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

  const isEventInFuture = (dateStr: string): boolean => {
    try {
      const parts = dateStr.includes('.') ? dateStr.split('.') : dateStr.split('/');
      const [day, month, year] = parts;
      const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    } catch {
      return true;
    }
  };

  const handleOptIn = async () => {
    if (!userName.trim()) {
      alert(t.setNameFirst);
      return;
    }

    setIsOptingIn(true);
    try {
      if (onOptIn) {
        await onOptIn(date, userName);
      }
    } catch (error) {
      console.error('Error opting in:', error);
    } finally {
      setIsOptingIn(false);
    }
  };

  const formattedDate = formatDate(date);
  const isFutureEvent = isEventInFuture(date);
  const isUserAlreadyVolunteering = volunteers.toLowerCase().includes(userName.toLowerCase()) && userName.trim() !== '';

  // Translate sheet data based on selected language
  const translatedEvent = translateSheetData(event, language as Language);
  const translatedVolunteers = translateSheetData(volunteers, language as Language);
  const translatedBackup = translateSheetData(backup, language as Language);
  const translatedNotes = translateSheetData(notes, language as Language);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4 animate-fade-in hover:shadow-md transition-shadow">
      {/* Date Section */}
      <div className="flex items-center mb-3">
        <div className="bg-sro-olive text-white rounded-lg p-3 mr-4 min-w-[60px] text-center">
          <div className="text-xs font-medium uppercase">{formattedDate.dayName}</div>
          <div className="text-lg font-bold">{formattedDate.day}</div>
          <div className="text-xs uppercase">{formattedDate.month}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-sro-granite dark:text-white mb-1 leading-tight">
            {translatedEvent}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-3">
        {showVolunteers && translatedVolunteers && (
          <div className="flex items-start space-x-3">
            <Users className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite dark:text-white">{t.volunteers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{translatedVolunteers}</div>
            </div>
          </div>
        )}

        {showBackup && translatedBackup && (
          <div className="flex items-start space-x-3">
            <UserCheck className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite dark:text-white">{t.backup}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{translatedBackup}</div>
            </div>
          </div>
        )}

        {showNotes && translatedNotes && (
          <div className="flex items-start space-x-3">
            <StickyNote className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-sro-granite dark:text-white">{t.notes}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{translatedNotes}</div>
            </div>
          </div>
        )}

        {/* Opt-in Button for Future Events */}
        {isFutureEvent && userName.trim() && !isUserAlreadyVolunteering && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
            <Button 
              onClick={handleOptIn}
              disabled={isOptingIn}
              size="sm"
              className="w-full bg-sro-olive hover:bg-sro-olive/90 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isOptingIn ? t.optingIn : t.optIn}
            </Button>
          </div>
        )}

        {isUserAlreadyVolunteering && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
            <div className="text-sm text-sro-olive font-medium flex items-center">
              <UserCheck className="h-4 w-4 mr-2" />
              {t.alreadyVolunteering}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
