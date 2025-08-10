import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Timer, Eye, EyeOff, ChevronDown, RefreshCw } from 'lucide-react';
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
  const [selectedEvent, setSelectedEvent] = useState(() => {
    return localStorage.getItem('eventSchedule_selectedEvent') || 'HSP 2025';
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem('eventSchedule_selectedDate') || new Date().toISOString().split('T')[0];
  });
  const [scheduleData, setScheduleData] = useState<SheetData>(() => {
    const stored = localStorage.getItem('eventSchedule_data');
    return stored ? JSON.parse(stored) : {};
  });
  const [loading, setLoading] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(() => {
    return localStorage.getItem('eventSchedule_showAllEvents') === 'true';
  });
  const [selectedArena, setSelectedArena] = useState(() => {
    return localStorage.getItem('eventSchedule_selectedArena') || 'Sibelius-sali';
  });

  const SHEET_ID = '14yS8Bce2T06AQQCi2tGVxCNZA8eZpvGM';
  
  const sheets = [
    { name: 'MA 11.8', gid: '1955664783', date: '2025-08-11', label: t('monday') + ' 11.8', startRow: 6 },
    { name: 'TI 12.8', gid: '571236470', date: '2025-08-12', label: t('tuesday') + ' 12.8', startRow: 6 },
    { name: 'KE 13.8', gid: '438081763', date: '2025-08-13', label: t('wednesday') + ' 13.8', startRow: 6 },
    { name: 'PE 15.8', gid: '1894656914', date: '2025-08-15', label: t('friday') + ' 15.8', startRow: 6 },
    { name: 'LA 16.8 Sibelius-sali', gid: '204838078', date: '2025-08-16', label: t('saturday') + ' 16.8 - Sibelius', arena: 'Sibelius-sali', startRow: 5 },
    { name: 'LA 16.8 Aho-sali', gid: '493893366', date: '2025-08-16', label: t('saturday') + ' 16.8 - Aho', arena: 'Aho-sali', startRow: 5 },
    { name: 'SU 17.8', gid: '579178101', date: '2025-08-17', label: t('sunday') + ' 17.8', startRow: 6 }
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

  const fetchSheetData = async (sheet: any): Promise<ScheduleItem[]> => {
    try {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${sheet.gid}`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data for ${sheet.name}`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const data: ScheduleItem[] = [];
      
      const startIndex = sheet.startRow - 1; // Convert to 0-based index
      
      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
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
      
      console.log(`Fetched ${data.length} events for sheet: ${sheet.name}`);
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
        const data = await fetchSheetData(sheet);
        allData[sheet.name] = data;
      }
      
      setScheduleData(allData);
      localStorage.setItem('eventSchedule_data', JSON.stringify(allData));
      localStorage.setItem('eventSchedule_hasLoaded', 'true');
      console.log('All sheet data loaded:', allData);
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

  // Save to localStorage when selections change
  useEffect(() => {
    localStorage.setItem('eventSchedule_selectedEvent', selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    localStorage.setItem('eventSchedule_selectedDate', selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('eventSchedule_selectedArena', selectedArena);
  }, [selectedArena]);

  useEffect(() => {
    localStorage.setItem('eventSchedule_showAllEvents', showAllEvents.toString());
  }, [showAllEvents]);

  // Auto-load only on first visit
  useEffect(() => {
    const hasLoaded = localStorage.getItem('eventSchedule_hasLoaded');
    if (!hasLoaded && Object.keys(scheduleData).length === 0) {
      loadAllSheetData();
    }
  }, []);

  const getCurrentSheet = () => {
    const targetDateStr = selectedDate;
    console.log('getCurrentSheet - selectedDate:', selectedDate, 'targetDateStr:', targetDateStr, 'selectedArena:', selectedArena);

    if (targetDateStr === '2025-08-11') {
      console.log('Returning MA 11.8 sheet');
      return sheets.find(s => s.name === 'MA 11.8');
    } else if (targetDateStr === '2025-08-12') {
      console.log('Returning TI 12.8 sheet');
      return sheets.find(s => s.name === 'TI 12.8');
    } else if (targetDateStr === '2025-08-13') {
      console.log('Returning KE 13.8 sheet');
      return sheets.find(s => s.name === 'KE 13.8');
    } else if (targetDateStr === '2025-08-15') {
      console.log('Returning PE 15.8 sheet');
      return sheets.find(s => s.name === 'PE 15.8');
    } else if (targetDateStr === '2025-08-16') {
      // For Saturday, find the sheet that matches the selected arena
      if (selectedArena === 'Sibelius-sali') {
        console.log('Returning LA 16.8 Sibelius-sali sheet');
        return sheets.find(s => s.name === 'LA 16.8 Sibelius-sali');
      } else {
        console.log('Returning LA 16.8 Aho-sali sheet');
        return sheets.find(s => s.name === 'LA 16.8 Aho-sali');
      }
    } else if (targetDateStr === '2025-08-17') {
      console.log('Returning SU 17.8 sheet');
      return sheets.find(s => s.name === 'SU 17.8');
    }

    console.log('No sheet found for date:', targetDateStr);
    return sheets.find(s => s.name === 'PE 15.8'); // Default to Friday
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
    if (!currentSheet || !scheduleData[currentSheet.name]) {
      console.log('No sheet data found for:', currentSheet?.name);
      return [];
    }
    
    const events = scheduleData[currentSheet.name];
    console.log('Events for sheet:', currentSheet.name, events);
    
    if (showAllEvents) {
      return events;
    }
    
    const currentTime = getCurrentTime();
    const nextEvent = events.find(event => parseTime(event.time) > currentTime);
    
    return nextEvent ? [nextEvent] : [];
  };

  const getCurrentAndUpcomingEvents = () => {
    const currentSheet = getCurrentSheet();
    if (!currentSheet || !scheduleData[currentSheet.name]) return { current: null, next: null, upcoming: [] };
    
    const events = scheduleData[currentSheet.name];
    const currentTime = getCurrentTime();
    
    let currentEvent = null;
    let nextEvent = null;
    const upcomingEvents = [];
    
    for (let i = 0; i < events.length; i++) {
      const eventTime = parseTime(events[i].time);
      const nextEventTime = i < events.length - 1 ? parseTime(events[i + 1].time) : null;
      
      if (eventTime <= currentTime && (nextEventTime === null || currentTime < nextEventTime)) {
        currentEvent = events[i];
        nextEvent = events[i + 1] || null;
        // Get upcoming events after next
        for (let j = i + 2; j < events.length; j++) {
          upcomingEvents.push(events[j]);
        }
        break;
      } else if (eventTime > currentTime && !nextEvent) {
        nextEvent = events[i];
        // Get upcoming events after next
        for (let j = i + 1; j < events.length; j++) {
          upcomingEvents.push(events[j]);
        }
        break;
      }
    }
    
    return { current: currentEvent, next: nextEvent, upcoming: upcomingEvents };
  };

  const availableDates = [
    '2025-08-11', // Monday
    '2025-08-12', // Tuesday
    '2025-08-13', // Wednesday
    '2025-08-15', // Friday
    '2025-08-16', // Saturday
    '2025-08-17', // Sunday
  ];

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-sro-olive border-r-transparent"></div>
          </div>
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

        {/* Show All Events Toggle and Refresh */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setShowAllEvents(!showAllEvents)}
            variant="outline"
            className="border-sro-olive text-sro-olive hover:bg-sro-olive/10"
          >
            {showAllEvents ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showAllEvents ? t('showNextOnly') : t('showAllEvents')}
          </Button>
          
          <Button
            onClick={loadAllSheetData}
            variant="outline"
            disabled={loading}
            className="border-sro-olive text-sro-olive hover:bg-sro-olive/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {t('refresh')}
          </Button>
        </div>
      </div>

      {/* Schedule Events */}
      <div className="space-y-4">
        {!showAllEvents ? (
          // Show current, next and upcoming events with indicators
          (() => {
            const { current, next, upcoming } = getCurrentAndUpcomingEvents();
            return (
              <>
                {current && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                        <Clock className="h-4 w-4 mr-2" />
                        {current.time}
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 px-2 py-1 rounded-full">
                          {t('currentEvent')}
                        </span>
                      </div>
                      {current.duration && (
                        <div className="flex items-center text-green-500 dark:text-green-400 text-sm">
                          <Timer className="h-3 w-3 mr-1" />
                          {current.duration}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-medium text-sro-granite dark:text-white mb-2">
                      {current.what}
                    </h3>
                    
                    {current.where && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {current.where}
                      </div>
                    )}
                  </div>
                )}
                
                {next && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                        <Clock className="h-4 w-4 mr-2" />
                        {next.time}
                        <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full">
                          {t('nextEvent')}
                        </span>
                      </div>
                      {next.duration && (
                        <div className="flex items-center text-blue-500 dark:text-blue-400 text-sm">
                          <Timer className="h-3 w-3 mr-1" />
                          {next.duration}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-medium text-sro-granite dark:text-white mb-2">
                      {next.what}
                    </h3>
                    
                    {next.where && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {next.where}
                      </div>
                    )}
                  </div>
                )}

                {upcoming.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
                      {t('upcomingEvents')}
                    </h4>
                    {upcoming.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.time}
                          </div>
                          {item.duration && (
                            <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs">
                              <Timer className="h-2 w-2 mr-1" />
                              {item.duration}
                            </div>
                          )}
                        </div>
                        
                        <h5 className="font-medium text-sro-granite dark:text-white text-sm mb-1">
                          {item.what}
                        </h5>
                        
                        {item.where && (
                          <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs">
                            <MapPin className="h-2 w-2 mr-1" />
                            {item.where}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()
        ) : (
          // Show all events with smaller cards
          getFilteredEvents().map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center text-sro-olive font-medium text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
                {item.duration && (
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                    <Timer className="h-2 w-2 mr-1" />
                    {item.duration}
                  </div>
                )}
              </div>
              
              <h5 className="font-medium text-sro-granite dark:text-white text-sm mb-1">
                {item.what}
              </h5>
              
              {item.where && (
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs">
                  <MapPin className="h-2 w-2 mr-1" />
                  {item.where}
                </div>
              )}
            </div>
          ))
        )}
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