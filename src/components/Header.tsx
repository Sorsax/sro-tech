
import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AccountPanel from './AccountPanel';

const Header = () => {
  const { userName } = useSettings();
  const [isAccountPanelOpen, setIsAccountPanelOpen] = useState(false);
  const initials = userName ? userName.charAt(0).toUpperCase() : "S";

  return (
    <>
      <header className="bg-sro-olive dark:bg-sro-olive text-white px-4 py-3 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <img 
                src="/lovable-uploads/b207cc73-0425-49e9-9a42-ff0709f466c8.png" 
                alt="SRO Tech Logo" 
                className="h-6 w-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bree font-bold">SRO Striimi</h1>
              <p className="text-white/80 text-xs font-light">Kalenteri</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => setIsAccountPanelOpen(true)}
              className="hover:scale-105 transition-transform"
            >
              <Avatar className="h-8 w-8 bg-white/20 border-2 border-white/30">
                <AvatarFallback className="text-sm font-semibold text-white bg-transparent">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </header>

      <AccountPanel 
        isOpen={isAccountPanelOpen} 
        onClose={() => setIsAccountPanelOpen(false)} 
      />
    </>
  );
};

export default Header;
