import { detectIOS } from '@/core/helper-functions'

export async function initOneSignal (id: string) {
  if (!detectIOS()) {
    if (!(window?.OneSignal as any)?.__initAlreadyCalled) {
      await useOneSignal().init({
        appId: import.meta.env.VITE_APP_ONESIGNAL_APP_ID,
        notifyButton: { enable: true },
        allowLocalhostAsSecureOrigin: import.meta.env.DEV
      })
    }

    await useOneSignal().login(`${id}`)
  }

  if (!useOneSignal().User.PushSubscription.optedIn) {
    await useOneSignal().User.PushSubscription.optIn()
  }
}
