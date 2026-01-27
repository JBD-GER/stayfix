import Script from 'next/script'

export default function ConsentModeDefault() {
  return (
    <Script id="consent-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        // Consent Mode v2: Default = denied (bis User zustimmt)
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
      `}
    </Script>
  )
}
