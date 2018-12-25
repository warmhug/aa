// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(process.versions)

var path = require('path');
var fs = require('fs-extra');
var parser = require('subtitles-parser');

var localPath = '/Users/hua/Downloads/';
var enumExts = ['mp4', 'mkv', 'ogg'];

var items = [];
fs.readdir(localPath, function (err, files) {
  files.forEach(fname => {
    var extname = path.extname(fname);
    var ext = extname && extname.substr(1);
    if (ext && enumExts.indexOf(ext) > -1) {
      // srt file name, e.g. `srt-videoName.srt`
      var srtFile = path.normalize(localPath + 'srt-' + path.parse(fname).name + '.srt');
      // console.log(fname, srtFile);
      items.push({
        info: {
          title: fname,
          description: '',
          subtitle: fs.existsSync(srtFile) &&
            parser.fromSrt(fs.readFileSync(srtFile, 'utf8'), true)
        },
        source: {
          src: 'http://localhost:9999/' + fname,
          // src: 'file:/' + localPath + fname,
          type: 'video/' + (ext === 'mkv' ? 'webm' : ext)
        }
      });
    }
  })
  mkVideo()
})

function mkVideo() {
  // http://docs.videojs.com/docs/api/player.html
  // https://github.com/videojs/video.js/blob/master/docs/guides/components.md
  var player = videojs('mvideo', {
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    inactivityTimeout: 1500,
    aspectRatio: '16:9',
    controlBar: {
      muteToggle: true,
      progressControl: {
        keepTooltipsInside: true
      }
    }
  }, function() {
    console.log('Good to go!');
    this.hotkeys();
    // this.play(); // if you don't trust autoplay for some reason
  });
  // console.log(player.el())
  // player.volume(0.5);
  player.on('mouseout', function () { this.userActive(false) });
  // var button = player.addChild('button');
  // console.log(button.el()); // -> button element

  var Component = videojs.getComponent('Component');
  var Myc = videojs.extend(Component, {
    constructor: function(player, options) {
      Component.apply(this, arguments);
    },
    createEl: function() {
      return videojs.createEl('div', { id: 'ratelist'});
    }
  });
  videojs.registerComponent('Myc', Myc);
  var ratelist = player.addChild('Myc');
  // console.log(ratelist);
  document.getElementById('ratelist').innerHTML = document.getElementById('tmp').innerHTML;

  var subtitle;
  var rateEle = $('.rate');
  var initRateChange = false;
  var startRateChange = false;
  var endRateChange = false;
  var playbackRateBig = 3;  // 加速度
  var playbackRateNormal = 1.2;  // 正常速度
  window.ad = function(val, p) {
    console.log(val, p);
    p ? (playbackRateBig = val) : (playbackRateNormal = val);
  }
  var rateTextFn = (p, n) => `
   P: <input type="number" value=${p} style="width:40px;color:blue;" onchange="ad(this.value, 1)">,
   N: <input type="number" value=${n} step="0.1" style="width:40px;color:blue;" onchange="ad(this.value)">,
  动态加速度：`;
  player.on('timeupdate', function() {
    if (subtitle) {
      var rateText = rateTextFn(playbackRateBig, playbackRateNormal);
      // 一开始一般没字幕，就设置加速
      if (!initRateChange) {
        player.playbackRate(playbackRateBig);
        rateEle.html(rateText + playbackRateBig);
        initRateChange = true;
        // console.log(player.currentTime(), player.playbackRate(), subtitle);
      }
      var curr = parseInt(player.currentTime() * 1000);
      var len = subtitle.length;
      for (var index = 0; index < len; index++) {
        var sub = subtitle[index];
        if (curr < sub.endTime && curr > sub.startTime) {
          // console.log('> start', index)
          endRateChange = false;
          if (!startRateChange) {
            player.playbackRate(playbackRateNormal);
            rateEle.html(rateText + playbackRateNormal);
            startRateChange = true;
          }
          break;
        } else if (curr > sub.endTime &&
          subtitle[index + 1] && curr < subtitle[index + 1].startTime) {
          // console.log('> end', index, curr, sub.endTime, subtitle[index + 1].startTime)
          startRateChange = false;
          if (!endRateChange) {
            player.playbackRate(playbackRateBig);
            rateEle.html(rateText + playbackRateBig);
            endRateChange = true;
          }
          break;
        } else if (curr > sub.endTime) {
          continue;
        } else {
          break;
        }
        // console.log('yep, not enter it!');
      }
    }
  });

  $('#playlist').html(items.map((item, index) => {
    // console.log(item.info.subtitle);
    return `<div class="item" index="${index}">
      <p>${item.info.subtitle ? `<b class="subtitle">S</b>` : ''}${item.info.title}</p>
      <p>${item.info.description}</p>
    </div>`
  })).delegate('.item', 'click', function () {
    var index = $(this).attr('index');
    subtitle = items[index].info.subtitle;
    player.src(items[index].source);
    player.dock(items[index].info);
    player.play();
    $(this).addClass('playing').siblings().removeClass('playing');
  });
}

