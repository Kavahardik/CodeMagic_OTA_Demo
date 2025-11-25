package com.codemagicotademo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import java.io.File





class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {

      val otaBundlePath = applicationContext.filesDir.absolutePath + "/ota/index.android.bundle"
      val otaBundleFile = File(otaBundlePath)

      getDefaultReactHost(
          context = applicationContext,
          packageList = PackageList(this).packages,

          // If OTA bundle exists → load it
          jsBundleFilePath = if (otaBundleFile.exists()) otaBundlePath else null,

          // Otherwise load the default bundled asset
          jsBundleAssetPath = "index.android.bundle"
      )
  }



  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
