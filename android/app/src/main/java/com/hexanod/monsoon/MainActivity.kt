package com.hexanod.monsoon

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.hexanod.monsoon.data.MockDataProvider
import com.hexanod.monsoon.data.WeatherLocation
import com.hexanod.monsoon.ui.theme.HexanodTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HexanodTheme {
                HexanodApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HexanodApp() {
    var currentTab by remember { mutableStateOf(0) }
    var selectedLocationId by remember { mutableStateOf("bengaluru-rural") }
    val location = MockDataProvider.getLocation(selectedLocationId)

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "HEXANOD",
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp,
                            color = Color(0xFF10B981)
                        )
                        Text(
                            text = "${location.name} · ${location.block}",
                            fontSize = 11.sp,
                            color = Color(0xFF94A3B8)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF0F172A),
                    titleContentColor = Color.White
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF0F172A),
                contentColor = Color(0xFF94A3B8)
            ) {
                NavigationBarItem(
                    selected = currentTab == 0,
                    onClick = { currentTab = 0 },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home", fontSize = 10.sp) }
                )
                NavigationBarItem(
                    selected = currentTab == 1,
                    onClick = { currentTab = 1 },
                    icon = { Icon(Icons.Default.CloudQueue, contentDescription = "Monsoon") },
                    label = { Text("Monsoon", fontSize = 10.sp) }
                )
                NavigationBarItem(
                    selected = currentTab == 2,
                    onClick = { currentTab = 2 },
                    icon = { Icon(Icons.Default.Spa, contentDescription = "Advisory") },
                    label = { Text("Advisory", fontSize = 10.sp) }
                )
                NavigationBarItem(
                    selected = currentTab == 3,
                    onClick = { currentTab = 3 },
                    icon = { Icon(Icons.Default.Satellite, contentDescription = "Satellite") },
                    label = { Text("Satellite", fontSize = 10.sp) }
                )
                NavigationBarItem(
                    selected = currentTab == 4,
                    onClick = { currentTab = 4 },
                    icon = { Icon(Icons.Default.LocationOn, contentDescription = "Map") },
                    label = { Text("Map", fontSize = 10.sp) }
                )
            }
        }
    ) { padding ->
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
            color = Color(0xFF090D16)
        ) {
            when (currentTab) {
                0 -> HomeScreenView(location = location, onGoMonsoon = { currentTab = 1 })
                1 -> MonsoonOutlookScreenView(location = location)
                2 -> FarmerAdvisoryScreenView(location = location)
                3 -> SatelliteScreenView(location = location)
                4 -> LocationMapScreenView(
                    currentLocationId = selectedLocationId,
                    onSelectLocation = { selectedLocationId = it }
                )
            }
        }
    }
}

/* SCREEN 1 — HOME */
@Composable
fun HomeScreenView(location: WeatherLocation, onGoMonsoon: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Location Banner
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Hyperlocal Monsoon Advisor",
                    color = Color(0xFF10B981),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = location.name,
                    color = Color.White,
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Black
                )
                Text(
                    text = "${location.village} · ${location.block}",
                    color = Color(0xFF94A3B8),
                    fontSize = 12.sp
                )
            }
        }

        // Large MONSOON ONSET Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "MONSOON ONSET",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF10B981)
                    )
                    Text(
                        text = "Confidence: ${location.onsetConfidence}",
                        fontSize = 11.sp,
                        color = Color(0xFF34D399)
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Bottom
                ) {
                    Column {
                        Text(
                            text = "${location.onsetProbability}%",
                            fontSize = 44.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White
                        )
                        Text(
                            text = "Probability",
                            fontSize = 12.sp,
                            color = Color(0xFF94A3B8)
                        )
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = location.onsetExpectedDays,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFFFBBF24)
                        )
                        Text(
                            text = "Expected",
                            fontSize = 12.sp,
                            color = Color(0xFF94A3B8)
                        )
                    }
                }
            }
        }

        // Weather Parameters Grid
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                WeatherTile(
                    label = "Current Temperature",
                    value = "${location.temp}°C",
                    modifier = Modifier.weight(1f)
                )
                WeatherTile(
                    label = "Rain Chance",
                    value = "${location.rainChance}%",
                    modifier = Modifier.weight(1f)
                )
            }
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                WeatherTile(
                    label = "Humidity",
                    value = "${location.humidity}%",
                    modifier = Modifier.weight(1f)
                )
                WeatherTile(
                    label = "Wind",
                    value = "${location.windSpeed} km/h",
                    modifier = Modifier.weight(1f)
                )
            }
            WeatherTile(
                label = "Cloud Cover",
                value = "${location.cloudCover}%",
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
fun WeatherTile(label: String, value: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(text = label, fontSize = 11.sp, color = Color(0xFF94A3B8))
            Text(text = value, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White)
        }
    }
}

