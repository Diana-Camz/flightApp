import 'dotenv/config'

export default {
  "expo": {
    "name": "flightApp",
    "slug": "flightApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.dianacamz.flightApp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "API_KEY": process.env.API_KEY,
      "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
      "PROJECT_ID": process.env.PROJECT_ID,
      "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
      "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
      "APP_ID": process.env.APP_ID,
    }, 
    "scheme": "flightApp"
  }
}
