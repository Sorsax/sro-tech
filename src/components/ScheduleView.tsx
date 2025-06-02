
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Attempting to fetch events from Sheet2API...');
        const response = await fetch('https://sheet2api.com/v1/1sL40Z6CTCuS/sro-striimaustiimin-kalenteri');
        
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
        } else {
          console.error('Data is not an array:', data);
          throw new Error('Saatu data ei ole oikeassa muodossa');
        }
      } catch (error: any) {
        console.error('Virhe datan hakemisessa:', error);
        setError(`Tapahtui virhe tietoja haettaessa: ${error.message}. Tarkista että Google Sheets -taulukossa ei ole päällekkäisiä sarakeotsikoita.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOptIn = async (eventDate: string, userName: string) => {
    try {
      console.log('Attempting opt-in for:', { eventDate, userName });
      
      const response = await fetch('https://sheet2api.com/v1/1sL40Z6CTCuS/sro-striimaustiimin-kalenteri', {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sro-olive"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Ladataan aikataulua...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="text-red-700 dark:text-red-300 font-medium mb-2">Virhe tietojen haussa</div>
        <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Yritä uudelleen
        </button>
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
