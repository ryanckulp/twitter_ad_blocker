var adsHidden = 0;

const PROMOTED_LABELS = [
  'Promoted', // English
  'プロモーション', // Japanese
  '프로모션 중', // Korean
  'Promowane' // Polish
  // TODO: Add other languages
]

function getAds() {
  return Array.from(document.querySelectorAll('span')).filter(el => PROMOTED_LABELS.includes(el.textContent));
}

function hideAd(ad) {
  if (ad.closest("div[data-testid=placementTracking]") !== null) { // ignores 'Promoted' follow recos
    ad.closest("div[data-testid=placementTracking]").remove();
    adsHidden += 1;
    console.log('Twitter ads hidden: ', adsHidden.toString());
  } else {
    console.log('Found a promoted something (not tweet), ignored.');
  }
}

// re-check as user scrolls
document.addEventListener('scroll', () => getAds().forEach(hideAd));
