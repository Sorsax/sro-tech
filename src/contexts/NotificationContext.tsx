import React, { createContext, useContext, useState, useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { useSettings } from './SettingsContext';
import { Notification, NotificationSettings } from '@/types/notifications';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  notificationSettings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  scheduleEventReminders: (events: any[]) => void;
  unreadCount: number;
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
  const { t, userName, language } = useSettings();
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
      await PushNotifications.requestPermissions();
      await LocalNotifications.requestPermissions();

      // Register for push notifications
      await PushNotifications.register();

      // Listen for notifications
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        addNotification({
          title: notification.title || '',
          message: notification.body || '',
          type: 'event_reminder'
        });
      });

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
    if (!notificationSettings.eventReminders) return;

    const now = new Date();
    const scheduledNotifications: any[] = [];

    events.forEach(event => {
      const eventDate = new Date(event.date.split('.').reverse().join('-'));
      const dayBefore = new Date(eventDate);
      dayBefore.setDate(dayBefore.getDate() - 1);
      dayBefore.setHours(7, 0, 0, 0); // 10:00 GMT+3 = 7:00 UTC

      // Only schedule future notifications
      if (dayBefore > now) {
        // Check if event needs volunteers (excluding backup)
        const hasVolunteers = event.volunteers && event.volunteers.trim() !== '';
        
        if (!hasVolunteers) {
          scheduledNotifications.push({
            title: t('eventReminderTitle'),
            body: t('eventReminderMessage').replace('{event}', event.event).replace('{date}', event.date),
            id: parseInt(`${eventDate.getTime()}${Math.random() * 1000}`),
            schedule: { at: dayBefore }
          });
        }

        // Check if user is participating
        if (hasVolunteers && userName && event.volunteers.includes(userName)) {
          scheduledNotifications.push({
            title: t('participationReminderTitle'),
            body: t('participationReminderMessage').replace('{event}', event.event).replace('{date}', event.date),
            id: parseInt(`${eventDate.getTime()}${Math.random() * 1000}`),
            schedule: { at: dayBefore }
          });
        }
      }
    });

    // Schedule notifications
    if (Capacitor.isNativePlatform() && scheduledNotifications.length > 0) {
      LocalNotifications.schedule({
        notifications: scheduledNotifications
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      notificationSettings,
      addNotification,
      markAsRead,
      clearAll,
      updateSettings,
      scheduleEventReminders,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};