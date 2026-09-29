package com.hexanod.monsoon.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val DarkGreen = Color(0xFF0F382A)
val MintAccent = Color(0xFF2DD4BF)
val EmeraldPrimary = Color(0xFF10B981)
val SlateBackground = Color(0xFF0B132B)
val SlateSurface = Color(0xFF1C2541)
val TextLight = Color(0xFFF1F5F9)
val TextMuted = Color(0xFF94A3B8)

private val DarkColorScheme = darkColorScheme(
    primary = EmeraldPrimary,
    onPrimary = Color.White,
    secondary = MintAccent,
    background = SlateBackground,
    surface = SlateSurface,
    onBackground = TextLight,
    onSurface = TextLight
)

@Composable
fun HexanodTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography(),
        content = content
    )
}
