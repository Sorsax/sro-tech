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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://sheet2api.com/v1/1sL40Z6CTCuS/sro-striimaustiimin-kalenteri');
        if (!response.ok) {
          throw new Error(`API virhe: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error: any) {
        console.error('Virhe datan hakemisessa:', error);
        setError('Tapahtui virhe tietoja haettaessa. Yritä myöhemmin uudelleen.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOptIn = async (eventDate: string, userName: string) => {
    try {
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

      if (!response.ok) {
        const errorText = await response.text();
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
      throw error; // Re-throw to let the component handle the error display
    }
  };

  if (loading) {
    return <div className="p-4">Ladataan aikataulua...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {events.map((event) => (
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
    </div>
  );
};

export default ScheduleView;
