
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
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

  const parseCSVData = (csvText: string): Event[] => {
    const lines = csvText.split('\n');
    const events: Event[] = [];
    
    // Skip header row and parse data
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Simple CSV parsing - handle quoted fields
      const fields = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      fields.push(current.trim());
      
      // Map fields to event structure
      if (fields.length >= 5) {
        events.push({
          date: fields[0] || '',
          event: fields[1] || '',
          volunteers: fields[2] || '',
          backup: fields[3] || '',
          notes: fields[4] || ''
        });
      }
    }
    
    return events.filter(event => event.date && event.date !== 'Päivämäärä');
  };

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from Google Sheets CSV...');
      
      // Use Google Sheets CSV export (no API limits)
      const csvUrl = 'https://docs.google.com/spreadsheets/d/1iZfopLSu7IxqF-15TYT21xEfvX_Q1-Z1OX8kzagGrDg/export?format=csv&gid=0';
      
      const response = await fetch(csvUrl, {
        mode: 'cors'
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`Virhe tietojen haussa: ${response.status}`);
      }
      
      const csvText = await response.text();
      console.log('Received CSV data:', csvText.substring(0, 200) + '...');
      
      const parsedEvents = parseCSVData(csvText);
      console.log('Parsed events:', parsedEvents);
      
      setEvents(parsedEvents);
      setError(null);
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
      
      // Only use SheetDB API for writing opt-ins
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
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
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
