
import { useState } from 'react';
import { Calendar, Clock, Users, UserPlus } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface EventCardProps {
  date: string;
  event: string;
  volunteers: string;
  backup: string;
  notes: string;
  onOptIn: (eventDate: string, userName: string) => Promise<void>;
}

const EventCard = ({ date, event, volunteers, backup, notes, onOptIn }: EventCardProps) => {
  const { userName } = useSettings();
  const [isOptingIn, setIsOptingIn] = useState(false);
  const [optInStatus, setOptInStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleOptIn = async () => {
    if (!userName) {
      alert('Aseta ensin nimesi tili-paneelista (klikkaa profiilikuvaa)');
      return;
    }

    setIsOptingIn(true);
    setOptInStatus('idle');
    
    try {
      await onOptIn(date, userName);
      setOptInStatus('success');
      setTimeout(() => setOptInStatus('idle'), 3000);
    } catch (error) {
      console.error('Opt-in error:', error);
      setOptInStatus('error');
      setTimeout(() => setOptInStatus('idle'), 5000);
    } finally {
      setIsOptingIn(false);
    }
  };

  const isUserAlreadyVolunteering = volunteers.toLowerCase().includes(userName.toLowerCase());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-sro-olive" />
          <span className="font-semibold text-sro-granite dark:text-white">{date}</span>
        </div>
        {!isUserAlreadyVolunteering && (
          <button
            onClick={handleOptIn}
            disabled={isOptingIn || !userName}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              optInStatus === 'success' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : optInStatus === 'error'
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                : isOptingIn
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                : 'bg-sro-olive/10 text-sro-olive hover:bg-sro-olive/20 dark:bg-sro-olive/20 dark:hover:bg-sro-olive/30'
            }`}
          >
            <UserPlus className="h-3 w-3" />
            <span>
              {optInStatus === 'success' ? 'Ilmoittautunut!' : 
               optInStatus === 'error' ? 'Virhe' :
               isOptingIn ? 'Ilmoittautuu...' : 'Ilmoittaudu'}
            </span>
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Clock className="h-4 w-4 text-sro-olive mt-0.5 flex-shrink-0" />
          <span className="text-sm text-sro-granite dark:text-white font-medium">{event}</span>
        </div>
        
        {volunteers && (
          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{volunteers}</span>
          </div>
        )}
        
        {backup && (
          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Vara: {backup}</span>
          </div>
        )}
        
        {notes && (
          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
