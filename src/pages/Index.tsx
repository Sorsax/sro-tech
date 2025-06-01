
import { useState } from 'react';
import Header from '../components/Header';
import ScheduleView from '../components/ScheduleView';
import NavigationTabs from '../components/NavigationTabs';
import { Users, Settings } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleView />;
      case 'volunteers':
        return (
          <div className="px-4 py-8 text-center">
            <Users className="h-12 w-12 text-sro-olive mx-auto mb-4" />
            <h2 className="text-xl font-bree font-bold text-sro-granite mb-2">Vapaaehtoiset</h2>
            <p className="text-gray-600">Vapaaehtoiset ja yhteystiedot tulossa pian</p>
          </div>
        );
      case 'settings':
        return (
          <div className="px-4 py-8 text-center">
            <Settings className="h-12 w-12 text-sro-olive mx-auto mb-4" />
            <h2 className="text-xl font-bree font-bold text-sro-granite mb-2">Asetukset</h2>
            <p className="text-gray-600">Sovellusasetukset tulossa pian</p>
          </div>
        );
      default:
        return <ScheduleView />;
    }
  };

  return (
    <div className="min-h-screen bg-sro-gray flex flex-col max-w-md mx-auto border-x border-gray-200">
      <Header />
      
      <main className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </main>
      
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