/* SCREEN 2 — FARMER ADVISORY */
@Composable
fun FarmerAdvisoryScreenView(location: WeatherLocation) {
    var selectedCrop by remember { mutableStateOf("Ragi") }
    var selectedStage by remember { mutableStateOf("Sowing") }
    val advisory = MockDataProvider.getAdvisory(selectedCrop, selectedStage)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "🌱 FARMER ADVISORY",
            fontSize = 20.sp,
            fontWeight = FontWeight.Black,
            color = Color.White
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF132A22))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "General Advisory",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF34D399)
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Rainfall is likely during the coming days. If you are planning sowing, consider waiting 3–5 days and check the next update.",
                    fontSize = 13.sp,
                    color = Color.White
                )
            }
        }

        // Crop Selection
        Text(text = "Select Crop:", fontSize = 12.sp, color = Color(0xFF94A3B8))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("Ragi", "Paddy", "Maize").forEach { crop ->
                Button(
                    onClick = { selectedCrop = crop },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selectedCrop == crop) Color(0xFF10B981) else Color(0xFF1E293B)
                    ),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(crop, fontSize = 11.sp)
                }
            }
        }

        // Stage Buttons: Sowing, Irrigation, Fertilizer, Harvest
        Text(text = "Farming Stage:", fontSize = 12.sp, color = Color(0xFF94A3B8))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            listOf("Sowing", "Irrigation", "Fertilizer", "Harvest").forEach { stage ->
                OutlinedButton(
                    onClick = { selectedStage = stage },
                    colors = ButtonDefaults.outlinedButtonColors(
                        containerColor = if (selectedStage == stage) Color(0x3310B981) else Color.Transparent
                    ),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Text(stage, fontSize = 9.sp, color = Color.White, maxLines = 1)
                }
            }
        }

        // Active Advisory Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "$selectedStage: $selectedCrop",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF10B981)
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "\"${advisory.headline}\"",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = advisory.recommendation,
                    fontSize = 12.sp,
                    color = Color(0xFFCBD5E1)
                )
            }
        }
    }
}

/* SCREEN 3 — SATELLITE */
@Composable
fun SatelliteScreenView(location: WeatherLocation) {
    var updatedTime by remember { mutableStateOf("10 minutes ago") }
    var cloudCoverage by remember { mutableStateOf(location.cloudCover) }
    var rainfallEst by remember { mutableStateOf(location.satelliteRainfallEstimate) }
    var windVal by remember { mutableStateOf(location.windSpeed) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "SATELLITE OBSERVATION",
                fontSize = 16.sp,
                fontWeight = FontWeight.Black,
                color = Color.White
            )
            Surface(
                color = Color(0x33F59E0B),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "DEMO DATA",
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFFBBF24)
                )
            }
        }

        // Satellite Placeholder Display
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(180.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A))
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Satellite,
                        contentDescription = "Satellite",
                        tint = Color(0xFF38BDF8),
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "INSAT-3D Meteorological Feed",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Text(
                        text = "South India Monsoon Sector",
                        color = Color(0xFF94A3B8),
                        fontSize = 11.sp
                    )
                }
            }
        }

        // Telemetry Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Satellite:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text("INSAT-3D", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Cloud Coverage:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text("$cloudCoverage%", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Rainfall Estimate:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text("$rainfallEst mm", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF38BDF8))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Wind:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text("$windVal km/h", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Updated:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text(updatedTime, fontSize = 12.sp, color = Color(0xFF94A3B8))
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Data Source:", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    Text("MOSDAC / INSAT-3D", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF10B981))
                }

                Spacer(modifier = Modifier.height(4.dp))

                Button(
                    onClick = {
                        cloudCoverage = (cloudCoverage + 1).coerceAtMost(95)
                        rainfallEst += 1
                        updatedTime = "Just now"
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7))
                ) {
                    Text("Refresh Satellite Data")
                }
            }
        }
    }
}

