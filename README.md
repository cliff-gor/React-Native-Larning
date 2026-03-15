# RN Learning — React Native with Expo

A hands-on learning project that demonstrates core React Native concepts using **Expo SDK 55**, **React 19**, and **React Native 0.83**. Each screen in the app corresponds to a tutorial article on [KodaSchool](https://kodaschool.com/category/react-native).

---

## Related Blog Posts

The features built in this app are documented in detail across these articles by [Cliff Gor](https://kodaschool.com/category/react-native):

| # | Article | Corresponding Screen |
|---|---------|---------------------|
| 1 | [Getting Started with React Native and Expo](https://kodaschool.com/blog/getting-started-with-react-native-and-expo) | Home screen |
| 2 | [Implementing Social Media Sharing in React Native](https://kodaschool.com/blog/implementing-social-media-sharing-in-react-native) | Social Sharing screen |
| 3 | [Working with AsyncStorage for Local Data Persistence](https://kodaschool.com/blog/working-with-asyncstorage-for-local-data-persistence) | Async Storage screen |
| 4 | [Implementing Offline Support in React Native Apps](https://kodaschool.com/blog/implementing-offline-support-in-react-native-apps) | Async Storage screen |
| 5 | [Styling in React Native: Flexbox and StyleSheet](https://kodaschool.com/blog/styling-in-react-native-flexbox-and-stylesheet) | Explore screen |
| 6 | [Using FlatList for Efficient List Rendering in React Native](https://kodaschool.com/blog/using-flatlist-for-efficient-list-rendering-in-react-native) | General reference |
| 7 | [Implementing Pull-to-Refresh in React Native](https://kodaschool.com/blog/implementing-pull-to-refresh-in-react-native) | General reference |
| 8 | [Implementing Gestures and Touch Handling in React Native](https://kodaschool.com/blog/implementing-gestures-and-touch-handling-in-react-native) | General reference |
| 9 | [Creating Custom Hooks in React Native](https://kodaschool.com/blog/creating-custom-hooks-in-react-native) | `hooks/` directory |

---

## Tech Stack

| Technology | Version |
|-----------|---------|
| Expo SDK | 55.0.6 |
| React Native | 0.83.2 |
| React | 19.2.0 |
| TypeScript | 5.9 |
| Expo Router | 55.0.5 (file-based routing) |
| React Native Reanimated | 4.2.1 |
| AsyncStorage | 2.2.0 |
| Firebase Analytics | 23.x |

---

## Features

- **Drawer Navigation** — side menu connecting all tutorial screens
- **Dark / Light Mode** — automatic theme switching with a custom `useThemeColor` hook
- **Social Sharing** — native Share API with Twitter and LinkedIn deep linking, plus a custom modal dialog
- **Network & AsyncStorage** — detect connection type with `expo-network` and persist the last-checked timestamp using AsyncStorage
- **Parallax Scroll Header** — smooth parallax animation on scroll using Reanimated
- **Animated Components** — waving hand emoji animated with `useSharedValue` / `useAnimatedStyle`
- **Collapsible Sections** — expandable/collapsible UI sections with chevron icons
- **Cross-platform** — runs on iOS, Android, and Web

---

## Project Structure

```
RNLearning/
├── app/
│   ├── _layout.tsx                       # Root layout — Stack navigator + theme provider
│   ├── +not-found.tsx                    # 404 page
│   ├── +html.tsx                         # Web HTML shell
│   └── (tabs)/
│       ├── _layout.tsx                   # Drawer navigator (5 screens)
│       ├── index.tsx                     # Home / Getting Started
│       ├── explore.tsx                   # Feature explorer (routing, images, animations)
│       ├── socialsharing.tsx             # Native Share API + Twitter/LinkedIn deep links
│       ├── socialsharinglib.tsx          # 3rd-party share library example (reference)
│       └── workingwithAsyncStorage.tsx   # Network status + data persistence
│
├── components/
│   ├── Collapsible.tsx                   # Expandable section component
│   ├── ExternalLink.tsx                  # Opens links in-app or in system browser
│   ├── HelloWave.tsx                     # Animated waving emoji (Reanimated)
│   ├── ParallaxScrollView.tsx            # Parallax scroll header
│   ├── ThemedText.tsx                    # Text with dark/light mode styles
│   ├── ThemedView.tsx                    # View with dark/light mode background
│   └── navigation/
│       └── TabBarIcon.tsx                # Ionicons wrapper for drawer icons
│
├── hooks/
│   ├── useColorScheme.ts                 # Re-exports RN useColorScheme
│   ├── useColorScheme.web.ts             # Web-specific implementation
│   └── useThemeColor.ts                  # Resolves color by current theme
│
├── constants/
│   └── Colors.ts                         # Light/dark color palette
│
├── assets/
│   ├── fonts/                            # SpaceMono font
│   └── images/                           # App icon, splash, and in-app images
│
├── ios/                                  # Native iOS project (CocoaPods)
├── android/                              # Native Android project (Gradle)
├── app.json                              # Expo app config
├── eas.json                              # EAS Build profiles
└── package.json
```

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Node.js | 18 or higher |
| npm | 9 or higher |
| **iOS builds** | macOS, Xcode 15+, CocoaPods (`sudo gem install cocoapods`) |
| **Android builds** | Android Studio with an emulator, or a physical device with USB debugging enabled |

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/cliff-gor/ReactNativeLearning.git
cd ReactNativeLearning

# 2. Install JavaScript dependencies
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because `react-native-web` has a peer dependency on React 18 while this project uses React 19. The app runs correctly despite this warning.

---

## Running the App

### Web (quickest — no native build needed)

```bash
npx expo start --web
```

Opens at `http://localhost:8081` in your browser.

---

### iOS

A **development build** is required. Expo Go does not support SDK 55 with New Architecture and custom native modules (Firebase, etc.).

```bash
# First time only — installs CocoaPods, compiles the native binary, and launches the app
npx expo run:ios

# Subsequent runs — start Metro and reuse the existing binary
npx expo start --ios
```

> Requires macOS + Xcode 15+

---

### Android

```bash
# First time only — compiles the APK, installs it on the emulator/device, and launches the app
npx expo run:android

# Subsequent runs — start Metro only
npx expo start --android
```

> Make sure an emulator is running (**Android Studio → Device Manager → ▶**) or a physical device is connected with USB debugging enabled.

---

### Expo Go (limited)

For a quick preview on a physical device without building natively:

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app. Note: native-only modules (Firebase, FBSDK) will not work inside Expo Go.

---

## EAS Cloud Builds

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/) — Expo's hosted build service — with three profiles:

| Profile | Use case |
|---------|----------|
| `development` | Development client build for internal testing |
| `preview` | Internal distribution build (APK / ad-hoc IPA) |
| `production` | App Store / Play Store submission |

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build for iOS
eas build --platform ios --profile development

# Build for Android
eas build --platform android --profile development
```

---

## Firebase Setup

Firebase is integrated via `@react-native-firebase/app` and `@react-native-firebase/analytics`. To enable it you need to add your own config files (download from the [Firebase Console](https://console.firebase.google.com)):

- **iOS:** `ios/GoogleService-Info.plist`
- **Android:** `android/app/google-services.json`

The build will fail for Firebase features without these files.

---

## Configuration Notes

### New Architecture

`"newArchEnabled": true` is set in `app.json`. Both **Fabric** (new renderer) and **TurboModules** are enabled — required for Expo SDK 55.

### Dependency Install Flag

`npm install --legacy-peer-deps` is needed because `react-native-web@0.20` still declares a peer dependency on React 18, while this project uses React 19. This is a peer dep declaration lag — the packages work correctly together at runtime.

---

## SDK Upgrade History

| Expo SDK | React Native | Notes |
|----------|-------------|-------|
| 51 | 0.74 | Initial project setup |
| 52 | 0.76 | New Architecture preview enabled |
| 55 | 0.83.2 | Current — full New Architecture, React 19, Reanimated 4 |

---

## Learn More

- [KodaSchool — React Native Articles](https://kodaschool.com/category/react-native)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction)
