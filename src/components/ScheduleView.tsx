
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import EventCard from './EventCard';

interface Event {
  date: string;
  event: string;
  volunteers: string;
  backup: string;
  notes: string;
}

const ScheduleView = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from SheetDB...');
      const response = await fetch('https://sheetdb.io/api/v1/7tbydhaf8t74s');
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Details:', errorText);
        throw new Error(`API virhe: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Check if data is an array
      if (Array.isArray(data)) {
        setEvents(data);
        setError(null);
      } else {
        console.error('Data is not an array:', data);
        throw new Error('Saatu data ei ole oikeassa muodossa');
      }
    } catch (error: any) {
      console.error('Virhe datan hakemisessa:', error);
      setError(`Tapahtui virhe tietoja haettaessa: ${error.message}`);
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      await fetchEvents();
      setLoading(false);
    };

    loadEvents();
  }, []);

  const handleOptIn = async (eventDate: string, userName: string) => {
    try {
      console.log('Attempting opt-in for:', { eventDate, userName });
      
      const response = await fetch('https://sheetdb.io/api/v1/7tbydhaf8t74s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: eventDate,
          volunteers: userName
        })
      });

      console.log('Opt-in response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Opt-in error details:', errorText);
        throw new Error(`API virhe: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Opt-in successful:', result);
      
      // Update local state to reflect the change
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.date === eventDate 
            ? { 
                ...event, 
                volunteers: event.volunteers 
                  ? `${event.volunteers}, ${userName}` 
                  : userName 
              }
            : event
        )
      );
    } catch (error) {
      console.error('Error opting in to event:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    setEvents([]);
    setLoading(true);
    await fetchEvents();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-sro-olive mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 dark:text-gray-300">Ladataan aikataulua...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="bg-sro-olive text-white px-4 py-2 rounded-lg hover:bg-sro-olive/90 transition-colors"
          >
            Yritä uudelleen
          </button>
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < today;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedUpcoming = showAll ? upcomingEvents : upcomingEvents.slice(0, 3);

  return (
    <div className="p-4 space-y-4">
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-sro-granite dark:text-white mb-3">
            Tulevat tapahtumat
          </h2>
          {displayedUpcoming.map((event) => (
            <EventCard 
              key={event.date}
              date={event.date}
              event={event.event}
              volunteers={event.volunteers}
              backup={event.backup}
              notes={event.notes}
              onOptIn={handleOptIn}
            />
          ))}
          
          {upcomingEvents.length > 3 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-2 text-sro-olive hover:text-sro-olive/80 font-medium"
            >
              Näytä lisää ({upcomingEvents.length - 3} tapahtumaa)
            </button>
          )}
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Menneet tapahtumat
          </h2>
          {pastEvents.slice(0, 5).map((event) => (
            <div key={event.date} className="opacity-60">
              <EventCard 
                date={event.date}
                event={event.event}
                volunteers={event.volunteers}
                backup={event.backup}
                notes={event.notes}
                onOptIn={handleOptIn}
              />
            </div>
          ))}
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Ei tapahtumia näytettävänä
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
