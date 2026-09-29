/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LOCATIONS_DATA, WeatherLocation } from './data/mockData';
import { AndroidFrame } from './components/AndroidFrame';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, ScreenTab } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { FarmerAdvisoryScreen } from './components/FarmerAdvisoryScreen';
import { SatelliteScreen } from './components/SatelliteScreen';
import { MonsoonOutlookScreen } from './components/MonsoonOutlookScreen';
import { LocationMapScreen } from './components/LocationMapScreen';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { Play, Sparkles, CheckCircle2, Navigation } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('bengaluru-rural');
  const [lang, setLang] = useState<'en' | 'kn' | 'hi'>('en');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentLocation: WeatherLocation =
    LOCATIONS_DATA[selectedLocationId] || LOCATIONS_DATA['bengaluru-rural'];

  // Farmer Voice Readout Speech Synthesis
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Select localized voice if available
      const voices = window.speechSynthesis.getVoices();
      if (lang === 'kn') {
        const knVoice = voices.find((v) => v.lang.startsWith('kn') || v.name.includes('Kannada'));
        if (knVoice) utterance.voice = knVoice;
      } else if (lang === 'hi') {
        const hiVoice = voices.find((v) => v.lang.startsWith('hi') || v.name.includes('Hindi'));
        if (hiVoice) utterance.voice = hiVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const toggleGeneralSpeech = () => {
    const textToSpeak =
      `HEXANOD advisory for ${currentLocation.district}. Monsoon Onset probability is ${currentLocation.onsetProbability} percent, expected in ${currentLocation.onsetExpectedDays}. Rainfall chance is ${currentLocation.rainChance} percent. Delay sowing 3 to 5 days.`;
    handlePlayAudio(textToSpeak);
  };

  // Demo Flow shortcuts for hackathon presentation tomorrow
  const demoSteps: { label: string; tab: ScreenTab; locId?: string }[] = [
    { label: '1. Home (Bengaluru Rural)', tab: 'home', locId: 'bengaluru-rural' },
    { label: '2. Satellite (INSAT-3D)', tab: 'satellite' },
    { label: '3. Farmer Advisory (Ragi)', tab: 'advisory' },
    { label: '4. Monsoon Outlook', tab: 'monsoon' },
    { label: '5. Map (Switch Village)', tab: 'map', locId: 'mysuru' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* SIH 2026 Presentation Quick-Bar */}
      <aside aria-label="Demo Flow" className="bg-slate-900 border-b border-slate-800 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH 2026 Presentation Flow:</span>
          </span>
          <span className="text-slate-400 hidden md:inline">
            1-Click Demo Steps for Judges
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {demoSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(step.tab);
                if (step.locId) setSelectedLocationId(step.locId);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                activeTab === step.tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Android Device Frame Wrapper */}
      <AndroidFrame
        isPhoneFrame={isPhoneFrame}
        setIsPhoneFrame={setIsPhoneFrame}
        locationName={currentLocation.name}
      >
        {/* Top App Bar */}
        <TopAppBar
          currentLocation={currentLocation}
          allLocations={LOCATIONS_DATA}
          onSelectLocation={(id) => setSelectedLocationId(id)}
          lang={lang}
          onSelectLang={(newLang) => setLang(newLang)}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          isSpeaking={isSpeaking}
          onToggleSpeech={toggleGeneralSpeech}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'home' && (
            <HomeScreen
              location={currentLocation}
              lang={lang}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'advisory' && (
            <FarmerAdvisoryScreen
              location={currentLocation}
              lang={lang}
              onPlayAudio={handlePlayAudio}
              isSpeaking={isSpeaking}
            />
          )}

          {activeTab === 'satellite' && (
            <SatelliteScreen
              location={currentLocation}
              lang={lang}
            />
          )}

          {activeTab === 'monsoon' && (
            <MonsoonOutlookScreen
              location={currentLocation}
              lang={lang}
            />
          )}

          {activeTab === 'map' && (
            <LocationMapScreen
              currentLocation={currentLocation}
              onSelectLocation={(id) => setSelectedLocationId(id)}
              lang={lang}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </AndroidFrame>

      {/* Android Studio Kotlin Code & APK Build Modal */}
      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
