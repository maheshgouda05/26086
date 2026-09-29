package com.hexanod.monsoon.data

data class WeatherLocation(
    val id: String,
    val name: String,
    val district: String,
    val block: String,
    val village: String,
    val temp: Int,
    val rainChance: Int,
    val humidity: Int,
    val windSpeed: Int,
    val cloudCover: Int,
    val onsetProbability: Int,
    val onsetExpectedDays: String,
    val onsetConfidence: String,
    val breakProbability: Int,
    val breakConfidence: String,
    val heavyRainProbability: Int,
    val heavyRainConfidence: String,
    val satelliteRainfallEstimate: Int,
    val timeline: List<TimelineDay>
)

data class TimelineDay(
    val day: String,
    val date: String,
    val status: String,
    val tempMax: Int,
    val tempMin: Int,
    val prob: Int
)

data class CropAdvisory(
    val headline: String,
    val recommendation: String
)

object MockDataProvider {
    val locations = listOf(
        WeatherLocation(
            id = "bengaluru-rural",
            name = "Bengaluru Rural",
            district = "Bengaluru Rural",
            block = "Example Block (Devanahalli)",
            village = "Example Village (Kannamangala)",
            temp = 27,
            rainChance = 65,
            humidity = 72,
            windSpeed = 14,
            cloudCover = 68,
            onsetProbability = 72,
            onsetExpectedDays = "3–7 days",
            onsetConfidence = "High",
            breakProbability = 28,
            breakConfidence = "Medium",
            heavyRainProbability = 61,
            heavyRainConfidence = "Medium",
            satelliteRainfallEstimate = 12,
            timeline = listOf(
                TimelineDay("Day 1", "Today", "Normal", 29, 21, 25),
                TimelineDay("Day 2", "Tomorrow", "Rain", 27, 20, 65),
                TimelineDay("Day 3", "+2 Days", "Rain", 26, 20, 70),
                TimelineDay("Day 4", "+3 Days", "Onset Likely", 25, 19, 82),
                TimelineDay("Day 5", "+4 Days", "Active Monsoon", 24, 19, 88),
                TimelineDay("Day 6", "+5 Days", "Active Monsoon", 25, 19, 78),
                TimelineDay("Day 7", "+6 Days", "Break Possible", 28, 20, 35)
            )
        ),
        WeatherLocation(
            id = "mysuru",
            name = "Mysuru",
            district = "Mysuru",
            block = "Nanjangud Block",
            village = "Hullahalli Village",
            temp = 29,
            rainChance = 45,
            humidity = 65,
            windSpeed = 16,
            cloudCover = 52,
            onsetProbability = 84,
            onsetExpectedDays = "2–4 days",
            onsetConfidence = "High",
            breakProbability = 18,
            breakConfidence = "Low",
            heavyRainProbability = 74,
            heavyRainConfidence = "High",
            satelliteRainfallEstimate = 18,
            timeline = listOf(
                TimelineDay("Day 1", "Today", "Partly Cloudy", 30, 22, 30),
                TimelineDay("Day 2", "Tomorrow", "Light Rain", 28, 21, 55),
                TimelineDay("Day 3", "+2 Days", "Onset Likely", 26, 20, 85),
                TimelineDay("Day 4", "+3 Days", "Active Monsoon", 25, 19, 92),
                TimelineDay("Day 5", "+4 Days", "Heavy Rain", 24, 19, 88),
                TimelineDay("Day 6", "+5 Days", "Active Monsoon", 26, 20, 70),
                TimelineDay("Day 7", "+6 Days", "Scattered Rain", 27, 21, 45)
            )
        ),
        WeatherLocation(
            id = "mandya",
            name = "Mandya",
            district = "Mandya",
            block = "Pandavapura Block",
            village = "Melukote Village",
            temp = 28,
            rainChance = 58,
            humidity = 70,
            windSpeed = 12,
            cloudCover = 62,
            onsetProbability = 68,
            onsetExpectedDays = "4–8 days",
            onsetConfidence = "Medium",
            breakProbability = 32,
            breakConfidence = "Medium",
            heavyRainProbability = 54,
            heavyRainConfidence = "Medium",
            satelliteRainfallEstimate = 9,
            timeline = listOf(
                TimelineDay("Day 1", "Today", "Normal", 31, 22, 20),
                TimelineDay("Day 2", "Tomorrow", "Cloudy", 29, 21, 40),
                TimelineDay("Day 3", "+2 Days", "Rain", 27, 20, 65),
                TimelineDay("Day 4", "+3 Days", "Onset Approaching", 26, 20, 75),
                TimelineDay("Day 5", "+4 Days", "Active Monsoon", 25, 19, 80),
                TimelineDay("Day 6", "+5 Days", "Active Monsoon", 26, 20, 68),
                TimelineDay("Day 7", "+6 Days", "Break Likely", 29, 21, 25)
            )
        ),
        WeatherLocation(
            id = "tumakuru",
            name = "Tumakuru",
            district = "Tumakuru",
            block = "Kunigal Block",
            village = "Amruthur Village",
            temp = 26,
            rainChance = 74,
            humidity = 78,
            windSpeed = 18,
            cloudCover = 75,
            onsetProbability = 79,
            onsetExpectedDays = "2–5 days",
            onsetConfidence = "High",
            breakProbability = 21,
            breakConfidence = "Low",
            heavyRainProbability = 69,
            heavyRainConfidence = "High",
            satelliteRainfallEstimate = 16,
            timeline = listOf(
                TimelineDay("Day 1", "Today", "Overcast", 28, 20, 45),
                TimelineDay("Day 2", "Tomorrow", "Heavy Rain", 26, 19, 75),
                TimelineDay("Day 3", "+2 Days", "Onset Confirmed", 24, 18, 88),
                TimelineDay("Day 4", "+3 Days", "Active Monsoon", 24, 18, 90),
                TimelineDay("Day 5", "+4 Days", "Active Monsoon", 25, 19, 82),
                TimelineDay("Day 6", "+5 Days", "Light Rain", 27, 20, 55),
                TimelineDay("Day 7", "+6 Days", "Normal", 29, 21, 30)
            )
        ),
        WeatherLocation(
            id = "hassan",
            name = "Hassan",
            district = "Hassan",
            block = "Channarayapatna Block",
            village = "Shravanabelagola Village",
            temp = 25,
            rainChance = 82,
            humidity = 84,
            windSpeed = 21,
            cloudCover = 86,
            onsetProbability = 88,
            onsetExpectedDays = "1–3 days",
            onsetConfidence = "High",
            breakProbability = 14,
            breakConfidence = "Low",
            heavyRainProbability = 79,
            heavyRainConfidence = "High",
            satelliteRainfallEstimate = 26,
            timeline = listOf(
                TimelineDay("Day 1", "Today", "Light Rain", 26, 19, 65),
                TimelineDay("Day 2", "Tomorrow", "Onset Imminent", 24, 18, 85),
                TimelineDay("Day 3", "+2 Days", "Intense Monsoon", 23, 17, 95),
                TimelineDay("Day 4", "+3 Days", "Intense Monsoon", 23, 17, 92),
                TimelineDay("Day 5", "+4 Days", "Active Monsoon", 24, 18, 85),
                TimelineDay("Day 6", "+5 Days", "Moderate Rain", 25, 19, 70),
                TimelineDay("Day 7", "+6 Days", "Scattered Rain", 26, 20, 50)
            )
        )
    )

    fun getLocation(id: String): WeatherLocation {
        return locations.find { it.id == id } ?: locations.first()
    }

    fun getAdvisory(crop: String, stage: String): CropAdvisory {
        return when (stage) {
            "Sowing" -> CropAdvisory(
                headline = "Rain probability is increasing. Consider delaying sowing for a few days and monitor the next forecast.",
                recommendation = "Rainfall is likely during the coming days. If you are planning sowing, consider waiting 3–5 days and check the next update."
            )
            "Irrigation" -> CropAdvisory(
                headline = "Postpone scheduled irrigation.",
                recommendation = "Natural rainfall expected within 48–72 hours will satisfy soil water requirements."
            )
            "Fertilizer" -> CropAdvisory(
                headline = "Hold fertilizer top-dressing.",
                recommendation = "Heavy convective showers will wash away applied nitrogen nutrients through surface runoff."
            )
            "Harvest" -> CropAdvisory(
                headline = "Accelerate harvest & store produce under tarpaulins.",
                recommendation = "Approaching monsoon showers may cause moisture damage and earhead mold."
            )
            else -> CropAdvisory(
                headline = "Monitor monsoon progression.",
                recommendation = "Follow block-level advisory updates regularly."
            )
        }
    }
}
