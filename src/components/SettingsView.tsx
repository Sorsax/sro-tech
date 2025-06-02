
import { Settings, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';

const SettingsView = () => {
  const { isDarkMode, toggleDarkMode } = useSettings();

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Settings className="h-6 w-6 text-sro-olive mr-3" />
          <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white">Asetukset</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Sovelluksen asetukset</p>
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
                  Tumma tila
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vaihda sovelluksen ulkoasua
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
      </div>
    </div>
  );
};

export default SettingsView;
