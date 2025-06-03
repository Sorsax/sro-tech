
import { Settings, Moon, Sun, Globe, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/contexts/SettingsContext';
import { useTranslation, Language } from '@/utils/translations';

const SettingsView = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    language, 
    setLanguage,
    showVolunteers,
    setShowVolunteers,
    showBackup,
    setShowBackup,
    showNotes,
    setShowNotes
  } = useSettings();
  
  const t = useTranslation(language as Language);

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Settings className="h-6 w-6 text-sro-olive mr-3" />
          <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white">{t.settingsTitle}</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.appSettings}</p>
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
                  {t.darkMode}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.darkModeDesc}
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
              <Globe className="h-5 w-5 text-sro-olive" />
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  {t.language}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.languageDesc}
                </p>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fi">{t.finnish}</SelectItem>
                <SelectItem value="en">{t.english}</SelectItem>
                <SelectItem value="sv">{t.swedish}</SelectItem>
                <SelectItem value="ar">{t.arabic}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Display Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="h-5 w-5 text-sro-olive" />
              <Label className="text-base font-medium text-sro-granite dark:text-white">
                {t.displaySettings}
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            {/* Show Volunteers */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-sro-granite dark:text-white">
                  {t.showVolunteers}
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t.showVolunteersDesc}
                </p>
              </div>
              <Switch
                checked={showVolunteers}
                onCheckedChange={setShowVolunteers}
                className="data-[state=checked]:bg-sro-olive"
              />
            </div>

            {/* Show Backup */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-sro-granite dark:text-white">
                  {t.showBackup}
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t.showBackupDesc}
                </p>
              </div>
              <Switch
                checked={showBackup}
                onCheckedChange={setShowBackup}
                className="data-[state=checked]:bg-sro-olive"
              />
            </div>

            {/* Show Notes */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-sro-granite dark:text-white">
                  {t.showNotes}
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {t.showNotesDesc}
                </p>
              </div>
              <Switch
                checked={showNotes}
                onCheckedChange={setShowNotes}
                className="data-[state=checked]:bg-sro-olive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
