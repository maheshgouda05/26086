import React from 'react';
import {
  MapPin,
  CheckCircle2,
  Thermometer,
  CloudRain,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Compass,
  Layers
} from 'lucide-react';
import { WeatherLocation, LOCATIONS_DATA, TRANSLATIONS } from '../data/mockData';
import { ScreenTab } from './BottomNavBar';

interface LocationMapScreenProps {
  currentLocation: WeatherLocation;
  onSelectLocation: (id: string) => void;
  lang: 'en' | 'kn' | 'hi';
  onNavigate: (tab: ScreenTab) => void;
}

export const LocationMapScreen: React.FC<LocationMapScreenProps> = ({
  currentLocation,
  onSelectLocation,
  lang,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const locationsList = Object.values(LOCATIONS_DATA);

  // Approximate relative coordinates for stylised Karnataka map SVG
  const pinPositions: Record<string, { x: number; y: number }> = {
    'bengaluru-rural': { x: 74, y: 52 },
    'mysuru': { x: 42, y: 82 },
    'mandya': { x: 55, y: 68 },
    'tumakuru': { x: 62, y: 38 },
    'hassan': { x: 34, y: 56 },
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl font-black text-white tracking-tight">
            Hyperlocal Agro-Climatic Map
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Select a block/village to view tailored monsoon probability &amp; advisories
        </p>
      </div>

      {/* Stylized Interactive Vector Map Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-300">South Karnataka Agro-Zone</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Click any pin to switch
          </span>
        </div>

        {/* Stylized Map Canvas */}
        <div className="relative w-full aspect-[16/11] bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
          {/* Topographic Background Grids & Contours */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Karnataka Regional Boundary Outline Silhouette */}
            <path
              d="M 50,20 C 120,30 200,10 280,40 C 320,60 360,110 350,180 C 340,240 310,290 280,310 C 230,330 180,300 130,280 C 90,260 50,210 40,150 C 30,100 40,50 50,20 Z"
              fill="rgba(16, 185, 129, 0.05)"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeWidth="2"
              strokeDasharray="6,4"
            />
          </svg>

          {/* Interactive Clickable Pins */}
          {locationsList.map((loc) => {
            const isSelected = loc.id === currentLocation.id;
            const pos = pinPositions[loc.id] || { x: 50, y: 50 };

            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc.id)}
                style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none transition-transform duration-200 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                {/* Pin Head & Ripple */}
                <div className="relative flex flex-col items-center">
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-lg transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 ring-offset-2 ring-offset-slate-900'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-emerald-900/60 hover:text-emerald-300'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc.name}</span>
                  </div>

                  {/* Micro Weather Tag */}
                  <span className="text-[10px] font-mono mt-0.5 px-1 rounded bg-black/60 text-slate-300 tabular-nums">
                    {loc.temp}°C · {loc.rainChance}% rain
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Current Selection Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs px-1">
          <span className="text-slate-400">
            Selected District: <strong className="text-white">{currentLocation.name}</strong>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Active in All Screens
          </span>
        </div>
      </div>

      {/* Selected Location Comprehensive Metrics Card */}
      <div className="bg-slate-850 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-start justify-between border-b border-slate-700/60 pb-3">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
              Live Village Parameters
            </div>
            <h2 className="text-xl font-black text-white mt-0.5">
              {currentLocation.village}
            </h2>
            <div className="text-xs text-slate-400">
              {currentLocation.block}, {currentLocation.district}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              {currentLocation.coordinates.lat}° N, {currentLocation.coordinates.lng}° E
            </span>
          </div>
        </div>

        {/* Required 4 Metrics for Selected Village */}
        <div className="grid grid-cols-2 gap-3">
          {/* Temperature */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Temperature</span>
              <Thermometer className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1 tabular-nums">
              {currentLocation.temp}°C
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Humidity: {currentLocation.humidity}%
            </div>
          </div>

          {/* Rain Probability */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Rain Probability</span>
              <CloudRain className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-400 mt-1 tabular-nums">
              {currentLocation.rainChance}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Wind: {currentLocation.windSpeed} km/h
            </div>
          </div>

          {/* Monsoon Probability */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Monsoon Onset</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
              {currentLocation.onsetProbability}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Confidence: {currentLocation.onsetConfidence}
            </div>
          </div>

          {/* Heavy Rain Risk */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Heavy Rain Risk</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1 tabular-nums">
              {currentLocation.heavyRainProbability}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Break Risk: {currentLocation.breakProbability}%
            </div>
          </div>
        </div>

        {/* Farmer Advisory Summary for this specific location */}
        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-700/60">
          <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center justify-between">
            <span>Location Agro-Advisory</span>
            <span className="text-[10px] text-slate-400 font-normal">Auto-calibrated</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentLocation.onsetProbability >= 80
              ? 'Monsoon onset is imminent within 48-72 hours. All field sowing must be paused to prevent seed rotting. Protect drying harvests immediately.'
              : currentLocation.onsetProbability >= 70
              ? 'Onset expected in 3–7 days. Rain probability increasing. Delay sowing for a few days and monitor the next forecast.'
              : 'Moderate onset delay in this agro-climatic pocket. Conserve soil moisture and proceed with preparatory land tillage.'}
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onNavigate('home')}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
          >
            <span>View Home Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('advisory')}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-colors"
          >
            <span>View Farmer Advisory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Select Other Locations List */}
      <div className="bg-slate-850 border border-slate-700/80 rounded-3xl p-4 shadow-xl">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Compare Other Karnataka Blocks
        </div>

        <div className="space-y-1.5">
          {locationsList.map((loc) => {
            const isSelected = loc.id === currentLocation.id;
            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc.id)}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-xs transition-colors ${
                  isSelected
                    ? 'bg-emerald-600/20 border border-emerald-500/40 text-white'
                    : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-semibold">{loc.name}</span>
                    <span className="text-[10px] text-slate-400 block">{loc.village}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="font-bold text-emerald-400">{loc.onsetProbability}%</span>
                    <span className="text-[10px] text-slate-400 block">Onset</span>
                  </div>
                  <div>
                    <span className="font-bold text-sky-400">{loc.rainChance}%</span>
                    <span className="text-[10px] text-slate-400 block">Rain</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
