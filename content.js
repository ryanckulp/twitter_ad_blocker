var adsHidden = 0;
var adSelector = "div[data-testid=placementTracking]";

const PROMOTED_LABELS = [
  'Promoted', // English
  'プロモーション', // Japanese
  '프로모션 중', // Korean
  'Promowane', // Polish
  'Sponsrad', // Swedish
  'Реклама', // Ukrainian
  'Sponzorováno', // Czech
  'Gesponsert', // German
  'Promocionado' // Spanish
  // TODO: Add other languages
]

function getAds() {
  return Array.from(document.querySelectorAll('span')).filter(el => PROMOTED_LABELS.includes(el.textContent));
}

function hideAd(ad) {
  if (ad.closest(adSelector) !== null) { // ignores 'Promoted' follow recos
    ad.closest(adSelector).remove();
    adsHidden += 1;
    console.log('Twitter ads hidden: ', adsHidden.toString());
  } else {
    console.log('Found a promoted something (not tweet), ignored.');
  }
}

// hide ads on page load
document.addEventListener('load', () => getAds().forEach(hideAd));

// oftentimes, tweets render after onload. LCP should catch them.
new PerformanceObserver((entryList) => {
  getAds().forEach(hideAd);
}).observe({type: 'largest-contentful-paint', buffered: true});

// re-check as user scrolls
document.addEventListener('scroll', () => getAds().forEach(hideAd));
