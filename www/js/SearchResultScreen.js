var loading = false;
 
// Last loaded index
var lastIndex = 30;
 
// Max items to load
var maxItems = 120;
 
// Append items per load
var itemsPerLoad = 30;
 
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
 
  // Exit, if loading in progress
  if (loading) return;
 
  // Set loading flag
  loading = true;
 
  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }  
 
    // Generate new items HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
    }
     
    // Append new items
    $$('.list-block ul').append(html);
    lastIndex=lastIndex+itemsPerLoad;
    // Update last loaded index
   // lastIndex = $$('.list-block li').length;
  }, 1000);
});        