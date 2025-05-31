
import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { RefreshCw, Wifi } from 'lucide-react';

interface ScheduleItem {
  date: string;
  event: string;
  volunteers: string;
  backup: string;
  notes: string;
}

const ScheduleView = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration (in real app, this would fetch from Google Sheets API)
  const mockData: ScheduleItem[] = [
    {
      date: "15/1/2025",
      event: "Aamupalvelus - Äänitekniikka",
      volunteers: "Mikael L., Anna K.",
      backup: "Jukka M.",
      notes: "Tarkista mikrofonien toiminta etukäteen"
    },
    {
      date: "16/1/2025",
      event: "Keskiviikon raamattupiiri - Videotekniikka",
      volunteers: "Sofia H., Petri N.",
      backup: "Lisa A.",
      notes: "Uusi projektori käytössä"
    },
    {
      date: "19/1/2025",
      event: "Sunnuntaipalvelus - Täysi tekninen tuki",
      volunteers: "Mikael L., Anna K., Sofia H.",
      backup: "Jukka M.",
      notes: "Erikoiskonsertti - tarvitaan lisämikrofoneja"
    },
    {
      date: "22/1/2025",
      event: "Nuortenilta - Äänitekniikka",
      volunteers: "Petri N., Lisa A.",
      backup: "Anna K.",
      notes: "Bändin oma mikseri käytössä"
    },
    {
      date: "26/1/2025",
      event: "Sunnuntaipalvelus - Videotekniikka",
      volunteers: "Sofia H., Jukka M.",
      backup: "Mikael L.",
      notes: "Livestream Facebook-sivulle"
    }
  ];

  useEffect(() => {
    // Simulate loading from Google Sheets
    const loadData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from Google Sheets API here
        await new Promise(resolve => setTimeout(resolve, 1000));
        setScheduleData(mockData);
        setError(null);
      } catch (err) {
        setError('Virhe ladattaessa aikataulua');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = () => {
    setScheduleData([]);
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setScheduleData(mockData);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-sro-olive mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Ladataan aikataulua...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <Wifi className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
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

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bree font-bold text-sro-granite">Tuleva aikataulu</h2>
          <p className="text-sm text-gray-600">Tulevat tehtävät ja vastuuhenkilöt</p>
        </div>
        <button 
          onClick={refreshData}
          className="bg-sro-olive/10 text-sro-olive p-2 rounded-lg hover:bg-sro-olive/20 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {scheduleData.map((item, index) => (
          <EventCard
            key={index}
            date={item.date}
            event={item.event}
            volunteers={item.volunteers}
            backup={item.backup}
            notes={item.notes}
          />
        ))}
      </div>

      {scheduleData.length === 0 && !loading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Ei tulevia tapahtumia</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