/* SCREEN 4 — MONSOON OUTLOOK */
@Composable
fun MonsoonOutlookScreenView(location: WeatherLocation) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text(
            text = "MONSOON OUTLOOK",
            fontSize = 18.sp,
            fontWeight = FontWeight.Black,
            color = Color.White
        )

        // Three Cards
        OutlookProbabilityCard(
            title = "MONSOON ONSET",
            probability = location.onsetProbability,
            confidence = location.onsetConfidence,
            accentColor = Color(0xFF10B981)
        )
        OutlookProbabilityCard(
            title = "MONSOON BREAK",
            probability = location.breakProbability,
            confidence = location.breakConfidence,
            accentColor = Color(0xFFF59E0B)
        )
        OutlookProbabilityCard(
            title = "HEAVY RAIN",
            probability = location.heavyRainProbability,
            confidence = location.heavyRainConfidence,
            accentColor = Color(0xFF38BDF8)
        )

        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = "7-Day Monsoon Timeline",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        // 7-day timeline
        location.timeline.forEach { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(item.day, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color.White)
                        Text(item.date, fontSize = 10.sp, color = Color(0xFF94A3B8))
                    }
                    Text(
                        item.status,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = if (item.status.contains("Onset")) Color(0xFF10B981) else Color(0xFFE2E8F0)
                    )
                    Text("${item.prob}% rain", fontSize = 11.sp, color = Color(0xFF38BDF8))
                }
            }
        }
    }
}

@Composable
fun OutlookProbabilityCard(title: String, probability: Int, confidence: String, accentColor: Color) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = accentColor)
                Text(text = "Probability: $probability%", fontSize = 18.sp, fontWeight = FontWeight.Black, color = Color.White)
            }
            Surface(
                color = accentColor.copy(alpha = 0.2f),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = "Confidence: $confidence",
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    fontSize = 11.sp,
                    color = accentColor,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

/* SCREEN 5 — LOCATION / MAP */
@Composable
fun LocationMapScreenView(currentLocationId: String, onSelectLocation: (String) -> Unit) {
    val locations = MockDataProvider.locations
    val current = MockDataProvider.getLocation(currentLocationId)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text(
            text = "LOCATION / MAP",
            fontSize = 18.sp,
            fontWeight = FontWeight.Black,
            color = Color.White
        )
        Text(
            text = "Select a block / village to load hyperlocal forecast:",
            fontSize = 12.sp,
            color = Color(0xFF94A3B8)
        )

        // Clickable Location Buttons
        locations.forEach { loc ->
            val isSelected = loc.id == currentLocationId
            Card(
                onClick = { onSelectLocation(loc.id) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (isSelected) Color(0xFF132A22) else Color(0xFF1E293B)
                )
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(loc.name, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                        Text("${loc.village} (${loc.block})", fontSize = 11.sp, color = Color(0xFF94A3B8))
                    }
                    Text(
                        "${loc.temp}°C · ${loc.rainChance}% rain",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF10B981)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(4.dp))

        // Selected Location Updated Values
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B))
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text("Selected: ${current.name}", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color(0xFF10B981))
                Text("Temperature: ${current.temp}°C", fontSize = 12.sp, color = Color.White)
                Text("Rain probability: ${current.rainChance}%", fontSize = 12.sp, color = Color.White)
                Text("Monsoon probability: ${current.onsetProbability}%", fontSize = 12.sp, color = Color.White)
                Text("Heavy rain risk: ${current.heavyRainProbability}%", fontSize = 12.sp, color = Color.White)
                Spacer(modifier = Modifier.height(4.dp))
                Text("Farmer advisory:", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFFFBBF24))
                Text(
                    "\"${MockDataProvider.getAdvisory("Ragi", "Sowing").headline}\"",
                    fontSize = 11.sp,
                    color = Color(0xFFCBD5E1)
                )
            }
        }
    }
}
