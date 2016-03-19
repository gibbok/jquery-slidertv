/*! SliderTV | The MIT License (MIT) | Copyright (c) 2016 GibboK */

/**
* SliderTV plugin.
* @description SliderTV is an easy-to-use jQuery slider plugin optimized for Smart TV apps. Use jQuery SliderTV for controlling any HTML based content in horizontal or vertical order in a carousel-like fashion.
* @see [README.md]{@link ../README.md} for further information.
* @see [Examples folder]{@link ../examples} for working examples and common settings.
* @author GibboK
* @license The MIT License (MIT)
* @version 1.0
* @namespace SliderTV
*/
; (function ($, window, document) {
    'use strict';
    /**
     * Plugin's defaults are available using `$.fn.sliderTV.defaults;`.
     * Example: `$.fn.sliderTV.defaults.animation.easing = 'swing';`.
     * @memberof SliderTV
     * @namespace SliderTV.defaults
     * @type {object}
     * @property {object}  animation - The default values for the animation.
     * @property {number}  animation.duration - A number determining how long the animation will run.
     * @property {string}  animation.easing - A string indicating which easing function to use for the transition; jQuery easing values are accepted.
     * @property {string}  animation.isVertical - A boolean indicating if the direction of the animation is vertical or horizontal.
     * @property {object}  bullets - The default values for bullets.
     * @property {boolean} bullets.canShow - A boolean indicating if bullets will be rendered or not.
     */
    var pluginName = 'sliderTV',
        defaults = {
            animation: {
                duration: 400,
                easing: 'linear',
                isVertical: false
            },
            bullets: {
                canShow: true
            }
        };

    /**
     * @memberof SliderTV
     * @property {string}  _id - A string indicating the slider id.
     * @property {number}  _midPoints - Values for slider dimensions midpoints.
     * @property {number}  _midPoints.x - A number indicating the horizontal center point for the slider.
     * @property {number}  _midPoints.y - A number indicating the vertical center point for the slider.
     * @property {array}   _itemDoms - DOMs references of slidable items.
     * @property {number}  _focus - A number indicating the index value of the focused slidable item.
     * @property {object}  _prevDom - A DOM reference to 'Previous' navigation element.
     * @property {object}  _nextDom - A DOM reference to 'Next' navigation element.
     * @property {boolean} _canCheckMovePrevNext - A boolean value determining the executing of rendering navigation.
     * @property {boolean} _isAnimationOn - A boolean value indicating when an animation is on going. If true interaction on Slider are allowed, otherwise not.
     */
    function SliderTV(element, options) {
        this._id = null;
        this._midPoints = { x: null, y: null };
        this._itemDoms = [];
        this._focus = null;
        this._prevDom = null;
        this._nextDom = null;
        this._canCheckMovePrevNext = true;
        this._isAnimationOn = false;
        this.init(element, options);
    };

    SliderTV.prototype = {
        /**
         * Initialize and start sequence.
         * @memberof SliderTV
         * @method init
         */
        init: function (element, options) {
            this.element = element;
            this.defaults = defaults;
            this.options = $.extend({}, defaults, options);
            // slider
            this._getId();
            this._listen(this);
            this._getItemDoms();
            this._setItemPositions();
            this._calculateMidPoint();
            this._setFocus(0);
            // bullets
            this._createBullets();
            this._getBullets();
            this._updateBullets();
            // navigation
            this._getNavigation();
            this._showHidePrevNext();
        },
        /**
         * Get the id for slider instance.
         * @memberof SliderTV
         * @method _getId
         */
        _getId: function () {
            this._id = $(this.element).attr('id');
        },
        /**
         * Listening to events triggered on the slider.
         * @memberof SliderTV
         * @method _listen
         */
        _listen: function () {
            $(this.element).on('move:next', function (event) {
                this._moveTo({ to: 'move:next' });
            }.bind(this));
            $(this.element).on('move:prev', function (event) {
                this._moveTo({ to: 'move:prev' });
            }.bind(this));
            $(this.element).on('move:jump', function (event, options) {
                this._moveTo(options);
            }.bind(this));
        },
        /**
         * Calculate mid points for slider container.
         * @memberof SliderTV
         * @method _calculateMidPoint
         */
        _calculateMidPoint: function () {
            var elm = $(this.element),
                elmOffset = $(elm).offset();
            this._midPoints.x = elmOffset.left + (elm.outerWidth() / 2);
            this._midPoints.y = elmOffset.top + (elm.outerHeight() / 2);
        },
        /**
         * Get DOMs for slidable items.
         * @memberof SliderTV
         * @method _getItemDoms
         */
        _getItemDoms: function () {
            this._itemDoms = $(this.element).find('.sliderTV__item');
        },
        /**
         * Set CSS position for slidable items.
         * @memberof SliderTV
         * @method _setItemPositions
         */
        _setItemPositions: function () {
            if (this.options.animation.isVertical === false) {
                var left = 0,
                    width = 0;
                this._itemDoms.each(function (index, itemDom) {
                    width = $(itemDom).width();
                    var css = {
                        'position': 'absolute',
                        'left': left,
                        'width': width
                    };
                    $(itemDom).css(css);
                    left += width;
                });
            } else {
                var top = 0,
                    height = 0;
                this._itemDoms.each(function (index, itemDom) {
                    height = $(itemDom).height();
                    var css = {
                        'position': 'absolute',
                        'top': top,
                        'height': height
                    };
                    $(itemDom).css(css);
                    top += height;
                });
            }
        },
        /**
         * Set focus on slidable item.
         * @memberof SliderTV
         * @method _setFocus
         */
        _setFocus: function (index) {
            this._removeFocus();
            this._focus = index;
            this._itemDoms.each(function (index, itemDom) {
                if (index === this._focus) {
                    $(itemDom).addClass('sliderTV--focus');
                }
            }.bind(this));
        },
        /**
         * Remove focus from slidable item in focus.
         * @memberof SliderTV
         * @method _removeFocus
         */
        _removeFocus: function () {
            if (this._focus !== null) {
                $(this._itemDoms[this._focus]).removeClass('sliderTV--focus');
                this._focus = null;
            }
        },
        /**
         * Create a bullet list based on the number and status of slidable items.
         * @memberof SliderTV
         * @method _createBullets
         */
        _createBullets: function () {
            if (this.options.bullets.canShow === false) {
                return;
            }
            var html = '';
            html += '<div id="' + this._id + '__bullets" class="sliderTV__bullets">';
            this._itemDoms.each(function (index, dom) {
                html += '<div class="sliderTV__bullet"></div>';
            }.bind(this));
            html += '</div>'
            this._bulletsDom = $(html);
            $(this.element).append(this._bulletsDom);
        },
        /**
         * Get dom for bullets container.
         * @memberof SliderTV
         * @method _getBullets
        */
        _getBullets: function () {
            if (this.options.bullets.canShow === false) {
                return;
            }
            this._bulletsDoms = $(this.element).find('.sliderTV__bullet');
        },
        /**
         * Update bullets and set active one.
         * @memberof SliderTV
         * @method _updateBullets
         */
        _updateBullets: function () {
            if (this.options.bullets.canShow === false) {
                return;
            }
            this._deactiveBullets();
            var cssClass = 'sliderTV__bullet--active';
            this._bulletsDoms.each(function (index, itemDom) {
                if (index === this._focus) {
                    $(itemDom).addClass(cssClass);
                } else {
                    var hasClass = ($(itemDom).hasClass());
                    if (hasClass) {
                        $(itemDom).removeClass(cssClass);
                    }
                }
            }.bind(this));
        },
        /**
         * Deactivate bullets.
         * @memberof SliderTV
         * @method _deactiveBullets
         */
        _deactiveBullets: function () {
            if (this.options.bullets.canShow === false) {
                return;
            }
            var cssClass = 'sliderTV__bullet--active';
            this._bulletsDoms.each(function (index, itemDom) {
                var hasClass = $(itemDom).hasClass(cssClass);
                if (hasClass) {
                    $(itemDom).removeClass(cssClass);
                }

            }.bind(this))
        },
        /**
         * Get dom for navigational elements.
         * @memberof SliderTV
         * @method _getNavigation
         */
        _getNavigation: function () {
            var selectorNext = $(this.element).find('.sliderTV__next'),
                selectorPrev = $(this.element).find('.sliderTV__prev'),
                hasNext = selectorNext.length > 0 ? true : false,
                hasPrev = selectorPrev.length > 0 ? true : false;
            if (hasNext) {
                this._nextDom = selectorNext[0];
            }
            if (hasPrev) {
                this._prevDom = selectorPrev[0];
            }
            if (hasNext && hasPrev) {
                this._canCheckMovePrevNext = true;
            }
        },
        /**
         * Show or hide navigational elements.
         * @memberof SliderTV
         * @method _showHidePrevNext
         */
        _showHidePrevNext: function () {
            if (!this._canCheckMovePrevNext) {
                return;
            }
            var styleProp = 'visibility',
                stylePropValueHidden = 'hidden',
                stylePropValueVisibile = 'visible',
                _itemLen = this._itemDoms.length;
            if (_itemLen === 0) {
                this._prevDom.css(styleProp, stylePropValueHidden);
                this._nextDom.css(styleProp, stylePropValueHidden);
            } else {
                if (this._focus === 0) {
                    $(this._prevDom).css(styleProp, stylePropValueHidden);
                    $(this._nextDom).css(styleProp, stylePropValueVisibile);
                } else if (this._focus === _itemLen - 1) {
                    $(this._prevDom).css(styleProp, stylePropValueVisibile);
                    $(this._nextDom).css(styleProp, stylePropValueHidden);
                } else {
                    $(this._prevDom).css(styleProp, stylePropValueVisibile);
                    $(this._nextDom).css(styleProp, stylePropValueVisibile);
                }
            }
        },
        /**
         * Check if slidable item at a specific index exists.
         * @memberof SliderTV
         * @method _isItemExists
         */
        _isItemExists: function (index) {
            return Boolean(this._itemDoms[index])
        },
        /**
         * Move slidable items in order to focus target.
         * @memberof SliderTV
         * @method _moveTo
         * @param {string|number} - Index target to move and focus to. Only possible values: [to=move:next] [to=move:prev] [to=number]
         */
        _moveTo: function (options) {
            this._calculateMidPoint();
            var to = options.to,
                canAnimate = 'canAnimate' in options ? options.canAnimate : true,
                duration = canAnimate ? this.options.animation.duration : 0,
                easing = this.options.animation.easing,
                isValid = true,
                goToIndex = this._focus,
                hasItem;
            if (to === 'move:next') {
                goToIndex++;
            } else if (to === 'move:prev') {
                goToIndex--;
            } else if (typeof to === 'number') {
                goToIndex = to;
            } else {
                isValid = false;
            }
            hasItem = this._isItemExists(goToIndex);
            if (!isValid || !hasItem || this._isAnimationOn) {
                return;
            }
            var targetItem = $(this._itemDoms[goToIndex]),
                direction = to === 'move:next' ? 1 : -1,
                directionAnimation = direction === 1 ? '-=' : '+=',
                targetItemCenter,
                distance;
            // calculate dimensions for animation
            if (this.options.animation.isVertical === false) {
                targetItemCenter = targetItem.outerWidth() / 2;
                distance = ((targetItem.offset().left - this._midPoints.x) + targetItemCenter) * direction;
            } else {
                targetItemCenter = targetItem.outerHeight() / 2;
                distance = ((targetItem.offset().top - this._midPoints.y) + targetItemCenter) * direction;
            }
            // start animation
            this._setFocus(goToIndex);
            this._updateBullets();
            this._showHidePrevNext();
            $(this.element).trigger('animation:start');
            if (this.options.animation.isVertical === false) {
                this._itemDoms.each(function (index, dom) {
                    this._isAnimationOn = true;
                    $(dom).animate({ left: directionAnimation + distance }, duration, easing, function () {
                        this._isAnimationOn = false;
                        $(this.element).trigger('animation:end');
                    }.bind(this));
                }.bind(this));
            } else {
                this._itemDoms.each(function (index, dom) {
                    this._isAnimationOn = true;
                    $(dom).animate({ top: directionAnimation + distance }, duration, easing, function () {
                        this._isAnimationOn = false;
                        $(this.element).trigger('animation:end');
                    }.bind(this));
                }.bind(this));
            }
            // show/hide navigation
            this._showHidePrevNext();
        }
    };
    var scope = this;
    /**
     * Preventing against multiple instantiations.
     */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new SliderTV(this, options));
            }
        });
    };
    /**
    * Public access to default plugin settings.
    */
    $.fn[pluginName].defaults = defaults;
})(jQuery, window, document);

/*
- bug when you click left arrow multiple time carousle move by one step
- create arbitratioray focus on start after init
*/





