export interface WeatherLocation {
  id: string;
  name: string;
  district: string;
  block: string;
  village: string;
  coordinates: { lat: number; lng: number };
  temp: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  onsetProbability: number;
  onsetExpectedDays: string;
  onsetConfidence: 'High' | 'Medium' | 'Low';
  breakProbability: number;
  breakConfidence: 'High' | 'Medium' | 'Low';
  heavyRainProbability: number;
  heavyRainConfidence: 'High' | 'Medium' | 'Low';
  satelliteRainfallEstimate: number; // in mm
  timeline: {
    day: string;
    date: string;
    status: string;
    icon: 'rain' | 'sun' | 'cloud' | 'storm' | 'break';
    tempMax: number;
    tempMin: number;
    prob: number;
  }[];
}

export type CropType = 'Ragi' | 'Paddy' | 'Maize' | 'Groundnut' | 'Sugarcane';
export type StageType = 'Sowing' | 'Irrigation' | 'Fertilizer' | 'Harvest';

export interface CropAdvisoryDetail {
  headline: string;
  recommendation: string;
  dos: string[];
  donts: string[];
  alertLevel: 'warning' | 'favorable' | 'critical';
}

export const LOCATIONS_DATA: Record<string, WeatherLocation> = {
  'bengaluru-rural': {
    id: 'bengaluru-rural',
    name: 'Bengaluru Rural',
    district: 'Bengaluru Rural',
    block: 'Devanahalli Block',
    village: 'Kannamangala Village',
    coordinates: { lat: 13.24, lng: 77.71 },
    temp: 27,
    rainChance: 65,
    humidity: 72,
    windSpeed: 14,
    cloudCover: 68,
    onsetProbability: 72,
    onsetExpectedDays: '3–7 days',
    onsetConfidence: 'High',
    breakProbability: 28,
    breakConfidence: 'Medium',
    heavyRainProbability: 61,
    heavyRainConfidence: 'Medium',
    satelliteRainfallEstimate: 12,
    timeline: [
      { day: 'Day 1', date: 'Today', status: 'Normal', icon: 'cloud', tempMax: 29, tempMin: 21, prob: 25 },
      { day: 'Day 2', date: 'Tomorrow', status: 'Rain', icon: 'rain', tempMax: 27, tempMin: 20, prob: 65 },
      { day: 'Day 3', date: '+2 Days', status: 'Rain', icon: 'rain', tempMax: 26, tempMin: 20, prob: 70 },
      { day: 'Day 4', date: '+3 Days', status: 'Onset Likely', icon: 'storm', tempMax: 25, tempMin: 19, prob: 82 },
      { day: 'Day 5', date: '+4 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 24, tempMin: 19, prob: 88 },
      { day: 'Day 6', date: '+5 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 25, tempMin: 19, prob: 78 },
      { day: 'Day 7', date: '+6 Days', status: 'Break Possible', icon: 'break', tempMax: 28, tempMin: 20, prob: 35 },
    ]
  },
  'mysuru': {
    id: 'mysuru',
    name: 'Mysuru',
    district: 'Mysuru',
    block: 'Nanjangud Block',
    village: 'Hullahalli Village',
    coordinates: { lat: 12.12, lng: 76.68 },
    temp: 29,
    rainChance: 45,
    humidity: 65,
    windSpeed: 16,
    cloudCover: 52,
    onsetProbability: 84,
    onsetExpectedDays: '2–4 days',
    onsetConfidence: 'High',
    breakProbability: 18,
    breakConfidence: 'Low',
    heavyRainProbability: 74,
    heavyRainConfidence: 'High',
    satelliteRainfallEstimate: 18,
    timeline: [
      { day: 'Day 1', date: 'Today', status: 'Partly Cloudy', icon: 'cloud', tempMax: 30, tempMin: 22, prob: 30 },
      { day: 'Day 2', date: 'Tomorrow', status: 'Light Rain', icon: 'rain', tempMax: 28, tempMin: 21, prob: 55 },
      { day: 'Day 3', date: '+2 Days', status: 'Onset Likely', icon: 'storm', tempMax: 26, tempMin: 20, prob: 85 },
      { day: 'Day 4', date: '+3 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 25, tempMin: 19, prob: 92 },
      { day: 'Day 5', date: '+4 Days', status: 'Heavy Rain', icon: 'storm', tempMax: 24, tempMin: 19, prob: 88 },
      { day: 'Day 6', date: '+5 Days', status: 'Active Monsoon', icon: 'rain', tempMax: 26, tempMin: 20, prob: 70 },
      { day: 'Day 7', date: '+6 Days', status: 'Scattered Rain', icon: 'cloud', tempMax: 27, tempMin: 21, prob: 45 },
    ]
  },
  'mandya': {
    id: 'mandya',
    name: 'Mandya',
    district: 'Mandya',
    block: 'Pandavapura Block',
    village: 'Melukote Village',
    coordinates: { lat: 12.66, lng: 76.67 },
    temp: 28,
    rainChance: 58,
    humidity: 70,
    windSpeed: 12,
    cloudCover: 62,
    onsetProbability: 68,
    onsetExpectedDays: '4–8 days',
    onsetConfidence: 'Medium',
    breakProbability: 32,
    breakConfidence: 'Medium',
    heavyRainProbability: 54,
    heavyRainConfidence: 'Medium',
    satelliteRainfallEstimate: 9,
    timeline: [
      { day: 'Day 1', date: 'Today', status: 'Normal', icon: 'sun', tempMax: 31, tempMin: 22, prob: 20 },
      { day: 'Day 2', date: 'Tomorrow', status: 'Cloudy', icon: 'cloud', tempMax: 29, tempMin: 21, prob: 40 },
      { day: 'Day 3', date: '+2 Days', status: 'Rain Showers', icon: 'rain', tempMax: 27, tempMin: 20, prob: 65 },
      { day: 'Day 4', date: '+3 Days', status: 'Onset Approaching', icon: 'rain', tempMax: 26, tempMin: 20, prob: 75 },
      { day: 'Day 5', date: '+4 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 25, tempMin: 19, prob: 80 },
      { day: 'Day 6', date: '+5 Days', status: 'Active Monsoon', icon: 'rain', tempMax: 26, tempMin: 20, prob: 68 },
      { day: 'Day 7', date: '+6 Days', status: 'Break Likely', icon: 'break', tempMax: 29, tempMin: 21, prob: 25 },
    ]
  },
  'tumakuru': {
    id: 'tumakuru',
    name: 'Tumakuru',
    district: 'Tumakuru',
    block: 'Kunigal Block',
    village: 'Amruthur Village',
    coordinates: { lat: 13.04, lng: 77.03 },
    temp: 26,
    rainChance: 74,
    humidity: 78,
    windSpeed: 18,
    cloudCover: 75,
    onsetProbability: 79,
    onsetExpectedDays: '2–5 days',
    onsetConfidence: 'High',
    breakProbability: 21,
    breakConfidence: 'Low',
    heavyRainProbability: 69,
    heavyRainConfidence: 'High',
    satelliteRainfallEstimate: 16,
    timeline: [
      { day: 'Day 1', date: 'Today', status: 'Overcast', icon: 'cloud', tempMax: 28, tempMin: 20, prob: 45 },
      { day: 'Day 2', date: 'Tomorrow', status: 'Heavy Showers', icon: 'rain', tempMax: 26, tempMin: 19, prob: 75 },
      { day: 'Day 3', date: '+2 Days', status: 'Onset Confirmed', icon: 'storm', tempMax: 24, tempMin: 18, prob: 88 },
      { day: 'Day 4', date: '+3 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 24, tempMin: 18, prob: 90 },
      { day: 'Day 5', date: '+4 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 25, tempMin: 19, prob: 82 },
      { day: 'Day 6', date: '+5 Days', status: 'Light Rain', icon: 'rain', tempMax: 27, tempMin: 20, prob: 55 },
      { day: 'Day 7', date: '+6 Days', status: 'Normal', icon: 'cloud', tempMax: 29, tempMin: 21, prob: 30 },
    ]
  },
  'hassan': {
    id: 'hassan',
    name: 'Hassan',
    district: 'Hassan',
    block: 'Channarayapatna Block',
    village: 'Shravanabelagola Village',
    coordinates: { lat: 12.91, lng: 76.38 },
    temp: 25,
    rainChance: 82,
    humidity: 84,
    windSpeed: 21,
    cloudCover: 86,
    onsetProbability: 88,
    onsetExpectedDays: '1–3 days',
    onsetConfidence: 'High',
    breakProbability: 14,
    breakConfidence: 'Low',
    heavyRainProbability: 79,
    heavyRainConfidence: 'High',
    satelliteRainfallEstimate: 26,
    timeline: [
      { day: 'Day 1', date: 'Today', status: 'Light Rain', icon: 'rain', tempMax: 26, tempMin: 19, prob: 65 },
      { day: 'Day 2', date: 'Tomorrow', status: 'Onset Imminent', icon: 'storm', tempMax: 24, tempMin: 18, prob: 85 },
      { day: 'Day 3', date: '+2 Days', status: 'Intense Monsoon', icon: 'storm', tempMax: 23, tempMin: 17, prob: 95 },
      { day: 'Day 4', date: '+3 Days', status: 'Intense Monsoon', icon: 'storm', tempMax: 23, tempMin: 17, prob: 92 },
      { day: 'Day 5', date: '+4 Days', status: 'Active Monsoon', icon: 'storm', tempMax: 24, tempMin: 18, prob: 85 },
      { day: 'Day 6', date: '+5 Days', status: 'Moderate Rain', icon: 'rain', tempMax: 25, tempMin: 19, prob: 70 },
      { day: 'Day 7', date: '+6 Days', status: 'Scattered Rain', icon: 'rain', tempMax: 26, tempMin: 20, prob: 50 },
    ]
  }
};

export const CROP_ADVISORIES: Record<CropType, Record<StageType, CropAdvisoryDetail>> = {
  Ragi: {
    Sowing: {
      headline: 'Rain probability is increasing. Consider delaying sowing for 3–5 days and monitor the next forecast.',
      recommendation: 'Heavy showers predicted between Day 3 and Day 5 can wash away newly sown ragi seeds or cause seed rotting in waterlogged red soil.',
      dos: ['Ensure field drainage channels are clear of debris.', 'Treat seeds with Trichoderma harzianum @ 4g/kg seed.', 'Wait for uniform soil moisture before sowing.'],
      donts: ['Do not sow seeds in low-lying flatbeds today.', 'Avoid dry sowing right before heavy rain spells.'],
      alertLevel: 'warning'
    },
    Irrigation: {
      headline: 'Postpone scheduled irrigation. Ample rainfall expected within 48–72 hours.',
      recommendation: 'With a 65%–75% rain probability and high soil moisture, supplemental canal or borewell watering will cause nitrogen leaching and root suffocation.',
      dos: ['Turn off micro-sprinklers and drip valves.', 'Check bund integrity to harvest surface runoff water in farm ponds.'],
      donts: ['Do not apply borewell irrigation.', 'Do not allow standing water over 24 hours in ragi nurseries.'],
      alertLevel: 'favorable'
    },
    Fertilizer: {
      headline: 'Hold top-dressing urea or water-soluble fertilizer application.',
      recommendation: 'Forecasted moderate-to-heavy rainfall will cause immediate surface runoff and nutrient volatilization, wasting 60%+ of applied chemical fertilizer.',
      dos: ['Keep fertilizer bags elevated on wooden pallets in dry storage.', 'Plan split application immediately after onset stabilizes.'],
      donts: ['Never broadcast urea before forecast heavy rain.', 'Do not apply foliar sprays with wind speeds > 12 km/h.'],
      alertLevel: 'warning'
    },
    Harvest: {
      headline: 'Accelerate threshing and secure harvested earheads under tarpaulins.',
      recommendation: 'Approaching monsoon onset will bring sustained ambient humidity > 70% and moisture damage to drying panicles.',
      dos: ['Cover stacked ragi earheads with waterproof tarpaulins.', 'Store grains at < 12% moisture in hermetic metal bins.'],
      donts: ['Do not leave harvested produce open in threshing yards.', 'Avoid cutting remaining crop if field is already saturated.'],
      alertLevel: 'critical'
    }
  },
  Paddy: {
    Sowing: {
      headline: 'Monsoon onset conditions are favorable for nursery bed preparation.',
      recommendation: 'Initial monsoon rains will recharge community water bodies and canal lines, ideal for wet bed paddy nurseries (25–30 day cycle).',
      dos: ['Prepare raised nursery beds (1-1.5m wide) with perimeter drainage.', 'Soak certified seeds in 2% salt solution to eliminate chaff.'],
      donts: ['Do not sow in poorly drained saline-alkali patches.', 'Avoid direct seeding without seed treatment.'],
      alertLevel: 'favorable'
    },
    Irrigation: {
      headline: 'Natural precipitation adequate for puddling; conserve ground water.',
      recommendation: 'Expected rainfall will supply required 5–7 cm standing water layer for main field transplanting without energizing electric pump sets.',
      dos: ['Strengthen field bunds to retain rainwater.', 'Maintain 3–5 cm water depth in newly transplanted plots.'],
      donts: ['Do not pump groundwater when rain is imminent.', 'Do not breach downstream bunds abruptly.'],
      alertLevel: 'favorable'
    },
    Fertilizer: {
      headline: 'Incorporate basal dose NPK during final puddling before heavy rain.',
      recommendation: 'Basal placement of DAP/MOP 5 cm deep into puddled soil prevents surface displacement during sudden convective downpours.',
      dos: ['Incorporate neem-coated urea and potash into wet mud.', 'Apply zinc sulfate 25 kg/ha if deficiency noticed previously.'],
      donts: ['Do not top-dress nitrogen while water is draining off.', 'Avoid unmixed bio-fertilizers in standing water.'],
      alertLevel: 'warning'
    },
    Harvest: {
      headline: 'High threat of lodged crops and grain germination. Emergency harvest protocol.',
      recommendation: 'With rain chance exceeding 65% and high winds, mature summer paddy is susceptible to lodging and spikelet sprouting.',
      dos: ['Engage combine harvester during dry intervals.', 'Shift moist paddy to community dryer or elevated cement floors.'],
      donts: ['Do not stack wet straw near living quarters.', 'Do not bag un-dried paddy exceeding 14% moisture.'],
      alertLevel: 'critical'
    }
  },
  Maize: {
    Sowing: {
      headline: 'Hold sowing for 4 days. High risk of poor seedling emergence from soil crusting.',
      recommendation: 'Convective rainfall following hot spells compacts topsoil into a hard crust, preventing maize coleoptile emergence.',
      dos: ['Prepare deep ridge-and-furrow planting layout.', 'Wait for moist crumbly seedbed texture.'],
      donts: ['Do not plant in flat beds subject to water stagnation.', 'Avoid shallow planting (< 3 cm).'],
      alertLevel: 'warning'
    },
    Irrigation: {
      headline: 'Suspend irrigation. Excessive root zone saturation will cause chlorosis.',
      recommendation: 'Maize is highly sensitive to waterlogging. Even 24 hours of flooded roots drops yield potential by 15% due to anoxia.',
      dos: ['Open furrow drains leading to collection trenches.', 'Inspect contour lines.'],
      donts: ['Do not run sprinkler systems.', 'Do not block drainage outlets.'],
      alertLevel: 'warning'
    },
    Fertilizer: {
      headline: 'Delay side-dressing until rain spell clears and soil breathes.',
      recommendation: 'Applying urea in saturated soil leads to denitrification into nitrous oxide gas rather than root uptake.',
      dos: ['Plan nitrogen application at knee-high stage post-rain.', 'Use urea-potash blend.'],
      donts: ['Do not broadcast fertilizer on saturated soil surfaces.'],
      alertLevel: 'warning'
    },
    Harvest: {
      headline: 'Protect mature cobs from cob rot and ear fungal infection.',
      recommendation: 'Sustained rain during maturity induces Aspergillus and Fusarium ear rot on wet standing cobs.',
      dos: ['Bend cobs downward to prevent water entering husk.', 'Harvest mature cobs immediately.'],
      donts: ['Do not store wet unhusked cobs in enclosed plastic sacks.'],
      alertLevel: 'critical'
    }
  },
  Groundnut: {
    Sowing: {
      headline: 'Ideal sowing window opens immediately after 25 mm soaking rain.',
      recommendation: 'Groundnut requires warm, well-drained friable soil. Wait for monsoon onset soaking shower then sow within 48 hours.',
      dos: ['Inoculate kernels with Rhizobium culture.', 'Sow at 5 cm depth across the slope.'],
      donts: ['Do not sow during continuous rainy overcast days.', 'Do not damage seed kernel coat.'],
      alertLevel: 'favorable'
    },
    Irrigation: {
      headline: 'Natural moisture sufficient. Prevent pegging zone waterlogging.',
      recommendation: 'Heavy rainfall during early vegetative phase eliminates need for irrigation.',
      dos: ['Ensure soil surface remains loose and aerated.'],
      donts: ['Avoid any artificial irrigation for next 7 days.'],
      alertLevel: 'favorable'
    },
    Fertilizer: {
      headline: 'Apply gypsum 200 kg/ha at flowering stage after monsoon breaks.',
      recommendation: 'Gypsum provides essential calcium for pod development, but application now will be washed off by onset showers.',
      dos: ['Wait for rain break window.'],
      donts: ['Do not dust gypsum on wet leaves.'],
      alertLevel: 'warning'
    },
    Harvest: {
      headline: 'Urgent: Complete digging before ground gets too muddy or pods sprout in situ.',
      recommendation: 'Monsoon onset showers on mature groundnut will trigger pod sprouting and aflatoxin development.',
      dos: ['Invert harvested vines for rapid pod drying.', 'Cover pods if rain starts.'],
      donts: ['Do not allow harvested plants to sit on damp soil.'],
      alertLevel: 'critical'
    }
  },
  Sugarcane: {
    Sowing: {
      headline: 'Rainfall will aid sett sprouting; prepare trenches for drainage.',
      recommendation: 'Sugarcane setts benefit from humidity and soil warmth, provided excess water drains quickly without submerging bud eyes.',
      dos: ['Treat setts with carbendazim.', 'Maintain clean furrow drainage.'],
      donts: ['Do not allow stagnant water in planting trenches.'],
      alertLevel: 'favorable'
    },
    Irrigation: {
      headline: 'Halt drip / furrow irrigation across all cane plots.',
      recommendation: 'Sufficient rainfall will satisfy crop water requirement for the next 10 days.',
      dos: ['Clean filter units on drip setup while system is idle.'],
      donts: ['Do not pump water into field.'],
      alertLevel: 'favorable'
    },
    Fertilizer: {
      headline: 'Apply earthing-up dose after the initial 3-day heavy rain pass.',
      recommendation: 'Deep placement of urea and potash along root lines prevents loss into deep drainage.',
      dos: ['Earth up soil around cane clumps to prevent lodging.'],
      donts: ['Do not leave fertilizer on soil surface before storm.'],
      alertLevel: 'warning'
    },
    Harvest: {
      headline: 'Monitor cane juice brix levels; harvest dry blocks first.',
      recommendation: 'Heavy rain slightly dilutes juice sucrose percentage temporarily; prioritize mill supply from drier upland blocks.',
      dos: ['Coordinate harvesting teams with mill crushing schedule.'],
      donts: ['Do not transport overloaded cane trucks across soft field bunds.'],
      alertLevel: 'favorable'
    }
  }
};

export const TRANSLATIONS: Record<'en' | 'kn' | 'hi', Record<string, string>> = {
  en: {
    appTitle: 'HEXANOD',
    appSubtitle: 'Hyperlocal Monsoon Advisor',
    monsoonOnset: 'MONSOON ONSET',
    probability: 'Probability',
    expected: 'Expected in',
    confidence: 'Confidence',
    temp: 'Temperature',
    rainChance: 'Rain Chance',
    humidity: 'Humidity',
    wind: 'Wind Speed',
    cloudCover: 'Cloud Cover',
    farmerAdvisory: 'FARMER ADVISORY',
    satelliteObservation: 'SATELLITE OBSERVATION',
    refreshData: 'Refresh Satellite Data',
    demoData: 'DEMO DATA',
    monsoonBreak: 'MONSOON BREAK',
    heavyRain: 'HEAVY RAIN',
    outlook7Day: '7-Day Monsoon Progression',
    selectLocation: 'Select Hyperlocal Block / Village',
    readAloud: 'Listen to Voice Advisory',
    audioPlaying: 'Playing Kannada/English Advisory...',
    dos: 'Recommended Actions (Do)',
    donts: 'Precautions (Do Not)'
  },
  kn: {
    appTitle: 'ಹೆಕ್ಸಾನೋಡ್ (HEXANOD)',
    appSubtitle: 'ಸ್ಥಳೀಯ ಮುಂಗಾರು ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಾರ',
    monsoonOnset: 'ಮುಂಗಾರು ಆರಂಭ (MONSOON ONSET)',
    probability: 'ಸಂಭವನೀಯತೆ',
    expected: 'ನಿರೀಕ್ಷಿತ ಅವಧಿ',
    confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
    temp: 'ತಾಪಮಾನ',
    rainChance: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
    humidity: 'ತೇವಾಂಶ',
    wind: 'ಗಾಳಿಯ ವೇಗ',
    cloudCover: 'ಮೋಡ ಕವಿದ ಪ್ರಮಾಣ',
    farmerAdvisory: 'ರೈತರಿಗೆ ಕೃಷಿ ಸಲಹೆ (FARMER ADVISORY)',
    satelliteObservation: 'ಉಪಗ್ರಹ ಅವಲೋಕನ (INSAT-3D)',
    refreshData: 'ಉಪಗ್ರಹ ಮಾಹಿತಿ ನವೀಕರಿಸಿ',
    demoData: 'ಮಾದರಿ ಮಾಹಿತಿ (DEMO DATA)',
    monsoonBreak: 'ಮುಂಗಾರು ವಿರಾಮ (MONSOON BREAK)',
    heavyRain: 'ಭಾರೀ ಮಳೆ ಸಂಭವ',
    outlook7Day: '೭ ದಿನಗಳ ಮಾನ್ಸೂನ್ ಮುನ್ನೋಟ',
    selectLocation: 'ಗ್ರಾಮ / ಬ್ಲಾಕ್ ಆಯ್ಕೆಮಾಡಿ',
    readAloud: 'ಧ್ವನಿ ಸಲಹೆ ಆಲಿಸಿ',
    audioPlaying: 'ಕನ್ನಡ ಧ್ವನಿ ಸಲಹೆ ಚಾಲನೆಯಲ್ಲಿದೆ...',
    dos: 'ಮಾಡಬೇಕಾದ ಕ್ರಮಗಳು',
    donts: 'ಮಾಡಬಾರದ ತಪ್ಪುಗಳು'
  },
  hi: {
    appTitle: 'हेक्सानॉड (HEXANOD)',
    appSubtitle: 'हाइपरलोकल मानसून व किसान सलाहकार',
    monsoonOnset: 'मानसून आगमन (MONSOON ONSET)',
    probability: 'संभावना',
    expected: 'अनुमानित समय',
    confidence: 'विश्वसनीयता',
    temp: 'तापमान',
    rainChance: 'बारिश की संभावना',
    humidity: 'नमी / आर्द्रता',
    wind: 'हवा की गति',
    cloudCover: 'बादल आवरण',
    farmerAdvisory: 'किसान सलाह (FARMER ADVISORY)',
    satelliteObservation: 'उपग्रह प्रेक्षण (INSAT-3D)',
    refreshData: 'सैटेलाइट डेटा रिफ्रेश करें',
    demoData: 'डेमो डेटा (DEMO DATA)',
    monsoonBreak: 'मानसून ब्रेक (MONSOON BREAK)',
    heavyRain: 'भारी वर्षा जोखिम',
    outlook7Day: '7 दिवसीय मानसून परिदृश्य',
    selectLocation: 'गांव / ब्लॉक का चयन करें',
    readAloud: 'ऑडियो सलाह सुनें',
    audioPlaying: 'ऑडियो सलाह बज रही है...',
    dos: 'क्या करें',
    donts: 'क्या न करें'
  }
};
