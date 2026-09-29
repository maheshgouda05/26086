import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  FlaskConical,
  Wheat,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Volume2,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  WeatherLocation,
  CropType,
  StageType,
  CROP_ADVISORIES,
  TRANSLATIONS
} from '../data/mockData';

interface FarmerAdvisoryScreenProps {
  location: WeatherLocation;
  lang: 'en' | 'kn' | 'hi';
  onPlayAudio: (text: string) => void;
  isSpeaking: boolean;
}

export const FarmerAdvisoryScreen: React.FC<FarmerAdvisoryScreenProps> = ({
  location,
  lang,
  onPlayAudio,
  isSpeaking
}) => {
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Ragi');
  const [selectedStage, setSelectedStage] = useState<StageType>('Sowing');

  const t = TRANSLATIONS[lang];
  const advisory = CROP_ADVISORIES[selectedCrop][selectedStage];

  const crops: { id: CropType; label: string; icon: string }[] = [
    { id: 'Ragi', label: 'Ragi (ರಾಗಿ)', icon: '🌾' },
    { id: 'Paddy', label: 'Paddy (ಭತ್ತ)', icon: '🌱' },
    { id: 'Maize', label: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', icon: '🌽' },
    { id: 'Groundnut', label: 'Groundnut (ಕಡಲೆಕಾಯಿ)', icon: '🥜' },
    { id: 'Sugarcane', label: 'Sugarcane (ಕಬ್ಬು)', icon: '🎋' },
  ];

  const stages: { id: StageType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'Sowing', label: 'Sowing', icon: Sprout },
    { id: 'Irrigation', label: 'Irrigation', icon: Droplets },
    { id: 'Fertilizer', label: 'Fertilizer', icon: FlaskConical },
    { id: 'Harvest', label: 'Harvest', icon: Wheat },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
      {/* Title & Context */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <h1 className="text-xl font-black text-white tracking-tight">
              {t.farmerAdvisory}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Hyperlocal recommendations for <span className="text-emerald-400 font-medium">{location.district}</span>
          </p>
        </div>

        {/* Listen Button */}
        <button
          onClick={() =>
            onPlayAudio(
              `Advisory for ${selectedCrop}, stage ${selectedStage}: ${advisory.headline}. ${advisory.recommendation}`
            )
          }
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isSpeaking
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-950/50'
          }`}
          title="Play voice audio in vernacular"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'Listening...' : 'Listen'}</span>
        </button>
      </div>

      {/* General Monsoon Context Alert */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-800 to-slate-800 border border-emerald-500/30 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">
              General Agro-Meteorological Advisory:
            </span>
            &ldquo;Rainfall is likely during the coming days. If you are planning sowing, consider waiting 3–5 days and check the next update.&rdquo;
          </div>
        </div>
      </div>

      {/* Crop Selector Tabs */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Select Crop (ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ)</span>
          <span className="text-emerald-400 text-[11px] font-mono lowercase">selected: {selectedCrop}</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCrop === crop.id
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{crop.icon}</span>
              <span>{crop.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Farming Operation / Stage Buttons */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Agricultural Operation / Stage
        </div>

        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl text-xs transition-all ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="truncate text-[11px]">{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Advisory Card */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 shadow-xl space-y-4">
        {/* Stage Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wide">
              {selectedStage} ADVISORY
            </span>
            <span className="text-xs text-slate-400">for {selectedCrop}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Monsoon Risk: {location.rainChance}% Rain</span>
          </div>
        </div>

        {/* Large Prominent Headline */}
        <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700/50">
          <p className="text-sm sm:text-base font-bold text-emerald-200 leading-snug">
            &ldquo;{advisory.headline}&rdquo;
          </p>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {advisory.recommendation}
          </p>
        </div>

        {/* Dos & Don'ts Checklist */}
        <div className="space-y-3 pt-1">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.dos}</span>
            </div>
            <ul className="space-y-1.5">
              {advisory.dos.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide mb-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.donts}</span>
            </div>
            <ul className="space-y-1.5">
              {advisory.donts.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            Valid for next 72 Hours
          </span>
          <span className="text-slate-500">
            Source: UAS Bengaluru / ICAR-CRIDA
          </span>
        </div>
      </div>
    </div>
  );
};
