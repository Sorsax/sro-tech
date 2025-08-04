import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { useSettings } from './SettingsContext';
import { Notification, NotificationSettings } from '@/types/notifications';
import { useToast } from '@/hooks/use-toast';

interface OptInRecord {
  eventDate: string;
  eventName: string;
  optInDate: string;
  userName: string;
}

interface NotificationContextType {
  notifications: Notification[];
  notificationSettings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  scheduleEventReminders: (events: any[]) => void;
  recordOptIn: (eventDate: string, eventName: string, userName: string) => void;
  unreadCount: number;
  // Debug functions
  testNotification: () => void;
  testEventReminder: () => void;
  testParticipationReminder: () => void;
  testStandbyNotification: () => void;
  getScheduledNotifications: () => Promise<any[]>;
  clearScheduledNotifications: () => Promise<void>;
  getOptInRecords: () => OptInRecord[];
  clearOptInRecords: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, userName, language, notificationsEnabled } = useSettings();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      welcomeShown: false,
      eventReminders: true,
      participationReminders: true
    };
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Initialize notifications on first load
  useEffect(() => {
    initializeNotifications();
  }, []);

  // Show welcome notification on first use
  useEffect(() => {
    if (!notificationSettings.welcomeShown && userName) {
      showWelcomeNotification();
    }
  }, [userName, notificationSettings.welcomeShown]);

  const initializeNotifications = async () => {
    if (Capacitor.isNativePlatform()) {
      // Request permissions
      await LocalNotifications.requestPermissions();

      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        addNotification({
          title: notification.title,
          message: notification.body,
          type: 'event_reminder'
        });
      });
    }
  };

  const showWelcomeNotification = () => {
    const welcomeNotification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
      title: t('welcomeNotificationTitle'),
      message: t('welcomeNotificationMessage').replace('{name}', userName),
      type: 'welcome'
    };
    
    addNotification(welcomeNotification);
    
    // Schedule local notification
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.schedule({
        notifications: [{
          title: welcomeNotification.title,
          body: welcomeNotification.message,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000) }
        }]
      });
    }

    // Update settings to mark welcome as shown
    setNotificationSettings(prev => ({
      ...prev,
      welcomeShown: true
    }));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const updateSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  const scheduleEventReminders = (events: any[]) => {
    // Check global notifications enabled setting first
    if (!notificationsEnabled || !notificationSettings.eventReminders) return;

    const now = new Date();
    const scheduledNotifications: any[] = [];

    // Clear existing scheduled notifications first
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.getPending().then(({ notifications }) => {
        const ids = notifications.map(n => n.id);
        if (ids.length > 0) {
          LocalNotifications.cancel({ notifications: ids.map(id => ({ id })) });
        }
      });
    }

    events.forEach(event => {
      const eventDate = new Date(event.date.split('.').reverse().join('-'));
      
      // Schedule background check 2 minutes before the notification time
      const checkTime = new Date(eventDate);
      checkTime.setDate(checkTime.getDate() - 1);
      checkTime.setHours(6, 58, 0, 0); // 6:58 AM UTC (2 minutes before notification)
      
      // Schedule actual notification time
      const notificationTime = new Date(eventDate);
      notificationTime.setDate(notificationTime.getDate() - 1);
      notificationTime.setHours(7, 0, 0, 0); // 7:00 AM UTC

      // Only schedule future notifications
      if (checkTime > now) {
        // Schedule background check
        scheduledNotifications.push({
          title: "Background Check",
          body: "Checking event status",
          id: parseInt(`${eventDate.getTime()}999`),
          schedule: { at: checkTime },
          extra: {
            type: 'background_check',
            eventDate: event.date,
            eventName: event.event,
            notificationTime: notificationTime.toISOString()
          }
        });
      }
    });

    // Schedule notifications
    if (Capacitor.isNativePlatform() && scheduledNotifications.length > 0) {
      LocalNotifications.schedule({
        notifications: scheduledNotifications
      });
    }

    console.log(`Scheduled ${scheduledNotifications.length} background checks`);
  };

  // New function to record opt-ins
  const recordOptIn = (eventDate: string, eventName: string, userName: string) => {
    const optInRecord: OptInRecord = {
      eventDate,
      eventName,
      optInDate: new Date().toISOString(),
      userName
    };

    const existingOptIns = JSON.parse(localStorage.getItem('eventOptIns') || '[]');
    const updatedOptIns = existingOptIns.filter((record: OptInRecord) => 
      !(record.eventDate === eventDate && record.userName === userName)
    );
    updatedOptIns.push(optInRecord);
    
    localStorage.setItem('eventOptIns', JSON.stringify(updatedOptIns));
    console.log('Recorded opt-in:', optInRecord);
  };

  // Function to fetch Google Sheets data (same as ScheduleView)
  const fetchGoogleSheetData = async (year: string = '2025') => {
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

    try {
      console.log('Background fetching data from Google Sheets for year:', year);
      
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${year}`;
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data for year ${year}`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      const data: any[] = [];
      
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
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
      
      return data;
    } catch (error) {
      console.error('Error in background fetch:', error);
      return [];
    }
  };

  // Function to handle background check and send notification
  const handleBackgroundCheck = async (eventDate: string, eventName: string, scheduledNotificationTime: string) => {
    // Check global notifications enabled setting first
    if (!notificationsEnabled) return;
    
    try {
      console.log('Performing background check for event:', eventName, eventDate);
      
      // Fetch latest data
      const currentYear = new Date().getFullYear().toString();
      const events = await fetchGoogleSheetData(currentYear);
      
      // Find the specific event
      const event = events.find(e => e.date === eventDate && e.event === eventName);
      
      if (!event) {
        console.log('Event not found in current data, skipping notification');
        return;
      }

      // Get stored opt-ins
      const optIns: OptInRecord[] = JSON.parse(localStorage.getItem('eventOptIns') || '[]');
      const userOptedIn = optIns.some(record => 
        record.eventDate === eventDate && 
        record.eventName === eventName && 
        record.userName === userName
      );

      // Check current volunteer status
      const hasVolunteers = event.volunteers && event.volunteers.trim() !== '';
      const userInVolunteers = hasVolunteers && userName && event.volunteers.includes(userName);

      // Clean up opt-ins if user is no longer in volunteers list
      if (userOptedIn && !userInVolunteers) {
        const cleanedOptIns = optIns.filter(record => 
          !(record.eventDate === eventDate && record.eventName === eventName && record.userName === userName)
        );
        localStorage.setItem('eventOptIns', JSON.stringify(cleanedOptIns));
        console.log('Removed opt-in record for user no longer in volunteers list');
      }

      // Determine which notification to send
      let notificationToSend = null;

      if (!hasVolunteers && notificationSettings.eventReminders) {
        // Event needs volunteers
        notificationToSend = {
          title: t('eventReminderTitle'),
          body: t('eventReminderMessage').replace('{event}', event.event).replace('{date}', event.date),
          id: parseInt(`${Date.now()}${Math.random() * 1000}`),
          schedule: { at: new Date(scheduledNotificationTime) }
        };
      } else if ((userInVolunteers || userOptedIn) && notificationSettings.participationReminders) {
        // User is participating
        notificationToSend = {
          title: t('participationReminderTitle'),
          body: t('participationReminderMessage').replace('{event}', event.event).replace('{date}', event.date),
          id: parseInt(`${Date.now()}${Math.random() * 1000}`),
          schedule: { at: new Date(scheduledNotificationTime) }
        };
      }

      // Schedule the actual notification
      if (notificationToSend && Capacitor.isNativePlatform()) {
        await LocalNotifications.schedule({
          notifications: [notificationToSend]
        });
        console.log('Scheduled notification after background check:', notificationToSend.title);
        
        // Also add to in-app notifications
        addNotification({
          title: notificationToSend.title,
          message: notificationToSend.body,
          type: !hasVolunteers ? 'event_reminder' : 'participation_reminder'
        });
      }

    } catch (error) {
      console.error('Error in background check:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Debug functions
  const testNotification = () => {
    addNotification({
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working.',
      type: 'event_reminder'
    });
  };

  const testEventReminder = () => {
    addNotification({
      title: t('eventReminderTitle'),
      message: t('eventReminderMessage').replace('{event}', 'Test Event').replace('{date}', new Date().toLocaleDateString()),
      type: 'event_reminder'
    });
  };

  const testParticipationReminder = () => {
    addNotification({
      title: t('participationReminderTitle'),
      message: t('participationReminderMessage').replace('{event}', 'Test Event').replace('{date}', new Date().toLocaleDateString()),
      type: 'participation_reminder'
    });
  };

  const testStandbyNotification = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        // Schedule a notification for 1 minute from now
        const scheduleTime = new Date();
        scheduleTime.setMinutes(scheduleTime.getMinutes() + 1);

        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Standby Test Notification',
              body: 'This notification was sent after 1 minute to test if notifications work when the device is on standby.',
              id: Date.now(),
              schedule: { at: scheduleTime },
              sound: 'default',
              attachments: [],
              actionTypeId: '',
              extra: {
                type: 'standby_test'
              }
            }
          ]
        });

        // Show immediate feedback
        toast({
          title: 'Standby Test Scheduled',
          description: 'A test notification will be sent in 1 minute to check if notifications work when the device is on standby.'
        });

      } catch (error) {
        console.error('Error scheduling standby test notification:', error);
        toast({
          title: 'Error',
          description: 'Failed to schedule standby test notification.'
        });
      }
    } else {
      // For web/development, just show a regular notification after 1 minute
      setTimeout(() => {
        addNotification({
          title: 'Standby Test Notification',
          message: 'This notification was sent after 1 minute to test if notifications work when the device is on standby.',
          type: 'event_reminder'
        });
      }, 60000); // 60 seconds

      toast({
        title: 'Standby Test Scheduled',
        description: 'A test notification will be sent in 1 minute (web version uses setTimeout).'
      });
    }
  };

  const getScheduledNotifications = async (): Promise<any[]> => {
    if (Capacitor.isNativePlatform()) {
      try {
        const { notifications } = await LocalNotifications.getPending();
        return notifications;
      } catch (error) {
        console.error('Error getting scheduled notifications:', error);
        return [];
      }
    }
    return [];
  };

  const clearScheduledNotifications = async (): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      try {
        const { notifications } = await LocalNotifications.getPending();
        if (notifications.length > 0) {
          const ids = notifications.map(n => ({ id: n.id }));
          await LocalNotifications.cancel({ notifications: ids });
        }
      } catch (error) {
        console.error('Error clearing scheduled notifications:', error);
      }
    }
  };

  const getOptInRecords = (): OptInRecord[] => {
    return JSON.parse(localStorage.getItem('eventOptIns') || '[]');
  };

  const clearOptInRecords = () => {
    localStorage.removeItem('eventOptIns');
  };

  // Add listener for background check notifications
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      let listenerHandle: any;
      
      const setupListener = async () => {
        listenerHandle = await LocalNotifications.addListener('localNotificationReceived', (notification) => {
          const extra = notification.extra;
          if (extra && extra.type === 'background_check') {
            // Handle background check
            handleBackgroundCheck(extra.eventDate, extra.eventName, extra.notificationTime);
          } else {
            // Regular notification handling
            addNotification({
              title: notification.title,
              message: notification.body,
              type: 'event_reminder'
            });
          }
        });
      };

      setupListener();

      return () => {
        if (listenerHandle) {
          listenerHandle.remove();
        }
      };
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      notificationSettings,
      addNotification,
      markAsRead,
      clearAll,
      updateSettings,
      scheduleEventReminders,
      recordOptIn,
      unreadCount,
      // Debug functions
      testNotification,
      testEventReminder,
      testParticipationReminder,
      testStandbyNotification,
      getScheduledNotifications,
      clearScheduledNotifications,
      getOptInRecords,
      clearOptInRecords
    }}>
      {children}
    </NotificationContext.Provider>
  );
};