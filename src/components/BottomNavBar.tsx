import React from 'react';
import { Home, CloudRain, Sprout, Satellite, MapPin } from 'lucide-react';

export type ScreenTab = 'home' | 'monsoon' | 'advisory' | 'satellite' | 'map';

interface BottomNavBarProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ScreenTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'monsoon', label: 'Monsoon', icon: CloudRain },
    { id: 'advisory', label: 'Advisory', icon: Sprout },
    { id: 'satellite', label: 'Satellite', icon: Satellite },
    { id: 'map', label: 'Map', icon: MapPin },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Active Pill Indicator (Material 3 style) */}
            <div
              className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                isActive ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'bg-transparent text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'text-emerald-300 font-semibold' : 'text-slate-400 font-normal'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
