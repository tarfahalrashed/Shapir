/******************************************
 * inabrains.com
 *
 * LiteTooltip JQuery Plugin 
 *
 * @copyright       Copyright (c) 2013 INA Brains.
 * @license         License info
 * @link            http://www.inabrains.com
 * @docs            http://www.inabrains.com/tooltip
 * @version         Version 2.0
 *
 ******************************************/
(function ($) {

    $.fn.LiteTooltip = function (settings, option) {
        return this.each(function () {
            var $settings = $.extend({}, $.fn.LiteTooltip.defaultSettings, settings || {});
            var $element = $(this);

            var plugin = new LiteTooltip($settings, $element);

            if (plugin.settings.title != '') {
                if (!$element.is("input")) {
                    $element.css({ 'cursor': 'pointer' });
                }

                if (plugin.settings.trigger == 'hoverable') {
                    this.toggle = false;
                    $element.bind('mouseenter', { settings: plugin.settings, element: $element, $plugin: plugin, $toggle: this.toggle }, plugin.mouseOverHandler);
                    $element.bind('mouseleave', { settings: plugin.settings, element: $element, $plugin: plugin, $toggle: this.toggle }, plugin.mouseOutHandler);
                }
                else if (plugin.settings.trigger == 'hover') {
                    $element.bind('mouseenter', { settings: plugin.settings, element: $element, $plugin: plugin }, plugin.mouseOverHandler);
                    $element.bind('mouseleave', { settings: plugin.settings, element: $element, $plugin: plugin }, plugin.mouseOutHandler);
                }
                else if (plugin.settings.trigger == 'focus') {
                    $element.bind('focus', { settings: plugin.settings, element: $element, $plugin: plugin }, plugin.mouseOverHandler);
                    $element.bind('blur', { settings: plugin.settings, element: $element, $plugin: plugin }, plugin.mouseOutHandler);
                }
                else if (plugin.settings.trigger == 'click') {
                    this.toggle = false;
                    $element.bind('click', { settings: plugin.settings, element: $element, $plugin: plugin, $toggle: this.toggle }, plugin.mouseOverHandler);
                    if (!plugin.settings.issticky) {
                        $element.bind('mouseleave', { settings: plugin.settings, element: $element, $plugin: plugin, $toggle: this.toggle }, plugin.mouseOutHandler);
                    }
                }
            }
        });
    }

    function LiteTooltip($settings, $element) {
        this.settings = this.getSettings($settings, $element);
        this.$element = $element;
        return this;
    }

    LiteTooltip.prototype = {
        getSettings: function (settings, element) {
            var issticky = (element.data('issticky') != null) ? ((element.data('issticky') == 'true') ? true : false) : true;
            var $settings = $.extend({}, settings, { 'location': element.data('location'), 'title': element.data('title'), 'backcolor': element.data('backcolor'), 'textalign': element.data('textalign'), 'trigger': element.data('trigger'), 'textcolor': element.data('textcolor'), 'opacity': element.data('opacity'), 'templatename': element.data('templatename'), 'width': element.data('width'), 'margin': element.data('margin'), 'padding': element.data('padding'), 'delay': element.data('delay'), 'issticky': issticky, 'container': element.data('container'), 'shadow': element.data('shadow') });
            return $settings;
        },
        mouseOverHandler: function (e) {
            if (typeof e.data.settings.onUpdate == 'function') {
                e.data.settings.title = e.data.settings.onUpdate.call(this);
            }

            if (e.data.element.is("input"))
                if (e.data.element.val() != '') {
                    return false;
                }

            if (e.data.settings.trigger == 'click') {
                if (!e.data.$toggle) {
                    e.data.$toggle = true;
                    this.toggle = true;
                    e.data.element.unbind('click');
                    e.data.element.bind('click', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: e.data.$toggle }, e.data.$plugin.mouseOutHandler);
                }
                else {
                    e.data.$toggle = false;
                    this.toggle = false;
                    return false;
                }
            }

            var $element = e.data.element;
            var $settings = e.data.settings;

            var tooltip_margin = parseInt($settings.margin.toString().replace('px', ''));
            var tooltip_padding = parseInt($settings.padding.toString().replace('px', ''));
            var tooltip_width = parseInt($settings.width.toString().replace('px', ''));
            var tooltip_location = $settings.container == 'body' ? $settings.location : 'none';
            var tooltip_backcolor = $settings.backcolor;
            var tooltip_textcolor = $settings.textcolor;
            var tooltip_textalign = $settings.textalign;
            var tooltip_templatename = $settings.templatename;
            var tooltip_delay = $settings.delay;
            var tooltip = $($settings.template);

            tooltip.css({ "opacity": $settings.opacity });
            tooltip.css('visibility', 'visible');

            tooltip.find('.tooltip-content').css({ 'background': tooltip_backcolor, 'text-align': tooltip_textalign }).html($settings.title + $settings.clearfix);
            tooltip.find('.tooltip-content').css({ "color": tooltip_textcolor, "padding": tooltip_padding + "px" });
            if ($settings.shadow == 1) {
                tooltip.find('.tooltip-content').css({ "box-shadow": "1px 1px 3px 0px #888888" });
            }

            var tooltip_arrow_css = tooltip_location;
            var tooltip_arrow_border = tooltip_location.split('-')[0];

            var original_tooltip_arrow_css = tooltip_arrow_css;
            var original_tooltip_arrow_border = tooltip_arrow_border;

            tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
            tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);

            var container = $settings.container;
            if ($settings.container != 'body') {
                tooltip.addClass('incontainer');
                container = '#' + $settings.container;
                $(container).children().each(function () { $(this).remove(); });
            }
            else {
                tooltip.removeClass('incontainer');
                container = 'body';
            }
            $(container).append(tooltip);

            if (e.data.settings.trigger == 'click') {
                var tooltip_clickoutside = $('<div id="tooltip-clickoutside"></div>');
                tooltip_clickoutside.css({ "width": "100%", "height": "100%", "position": "absolute", "top": $(document).scrollTop() + "px", "left": "0px" });
                $('body').append(tooltip_clickoutside);
                tooltip_clickoutside.bind('click', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: e.data.$toggle }, e.data.$plugin.mouseOutHandler);
                e.data.$toggle = false;
                this.toggle = false;
            }
            else if (e.data.settings.trigger == 'hoverable') {
                e.data.element.unbind('mouseenter');
            }

            if ($settings.container == 'body') {
                tooltip.offset({ top: 0, left: 0 });

                var tooltipWidth = tooltip.outerWidth();
                var tooltipHeight = tooltip.outerHeight();
                var windowWidth = $(document).width();
                var scrollerWidth = scrollbarWidth();
                var widthDifference = $(document).width() - $(window).width();

                if (widthDifference > 0) {
                    windowWidth = windowWidth - scrollerWidth;
                }
                if (windowWidth > $(window).width()) {
                    windowWidth = $(window).width() - scrollerWidth;
                }

                var windowHeight = $(document).height();

                if (widthDifference > scrollerWidth) {
                    windowHeight = windowHeight - scrollerWidth;
                }

                // bug in width property - disabled 7th feb 2014            
                 //if (tooltipWidth < tooltip_width) {
                 //    tooltip_width = tooltipWidth;
                 //}

                if (tooltip_width != 0) {
                    if (tooltip_width * 2 > windowWidth) {
                        tooltip_width = Math.floor((windowWidth / 2) - 30);
                    }
                    else {
                        // no change
                        tooltip_width -= 30;

                    }

                    if (tooltip_width * 1.5 > windowWidth / 2) {
                        tooltip_width = Math.floor((windowWidth / 2) - 30);
                    }
                }
                else {
                    if (340 * 2 > windowWidth) {
                        tooltip_width = Math.floor((windowWidth / 2) - 30);
                    }
                    else {
                        tooltip_width = 340;
                    }
                }

                tooltip.css({ "max-width": tooltip_width });
                tooltipWidth = tooltip.outerWidth();
                tooltipHeight = tooltip.outerHeight();

                var thisElement = $element.context;
                var elementWidth = thisElement.offsetWidth;
                var elementHeight = thisElement.offsetHeight;
                var elementTop = $element.offset().top;
                var elementLeft = $element.offset().left;

                // image map + hotspots
                if (thisElement.tagName.toLowerCase() == 'area') {
                    var areaName = thisElement.parentElement.getAttribute('name');
                    var areaShape = thisElement.getAttribute('shape').toLowerCase();
                    var imgTop = $("img[usemap='#" + areaName + "']").offset().top;
                    var imgLeft = $("img[usemap='#" + areaName + "']").offset().left;
                    var areaX = parseInt(thisElement.getAttribute('coords').split(',')[0]);
                    var areaY = parseInt(thisElement.getAttribute('coords').split(',')[1]);
                    var areaWidth = parseInt(thisElement.getAttribute('coords').split(',')[2]);
                    var areaHeight = parseInt(thisElement.getAttribute('coords').split(',')[3] || areaWidth);
                    var hotspotOffset = { top: parseInt(imgTop + areaY), left: parseInt(imgLeft + areaX) };

                    if (areaShape == 'circle') {
                        hotspotOffset = { top: parseInt(imgTop + areaY - areaWidth), left: parseInt(imgLeft + areaX - areaWidth) };
                        areaWidth *= 2;
                        areaHeight *= 2;
                    }
                    if (areaShape == 'rect') {
                        hotspotOffset = { top: parseInt(imgTop + areaY), left: parseInt(imgLeft + areaX) };
                        areaWidth = areaWidth - areaX;
                        areaHeight = areaHeight - areaY;
                    }
                    if (areaShape == 'poly') {
                        var coords = new Array();
                        // get coordinates for polygon
                        var splitCoords = thisElement.getAttribute('coords').split(',');
                        // add coords -> X, Y to array
                        for (var index = 0; index < splitCoords.length; ) {
                            coords.push({ x: parseInt(splitCoords[index]), y: parseInt(splitCoords[index + 1]) });
                            index = index + 2;
                        }

                        // get max X and Y --------------------
                        coords.sort(function (a, b) {
                            var x1 = a.x, x2 = b.x;
                            if (x1 == x2) return 0;
                            return x1 < x2 ? 1 : -1;
                        });
                        var maxX = coords[0].x;
                        coords.sort(function (a, b) {
                            var y1 = a.y, y2 = b.y;
                            if (y1 == y2) return 0;
                            return y1 < y2 ? 1 : -1;
                        });
                        var maxY = coords[0].y;
                        // ------------------------------------
                        // get min X and Y --------------------
                        coords.sort(function (a, b) {
                            var x1 = a.x, x2 = b.x;
                            if (x1 == x2) return 0;
                            return x1 > x2 ? 1 : -1;
                        });
                        var minX = coords[0].x;
                        coords.sort(function (a, b) {
                            var y1 = a.y, y2 = b.y;
                            if (y1 == y2) return 0;
                            return y1 > y2 ? 1 : -1;
                        });
                        var minY = coords[0].y;
                        // ------------------------------------
                        hotspotOffset = { top: parseInt(imgTop + minY), left: parseInt(imgLeft + minX) };

                        areaWidth = maxX - minX;
                        areaHeight = maxY - minY;
                    }

                    elementLeft = hotspotOffset.left;
                    elementTop = hotspotOffset.top;
                    elementWidth = areaWidth;
                    elementHeight = areaHeight;
                }

                elementLeft = Math.round(elementLeft);
                elementTop = Math.round(elementTop);
                elementWidth = Math.round(elementWidth);
                elementHeight = Math.round(elementHeight);

                tooltip.offset({ top: 0, left: 0 });

                var tooltip_offset;

                switch (tooltip_location) {
                    case 'top':
                        // top
                        tooltip_offset = { top: (elementTop - tooltipHeight - tooltip_margin), left: elementLeft - (tooltipWidth / 2) + (elementWidth / 2) };
                        break;
                    case 'top-left':
                        // top-left
                        tooltip_offset = { top: (elementTop - tooltipHeight - tooltip_margin), left: elementLeft };
                        break;
                    case 'top-right':
                        // top-right
                        tooltip_offset = { top: (elementTop - tooltipHeight - tooltip_margin), left: elementLeft - tooltipWidth + elementWidth };
                        break;
                    // ************************           
                    case 'right':
                        // right
                        tooltip_offset = { top: (elementTop + (elementHeight / 2) - (tooltipHeight / 2)), left: elementLeft + elementWidth + tooltip_margin };
                        break;
                    case 'right-top':
                        // right-top
                        tooltip_offset = { top: (elementTop + elementHeight - tooltipHeight + 8), left: elementLeft + elementWidth + tooltip_margin };
                        break;
                    case 'right-bottom':
                        // right-bottom
                        tooltip_offset = { top: elementTop - 8, left: elementLeft + elementWidth + tooltip_margin };
                        break;
                    // ************************           
                    case 'bottom':
                        // bottom
                        tooltip_offset = { top: (elementTop + elementHeight + tooltip_margin), left: elementLeft - (tooltipWidth / 2) + (elementWidth / 2) };
                        break;
                    case 'bottom-left':
                        // bottom-left
                        tooltip_offset = { top: (elementTop + elementHeight + tooltip_margin), left: elementLeft };
                        break;
                    case 'bottom-right':
                        // bottom-right
                        tooltip_offset = { top: (elementTop + elementHeight + tooltip_margin), left: elementLeft - tooltipWidth + elementWidth };
                        break;
                    // ************************           
                    case 'left':
                        // left
                        tooltip_offset = { top: (elementTop + (elementHeight / 2) - (tooltipHeight / 2)), left: elementLeft - tooltipWidth - tooltip_margin };
                        break;
                    case 'left-top':
                        // left-top
                        tooltip_offset = { top: (elementTop + elementHeight - tooltipHeight + 8), left: elementLeft - tooltipWidth - tooltip_margin };
                        break;
                    case 'left-bottom':
                        // left-bottom
                        tooltip_offset = { top: elementTop - 8, left: elementLeft - tooltipWidth - tooltip_margin };
                        break;
                }


                var original_tooltip_offset = { top: 0, left: 0 };
                original_tooltip_offset.left = tooltip_offset.left;
                original_tooltip_offset.top = tooltip_offset.top;

                var tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);

                if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                    if (tooltip_arrow_border == "top" || tooltip_arrow_border == "bottom" || tooltip_arrow_border == "left" || tooltip_arrow_border == "right") {
                        var flag3 = false;
                        switch (tooltip_arrow_border) {
                            case "top":
                                tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                flag3 = true;
                                break;
                            case "bottom":
                                tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                flag3 = true;
                                break;
                            case "left":
                                var temp_tooltip_arrow_border = tooltip_arrow_css.replace(tooltip_arrow_border + '-', '');
                                if (temp_tooltip_arrow_border == "top") {
                                    tooltip_arrow_border = "top";
                                    tooltip_arrow_css = "top-left";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "top";
                                    original_tooltip_arrow_css = "top-left";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = elementLeft;
                                    original_tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                else if (temp_tooltip_arrow_border == "bottom") {
                                    tooltip_arrow_border = "bottom";
                                    tooltip_arrow_css = "bottom-left";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "bottom";
                                    original_tooltip_arrow_css = "bottom-left";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop + elementHeight + tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = elementLeft;
                                    original_tooltip_offset.top = elementTop + elementHeight + tooltip_margin;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                else {
                                    tooltip_arrow_border = "top";
                                    tooltip_arrow_css = "top";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "top";
                                    original_tooltip_arrow_css = "top";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = tooltip_offset.left;
                                    original_tooltip_offset.top = tooltip_offset.top;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                break;
                            case "right":
                                var temp_tooltip_arrow_border = tooltip_arrow_css.replace(tooltip_arrow_border + '-', '');
                                if (temp_tooltip_arrow_border == "top") {
                                    tooltip_arrow_border = "top";
                                    tooltip_arrow_css = "top-left";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "top";
                                    original_tooltip_arrow_css = "top-left";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = elementLeft;
                                    original_tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                else if (temp_tooltip_arrow_border == "bottom") {
                                    tooltip_arrow_border = "bottom";
                                    tooltip_arrow_css = "bottom-left";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "bottom";
                                    original_tooltip_arrow_css = "bottom-left";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = elementLeft;
                                    original_tooltip_offset.top = elementTop + elementHeight + tooltip_margin;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                else {
                                    tooltip_arrow_border = "top";
                                    tooltip_arrow_css = "top";
                                    tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    original_tooltip_arrow_border = "top";
                                    original_tooltip_arrow_css = "top";
                                    tooltip.removeClass(tooltip_location).addClass(tooltip_arrow_css);
                                    tooltip.find('.tooltip-arrow').removeClass(tooltip_location).addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);
                                    tooltipWidth = tooltip.outerWidth();
                                    tooltipHeight = tooltip.outerHeight();
                                    tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                    tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                    original_tooltip_offset.left = tooltip_offset.left;
                                    original_tooltip_offset.top = tooltip_offset.top;
                                    tooltipHeightOverflow = (((tooltip_arrow_css.match("bottom") != null) || (tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (((tooltip_arrow_css == "left") || (tooltip_arrow_css == "right")) ? (tooltipHeight / 2) : (tooltipHeight)) > (windowHeight - elementTop - elementHeight) : false);
                                    if ((tooltip_offset.left < 0) || (tooltip_offset.top < 0) || (tooltip_offset.left + tooltipWidth > windowWidth) || tooltipHeightOverflow) {
                                        flag3 = true;
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                        tooltip_offset.top = original_tooltip_offset.top;
                                    }
                                }
                                break;
                        }

                        if (flag3) {
                            var flag1 = false;
                            var flag2 = false;
                            if (tooltip_offset.top < 0) {
                                // bottom
                                tooltip_arrow_border = "bottom";
                                tooltip_arrow_css = "bottom";
                                tooltip_offset.top = elementTop + elementHeight + tooltip_margin;
                                flag2 = true;
                                if (tooltip_offset.left < 0) {
                                    // bottom-left
                                    tooltip_arrow_border = "bottom";
                                    tooltip_arrow_css = "bottom-left";
                                    tooltip_offset.left = elementLeft;
                                    flag1 = true;
                                }

                                if (tooltip_offset.left + tooltipWidth > windowWidth) {
                                    // set left here
                                    tooltip_offset.left = elementLeft - tooltipWidth + elementWidth;
                                    if (tooltip_offset.left < 0) {
                                        // bottom
                                        tooltip_arrow_border = "bottom";
                                        tooltip_arrow_css = "bottom";
                                        tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                        flag1 = true;
                                    }
                                    else {
                                        // bottom-right
                                        tooltip_arrow_border = "bottom";
                                        tooltip_arrow_css = "bottom-right";
                                        tooltip_offset.left = elementLeft - tooltipWidth + elementWidth;
                                        flag1 = true;
                                    }
                                }
                            }
                            else {
                                // top
                                tooltip_arrow_border = "top";
                                tooltip_arrow_css = "top";
                                tooltip_offset.top = elementTop - tooltipHeight - tooltip_margin;
                                flag2 = false;
                                if (tooltip_offset.left < 0) {
                                    // top-left
                                    tooltip_arrow_border = "top";
                                    tooltip_arrow_css = "top-left";
                                    tooltip_offset.left = elementLeft;
                                    flag1 = true;
                                }

                                if (tooltip_offset.left + tooltipWidth > windowWidth) {
                                    // set left here
                                    tooltip_offset.left = elementLeft - tooltipWidth + elementWidth;
                                    if (tooltip_offset.left < 0) {
                                        // top
                                        tooltip_arrow_border = "top";
                                        tooltip_arrow_css = "top";
                                        tooltip_offset.left = elementLeft - (tooltipWidth / 2) + (elementWidth / 2);
                                        flag1 = true;
                                    }
                                    else {
                                        // top-right
                                        tooltip_arrow_border = "top";
                                        tooltip_arrow_css = "top-right";
                                        tooltip_offset.left = elementLeft - tooltipWidth + elementWidth;
                                        flag1 = true;
                                    }
                                }
                            }

                            if (!flag1) {
                                if (flag2) {

                                    tooltip_arrow_css = original_tooltip_arrow_css.replace("top", "bottom");
                                    tooltip_arrow_border = original_tooltip_arrow_border.replace("top", "bottom");

                                    if (original_tooltip_offset.left < 0) {
                                        if (tooltip_arrow_border == "bottom" || tooltip_arrow_border == "top") {
                                            tooltip_arrow_css = tooltip_arrow_css.replace("right", "left");
                                            tooltip_offset.left = elementLeft;
                                        }
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                    }
                                }
                                else {
                                    tooltip_arrow_css = original_tooltip_arrow_css.replace("bottom", "top");
                                    tooltip_arrow_border = original_tooltip_arrow_border.replace("bottom", "top");

                                    if (original_tooltip_offset.left < 0) {
                                        if (tooltip_arrow_border == "bottom" || tooltip_arrow_border == "top") {
                                            tooltip_arrow_css = tooltip_arrow_css.replace("right", "left");
                                            tooltip_offset.left = elementLeft;
                                        }
                                    }
                                    else {
                                        tooltip_offset.left = original_tooltip_offset.left;
                                    }

                                }
                            }
                        }
                    }
                }

                tooltip.removeClass(original_tooltip_arrow_css).addClass(tooltip_arrow_css);
                tooltip.find('.tooltip-arrow').removeClass(original_tooltip_arrow_css).css('border-' + original_tooltip_arrow_border + '-color', '').addClass(tooltip_arrow_css).css('border-' + tooltip_arrow_border + '-color', tooltip_backcolor);

                if (tooltip_templatename != '') {
                    if (tooltip.find('.tooltip-content > .template').hasClass('template')) {
                        tooltip.find('.tooltip-content > .template').addClass(tooltip_templatename);
                        var tooltip_template_backcolor = tooltip.find("." + tooltip_templatename).css("background-color");
                        tooltip.find('.tooltip-arrow').css('border-' + original_tooltip_arrow_border + '-color', '');
                        tooltip.find('.tooltip-arrow').css('border-' + tooltip_arrow_border + '-color', tooltip_template_backcolor);
                        tooltip.find('.tooltip-content').css({ 'background': tooltip_template_backcolor });
                    }
                    else if (tooltip.find('.tooltip-content > .tooltip-menu').hasClass('tooltip-menu')) {
                        tooltip.find('.tooltip-content > .tooltip-menu').addClass(tooltip_templatename);
                        var tooltip_template_backcolor = tooltip.find("." + tooltip_templatename).css("background-color");
                        tooltip.find('.tooltip-arrow').css('border-' + original_tooltip_arrow_border + '-color', '');
                        tooltip.find('.tooltip-arrow').css('border-' + tooltip_arrow_border + '-color', tooltip_template_backcolor);
                        tooltip.find('.tooltip-content').css({ 'background': tooltip_template_backcolor });
                    }
                }

                tooltip.find('.tooltip-content > .video-wrapper').css({ "width": (tooltip.width() - (tooltip_padding * 2)) + "px" });

                tooltip.offset(tooltip_offset);
            }
            tooltip.hide();

            $element.removeAttr("title");
            $element.removeAttr("alt");

            if (e.data.settings.trigger == 'hoverable' || e.data.settings.trigger == 'click') {
                tooltip_delay = 0;
            }

            switch (tooltip_arrow_border) {
                case "top":
                    tooltip.delay(tooltip_delay).css({ "top": '-=20', "opacity": 0, "display": "block" }).stop(true, true).animate({ top: '+=20', opacity: $settings.opacity }, 150);
                    break;
                case "bottom":
                    tooltip.delay(tooltip_delay).css({ "top": '+=20', "opacity": 0, "display": "block" }).stop(true, true).animate({ top: '-=20', opacity: $settings.opacity }, 150);
                    break;
                case "left":
                    tooltip.delay(tooltip_delay).css({ "left": '-=20', "opacity": 0, "display": "block" }).stop(true, true).animate({ left: '+=20', opacity: $settings.opacity }, 150);
                    break;
                case "right":
                    tooltip.delay(tooltip_delay).css({ "left": '+=20', "opacity": 0, "display": "block" }).stop(true, true).animate({ left: '-=20', opacity: $settings.opacity }, 150);
                    break;
                default:
                    tooltip.delay(tooltip_delay).css({ "opacity": 0, "display": "block" }).stop(true, true).animate({ opacity: $settings.opacity }, 150);
                    break;
            }

            e.data.$plugin.tooltip = tooltip;
            e.data.$plugin.location = tooltip_location;
            e.data.$plugin.tooltip_arrow_border = tooltip_arrow_border;
            tooltip = null;
            return false;
        },
        mouseOutHandler: function (e) {
            var tooltip = e.data.$plugin.tooltip;
            var tooltip_location = e.data.$plugin.location;

            var animateIt = false;
            if (e.data.settings.trigger != 'hoverable') {
                if (e.data.settings.trigger == 'hover') {
                    $(tooltip).delay(e.data.settings.delay);
                    animateIt = true;
                }
                else {
                    animateIt = true;

                    if (e.data.settings.trigger == 'click') {
                        if (!e.data.settings.issticky) {
                            e.data.settings.interval = setInterval(
                                    function () {
                                        $(tooltip).fadeOut(0, function () { $(e.data.$plugin.tooltip).remove(); });
                                        clearInterval(e.data.settings.interval);
                                        this.toggle = false;
                                        e.data.$toggle = false;
                                        e.data.element.unbind('click');
                                        e.data.element.unbind('mouseleave');
                                        e.data.element.bind('click', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOverHandler);
                                        e.data.element.bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOutHandler);
                                    }
                                    ,
                                    e.data.settings.delay == 0 ? 2000 : e.data.settings.delay
                                );

                            e.data.element.unbind('mouseleave');

                            $(tooltip).find('.tooltip-content').bind('mouseenter', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: true }, function () {
                                e.data.element.unbind('click');
                                e.data.element.unbind('mouseleave');
                                this.toggle = true;
                                e.data.$toggle = true;
                                clearInterval(e.data.settings.interval);
                            });
                            $(tooltip).find('.tooltip-content').bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: e.data.$toggle }, function () {
                                $(tooltip).fadeOut(0, function () { $(e.data.$plugin.tooltip).remove(); });
                                this.toggle = false;
                                e.data.$toggle = false;
                                e.data.element.unbind('click');
                                e.data.element.unbind('mouseleave');
                                e.data.element.bind('click', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOverHandler);
                                e.data.element.bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOutHandler);
                            });
                            animateIt = false;
                        }
                        else {
                            animateIt = true;
                        }
                    }
                }
            }
            else {
                e.data.settings.interval = setInterval(
                        function () {
                            $(tooltip).fadeOut(0, function () { $(e.data.$plugin.tooltip).remove(); });
                            clearInterval(e.data.settings.interval);
                            e.data.element.unbind('mouseleave');
                            e.data.element.unbind('mouseenter');
                            e.data.element.bind('mouseenter', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOverHandler);
                            e.data.element.bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOutHandler);
                        }
                        ,
                        e.data.settings.delay == 0 ? 2000 : e.data.settings.delay
                    );

                e.data.element.unbind('mouseleave');

                $(tooltip).find('.tooltip-content').bind('mouseenter', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: true }, function () {
                    e.data.element.unbind('mouseenter');
                    e.data.element.unbind('mouseleave');
                    this.toggle = true;
                    e.data.$toggle = true;
                    clearInterval(e.data.settings.interval);
                });
                $(tooltip).find('.tooltip-content').bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: true }, function () {
                    $(tooltip).fadeOut(0, function () { $(e.data.$plugin.tooltip).remove(); });
                    this.toggle = false;
                    e.data.$toggle = false;
                    e.data.element.unbind('mouseleave');
                    e.data.element.unbind('mouseenter');
                    e.data.element.bind('mouseenter', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOverHandler);
                    e.data.element.bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: false }, e.data.$plugin.mouseOutHandler);
                });

                animateIt = false;
            }

            if (animateIt) {
                switch (e.data.$plugin.tooltip_arrow_border) {
                    case "top":
                        $(tooltip).stop(true, true).animate({ top: '-=20', opacity: 0 }, 150, function () { $(e.data.$plugin.tooltip).remove(); });
                        break;
                    case "bottom":
                        $(tooltip).stop(true, true).animate({ top: '+=20', opacity: 0 }, 150, function () { $(e.data.$plugin.tooltip).remove(); });
                        break;
                    case "left":
                        $(tooltip).stop(true, true).animate({ left: '-=20', opacity: 0 }, 150, function () { $(e.data.$plugin.tooltip).remove(); });
                        break;
                    case "right":
                        $(tooltip).stop(true, true).animate({ left: '+=20', opacity: 0 }, 150, function () { $(e.data.$plugin.tooltip).remove(); });
                        break;
                }
                $(e.data.$plugin.tooltip).remove();
            }

            if (e.data.settings.trigger == 'click') {
                if (e.data.$toggle) {
                    $('body').find("#tooltip-clickoutside").remove();
                    this.toggle = false;
                    e.data.$toggle = false;
                    e.data.element.unbind('click');
                    e.data.element.unbind('mouseleave');
                    e.data.element.bind('click', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: e.data.$toggle }, e.data.$plugin.mouseOverHandler);
                    if (!e.data.settings.issticky) {
                        e.data.element.bind('mouseleave', { settings: e.data.settings, element: e.data.element, $plugin: e.data.$plugin, $toggle: e.data.$toggle }, e.data.$plugin.mouseOutHandler);
                    }
                }
            }

            return false;
        }
    }

    scrollbarWidth = function () {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        // Append our div, do our calculation and then remove it 
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    $.fn.LiteTooltip.defaultSettings = {
        location: 'top',
        title: '',
        opacity: 0.89,
        backcolor: '#000000',
        textcolor: '#ffffff',
        template: '<div class="litetooltip-wrapper"><div class="tooltip-arrow"></div><div class="tooltip-content"></div></div>',
        margin: 5,
        padding: 10,
        width: 0,
        textalign: 'center',
        trigger: 'hover',
        templatename: '',
        delay: 0,
        issticky: true,
        clearfix: '<div class="clear"></div>',
        container: 'body',
        shadow: 1
    };
})(jQuery);