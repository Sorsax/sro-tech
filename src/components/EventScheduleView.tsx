import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Timer, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { useToast } from '@/components/ui/use-toast';

interface ScheduleItem {
  time: string;
  what: string;
  where: string;
  duration: string;
}

interface SheetData {
  [key: string]: ScheduleItem[];
}

const EventScheduleView = () => {
  const { t } = useSettings();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState('HSP 2025');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduleData, setScheduleData] = useState<SheetData>({});
  const [loading, setLoading] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedArena, setSelectedArena] = useState('Sibelius-sali');

  const SHEET_ID = '14yS8Bce2T06AQQCi2tGVxCNZA8eZpvGM';
  
  const sheets = [
    { name: 'PE 15.8', date: '2025-08-15', label: t('friday') + ' 15.8' },
    { name: 'LA 15.8 Sibelius-sali', date: '2025-08-16', label: t('saturday') + ' 16.8 - Sibelius', arena: 'Sibelius-sali' },
    { name: 'LA 16.8 Aho-sali', date: '2025-08-16', label: t('saturday') + ' 16.8 - Aho', arena: 'Aho-sali' },
    { name: 'SU 17.8', date: '2025-08-17', label: t('sunday') + ' 17.8' }
  ];

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

  const isValidTime = (timeStr: string): boolean => {
    if (!timeStr || timeStr.trim() === '') return false;
    // Check if it contains numbers and common time separators
    return /\d/.test(timeStr) && (timeStr.includes(':') || timeStr.includes('.'));
  };

  const fetchSheetData = async (sheetName: string): Promise<ScheduleItem[]> => {
    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data for ${sheetName}`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const data: ScheduleItem[] = [];
      
      // Start from row 6 (index 5)
      for (let i = 5; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const columns = parseCSVLine(line);
          
          if (columns.length >= 4 && isValidTime(columns[0])) {
            data.push({
              time: columns[0] || '',
              what: columns[1] || '',
              where: columns[2] || '',
              duration: columns[3] || ''
            });
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  };

  const loadAllSheetData = async () => {
    setLoading(true);
    try {
      const allData: SheetData = {};
      
      for (const sheet of sheets) {
        const data = await fetchSheetData(sheet.name);
        allData[sheet.name] = data;
      }
      
      setScheduleData(allData);
    } catch (error) {
      console.error('Error loading sheet data:', error);
      toast({
        title: t('errorLoadingSheets'),
        description: t('tryAgain'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEvent === 'HSP 2025') {
      loadAllSheetData();
    }
  }, [selectedEvent]);

  const getCurrentSheet = () => {
    const targetDate = new Date(selectedDate);
    const targetDateStr = targetDate.toISOString().split('T')[0];
    
    if (targetDateStr === '2025-08-15') {
      return sheets.find(s => s.name === 'PE 15.8');
    } else if (targetDateStr === '2025-08-16') {
      return sheets.find(s => s.name.includes(selectedArena));
    } else if (targetDateStr === '2025-08-17') {
      return sheets.find(s => s.name === 'SU 17.8');
    }
    
    return null;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const parseTime = (timeStr: string): number => {
    if (!timeStr) return 0;
    const parts = timeStr.split(/[:.]/);
    if (parts.length >= 2) {
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      return hours * 60 + minutes;
    }
    return 0;
  };

  const getFilteredEvents = () => {
    const currentSheet = getCurrentSheet();
    if (!currentSheet || !scheduleData[currentSheet.name]) return [];
    
    const events = scheduleData[currentSheet.name];
    
    if (showAllEvents) {
      return events;
    }
    
    const currentTime = getCurrentTime();
    const nextEvent = events.find(event => parseTime(event.time) > currentTime);
    
    return nextEvent ? [nextEvent] : [];
  };

  const availableDates = ['2025-08-15', '2025-08-16', '2025-08-17'];

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <Clock className="h-8 w-8 text-sro-olive mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 dark:text-gray-300">{t('loadingFromSheets')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white mb-4">
          {t('eventSchedule')}
        </h2>
        
        {/* Event Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('selectEvent')}
          </label>
          <div className="relative">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-sro-granite dark:text-white focus:outline-none focus:ring-2 focus:ring-sro-olive focus:border-transparent w-full"
            >
              <option value="HSP 2025">HSP 2025</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('selectDate')}
          </label>
          <div className="relative">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-sro-granite dark:text-white focus:outline-none focus:ring-2 focus:ring-sro-olive focus:border-transparent w-full"
            >
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('fi-FI', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'numeric' 
                  })}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Arena Selector for Saturday */}
        {selectedDate === '2025-08-16' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('selectArena')}
            </label>
            <div className="relative">
              <select
                value={selectedArena}
                onChange={(e) => setSelectedArena(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-sro-granite dark:text-white focus:outline-none focus:ring-2 focus:ring-sro-olive focus:border-transparent w-full"
              >
                <option value="Sibelius-sali">Sibelius-sali</option>
                <option value="Aho-sali">Aho-sali</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Show All Events Toggle */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setShowAllEvents(!showAllEvents)}
            variant="outline"
            className="border-sro-olive text-sro-olive hover:bg-sro-olive/10"
          >
            {showAllEvents ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showAllEvents ? t('showNextOnly') : t('showAllEvents')}
          </Button>
        </div>
      </div>

      {/* Schedule Events */}
      <div className="space-y-4">
        {getFilteredEvents().map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center text-sro-olive font-semibold">
                <Clock className="h-4 w-4 mr-2" />
                {item.time}
              </div>
              {item.duration && (
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Timer className="h-3 w-3 mr-1" />
                  {item.duration}
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-sro-granite dark:text-white mb-2">
              {item.what}
            </h3>
            
            {item.where && (
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {item.where}
              </div>
            )}
          </div>
        ))}
      </div>

      {getFilteredEvents().length === 0 && !loading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {t('noEventsForDate')}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventScheduleView;