define(['view',
        'sail',
        'anchor/class'],
function(View, sail, clazz) {
  
  // TODO: Ensure that the metrics functions used in this view are available in
  //       minimal, non-jQuery DOM utilities (ex: Zepto, Bonzo, Anchor, etc.)
  
  function Tip(el, options) {
    Tip.super_.call(this, el, options);
    this.position('north');
  }
  clazz.inherits(Tip, View);
  
  Tip.prototype.position = function(type){
    this._position = type;
    return this;
  };
  
  Tip.prototype.show = function(el) {
    if (!el) throw new Error('Tip.show() el argument required');
    this.target = sail.$(el);
    
    this.emit('show', this.target);
    this.el.appendTo(document.body);
    this.el.addClass('tip-' + this._position);
    this.reposition();
    this.el.removeClass('tip-hide');
    this._reposition = this.reposition.bind(this);
    sail.$(window).on('resize', this._reposition);
    sail.$(window).on('scroll', this._reposition);
  }
  
  
  /**
   * Reposition the tip if necessary.
   *
   * @api private
   */
  
  Tip.prototype.reposition = function() {
    var pos = this._position;
    var off = this.offset(pos);
    var newpos = this.suggested(pos, off);
    if (newpos) off = this.offset(pos = newpos);
    this.replaceClass(pos);
    this.el.css(off);
  };
  
  /**
   * Replace position class `name`.
   *
   * @param {String} name
   * @api private
   */

  Tip.prototype.replaceClass = function(name) {
    name = name.split(' ').join('-');
    // FIXME: I suspect that there is a more elegant solution to preserving
    //        existing classes, in which case `classname` and `_effect` can be
    //        removed.
    this.el.attr('class', (this.classname || '') + ' tip tip-' + name + ' ' + (this._effect || ''));
  };
  
  /**
   * Compute the offset for `.target`
   * based on the given `pos`.
   *
   * @param {String} pos
   * @return {Object}
   * @api private
   */
   
  Tip.prototype.offset = function(pos) {
    var el = this.el;
    var target = this.target;

    var ew = el.outerWidth();
    var eh = el.outerHeight();

    var to = target.offset();
    var tw = target.outerWidth();
    var th = target.outerHeight();

    switch (pos) {
      case 'north':
        return {
          top: to.top - eh,
          left: to.left + tw / 2 - ew / 2
        }
      case 'north west':
        return {
          top: to.top,
          left: to.left - ew
        }
      case 'north east':
        return {
          top: to.top,
          left: to.left + tw
        }
      case 'south':
        return {
          top: to.top + th,
          left: to.left + tw / 2 - ew / 2
        }
      case 'south west':
        return {
          top: to.top + th - eh * .85,
          left: to.left - ew
        }
      case 'south east':
        return {
          top: to.top + th - eh * .85,
          left: to.left + tw
        }
      case 'east':
        return {
          top: to.top + th / 2 - eh / 2,
          left: to.left + tw
        }
      case 'west':
        return {
          top: to.top + th / 2 - eh / 2,
          left: to.left - ew
        }
      default:
        throw new Error('invalid position "' + pos + '"');
    }
  };
  
  /**
   * Compute the "suggested" position favouring `pos`.
   * Returns undefined if no suggestion is made.
   *
   * @param {String} pos
   * @param {Object} offset
   * @return {String}
   * @api private
   */
  
  Tip.prototype.suggested = function(pos, off) {
    var el = this.el;

    var ew = el.outerWidth();
    var eh = el.outerHeight();

    var win = sail.$(window);
    var top = win.scrollTop();
    var left = win.scrollLeft();
    var w = win.width();
    var h = win.height();

    // too high
    if (off.top < top) return 'south';

    // too low
    if (off.top + eh > top + h) return 'north';

    // too far to the right
    if (off.left + ew > left + w) return 'west';

    // too far to the left
    if (off.left < left) return 'east';
  };
  
  return Tip;
});
