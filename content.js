var checked_for_ads = false;

// only run checks if user viewing generic twitter feed (or notifications tab, TBD)
setInterval(function() {
  if ($('div.ProfileCanopy').length == 0 && checked_for_ads == false) {
    var ads = getAds();
    hideAds(ads)
    checked_for_ads = true;
  }
}, 500)

function getAds() {
  return $('.js-action-dismiss');
}

function hideAds(ads) {
  console.log('blocking ' + ads.length + ' ads...')
  ads.each(function(i){$(this).click()});
}

// check for fake news again, if user auto loads more ads in feed
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
     var ads = getAds();
     if (ads.length > 0) {console.log('found ' + ads.length + ' new ads.');}
     hideAds(ads);
   }
});
