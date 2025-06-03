
import { Settings, Moon, Sun, Languages } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/contexts/SettingsContext';
import { Language } from '@/utils/translations';

const SettingsView = () => {
  const { isDarkMode, toggleDarkMode, language, setLanguage, t } = useSettings();

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
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
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
