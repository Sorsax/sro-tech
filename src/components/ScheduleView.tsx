import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { RefreshCw, Wifi, Calendar, Clock, History } from 'lucide-react';

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
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Google Sheets configuration
  const SHEET_ID = '1iZfopLSu7IxqF-15TYT21xEfvX_Q1-Z1OX8kzagGrDg';
  
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };
  
  const fetchGoogleSheetData = async () => {
    try {
      console.log('Fetching data from Google Sheets...');
      
      // Get current year for sheet name
      const currentYear = new Date().getFullYear().toString();
      console.log('Fetching data from sheet:', currentYear);
      
      // Get the sheet ID for the current year sheet
      // We'll try to get the sheet by name using the export URL with the sheet name
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${currentYear}`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch sheet data');
      }
      
      const csvText = await response.text();
      console.log('CSV data received:', csvText);
      
      // Parse CSV data
      const lines = csvText.split('\n');
      const data: ScheduleItem[] = [];
      
      // Skip first 2 rows (index 0 and 1) and process data rows starting from row 3 (index 2)
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          // Use proper CSV parsing to handle quoted fields with commas
          const columns = parseCSVLine(line);
          
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

  const isEventInFuture = (dateStr: string): boolean => {
    try {
      const parts = dateStr.includes('.') ? dateStr.split('.') : dateStr.split('/');
      const [day, month, year] = parts;
      const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    } catch {
      return true; // If can't parse, show it to be safe
    }
  };

  const filteredData = scheduleData.filter(item => 
    showPastEvents ? !isEventInFuture(item.date) : isEventInFuture(item.date)
  );

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
          <h2 className="text-xl font-bree font-bold text-sro-granite">
            {showPastEvents ? 'Menneet tapahtumat' : 'Tuleva aikataulu'}
          </h2>
          <p className="text-sm text-gray-600">
            {showPastEvents ? 'Menneet tehtävät ja vastuuhenkilöt' : 'Tulevat tehtävät ja vastuuhenkilöt'}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowPastEvents(!showPastEvents)}
            className={`p-2 rounded-lg transition-colors ${
              showPastEvents 
                ? 'bg-sro-olive text-white' 
                : 'bg-sro-olive/10 text-sro-olive hover:bg-sro-olive/20'
            }`}
          >
            {showPastEvents ? <Clock className="h-5 w-5" /> : <History className="h-5 w-5" />}
          </button>
          <button 
            onClick={refreshData}
            className="bg-sro-olive/10 text-sro-olive p-2 rounded-lg hover:bg-sro-olive/20 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.map((item, index) => (
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

      {filteredData.length === 0 && !loading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {showPastEvents ? 'Ei menneitä tapahtumia' : 'Ei tulevia tapahtumia'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
