
import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { RefreshCw, Wifi, Calendar } from 'lucide-react';

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

  // Google Sheets configuration
  const SHEET_ID = '1iZfopLSu7IxqF-15TYT21xEfvX_Q1-Z1OX8kzagGrDg';
  const SHEET_NAME = 'Sheet1'; // You might need to adjust this based on your sheet name
  const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // This should be set by the user

  const fetchGoogleSheetData = async () => {
    try {
      console.log('Fetching data from Google Sheets...');
      
      // For now, we'll use the public CSV export URL as a fallback
      // In production, you'd want to use the Google Sheets API with proper authentication
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch sheet data');
      }
      
      const csvText = await response.text();
      console.log('CSV data received:', csvText);
      
      // Parse CSV data
      const lines = csvText.split('\n');
      const data: ScheduleItem[] = [];
      
      // Skip header row (index 0) and process data rows
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          // Simple CSV parsing - in production you'd want a more robust parser
          const columns = line.split(',').map(col => col.replace(/"/g, '').trim());
          
          if (columns.length >= 5 && columns[0]) {
            data.push({
              date: columns[0] || '',
              event: columns[1] || '',
              volunteers: columns[2] || '',
              backup: columns[3] || '',
              notes: columns[4] || ''
            });
          }
        }
      }
      
      console.log('Parsed data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchGoogleSheetData();
        setScheduleData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Virhe ladattaessa aikataulua Google Sheetsistä');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    setScheduleData([]);
    setLoading(true);
    try {
      const data = await fetchGoogleSheetData();
      setScheduleData(data);
      setError(null);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Virhe ladattaessa aikataulua Google Sheetsistä');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-sro-olive mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Ladataan aikataulua Google Sheetsistä...</p>
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
