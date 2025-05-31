
import { Calendar, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-sro-olive text-white px-4 py-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bree font-bold">SRO Tech</h1>
            <p className="text-white/80 text-sm font-light">Raamattuopisto</p>
          </div>
        </div>
        <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
