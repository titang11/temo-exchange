# TEMO Exchange Android foundation

This Android project is a separate native shell around the existing TEMO Exchange
GitHub Pages app. The website and its Supabase backend remain the source of truth.

## Current scope

- Opens the existing TEMO Exchange website in an Android WebView.
- Provides a shortcut to Android's Notification Access settings.
- Shows whether this installation has been granted notification-listener access.
- Declares the Android notification-listener service, but the service currently
  collects **no notification content**.

## Important privacy boundary

This is not yet a working PhoneLink sync feature. Do not treat the settings
indicator as proof that notification data is being shared. Notification capture,
device pairing, admin-only access, app allow-listing, banking/financial-app
exclusion, secure upload, retention and revocation must be implemented and
tested before any notification content is read or transmitted.

The Android app contains no Supabase service-role key, database secret, OTP
bypass or embedded account credentials. Existing TEMO website authentication
continues to run in the WebView.

## Build

The GitHub Actions workflow `.github/workflows/android-debug-apk.yml` builds a
debug APK on pushes to the `phonelink-android-foundation` branch or by manual
workflow dispatch. Download the artifact from the workflow run's Artifacts
section.

## Next engineering milestones

1. Validate the Android shell and WebView on a real device.
2. Add an authenticated, explicit device-pairing flow for the private admin
   PhoneLink workspace. Do not grant access based on a farmer or staff login
   alone.
3. Implement strict server-side ownership and admin-only RLS for device and
   notification records without modifying existing TEMO roles, KYC or listings.
4. Add notification capture only after the user enables access and approves
   the exact app allow-list. Exclude banking and financial apps by default.
5. Add secure sync, offline queue, retention controls, audit events and
   immediate device revocation.
