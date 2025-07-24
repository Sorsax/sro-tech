export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'event_reminder' | 'participation_reminder';
  timestamp: Date;
  read: boolean;
  eventDate?: string;
  eventName?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  welcomeShown: boolean;
  eventReminders: boolean;
  participationReminders: boolean;
}