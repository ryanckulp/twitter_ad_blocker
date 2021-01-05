let checked_for_ads = false;
var adsHidden = 0;

setInterval(() => {
  if (checked_for_ads) {
    return;
  }

  const ads = getAds();

  if (ads.length) {
    ads.forEach(hideAd);
    checked_for_ads = true;
  }
}, 500);

function getAds() {
  return document.querySelectorAll('div[data-testid=placementTracking]');
}

function hideAd(ad) {
  if (ad.innerText !== 'Follow') {
    ad.remove();
    adsHidden += 1;
    console.log('Twitter ads hidden: ', adsHidden.toString());
  }
}

// check for fake news again, if user auto loads more ads in feed
document.addEventListener('scroll', () => getAds().forEach(hideAd));
