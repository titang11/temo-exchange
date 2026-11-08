package com.temoexchange.app

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

/**
 * PhoneLink v0 foundation only.
 *
 * This listener is intentionally not reading, storing, forwarding or displaying
 * notification content yet. Those behaviours will be added only after the
 * explicit pairing, app allow-list, financial-app exclusion, retention and
 * Supabase access-control design has been implemented and tested.
 */
class PhoneLinkNotificationListener : NotificationListenerService() {
    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        // Privacy-first placeholder: no notification content is collected.
    }
}
