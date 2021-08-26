const container = document.querySelector('.scroller-container');
const scroller = document.querySelector('.scroller');

const arr = len => Array.from(new Array(len), (x, i) => i);
const html = (c, ci) => `<div style="border:1px dotted rgb(${Math.round(Math.random() * ci)},10,20)">${c}</div>`;
document.querySelector('#main').innerHTML = arr(10).
  reduce((previousValue, currentValue, index) => `${html(
    arr(20).reduce((pv, cv, ii) => html(`${index}-${ii} ${pv}`, 50), ''),
    255
  )}${previousValue}`, '');
const logEle = document.querySelector('#log');
function log(c) {
  logEle.innerHTML = c;
}

/**
 *  SimulatedScroller start
 */
const rException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
const rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

function _event(e) {
  if (e.touches && e.touches.length) {
    return e.touches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function momentum(current, start, time, deceleration) {
  const distance = current - start;
  const speed = Math.abs(distance) / time;
  const d = deceleration === undefined ? 0.0006 : deceleration;

  const destination = current + (speed * speed) / (2 * d) * (distance < 0 ? -1 : 1);
  const duration = speed / d;

  return {
    destination: Math.round(destination),
    duration,
  };
}

(function SimulatedScroller() {

  container.addEventListener('touchstart', start);
  container.addEventListener('touchmove', move);
  container.addEventListener('touchend', end);

  let _lastEl;
  let _pageY;
  let _startY;
  let _lastY = 0;
  let _distY;
  let _startTime;
  let _endTime;
  let _isAnimating;

  let reachTop = false;
  let reachBottom = false;

  function start(e) {
    const target = e.target;
    if (rException.test(target.tagName)) {
      return;
    }
    log('touch start');
    // console.log(e, _event(e));
    _startTime = Date.now();
    const _e = _event(e);
    _lastEl = _e.target;
    _pageY = _e.pageY;
    _startY = _lastY;
    _distY = 0;

    if (_isAnimating) {
      _isAnimating = false;
      _translate(_startY);
    }
    
    // can not preventDefault, because the body maybe scroll
    // e.preventDefault();
  }

  function move(e) {
    if (!_lastEl) {
      return;
    }
    const _e = _event(e);
    const _diff = Math.round(_e.pageY - _pageY);

    _pageY = _e.pageY;
    _distY += _diff;
    _lastY += _diff;
    
    // log(`${_e.pageY} ${_pageY} ${_lastY} ${_diff}`);
    _translate(_lastY);
    
    // 滚动到 顶部/底部 后再继续滚动，不应该再 preventDefault
    if (!(reachTop && _diff > 0 || reachBottom && _diff < 0)) {
      console.log('not reach top/bottom');
      e.preventDefault();
    }
  }

  function end(e) {
    if (!_lastEl) {
      return;
    }
    _lastEl = null;
    // Maybe for normal click offset of the content
    if (Math.abs(_distY) < 10) {
      return;
    }
    _endTime = Date.now();
    let _duration = _endTime - _startTime;
    if (_duration < 300) {
      const _momentum = momentum(_lastY, _startY, _duration);

      if (Math.abs(_momentum.destination) > 0) {
        _lastY = _momentum.destination;
        _duration = Math.max(_duration, _momentum.duration);
        _animate(_lastY, _startY, _duration);
      }
    }
  }

  function _translate(y) {
    let _y = y;

    const MAX_HEIGHT = scroller.offsetHeight - container.offsetHeight;
    if (_y < -MAX_HEIGHT) {
      log('scroll to bottom');
      _y = -MAX_HEIGHT;
      reachBottom = true;
    } else {
      reachBottom = false;
    }
    
    if (_y > 0) {
      log('scroll to top');
      _y = 0;
      reachTop = true;
    } else {
      reachTop = false;
    }
    
    _lastY = Math.round(_y);
    scroller.style.transform = `translate3d(0, ${_lastY}px, 0) scale(1)`;
  }

  function _animate(destY, startY, duration) {
    const startTime = Date.now();
    const destTime = startTime + duration;

    function step() {
      let now = Date.now();
      let newY;
      let easing;

      if (now >= destTime) {
        _translate(destY);
        console.log('scroll complete');
        log('scroll complete');
        return;
      }

      now = (now - startTime) / duration;
      easing = _easing(now);
      newY = (destY - startY) * easing + startY;
      _translate(newY);

      if (_isAnimating) {
        rAF(step);
      }
    }

    _isAnimating = true;
    step();
  }
  function _easing(k) {
    let kk = k;
    return Math.sqrt(1 - (--kk * kk));
  }

})();