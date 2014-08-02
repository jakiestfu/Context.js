/* 
 * Context.js
 * Copyright Jacob Kelley
 * MIT License
 */

var context = context || (function () {
    
	var options = {
		fadeSpeed: 100,
		filter: function ($obj) {
			// Modify $obj, Do not return
		},
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	};

	function initialize(opts) {
		
		options = $.extend({}, options, opts);
		
		$(document).on('click', 'html', function () {
			$('.dropdown-context:visible').fadeOut(options.fadeSpeed, function(){
				$('.dropdown-context:visible').css({display:''}).find('.drop-left').removeClass('drop-left');
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
		
	}

	function updateOptions(opts){
		options = $.extend({}, options, opts);
	}

	function buildMenu(data, id, subMenu) {
        var subClass = (subMenu) ? ' dropdown-context-sub' : '',
            compressed = options.compress ? ' compressed-context' : '',
            sub = {};
        var menu = createElement("ul", {
            "class": "dropdown-menu dropdown-context" + subClass + compressed,
                "id": "dropdown-" + id
        });
        var i = 0,
            linkTarget = '';
        for (i; i < data.length; i++) {
            if (typeof data[i].divider !== 'undefined') {
                menu.appendChild(createElement("li", {
                    "class": "divider"
                }));
            } else if (typeof data[i].header !== 'undefined') {
                var li = createElement("li", {
                    "class": "nav-header"
                });
                menu.appendChild(li);
                li.appendChild(document.createTextNode(data[i].header));
        } else {
            var attrs = {
                "tabindex": "-1"
            };
            var a = {};
            if (typeof data[i].href == 'undefined') {
                data[i].href = '#';
            }
            attrs["href"] = data[i].href;
            if (typeof data[i].target !== 'undefined') {
                linkTarget = ' target="' + data[i].target + '"';
                attrs["target"] = data[i].target;
            }
            if (typeof data[i].subMenu !== 'undefined') {
                a = createElement("a", attrs);
                a.appendChild(document.createTextNode(data[i].text));
                sub = createElement("li", {
                    "class": "dropdown-submenu"
                });
                sub.appendChild(a);
            } else {
                a = createElement("a", attrs);
                a.appendChild(document.createTextNode(data[i].text));
                sub = createElement("li", {});
                sub.appendChild(a);
            }
            if (typeof data[i].action !== 'undefined') {
                var actiond = new Date(),
                    actionID = 'event-' + actiond.getTime() * Math.floor(Math.random() * 100000),
                    eventAction = data[i].action;
                a.setAttribute("id", actionID);
                a.setAttribute(a.getAttribute("class") + " context-event");
                a.onclick = eventAction;
            }
            menu.appendChild(sub);
            if (typeof data[i].subMenu != 'undefined') {
                var subMenuData = buildMenuFast(data[i].subMenu, id, true);
                sub.appendChild(subMenuData);
            }
        }
        if (typeof options.filter == 'function') {
            options.filter(sub);
        }
    }
    return menu;
	}

	function addContext(selector, data) {
		
		var d = new Date(),
			id = d.getTime(),
			menu = buildMenu(data, id);
			
		document.body.appendChild(menu);
		
		
		$(selector).on('contextmenu', function (e) {
			e.preventDefault();
			e.stopPropagation();
			
			$('.dropdown-context:not(.dropdown-context-sub)').hide();
			
			$dd = $('#dropdown-' + id);
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('dropdown-context-up').css({
					top: e.pageY - 20 - $('#dropdown-' + id).height(),
					left: e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('dropdown-context-up').css({
						top: e.pageY - 20 - autoH,
						left: e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top: e.pageY + 10,
						left: e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		});
	}
	
	function destroyContext(selector) {
		$(document).off('contextmenu', selector).off('click', '.context-event');
	}
	
	return {
		init: initialize,
		settings: updateOptions,
		attach: addContext,
		destroy: destroyContext
	};
})();
