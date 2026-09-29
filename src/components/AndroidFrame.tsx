import React, { ReactNode } from 'react';
import { Smartphone, Monitor, Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: ReactNode;
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
  locationName: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isPhoneFrame,
  setIsPhoneFrame,
  locationName,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 lg:p-8 font-sans">
      {/* Top Presentation Bar with Device Frame Toggle & SIH Metadata */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-4 px-2 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SIH 2026: SIH26086
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            HEXANOD Hyperlocal Monsoon &amp; Break Advisory
          </span>
          <span className="text-slate-500 hidden md:inline">({locationName})</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setIsPhoneFrame(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                isPhoneFrame
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Google Pixel 8 Android Frame View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pixel 8 Frame</span>
            </button>
            <button
              onClick={() => setIsPhoneFrame(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                !isPhoneFrame
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full presentation view"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isPhoneFrame ? (
        <div className="relative w-full max-w-[420px] aspect-[9/19.5] max-h-[880px] bg-slate-900 rounded-[48px] p-3 shadow-2xl shadow-emerald-950/40 border-[7px] border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden transition-all duration-300">
          {/* Top Speaker Earpiece & Holepunch Camera */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-36 px-2">
            <div className="w-10 h-1 bg-slate-800 rounded-full" />
            <div className="w-3.5 h-3.5 bg-black rounded-full ring-2 ring-slate-800/80 shadow-inner" />
            <div className="w-4 h-1 bg-transparent" />
          </div>

          {/* Android Status Bar */}
          <div className="w-full pt-1 pb-1 px-4 flex items-center justify-between text-[11px] font-medium text-slate-300 select-none z-40 bg-slate-900/90 backdrop-blur-sm">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-[10px] font-bold text-emerald-400">5G</span>
              <Signal className="w-3 h-3 text-slate-300" />
              <Wifi className="w-3 h-3 text-slate-300" />
              <BatteryMedium className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative rounded-b-[36px]">
            {children}
          </div>

          {/* Android Gesture Bar */}
          <div className="w-full py-1.5 flex justify-center items-center bg-slate-900">
            <div className="w-32 h-1 bg-slate-500/60 rounded-full" />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden min-h-[780px]">
          {/* Desktop Tablet / Kiosk Status Bar */}
          <div className="w-full py-2 px-6 flex items-center justify-between text-xs font-medium text-slate-400 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-emerald-400">HEXANOD OS</span>
              <span className="text-slate-600">|</span>
              <span>Hyperlocal Meteorological Advisory System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Block Scale AI v1.2</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
