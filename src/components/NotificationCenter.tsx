import React from 'react';
import { Bell, X, CheckCircle, Calendar, User, Trash2 } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const { notifications, markAsRead, clearAll, unreadCount } = useNotifications();
  const { t } = useSettings();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'event_reminder':
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'participation_reminder':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <Bell className="h-5 w-5 text-sro-olive" />
        <h3 className="font-semibold text-sro-granite dark:text-white">
          {t('notifications')}
        </h3>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-xs">
            {unreadCount}
          </Badge>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-6 px-2 text-xs text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-60 hover:opacity-100 transition-all"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {t('clearAll')}
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            <Bell className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">{t('noNotifications')}</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  notification.read
                    ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-sro-granite dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationCenter;