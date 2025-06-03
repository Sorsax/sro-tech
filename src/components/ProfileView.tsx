
import { useState } from 'react';
import { User, Globe, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/contexts/SettingsContext';

const ProfileView = () => {
  const { userName, setUserName, language, setLanguage } = useSettings();
  const [localName, setLocalName] = useState(userName);

  const handleNameSave = () => {
    setUserName(localName);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const languages = [
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <User className="h-6 w-6 text-sro-olive mr-3" />
          <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white">Profiili</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Henkilökohtaiset asetukset</p>
      </div>

      <div className="space-y-6">
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

        {/* Language Setting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-sro-olive" />
              <div>
                <Label className="text-base font-medium text-sro-granite dark:text-white">
                  Kieli
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Valitse sovelluksen kieli
                </p>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="focus:ring-sro-olive focus:border-sro-olive">
                <SelectValue placeholder="Valitse kieli" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
