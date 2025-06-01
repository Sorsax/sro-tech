
import { useState } from 'react';
import { Settings, Moon, Sun, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';

const SettingsView = () => {
  const { isDarkMode, toggleDarkMode, userName, setUserName } = useSettings();
  const [localName, setLocalName] = useState(userName);

  const handleNameSave = () => {
    setUserName(localName);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

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

        {/* Name Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-sro-olive" />
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  Etunimi
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aseta nimesi tulevia ominaisuuksia varten
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Input
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                onKeyPress={handleNameKeyPress}
                onBlur={handleNameSave}
                placeholder="Syötä etunimesi"
                className="flex-1 focus:ring-sro-olive focus:border-sro-olive"
              />
            </div>
            {userName && (
              <p className="text-sm text-sro-olive">
                Tallennettu: {userName}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
