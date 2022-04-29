var adsHidden = 0;
var adSelector = "div[data-testid=placementTracking]";
var trendSelector = "div[data-testid=trend]";
var userSelector = "div[data-testid=UserCell]";
var sponsoredSvgPath = 'M20.75 2H3.25C2.007 2 1 3.007 1 4.25v15.5C1 20.993 2.007 22 3.25 22h17.5c1.243 0 2.25-1.007 2.25-2.25V4.25C23 3.007 21.993 2 20.75 2zM17.5 13.504c0 .483-.392.875-.875.875s-.875-.393-.875-.876V9.967l-7.547 7.546c-.17.17-.395.256-.62.256s-.447-.086-.618-.257c-.342-.342-.342-.896 0-1.237l7.547-7.547h-3.54c-.482 0-.874-.393-.874-.876s.392-.875.875-.875h5.65c.483 0 .875.39.875.874v5.65z';

function getAds() {
  return Array.from(document.querySelectorAll('div')).filter(function(el) {
    var filteredAd;

    if (el.getInnerHTML().includes(sponsoredSvgPath)) {
      filteredAd = el;
    }

    return filteredAd;
  })
}

function hideAd(ad) {
  if (ad.closest(adSelector) !== null) { // Promoted tweets
    ad.closest(adSelector).remove();
    adsHidden += 1;
  } else if (ad.closest(trendSelector) !== null) {
    ad.closest(trendSelector).remove();
    adsHidden += 1;
  } else if (ad.closest(userSelector) !== null) {
    ad.closest(userSelector).remove();
    adsHidden += 1;
  }
  console.log('Twitter ads hidden: ', adsHidden.toString());
}

// hide ads on page load
document.addEventListener('load', () => getAds().forEach(hideAd));

// oftentimes, tweets render after onload. LCP should catch them.
new PerformanceObserver((entryList) => {
  getAds().forEach(hideAd);
}).observe({type: 'largest-contentful-paint', buffered: true});

// re-check as user scrolls
document.addEventListener('scroll', () => getAds().forEach(hideAd));
