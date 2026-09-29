import React from 'react';
import {
  Thermometer,
  CloudRain,
  Droplets,
  Wind,
  Cloud,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { WeatherLocation, TRANSLATIONS } from '../data/mockData';
import { ScreenTab } from './BottomNavBar';

interface HomeScreenProps {
  location: WeatherLocation;
  lang: 'en' | 'kn' | 'hi';
  onNavigate: (tab: ScreenTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ location, lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
      {/* Location Header Section */}
      <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-900/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              {t.appSubtitle}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
              Live Mock Data
            </span>
          </div>

          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            {location.district}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
            <span className="font-medium text-slate-200">{location.village}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{location.block}</span>
          </div>
        </div>
      </div>

      {/* Large Card: MONSOON ONSET */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-850 border border-slate-700/80 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        {/* Background Radial Gradient */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-300">
                {t.monsoonOnset}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.confidence}: {location.onsetConfidence}</span>
            </div>
          </div>

          {/* Probability Metric Display */}
          <div className="flex items-baseline justify-between py-2 border-b border-slate-700/60">
            <div>
              <div className="text-5xl font-black tracking-tight text-white font-sans tabular-nums flex items-baseline gap-1">
                <span>{location.onsetProbability}%</span>
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                {t.probability}
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-amber-400 font-bold text-base">
                <Clock className="w-4 h-4" />
                <span>{location.onsetExpectedDays}</span>
              </div>
              <span className="text-xs text-slate-400">
                {t.expected}
              </span>
            </div>
          </div>

          {/* Quick Status Kicker */}
          <div className="mt-3.5 flex items-center justify-between text-xs text-slate-300">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Onset Imminent (South-West Monsoon)
            </span>
            <button
              onClick={() => onNavigate('monsoon')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium group"
            >
              Outlook
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Weather Parameters Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Temperature */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">
                {location.temp}°C
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.temp}
              </div>
            </div>
          </div>
        </div>

        {/* Rain Chance */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">
                {location.rainChance}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.rainChance}
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">
                {location.humidity}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.humidity}
              </div>
            </div>
          </div>
        </div>

        {/* Wind */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/15 text-teal-400">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">
                {location.windSpeed} km/h
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.wind}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Cover Card */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              {t.cloudCover}: <span className="text-emerald-400 tabular-nums">{location.cloudCover}%</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Stratocumulus cloud bands advancing from Arabian Sea
            </div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('satellite')}
          className="text-xs text-sky-400 hover:text-sky-300 px-2 py-1 rounded bg-sky-950/60 border border-sky-800/50 shrink-0 font-medium"
        >
          View INSAT
        </button>
      </div>

      {/* Quick Advisory Spotlight */}
      <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-emerald-300">
            Farmer Advisory Alert
          </div>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
            Rainfall likely during coming days. Delay sowing 3–5 days to prevent seed wash-off.
          </p>
          <button
            onClick={() => onNavigate('advisory')}
            className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Check Sowing &amp; Fertilizer Tips
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
