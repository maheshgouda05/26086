import React, { useState } from 'react';
import {
  Satellite,
  RefreshCw,
  Clock,
  Radio,
  Cloud,
  Droplets,
  Wind,
  Layers,
  Database,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { WeatherLocation, TRANSLATIONS } from '../data/mockData';
import satelliteImage from '../assets/images/insat_satellite_radar_view_1790673560200.jpg';

interface SatelliteScreenProps {
  location: WeatherLocation;
  lang: 'en' | 'kn' | 'hi';
}

export const SatelliteScreen: React.FC<SatelliteScreenProps> = ({ location, lang }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'thermal' | 'vapor' | 'radar'>('radar');
  const [lastUpdated, setLastUpdated] = useState('10 minutes ago');
  const [cloudCoverVal, setCloudCoverVal] = useState(location.cloudCover);
  const [rainfallVal, setRainfallVal] = useState(location.satelliteRainfallEstimate);
  const [windVal, setWindVal] = useState(location.windSpeed);
  const [isScanning, setIsScanning] = useState(true);

  const t = TRANSLATIONS[lang];

  // Refresh handler to simulate live telemetry update
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Fluctuate slightly to demonstrate live telemetry update
      const newDelta = (Math.random() - 0.5) * 2;
      setCloudCoverVal((prev) => Math.min(98, Math.max(30, Math.round(prev + newDelta))));
      setRainfallVal((prev) => Math.max(1, +(prev + (Math.random() * 1.5 - 0.5)).toFixed(1)));
      setWindVal((prev) => Math.max(8, Math.round(prev + (Math.random() * 2 - 1))));
      setLastUpdated('Just now');
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-6">
      {/* Title & Clear DEMO DATA Label */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl font-black text-white tracking-tight">
              {t.satelliteObservation}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Geostationary Meteorological Feed · {location.name} Block
          </p>
        </div>

        {/* Mandatory DEMO DATA Badge */}
        <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider">
          {t.demoData}
        </span>
      </div>

      {/* Large Satellite / Weather Image Card */}
      <div className="relative bg-slate-950 border border-slate-700/85 rounded-3xl overflow-hidden shadow-2xl group">
        {/* Top Floating Badge overlay */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700 text-xs font-medium text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">INSAT-3D</span>
          <span className="text-slate-500">·</span>
          <span>Karnataka Sector</span>
        </div>

        {/* Scan Animation Toggle */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-md border transition-all ${
              isScanning
                ? 'bg-emerald-600/80 text-white border-emerald-400'
                : 'bg-slate-900/80 text-slate-400 border-slate-700'
            }`}
          >
            {isScanning ? 'Radar Scan: ON' : 'Radar Scan: OFF'}
          </button>
        </div>

        {/* Main Satellite Imagery Container with Resilient Fallback */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 flex items-center justify-center">
          <img
            src={satelliteImage}
            alt="MOSDAC INSAT-3D Meteorological Satellite Radar View"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-700 ${
              activeLayer === 'thermal'
                ? 'hue-rotate-180 contrast-125 saturate-150'
                : activeLayer === 'vapor'
                ? 'hue-rotate-90 brightness-110'
                : 'contrast-110'
            }`}
          />

          {/* Radar Scanning Line Effect */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_4s_infinite]" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
            </div>
          )}

          {/* Crosshairs & Target Coordinates */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-16 h-16 border border-emerald-400/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>
            {/* Target Label */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-emerald-300/90 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
              LAT: {location.coordinates.lat}°N / LNG: {location.coordinates.lng}°E
            </div>
          </div>
        </div>

        {/* Layer Switcher Under Image */}
        <div className="p-2.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-300">Spectral Band:</span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setActiveLayer('radar')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeLayer === 'radar'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Precip Radar
            </button>
            <button
              onClick={() => setActiveLayer('thermal')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeLayer === 'thermal'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              IR Thermal
            </button>
            <button
              onClick={() => setActiveLayer('vapor')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeLayer === 'vapor'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Water Vapor
            </button>
          </div>
        </div>
      </div>

      {/* Satellite Telemetry Metrics Card */}
      <div className="bg-slate-850 border border-slate-700/80 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
              Live Satellite Parameters
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            MOSDAC / ISRO Feed
          </span>
        </div>

        {/* 4 Required Observation Fields */}
        <div className="grid grid-cols-2 gap-3">
          {/* Satellite Name */}
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 font-medium">
              Satellite
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              INSAT-3D
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">
              Geostationary 82°E Orbit
            </div>
          </div>

          {/* Cloud Coverage */}
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Cloud Coverage</span>
              <Cloud className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 tabular-nums">
              {cloudCoverVal}%
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Overcast Convective Bands
            </div>
          </div>

          {/* Rainfall Estimate */}
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Rainfall Estimate</span>
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl font-extrabold text-sky-400 mt-0.5 tabular-nums">
              {rainfallVal} mm
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Accumulated 3-hr Rate
            </div>
          </div>

          {/* Wind */}
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-3">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Wind</span>
              <Wind className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 tabular-nums">
              {windVal} km/h
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              South-Westerly Flow
            </div>
          </div>
        </div>

        {/* Source & Timestamp Info Row */}
        <div className="bg-slate-900/60 rounded-2xl p-3 border border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Data Source:</span>
            <span className="font-semibold text-white">MOSDAC / INSAT-3D</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Refresh Satellite Data Action Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-950/40 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Retrieving Stream...' : t.refreshData}</span>
        </button>
      </div>
    </div>
  );
};
