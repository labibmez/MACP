  



var myApp=new Framework7({modalTitle:' ',animateNavBackIcon:true,});var $$=Dom7;var mainView=myApp.addView('.view-main',{dynamicNavbar:true,});var rightView=myApp.addView('.view-right',{dynamicNavbar:true});$$(document).on('ajaxStart',function(){myApp.showIndicator();});$$(document).on('ajaxComplete',function(){myApp.hideIndicator();});myApp.onPageInit('modals',function(page){$$('.demo-alert').on('click',function(){myApp.alert('Hello!');});$$('.demo-confirm').on('click',function(){myApp.confirm('Are you feel good today?',function(){myApp.alert('Great!');});});$$('.demo-prompt').on('click',function(){myApp.prompt('What is  name?',function(data){myApp.confirm('Are you sure that  name is '+ data+'?',function(){myApp.alert('Ok,  name is '+ data+' ;)');});});});$$('.demo-login').on('click',function(){myApp.modalLogin('Enter  username and password',function(username,password){myApp.alert('Thank you! Username: '+ username+', password: '+ password);});});$$('.demo-password').on('click',function(){myApp.modalPassword('Enter  password',function(password){myApp.alert('Thank you ! Password: '+ password);});});});myApp.onPageInit('preloader',function(page){$$('.demo-indicator').on('click',function(){myApp.showIndicator();setTimeout(function(){myApp.hideIndicator();},2000);});
    
    
    
    
    
    $$('.demo-preloader-custom').on('click',function(){myApp.showPreloader('My text...');setTimeout(function(){myApp.hideIndicator();},2000);});});
         
         
         
         myApp.onPageInit('swipe-delete',function(page){$$('.demo-remove-callback').on('deleted',function(){myApp.alert('Thanks, item removed!');});});myApp.onPageInit('swipe-delete media-lists',function(page){$$('.demo-reply').on('click',function(){myApp.alert('Reply');});$$('.demo-mark').on('click',function(){myApp.alert('Mark');});$$('.demo-forward').on('click',function(){myApp.alert('Forward');});});
         myApp.onPageInit('index',function(page){var actionSheetButtons=[[{text:'Here comes ',label:true},{text:'Alert',onClick:function(){myApp.alert('He Hoou!');}},{text:'Nice Red Button ',color:'red',onClick:function(){myApp.alert('You have clicked red button!');}},],[{text:'Cancel',bold:true}]];$$('.demo-actions').on('click',function(e){myApp.actions(actionSheetButtons);});$$('.demo-actions-popover').on('click',function(e){myApp.actions(this,actionSheetButtons);});});myApp.onPageInit('messages',function(page){var conversationStarted=false;var answers=['Yes!','No','Hm...','I am not sure','And what about you?','May be ;)','Lorem ipsum dolor sit amet, consectetur','What?','Are you sure?','Of course','Need to think about it','Amazing!!!',];var people=[{name:'Kate Johnson',avatar:'http://lorempixel.com/output/people-q-c-100-100-9.jpg'},{name:'Blue Ninja',avatar:'http://lorempixel.com/output/people-q-c-100-100-7.jpg'},];var answerTimeout;$$('.messagebar a.link').on('click',function(){var textarea=$$('.messagebar textarea');var messageText=textarea.val();if(messageText.length===0)return;textarea.val('').trigger('change');textarea[0].focus();myApp.addMessage({text:messageText,type:'sent',day:!conversationStarted?'Today':false,time:!conversationStarted?(new Date()).getHours()+':'+(new Date()).getMinutes():false});conversationStarted=true;if(answerTimeout)clearTimeout(answerTimeout);answerTimeout=setTimeout(function(){var answerText=answers[Math.floor(Math.random()*answers.length)];var person=people[Math.floor(Math.random()*people.length)];myApp.addMessage({text:answers[Math.floor(Math.random()*answers.length)],type:'received',name:person.name,avatar:person.avatar});},2000);});});
          
         
          
 
           myApp.onPageInit('pull-to-refresh',function(page){
  
        var ptrContent=$$ ('.pull-to-refresh-content');
             ptrContent.on('refresh',function(e){setTimeout(function(){ 
                 
   
                 
                 myApp.pullToRefreshDone();},20000);
                                                
                                                });
           
           });
         
      
          
  myApp.onPageInit('sortable-list',function(page){$$('.list-block.sortable').on('open',function(){$$('.toggle-sortable').text('Done');});$$('.list-block.sortable').on('close',function(){$$('.toggle-sortable').text('Edit');});});var photoBrowserPhotos=[{url:'img/beach.jpg',caption:'Amazing beach in Goa, India'},'http://placekitten.com/1024/1024','img/lock.jpg',{url:'img/monkey.jpg',caption:'I met this monkey in Chinese mountains'},{url:'img/mountains.jpg',caption:'Beautiful mountains in Zhangjiajie, China'}];var photoBrowserStandalone=myApp.photoBrowser({photos:photoBrowserPhotos});var photoBrowserPopup=myApp.photoBrowser({photos:photoBrowserPhotos,type:'popup'});var photoBrowserPage=myApp.photoBrowser({photos:photoBrowserPhotos,type:'page',backLinkText:'Back'});var photoBrowserDark=myApp.photoBrowser({photos:photoBrowserPhotos,theme:'dark'});var photoBrowserPopupDark=myApp.photoBrowser({photos:photoBrowserPhotos,theme:'dark',type:'popup'});var photoBrowserLazy=myApp.photoBrowser({photos:photoBrowserPhotos,lazyLoading:true,theme:'dark'});myApp.onPageInit('photo-browser',function(page){$$('.ks-pb-standalone').on('click',function(){photoBrowserStandalone.open();});$$('.ks-pb-popup').on('click',function(){photoBrowserPopup.open();});$$('.ks-pb-page').on('click',function(){photoBrowserPage.open();});$$('.ks-pb-popup-dark').on('click',function(){photoBrowserPopupDark.open();});$$('.ks-pb-standalone-dark').on('click',function(){photoBrowserDark.open();});$$('.ks-pb-lazy').on('click',function(){photoBrowserLazy.open();});});myApp.onPageInit('infinite-scroll',function(page){var loading=false;var lastLoadedIndex=$$('.infinite-scroll .list-block li').length;$$('.infinite-scroll').on('infinite',function(){if(loading)return;loading=true;$$.get('infinite-scroll-load.php',{leftIndex:lastLoadedIndex+ 1},function(data){loading=false;if(data===''){myApp.detachInfiniteScroll($$('.infinite-scroll'));}
else{$$('.infinite-scroll .list-block ul').append(data);lastLoadedIndex=$$('.infinite-scroll .list-block li').length;}});});});myApp.onPageInit('notifications',function(page){$$('.ks-notification-simple').on('click',function(){myApp.addNotification({title:' ',message:'This is a simple notification message with title and message'});});$$('.ks-notification-full').on('click',function(){myApp.addNotification({title:' ',subtitle:'Notification subtitle',message:'This is a simple notification message with custom icon and subtitle',media:'<i class="icon icon-f7"></i>'});});$$('.ks-notification-custom').on('click',function(){myApp.addNotification({title:'My Awesome App',subtitle:'New message from John Doe',message:'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',media:'<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">'});});$$('.ks-notification-callback').on('click',function(){myApp.addNotification({title:'My Awesome App',subtitle:'New message from John Doe',message:'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',media:'<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">',onClose:function(){myApp.alert('Notification closed');}});});});myApp.onPageInit('login-screen-embedded',function(page){$$(page.container).find('.list-button').on('click',function(){var username=$$(page.container).find('input[name="username"]').val();var password=$$(page.container).find('input[name="password"]').val();myApp.alert('Username: '+ username+', password: '+ password,function(){mainView.router.back();});});});$$('.login-screen').find('.list-button').on('click',function(){var username=$$('.login-screen').find('input[name="username"]').val();var password=$$('.login-screen').find('input[name="password"]').val();myApp.alert('Username: '+ username+', password: '+ password,function(){myApp.closeModal('.login-screen');});});$$('.popover a').on('click',function(){myApp.closeModal('.popover');});myApp.onPageInit('color-themes',function(page){var themes='theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray';var layouts='layout-dark layout-white';$$(page.container).find('.ks-color-theme').click(function(){$$('body').removeClass(themes).addClass('theme-'+ $$(this).attr('data-theme'));});$$(page.container).find('.ks-layout-theme').click(function(){$$('body').removeClass(layouts).addClass('layout-'+ $$(this).attr('data-theme'));});});myApp.onPageInit('virtual-list',function(page){var items=[];for(var i=0;i<10000;i++){items.push({title:'Item '+ i,subtitle:'Subtitle '+ i});}
var virtualList=myApp.virtualList($$(page.container).find('.virtual-list'),{items:items,searchAll:function(query,items){var found=[];for(var i=0;i<items.length;i++){if(items[i].title.indexOf(query)>=0||query.trim()==='')found.push(i);}
return found;},template:'<li>'+'<a href="#"  style="color: #FFFFFF"   class="item-link item-content">'+'<div class="item-inner">'+'<div class="item-title-row">'+'<div class="item-title">{{title}}</div>'+'</div>'+'<div class="item-subtitle">{{subtitle}}</div>'+'</div>'+'</a>'+'</li>',height:63,});});$$('.panel-left').on('open',function(){$$('.statusbar-overlay').addClass('with-panel-left');});$$('.panel-right').on('open',function(){$$('.statusbar-overlay').addClass('with-panel-right');});$$('.panel-left, .panel-right').on('close',function(){$$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');});var dynamicPageIndex=0;function createContentPage(){mainView.router.loadContent('<!-- Top Navbar-->'+'<div class="navbar">'+'  <div class="navbar-inner">'+'    <div class="left"><a href="#"  style="color: #FFFFFF"   class="back link">Back</a></div>'+'    <div class="center sliding">Dynamic Page '+(++dynamicPageIndex)+'</div>'+'  </div>'+'</div>'+'<div class="pages">'+'  <!-- Page, data-page contains page name-->'+'  <div data-page="dynamic-content" class="page">'+'    <!-- Scrollable page content-->'+'    <div class="page-content">'+'      <div class="content-block">'+'        <div class="content-block-inner">'+'          <p>Here is a dynamic page created on '+ new Date()+' !</p>'+'          <p>Go <a href="#"  style="color: #FFFFFF"   class="back">back</a> or generate <a href="#"  style="color: #FFFFFF"   class="ks-generate-page">one more page</a>.</p>'+'        </div>'+'      </div>'+'    </div>'+'  </div>'+'</div>');return;}
$$(document).on('click','.ks-generate-page',createContentPage);

	$.widget( "ui.iosMenu", {
			options: {
				backText:      'Back',
				slideDuration: 400,
				slideEasing:   'linear'
			},

			_insertBackButtons: function() {
				this.element.find( 'li ul, li ol' ).prepend(
					$( '<li>' +
						 '	<span class="ui-icon ui-icon-carat-1-w"></span>' +
						 '	<a href="#menu-back" class="ios-menu-back-link">' +
									this.options.backText +
						 '	</a>' +
						 '</li>'
				) );
				return this;
			},

			_create: function( options ) {
				var iosMenu = this;

				iosMenu
					._insertBackButtons()
					.element
						.addClass( 'ios-style' )
						.menu({
							// When a submenu shows up, place it just to the right
							// of the current menu. Later, we'll slide it into view.
							position: {
								my: 'left top',
								at: 'right top',
								of: iosMenu.element
							}
						});

				var menu = iosMenu.element.data( 'menu' );

				// Override menu#select to account for nesting and back buttons:
				menu.select = function( event ) {
					if ( menu.active && menu.active.find( '> .ios-menu-back-link' ).length ) {
						// if you selected "back", go back:
						menu.focus( event, menu.active );
						if ( menu.left( event ) ) {
							event.stopImmediatePropagation();
						}
						event.preventDefault();
					} else if ( menu.active && menu.active.find( '> ul' ).length ) {
						// if you selected something with children, show the children:
						menu.focus( event, menu.active );
						if ( menu.right( event ) ) {
							event.stopImmediatePropagation();
						}
						event.preventDefault();
					} else {
						menu._trigger( 'select', event, { item: menu.active } );
					}
				};

				// Override menu#left to enable sliding behavior:
				menu.left = function( event ) {
					var newItem = this.active && this.active.parents( 'li:not(.ui-menubar-item) ').first(),
							self		= this,
							parent;
					if ( newItem && newItem.length ) {
					  newItem.find( '> a' ).addClass( 'ui-state-focus' ).removeClass( 'ui-state-active' );
						parent = this.active.parent();
						parent
							.attr( 'aria-hidden', 'true' )
							.attr( 'aria-expanded', 'false' )
							.animate({
								left: self.element.css( 'width' )
							}, iosMenu.options.slideDuration, iosMenu.options.slideEasing, function() {
								parent.hide();
								self.focus( event, newItem );
							})
						return true;
					} else if ( event && event.which === $.ui.keyCode.ESCAPE ) {
						// #left gets called both for left-arrow and escape. If it's the
						// latter and we're at the top, fire a "close" event:
						self._trigger( 'close', event );
					}
				};

				// Override menu#_open to enable sliding behavior:
				var menuOpenWithoutSliding = menu._open;
				menu._open = function ( submenu ) {
					menuOpenWithoutSliding.call( this, submenu );
					submenu.animate({
						left: 0
					}, iosMenu.options.slideDuration, iosMenu.options.slideEasing);
				};

				// Override menu#_startOpening so that hovering doesn't
				// initiate the sliding:
				menu._startOpening = function() {
					clearTimeout( this.timer );
				}
			},

			destroy: function() {
			  var menu = this.element && this.element.data( 'menu' );
				menu && menu.destroy();
			}
		});

		$(function() {
			var list    = $( '#breakfast-menu' );
			var firstLI = list.find( 'li' ).first();
			list
				.iosMenu()
				.focus()
				.menu( 'focus', {}, firstLI )
				.bind( 'menuselect', function( event, ui ) {
					$('#log').append( '<li>' + $(ui.item).text() + '</li>' );
				});
		});
        
         var fieldID=0; 
sessionStorage.setItem("fieldlength",25);