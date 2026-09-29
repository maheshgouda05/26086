import React, { useState } from 'react';
import {
  TrendingUp,
  PauseCircle,
  CloudLightning,
  Sun,
  CloudRain,
  Cloud,
  CheckCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { WeatherLocation, TRANSLATIONS } from '../data/mockData';

interface MonsoonOutlookScreenProps {
  location: WeatherLocation;
  lang: 'en' | 'kn' | 'hi';
}

export const MonsoonOutlookScreen: React.FC<MonsoonOutlookScreenProps> = ({ location, lang }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Default Day 4: Onset Likely
  const t = TRANSLATIONS[lang];

  const getTimelineIcon = (icon: string) => {
    switch (icon) {
      case 'rain':
        return <CloudRain className="w-5 h-5 text-sky-400" />;
      case 'storm':
        return <CloudLightning className="w-5 h-5 text-amber-400" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-amber-300" />;
      case 'break':
        return <PauseCircle className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cloud className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    if (status.includes('Onset') || status.includes('Active')) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (status.includes('Rain') || status.includes('Showers')) {
      return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
    if (status.includes('Break')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    return 'bg-slate-700/60 text-slate-300 border-slate-600/40';
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">
          Monsoon Outlook &amp; Progression
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Hyperlocal block-scale onset &amp; break forecast for <span className="text-emerald-400 font-semibold">{location.name}</span>
        </p>
      </div>

      {/* Three Primary Cards Required by Specification */}
      <div className="grid grid-cols-1 gap-3">
        {/* Card 1: MONSOON ONSET */}
        <div className="bg-gradient-to-r from-emerald-950/80 to-slate-850 border border-emerald-500/40 rounded-3xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
                {t.monsoonOnset}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-white tabular-nums">
                  {location.onsetProbability}%
                </span>
                <span className="text-xs text-slate-400">{t.probability}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>{t.confidence}: {location.onsetConfidence}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Window: {location.onsetExpectedDays}
            </div>
          </div>
        </div>

        {/* Card 2: MONSOON BREAK */}
        <div className="bg-gradient-to-r from-amber-950/60 to-slate-850 border border-amber-500/30 rounded-3xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
              <PauseCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-amber-400">
                {t.monsoonBreak}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-white tabular-nums">
                  {location.breakProbability}%
                </span>
                <span className="text-xs text-slate-400">{t.probability}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <span>{t.confidence}: {location.breakConfidence}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Expected post Day 6
            </div>
          </div>
        </div>

        {/* Card 3: HEAVY RAIN */}
        <div className="bg-gradient-to-r from-sky-950/70 to-slate-850 border border-sky-500/30 rounded-3xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400">
              <CloudLightning className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-sky-400">
                {t.heavyRain}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-white tabular-nums">
                  {location.heavyRainProbability}%
                </span>
                <span className="text-xs text-slate-400">{t.probability}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-semibold">
              <span>{t.confidence}: {location.heavyRainConfidence}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Trigger: Convective Storms
            </div>
          </div>
        </div>
      </div>

      {/* Simple 7-Day Timeline Required by Specification */}
      <div className="bg-slate-850 border border-slate-700/80 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs uppercase tracking-wider font-bold text-slate-300">
              {t.outlook7Day}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">Tap day to inspect</span>
        </div>

        {/* Timeline Row List */}
        <div className="space-y-2">
          {location.timeline.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-slate-750 border-2 border-emerald-500/70 shadow-md'
                    : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                {/* Day & Date */}
                <div className="flex items-center gap-3 min-w-[90px]">
                  <div className="p-2 rounded-xl bg-slate-900/80 flex items-center justify-center">
                    {getTimelineIcon(item.icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {item.day}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.date}
                    </div>
                  </div>
                </div>

                {/* Status Label (Clean unboxed with custom styling) */}
                <div className="flex-1 px-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusBadgeColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Rain Chance & Temperatures */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-sky-400 tabular-nums">
                    {item.prob}% Rain
                  </div>
                  <div className="text-[10px] text-slate-400 tabular-nums">
                    {item.tempMax}° / {item.tempMin}°C
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Expanded Detail Card */}
        {selectedDayIndex !== null && (
          <div className="mt-3 p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>{location.timeline[selectedDayIndex].day} Analysis</span>
              <span className="text-slate-400">{location.timeline[selectedDayIndex].status}</span>
            </div>
            <p className="text-slate-300 leading-relaxed pt-1">
              {selectedDayIndex >= 3 && selectedDayIndex <= 5
                ? 'High convective activity predicted. Sowing operations should remain paused. Collect runoff in farm ponds.'
                : selectedDayIndex === 6
                ? 'Monsoon break characteristics expected. Drier window suitable for emergency chemical application or field drainage.'
                : 'Pre-monsoon showers likely. Ensure farm drainage ditches are cleared of silt and weeds.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
