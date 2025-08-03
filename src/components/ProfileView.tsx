
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';

const ProfileView = () => {
  const { userName, setUserName, t } = useSettings();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-sro-olive mr-3" />
            <h2 className="text-xl font-bree font-bold text-sro-granite dark:text-white">{t('profile')}</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('profileDescription')}</p>
        </div>

        <div className="space-y-6">
          {/* Name Setting */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
            <div className="space-y-3">
              <Label className="text-base font-medium text-sro-granite dark:text-white">
                {t('name')}
              </Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
