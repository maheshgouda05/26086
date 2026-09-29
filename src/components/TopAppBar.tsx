import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, Code2, MapPin, ChevronDown } from 'lucide-react';
import { WeatherLocation, TRANSLATIONS } from '../data/mockData';

interface TopAppBarProps {
  currentLocation: WeatherLocation;
  allLocations: Record<string, WeatherLocation>;
  onSelectLocation: (id: string) => void;
  lang: 'en' | 'kn' | 'hi';
  onSelectLang: (lang: 'en' | 'kn' | 'hi') => void;
  onOpenCodeModal: () => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentLocation,
  allLocations,
  onSelectLocation,
  lang,
  onSelectLang,
  onOpenCodeModal,
  isSpeaking,
  onToggleSpeech,
}) => {
  const [showLocMenu, setShowLocMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-slate-100">
      {/* Brand & Hyperlocal Location Indicator */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-lg text-emerald-400 font-sans leading-none">
            HEXANOD
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            SIH26086
          </span>
        </div>

        {/* Hyperlocal District Dropdown trigger */}
        <div className="relative mt-1">
          <button
            onClick={() => {
              setShowLocMenu(!showLocMenu);
              setShowLangMenu(false);
            }}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-emerald-300 transition-colors group"
          >
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
              {currentLocation.name}
            </span>
            <span className="text-slate-500 text-[11px] truncate hidden sm:inline">
              · {currentLocation.block}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-transform" />
          </button>

          {showLocMenu && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                Select Karnataka Block
              </div>
              {Object.values(allLocations).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocation(loc.id);
                    setShowLocMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex flex-col hover:bg-slate-700/70 transition-colors ${
                    loc.id === currentLocation.id ? 'bg-emerald-600/20 text-emerald-300 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{loc.name}</span>
                    <span className="text-[10px] text-slate-400">{loc.temp}°C</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{loc.village}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Audio Advisory, Language, Android Studio Code Modal */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Voice Readout Button for Farmers */}
        <button
          onClick={onToggleSpeech}
          className={`p-2 rounded-lg transition-all ${
            isSpeaking
              ? 'bg-amber-500 text-slate-950 animate-pulse shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-300 hover:text-emerald-300 hover:bg-slate-700'
          }`}
          title={isSpeaking ? 'Mute Audio Advisory' : 'Listen to Farmer Voice Advisory'}
          aria-label="Toggle Voice Advisory"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Multi-language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowLocMenu(false);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  onSelectLang('en');
                  setShowLangMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-700 ${
                  lang === 'en' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  onSelectLang('kn');
                  setShowLangMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-700 ${
                  lang === 'kn' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                }`}
              >
                ಕನ್ನಡ (Kannada)
              </button>
              <button
                onClick={() => {
                  onSelectLang('hi');
                  setShowLangMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-700 ${
                  lang === 'hi' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          )}
        </div>

        {/* Android Studio Kotlin & APK Guide Modal */}
        <button
          onClick={onOpenCodeModal}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          title="View Android Studio Source & Build Instructions"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Android APK</span>
        </button>
      </div>
    </header>
  );
};
