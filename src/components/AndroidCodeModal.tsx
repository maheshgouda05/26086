import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Cpu, ShieldCheck, Download } from 'lucide-react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'mainActivity' | 'screens' | 'gradle'>('guide');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const mainActivityKotlin = `package com.hexanod.monsoon

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.hexanod.monsoon.ui.navigation.HexanodBottomNav
import com.hexanod.monsoon.ui.screens.*
import com.hexanod.monsoon.ui.theme.HexanodTheme
import com.hexanod.monsoon.data.MockDataProvider

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HexanodTheme {
                HexanodMainApp()
            }
        }
    }
}

@Composable
fun HexanodMainApp() {
    var currentTab by remember { mutableStateOf("home") }
    var selectedLocationId by remember { mutableStateOf("bengaluru-rural") }
    val location = MockDataProvider.getLocation(selectedLocationId)

    Scaffold(
        bottomBar = {
            HexanodBottomNav(
                currentTab = currentTab,
                onTabSelected = { currentTab = it }
            )
        }
    ) { innerPadding ->
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            color = MaterialTheme.colorScheme.background
        ) {
            when (currentTab) {
                "home" -> HomeScreen(
                    location = location,
                    onNavigateToTab = { currentTab = it }
                )
                "monsoon" -> MonsoonOutlookScreen(location = location)
                "advisory" -> FarmerAdvisoryScreen(location = location)
                "satellite" -> SatelliteScreen(location = location)
                "map" -> LocationMapScreen(
                    currentLocationId = selectedLocationId,
                    onSelectLocation = { selectedLocationId = it }
                )
            }
        }
    }
}`;

  const buildGradleKotlin = `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.hexanod.monsoon"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.hexanod.monsoon"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.09.00"))
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.4")
    implementation("androidx.activity:activity-compose:1.9.1")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3:1.3.0")
    implementation("androidx.compose.material:material-icons-extended:1.7.0")
    implementation("androidx.navigation:navigation-compose:2.8.0")
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                SIH26086 Prototype
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 text-xs">Kotlin &amp; Jetpack Compose Project</span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">
              HEXANOD Android Studio Presentation &amp; Build Guide
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 flex gap-2 bg-slate-900/60 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'text-emerald-400 border-emerald-400 bg-slate-800/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>1. Android Studio &amp; APK Instructions</span>
          </button>
          <button
            onClick={() => setActiveTab('mainActivity')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'mainActivity'
                ? 'text-emerald-400 border-emerald-400 bg-slate-800/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>2. MainActivity.kt</span>
          </button>
          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'text-emerald-400 border-emerald-400 bg-slate-800/80'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. build.gradle.kts</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* Question 1: Which file to run */}
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">1</span>
                  <h3>Which File to Run in Android Studio</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-8">
                  Run <code className="bg-slate-800 px-2 py-0.5 rounded text-emerald-300 font-mono">MainActivity.kt</code> located in{' '}
                  <code className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                    app/src/main/java/com/hexanod/monsoon/MainActivity.kt
                  </code>.
                  It contains the root <code className="text-emerald-300 font-mono">ComponentActivity</code> and initializes{' '}
                  <code className="text-emerald-300 font-mono">HexanodMainApp()</code> with the Jetpack Compose navigation scaffold.
                </p>
              </div>

              {/* Question 2: How to build the APK */}
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">2</span>
                  <h3>How to Build the APK</h3>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pl-8 space-y-2">
                  <p>In Android Studio or your terminal, run either of these methods:</p>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                    <span>./gradlew assembleDebug</span>
                    <button
                      onClick={() => copyToClipboard('./gradlew assembleDebug', 'cmd1')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedFile === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Output location: <code className="text-slate-300">app/build/outputs/apk/debug/app-debug.apk</code>
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Or via Android Studio GUI: Menu <strong className="text-white">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.
                  </p>
                </div>
              </div>

              {/* Question 3: How to launch the prototype */}
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">3</span>
                  <h3>How to Launch the Prototype</h3>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pl-8 space-y-1.5">
                  <p>1. Open Android Studio (Hedgehog or newer) and select <strong>Open Project</strong> pointing to this repository.</p>
                  <p>2. Select an Android Virtual Device (AVD) such as <strong>Pixel 8 (API 34 or 35)</strong> or connect a physical Android device via USB debugging.</p>
                  <p>3. Click the green <strong>Run 'app'</strong> button (<kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">Shift + F10</kbd>).</p>
                  <p>4. The app boots directly into the <strong>Home Screen</strong> showing Bengaluru Rural and 72% Onset probability.</p>
                </div>
              </div>

              {/* Question 4: Which values are mock data */}
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">4</span>
                  <h3>Which Values are Mock Data</h3>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pl-8 space-y-1">
                  <p>All values in <code className="text-rose-300 font-mono">MockDataProvider.kt</code> / <code className="text-rose-300 font-mono">mockData.ts</code> are hardcoded for presentation reliability:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                    <li><strong>Monsoon Onset Probability (72%)</strong> &amp; <strong>Onset Window (3–7 days)</strong></li>
                    <li><strong>Monsoon Break Probability (28%)</strong> &amp; <strong>Heavy Rain Probability (61%)</strong></li>
                    <li><strong>Current weather stats</strong> (27°C, 65% rain chance, 72% humidity, 14 km/h wind)</li>
                    <li><strong>INSAT-3D mock readings</strong> (68% cloud cover, 12 mm rainfall estimate)</li>
                    <li><strong>Karnataka block locations</strong> (Bengaluru Rural, Mysuru, Mandya, Tumakuru, Hassan)</li>
                    <li><strong>Crop advisories</strong> for Ragi, Paddy, Maize, Groundnut, Sugarcane</li>
                  </ul>
                </div>
              </div>

              {/* Question 5: Where real APIs will be connected */}
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">5</span>
                  <h3>Where Real APIs Will Eventually Be Connected</h3>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed pl-8 space-y-2">
                  <p>In production, replace <code className="text-purple-300 font-mono">MockDataProvider.kt</code> with a Retrofit/Ktor network repository:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-bold text-white mb-0.5">1. ISRO / MOSDAC API</div>
                      <span className="text-slate-400">Fetch live INSAT-3D / 3DR HDF5/GeoTIFF raster tiles (TIR1, WV) for real-time cloud and rainfall estimates.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-bold text-white mb-0.5">2. IMD / WRF Hyperlocal Model</div>
                      <span className="text-slate-400">High-resolution 3km numerical weather prediction output for village-level wind shear and kinetic energy fluxes.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-bold text-white mb-0.5">3. SIH AI/ML Model Endpoint</div>
                      <span className="text-slate-400">Custom LSTM / Transformer model evaluating Outgoing Longwave Radiation (OLR) and 850 hPa zonal winds to predict onset probability.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-bold text-white mb-0.5">4. ICAR / UAS Agromet Advisory</div>
                      <span className="text-slate-400">Dynamic agrometeorological advisory feeds calibrated by district Krishi Vigyan Kendra (KVK).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mainActivity' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  app/src/main/java/com/hexanod/monsoon/MainActivity.kt
                </span>
                <button
                  onClick={() => copyToClipboard(mainActivityKotlin, 'mainAct')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
                >
                  {copiedFile === 'mainAct' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFile === 'mainAct' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                <code>{mainActivityKotlin}</code>
              </pre>
            </div>
          )}

          {activeTab === 'gradle' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  app/build.gradle.kts
                </span>
                <button
                  onClick={() => copyToClipboard(buildGradleKotlin, 'gradle')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
                >
                  {copiedFile === 'gradle' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFile === 'gradle' ? 'Copied' : 'Copy Gradle'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                <code>{buildGradleKotlin}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            SIH 2026 Presentation Ready · Android Studio HedgeHog/Iguana/Koala Compatible
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
