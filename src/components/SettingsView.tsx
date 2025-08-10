import { Settings, Moon, Sun, Languages, Link, Bell, Bug, TestTube, Eye, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/contexts/SettingsContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Language } from '@/utils/translations';

const SettingsView = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    language, 
    setLanguage, 
    useCustomOptInUrl,
    setUseCustomOptInUrl,
    customOptInUrl,
    setCustomOptInUrl,
    notificationsEnabled,
    setNotificationsEnabled,
    t 
  } = useSettings();

  const {
    testNotification,
    testEventReminder,
    testParticipationReminder,
    testStandbyNotification,
    getScheduledNotifications,
    clearScheduledNotifications,
    getOptInRecords,
    clearOptInRecords
  } = useNotifications();

  const { toast } = useToast();
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    scheduledCount: 0,
    optInCount: 0
  });

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
  };

  const handleDebugMenuToggle = (checked: boolean) => {
    if (checked && !showDebugMenu) {
      // Show native confirmation dialog with Finnish text
      const confirmed = window.confirm(
        'Kehittäjävalikko\n\n' +
        'Tämä valikko on tarkoitettu vain oman elämänsä webbivelhoille ja Iljalle.\n\n' +
        'Haluatko varmasti ottaa kehittäjävalikon käyttöön?'
      );
      
      if (confirmed) {
        setShowDebugMenu(true);
        toast({
          title: 'Kehittäjävalikko käytössä',
          description: 'Debug-toiminnot ovat nyt käytettävissä.'
        });
      }
    } else {
      // Allow turning OFF without confirmation
      setShowDebugMenu(checked);
    }
  };

  const handleTestNotification = () => {
    testNotification();
    toast({
      title: t('testBasicNotification'),
      description: "Test notification sent",
    });
  };

  const handleTestEventReminder = () => {
    testEventReminder();
    toast({
      title: t('testEventReminder'),
      description: "Event reminder test sent",
    });
  };

  const handleTestParticipationReminder = () => {
    testParticipationReminder();
    toast({
      title: t('testParticipationReminder'),
      description: "Participation reminder test sent",
    });
  };

  const handleTestStandbyNotification = () => {
    testStandbyNotification();
  };

  const handleViewScheduledNotifications = async () => {
    const scheduled = await getScheduledNotifications();
    toast({
      title: t('scheduledNotifications'),
      description: `${scheduled.length} ${t('scheduledNotificationsCount')}`,
    });
    setDebugInfo(prev => ({ ...prev, scheduledCount: scheduled.length }));
  };

  const handleClearScheduledNotifications = async () => {
    await clearScheduledNotifications();
    toast({
      title: t('clearScheduledNotifications'),
      description: "Scheduled notifications cleared",
    });
    setDebugInfo(prev => ({ ...prev, scheduledCount: 0 }));
  };

  const handleViewOptInRecords = () => {
    const records = getOptInRecords();
    toast({
      title: t('optInRecords'),
      description: `${records.length} ${t('optInRecordsCount')}`,
    });
    setDebugInfo(prev => ({ ...prev, optInCount: records.length }));
  };

  const handleClearOptInRecords = () => {
    clearOptInRecords();
    toast({
      title: t('clearOptInRecords'),
      description: "Opt-in records cleared",
    });
    setDebugInfo(prev => ({ ...prev, optInCount: 0 }));
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Settings className="h-6 w-6 text-sro-olive mr-3" />
          <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white">{t('settings')}</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('settingsDescription')}</p>
      </div>

      <div className="space-y-6">
        {/* Dark Mode Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-sro-olive" />
              ) : (
                <Sun className="h-5 w-5 text-sro-olive" />
              )}
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  {t('darkMode')}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('darkModeDescription')}
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              className="data-[state=checked]:bg-sro-olive"
            />
          </div>
        </div>

        {/* Language Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="h-5 w-5 text-sro-olive" />
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  {t('language')}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('languageDescription')}
                </p>
              </div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fi">{t('languages.fi')}</SelectItem>
                <SelectItem value="en">{t('languages.en')}</SelectItem>
                <SelectItem value="sv">{t('languages.sv')}</SelectItem>
                <SelectItem value="ar">{t('languages.ar')}</SelectItem>
                <SelectItem value="cat">{t('languages.cat')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notifications Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-sro-olive" />
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  {t('notificationsToggle')}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('enableNotifications')}
                </p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              className="data-[state=checked]:bg-sro-olive"
            />
          </div>
        </div>

        {/* Custom Opt-In URL Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link className="h-5 w-5 text-sro-olive" />
                <div>
                  <Label className="text-base font-medium text-sro-granite dark:text-white">
                    {t('customOptInUrl')}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('customOptInUrlDescription')}
                  </p>
                </div>
              </div>
              <Switch
                checked={useCustomOptInUrl}
                onCheckedChange={setUseCustomOptInUrl}
                className="data-[state=checked]:bg-sro-olive"
              />
            </div>
            
            {useCustomOptInUrl && (
              <div className="mt-4">
                <Label className="text-sm font-medium text-sro-granite dark:text-white mb-2 block">
                  {t('customUrl')}
                </Label>
                <Input
                  type="url"
                  placeholder={t('customUrlPlaceholder')}
                  value={customOptInUrl}
                  onChange={(e) => setCustomOptInUrl(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('customUrlHelp')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Debug Menu */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bug className="h-5 w-5 text-sro-olive" />
                <div>
                  <Label className="text-base font-medium text-sro-granite dark:text-white">
                    {t('debugMenu')}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('debugMenuDescription')}
                  </p>
                </div>
              </div>
              <Switch
                checked={showDebugMenu}
                onCheckedChange={handleDebugMenuToggle}
                className="data-[state=checked]:bg-sro-olive"
              />
            </div>
            
            {showDebugMenu && (
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                {/* Test Notifications */}
                <div>
                  <h4 className="text-sm font-medium text-sro-granite dark:text-white mb-3">
                    {t('testNotifications')}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      onClick={handleTestNotification}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      {t('testBasicNotification')}
                    </Button>
                    <Button
                      onClick={handleTestEventReminder}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {t('testEventReminder')}
                    </Button>
                    <Button
                      onClick={handleTestParticipationReminder}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {t('testParticipationReminder')}
                    </Button>
                    <Button
                      onClick={handleTestStandbyNotification}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      {t('testStandbyNotification')}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {t('testStandbyDescription')}
                  </p>
                </div>

                {/* Scheduled Notifications */}
                <div>
                  <h4 className="text-sm font-medium text-sro-granite dark:text-white mb-3">
                    {t('scheduledNotifications')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleViewScheduledNotifications}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t('viewScheduledNotifications')}
                    </Button>
                    <Button
                      onClick={handleClearScheduledNotifications}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('clearScheduledNotifications')}
                    </Button>
                  </div>
                </div>

                {/* Opt-in Records */}
                <div>
                  <h4 className="text-sm font-medium text-sro-granite dark:text-white mb-3">
                    {t('optInRecords')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleViewOptInRecords}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t('viewOptInRecords')}
                    </Button>
                    <Button
                      onClick={handleClearOptInRecords}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('clearOptInRecords')}
                    </Button>
                  </div>
                </div>

                {/* Debug Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-sro-granite dark:text-white mb-2">
                    {t('debugInfo')}
                  </h4>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>📅 {debugInfo.scheduledCount} {t('scheduledNotificationsCount')}</div>
                    <div>📝 {debugInfo.optInCount} {t('optInRecordsCount')}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>b.1.0.5</p>
        <p>&copy; Niilo Liesivesi 2025</p>
      </div>
    </div>
  );
};

export default SettingsView;
