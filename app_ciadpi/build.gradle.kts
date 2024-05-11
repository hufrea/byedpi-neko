plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

setupAll()

android {
    defaultConfig {
        applicationId = "moe.matsuri.plugin.ciadpi"
        versionCode = 2
        versionName = "v0.1.1"
        splits.abi {
            reset()
            include("arm64-v8a")
            include("armeabi-v7a")
            include("x86_64")
        }
    }
}
