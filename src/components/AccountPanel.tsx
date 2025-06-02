
import { useState } from 'react';
import { User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/contexts/SettingsContext';

interface AccountPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountPanel = ({ isOpen, onClose }: AccountPanelProps) => {
  const { userName, setUserName } = useSettings();
  const [localName, setLocalName] = useState(userName);

  const handleNameSave = () => {
    setUserName(localName);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-sro-granite dark:text-white">Tili</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-sro-olive" />
                  <div>
                    <Label className="text-base font-medium text-sro-granite dark:text-white">
                      Etunimi
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Aseta nimesi tapahtumiin ilmoittautumista varten
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
      </div>
    </div>
  );
};

export default AccountPanel;
