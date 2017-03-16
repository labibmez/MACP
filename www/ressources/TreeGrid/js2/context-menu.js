/*
 * ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */

(function($) {

 	var menu, shadow, trigger, content, hash, currentTarget;
  var defaults = {
    menuStyle: {
      listStyle: 'none',
      padding: '1px',
      margin: '0px',
      backgroundColor: '#fff',
      border: '1px solid #999',
      width: '100px'
    },
    itemStyle: {
      margin: '0px',
      color: '#000',
      display: 'block',
      cursor: 'default',
      padding: '3px',
      border: '1px solid #fff',
      backgroundColor: 'transparent'
    },
    itemHoverStyle: {
      border: '1px solid #0a246a',
      backgroundColor: '#b6bdd2'
    },
    eventPosX: 'pageX',
    eventPosY: 'pageY',
    shadow : true,
    onContextMenu: null,
    onShowMenu: null
 	};

  $.fn.contextMenu = function(id, options) { 
    if (!menu) {                                      // Create singleton menu
      menu = $('<div id="jqContextMenu"></div>')
               .hide()
               .css({position:'absolute', zIndex:'500'})
               .appendTo('body')
               .bind('click', function(e) {
                 e.stopPropagation();
               });
    }
    if (!shadow) {
      shadow = $('<div></div>')
                 .css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499})
                 .appendTo('body')
                 .hide();
    }
    hash = hash || [];
    hash.push({
      id : id,
      menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
      itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
      itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
      bindings: options.bindings || {},
      shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
      onContextMenu: options.onContextMenu || defaults.onContextMenu,
      onShowMenu: options.onShowMenu || defaults.onShowMenu,
      eventPosX: options.eventPosX || defaults.eventPosX,
      eventPosY: options.eventPosY || defaults.eventPosY
    });

    var index = hash.length - 1;
    $(this).bind('contextmenu', function(e) {
      // Check if onContextMenu() defined
      var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
      if (bShowContext) display(index, this, e, options);
      return false;
    });
    return this;
  };

  function display(index, trigger, e, options) {
 
 
 var cur = hash[index];
 
 content = $('#contextMenu').find('ul:first').clone(true);

     /* content.html(' <div class="contextMenu" id="contextMenu" style="display:none; width:400px;">        <ul id="contextMenu" style="width: 400px; font-size: 65%;">           <li id="add">                <span class="ui-icon ui-icon-plus" style="float:left"></span>                <span style="font-size:130%; font-family:Verdana">Add RowA</span>            </li>            <li id="edit">                <span class="ui-icon ui-icon-pencil" style="float:left"></span>                <span style="font-size:130%; font-family:Verdana">Edit Row</span>            </li>         <li id="del">                <span class="ui-icon ui-icon-trash" style="float:left"></span>                <span style="font-size:130%; font-family:Verdana">Delete Row</span>            </li>              </ul>   </div>');
      */ 

 content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(
      function() {
        $(this).css(cur.itemHoverStyle);
      },
      function(){
        $(this).css(cur.itemStyle);
      }
    ).find('img').css({verticalAlign:'middle',paddingRight:'2px'});
 
    // Send the content to the menu
    menu.html(content);

    // if there's an onShowMenu, run it now -- must run after content has been added
		// if you try to alter the content variable before the menu.html(), IE6 has issues
		// updating the content
    if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);

    $.each(cur.bindings, function(id, func) {
     
	  $('#contextMenu', menu).bind('click', function(e) {
        hide();
        func(trigger, currentTarget);
      });
    });
 
       // menu.css({'left':'100px','top': '100px'}).show();
    //  alert($('#jqContextMenu').html());
       menu.show();
      ///   menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();
 //  alert(cur.shadow);  alert(cur.shadow);     alert(menu.width()+"--"+menu.height()+"--"+ e.pageX+2+"--"+e.pageY+2);

    //if (cur.shadow)  //menu.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();
  
 //$('#contextMenu').css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();
        
      //  $('#contextMenu').css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();
  
      
      if(e[cur.eventPosY ]<390)
          {
      
      var y=e[cur.eventPosY ]-130;
          }
      else{
           var y=e[cur.eventPosY ]-380;
          
      }
      
      
      
      
      $('#contextMenu').css({position:'absolute', zIndex:'500'})
 $('#contextMenu').css({width:menu.width(),height:menu.height(),left:e[cur.eventPosX],top:y});
	 $('#contextMenu').show();
	
      
      
      
      $(document).one('click', hide);
  }

  function hide() {
    menu.hide();
    shadow.hide();
  }

  // Apply defaults
  $.contextMenu = {
    defaults : function(userDefaults) {
      $.each(userDefaults, function(i, val) {
        if (typeof val == 'object' && defaults[i]) {
          $.extend(defaults[i], val);
        }
        else defaults[i] = val;
      });
    }
  };

})(jQuery);

$(function() {
  $('div.contextMenu').hide();
});