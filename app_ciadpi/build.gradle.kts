plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

setupAll()

android {
    defaultConfig {
        applicationId = "moe.matsuri.plugin.ciadpi"
        versionCode = 1
        versionName = "v0.1.0"
        splits.abi {
            reset()
            include("arm64-v8a")
            include("armeabi-v7a")
        }
    }
}
