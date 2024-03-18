!(function () {
  if ((window.VK || (window.VK = {}), !VK.VideoPlayer)) {
    var e = { INITED: 'inited', TIMEUPDATE: 'timeupdate', VOLUMECHANGE: 'volumechange', STARTED: 'started', RESUMED: 'resumed', PAUSED: 'paused', ENDED: 'ended', ERROR: 'error' },
      t = { UNINITED: 'uninited', UNSTARTED: 'unstarted', PLAYING: 'playing', PAUSED: 'paused', ENDED: 'ended', ERROR: 'error' };
    (VK.VideoPlayer = function (i) {
      if (!n(i.src)) throw Error('iframe src is not a VK embed');
      if (!/[?&]js_api=/.test(i.src)) throw Error('iframe src js_api param is missing');
      var o = { state: t.UNINITED, volume: 1, muted: !1, time: 0, duration: 0 },
        a = {},
        r = [],
        u = '*';
      return (
        window.addEventListener('message', s),
        d({ method: 'init' }),
        {
          play: function () {
            d({ method: 'play' });
          },
          pause: function () {
            d({ method: 'pause' });
          },
          seek: function (e) {
            d({ method: 'seek', time: e });
          },
          setVolume: function (e) {
            d({ method: 'set_volume', volume: e }), (o.volume = e), (o.muted = !1);
          },
          getVolume: function () {
            return o.volume;
          },
          getCurrentTime: function () {
            return o.time;
          },
          getDuration: function () {
            return o.duration;
          },
          mute: function () {
            d({ method: 'mute' }), (o.muted = !0);
          },
          unmute: function () {
            d({ method: 'unmute' }), (o.muted = !1);
          },
          isMuted: function () {
            return o.muted;
          },
          getState: function () {
            return o.state;
          },
          on: function (e, t) {
            (a[e] = a[e] || []), a[e].push(t);
          },
          off: function (e, t) {
            const n = a[e] ? a[e].indexOf(t) : -1;
            n > -1 && a[e].splice(n, 1);
          },
          destroy: function () {
            window.removeEventListener('message', s), (a = {});
          },
        }
      );
      function s(a) {
        if (a.source === i.contentWindow) {
          '*' === u && n(i.src) && (u = a.origin);
          var s = a.data.event;
          switch (s) {
            case e.INITED:
              (o.state = a.data.state),
                (o.time = a.data.time),
                (o.duration = a.data.duration),
                (o.volume = a.data.volume),
                m(s),
                (function () {
                  for (; r.length; ) {
                    d(r.shift());
                  }
                })();
              break;
            case e.TIMEUPDATE:
              (o.time = a.data.time), m(s);
              break;
            case e.VOLUMECHANGE:
              (o.volume = a.data.volume), (o.muted = a.data.muted), m(s);
              break;
            case e.STARTED:
            case e.RESUMED:
              (o.state = t.PLAYING), (o.time = a.data.time), m(s);
              break;
            case e.PAUSED:
            case e.ENDED:
            case e.ERROR:
              (o.state = s), (o.time = a.data.time), m(s);
          }
        }
      }
      function d(e) {
        o.state !== t.UNINITED || 'init' === e.method ? i.contentWindow.postMessage(e, u) : r.push(e);
      }
      function m(e) {
        var t = (function () {
          var e = {};
          for (var t in o) e[t] = o[t];
          return e;
        })();
        (a[e] || []).forEach(function (e) {
          if ('function' == typeof e)
            try {
              e(t);
            } catch (e) {
              console.error(e);
            }
        });
      }
    }),
      (VK.VideoPlayer.Events = e),
      (VK.VideoPlayer.States = t);
  }
  function n(e) {
    return /^(https?:)?\/\/([a-zA-Z0-9\-_.]+\.)?vk\.com\/video_e(xt|mbed)\.php\?/.test(e);
  }
})();
