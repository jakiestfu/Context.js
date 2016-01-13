/*
 * Context.js
 * Copyright Jacob Kelley
 * MIT License
 * repo: https://github.com/jakiestfu/Context.js
 * This version is a fork, and can be seen at: https://github.com/Menendez-Oscar/Context.js
 * Modified by Joshua Christman and Oscar Menendez
 */

(function($){
  $.fn.contextmenu = function(menu, opts) {

  	var selector = $(this); 
  
	var options = {
		fadeSpeed: 100,
		filter: function ($obj) {
			// Modify $obj, Do not return
		},
		above: 'auto',
    left: 'auto',
		preventDoubleContext: true,
		compress: false
	};
	
	var hash = {};
	hash.trigger = 'contextmenu';
	
	this.init = function(opts) {
	  
    hash.trigger = (opts.trigger === 'left')? 'click': 'contextmenu';

    hash.onMenu = opts.onMenu;
      
		options = $.extend({}, options, opts);

		$(document).on('click', function () {
			$('.dropdown-context').fadeOut(options.fadeSpeed, function(){
				$('.dropdown-context').css({display:''}).find('.drop-left').removeClass('drop-left');
			});
		});
		if(options.preventDoubleContext){
			$(document).on('contextmenu', '.dropdown-context', function (e) {
				e.preventDefault();
			});
		}
		$(document).on('mouseenter', '.dropdown-submenu', function(){
			var $sub = $(this).find('.dropdown-context-sub:first'),
				subWidth = $sub.width(),
				subLeft = $sub.offset().left,
				collision = (subWidth+subLeft) > window.innerWidth;
			if(collision){
				$sub.addClass('drop-left');
			}
		});

	};

	function updateOptions(opts){
		options = $.extend({}, options, opts);
		
    this.hash.trigger = (opts.trigger === 'left')? 'click': 'contextmenu';

    this.hash.onMenu = (opts.onMenu !== undefined)? opts.onMenu: undefined;
	}

	function buildMenu(data, id, subMenu) {
		var subClass = (subMenu) ? ' dropdown-context-sub' : '',
			compressed = options.compress ? ' compressed-context' : '',
			$menu = $('<ul class="dropdown-menu dropdown-context' + subClass + compressed +'" id="dropdown-' + id + '"></ul>');
        
        return buildMenuItems($menu, data, id, subMenu);
	}

    function buildMenuItems($menu, data, id, subMenu, addDynamicTag) {
	    var linkTarget = '';
        for(var i = 0; i<data.length; i++) {
        	if (typeof data[i].divider !== 'undefined') {
                var divider = '<li class="divider';
                divider += (addDynamicTag) ? ' dynamic-menu-item' : '';
                divider += '"></li>';
				$menu.append(divider);
			} else if (typeof data[i].header !== 'undefined') {
                var header = '<li class="nav-header';
                header += (addDynamicTag) ? ' dynamic-menu-item' : '';
                header += '">' + data[i].header + '</li>';
				$menu.append(header);
            } else if (typeof data[i].menu_item_src !== 'undefined') {
                var funcName;
                if (typeof data[i].menu_item_src === 'function') {
                    if (data[i].menu_item_src.name === "") { // The function is declared like "foo = function() {}"
                        for (var globalVar in window) {
                            if (data[i].menu_item_src == window[globalVar]) {
                                funcName = globalVar;
                                break;
                            }
                        }
                    } else {
                        funcName = data[i].menu_item_src.name;
                    }
                } else {
                    funcName = data[i].menu_item_src;
                }
                $menu.append('<li class="dynamic-menu-src" data-src="' + funcName + '"></li>');
			} else {
				if (typeof data[i].href == 'undefined') {
					data[i].href = '#';
				}
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="'+data[i].target+'"';
				}
				if (typeof data[i].subMenu !== 'undefined') {
                    var sub_menu = '<li class="dropdown-submenu';
                    sub_menu += (addDynamicTag) ? ' dynamic-menu-item' : '';
                    sub_menu += '"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '</a></li>';
					$sub = (sub_menu);
				} else {
                    var element = '<li';
                    element += (addDynamicTag) ? ' class="dynamic-menu-item"' : '';
                    if(data[i].id !== undefined){
                      element += '><a id="' + data[i].id + '" tabindex="-1" href="' + data[i].href + '"'+linkTarget+'>';
                    }
                    else{
                      element += '><a tabindex="-1" href="' + data[i].href + '"'+linkTarget+'>';
                    }
                    
                    if (typeof data[i].icon !== 'undefined')
                        element += '<span class="' + data[i].icon + '"></span>';
                    element += data[i].text + '</a></li>';
					$sub = $(element);
				}
				if (typeof data[i].action !== 'undefined') {
                    $action = data[i].action;
					$sub
						.find('a')
						.addClass('context-event')
						.on('click', createCallback($action));
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = buildMenu(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
        return $menu;
    }

	this.attach = function(selector, data) {
        if (typeof data.id !== 'undefined' && typeof data.data !== 'undefined') {
            var id = data.id;
            $menu = $('body').find('#dropdown-' + id)[0];
            if (typeof $menu === 'undefined') {
                $menu = buildMenu(data.data, id);
                $('body').append($menu);
            }
        } else {
            var d = new Date(),
                id = d.getTime(),
                $menu = buildMenu(data, id);
                $('body').append($menu);
        }
        bindMenu(selector, $menu, id);
	};
	
	function bindMenu(selector, $menu, id){
		$(selector).on(hash.trigger, function (e) {
				e.preventDefault();
				e.stopPropagation();
	
	      currentContextSelector = $(this);
	      
	      if(hash.onMenu !== undefined){ 
	          hash.onMenu(e);
	      }
	
				$('.dropdown-context:not(.dropdown-context-sub)').hide();
	
				$dd = $('#dropdown-' + id);
	
	            $dd.find('.dynamic-menu-item').remove(); // Destroy any old dynamic menu items
	            $dd.find('.dynamic-menu-src').each(function(idx, element) {
	                var menuItems = window[$(element).attr('data-src')]($(selector));
	                $parentMenu = $(element).closest('.dropdown-menu.dropdown-context');
	                $parentMenu = buildMenuItems($parentMenu, menuItems, id, undefined, true);
	            });
	
				if (typeof options.above == 'boolean' && options.above) {
					$dd.addClass('dropdown-context-up').css({
						top: e.pageY - $('#dropdown-' + id).height(),
						left: e.pageX
					}).fadeIn(options.fadeSpeed);
				} else if (typeof options.above == 'string' && options.above == 'auto') {
					$dd.removeClass('dropdown-context-up');
					var autoH = $dd.height() + 12;
					if ((e.pageY + autoH) > $(window).height()) {
						$dd.addClass('dropdown-context-up').css({
							top: e.pageY - autoH,
							left: e.pageX
						}).fadeIn(options.fadeSpeed);
					} else {
						$dd.css({
							top: e.pageY + 10,
							left: e.pageX - 13
						}).fadeIn(options.fadeSpeed);
					}
				}
	
	            if (typeof options.left == 'boolean' && options.left) {
	                $dd.addClass('dropdown-context-left').css({
	                    left: e.pageX - $dd.width()
	                }).fadeIn(options.fadeSpeed);
	            } else if (typeof options.left == 'string' && options.left == 'auto') {
	                $dd.removeClass('dropdown-context-left');
	                var autoL = $dd.width() - 12;
	                if ((e.pageX + autoL) > $('html').width()) {
	                    $dd.addClass('dropdown-context-left').css({
	                        left: e.pageX - $dd.width() + 13
	                    });
	                }
	            }
			});
	}
	
	function destroyContext(selector) {
		$(document).off('contextmenu', selector).off('click', '.context-event');
	}
  
  // allow initialization in constructor
  if(opts !== undefined) this.init(opts);
  if(selector !== undefined && menu !== undefined) this.attach(selector.selector, menu);
  
  return this;
  }
  
  //$.contextmenu = contextmenu;
  window.$ = $; // Publish public methods
  
})(jQuery);

var createCallback = function(func) {
    return function(event) { 
        if( event.currentTarget.id !== '' )
            func( event, { 'id': event.currentTarget.id, 'text': event.currentTarget.textContent, selector: currentContextSelector[0] } );
        else
            func( event, { selector: currentContextSelector[0] } );
    };
};

currentContextSelector = undefined;