/*
 * 公用方法
 * by 邓焯文
 */

'use strict';

define([], function() {
	var utils = {
		setCookie: function(cookiename, cookievalue, iDay) {
			var d = new Date();
			d.setTime(d.getTime() + (iDay * 24 * 60 * 60 * 1000));
			document.cookie = cookiename + "=" + escape(cookievalue) + ";expires=" + d.toGMTString();
		},
		getCookie: function(cookiename) {
			var name = cookiename + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if(c.indexOf(name) == 0) return unescape(c.substring(name.length, c.length));
			};
			return "";
		},
		//计算比例用,返回压缩比例值
		canvasScreen: function(canvas) {
			let CanvasBoxWidth = document.getElementById("canvas-box").clientWidth; //canvas 宽-计算比例用
			let CanvasBoxHeight = document.getElementById("canvas-box").clientHeight; //canvas 高-计算比例用
			let ratio = {};

			ratio.x = canvas.width / CanvasBoxWidth;
			ratio.y = canvas.height / CanvasBoxHeight;

			return ratio
		},
		//连坐
		collectiveChess: function(w, kx, ky, _c) {
			if(_c[kx][ky] && _c[kx][ky].mc == w) {
				_c[kx][ky].mc = 0
			} else {
				return false
			}
			if(kx > 0) {
				this.collectiveChess(w, kx - 1, ky, _c)
			}
			if(kx + 1 < _c.length) {
				this.collectiveChess(w, kx + 1, ky, _c)
			}
			if(ky > 0) {
				this.collectiveChess(w, kx, ky - 1, _c)
			}
			if(ky + 1 < _c[kx].length) {
				this.collectiveChess(w, kx, ky + 1, _c)
			}
		},
		//道具-炸弹
		propBomb: function(w, kx, ky, _c) {
			_c[kx][ky].mc = 0
			if(kx > 0 && _c[kx - 1][ky]) {
				_c[kx - 1][ky].mc = 0
			}
			if(kx + 1 < _c.length && _c[kx + 1][ky]) {
				_c[kx + 1][ky].mc = 0
			}
			if(ky > 0 && _c[kx][ky - 1]) {
				_c[kx][ky - 1].mc = 0
			}
			if(ky + 1 < _c[kx].length && _c[kx][ky + 1]) {
				_c[kx][ky + 1].mc = 0
			}
		},
		//道具-大炸弹
		propBigBomb: function(w, kx, ky, _c) {
			_c[kx][ky].mc = 0
			if(kx > 0 && _c[kx - 1][ky]) {
				if(_c[kx - 1][ky].mc == w) {
					this.propBigBomb(w, kx - 1, ky, _c)
				} else {
					_c[kx - 1][ky].mc = 0
				}
			}
			if(kx + 1 < _c.length && _c[kx + 1][ky]) {
				if(_c[kx + 1][ky].mc == w) {
					this.propBigBomb(w, kx + 1, ky, _c)
				} else {
					_c[kx + 1][ky].mc = 0
				}
			}
			if(ky > 0 && _c[kx][ky - 1]) {
				if(_c[kx][ky - 1].mc == w) {
					this.propBigBomb(w, kx, ky - 1, _c)
				} else {
					_c[kx][ky - 1].mc = 0
				}
			}
			if(ky + 1 < _c[kx].length && _c[kx][ky + 1]) {
				if(_c[kx][ky + 1].mc == w) {
					this.propBigBomb(w, kx, ky + 1, _c)
				} else {
					_c[kx][ky + 1].mc = 0
				}
			}
		},
		//道具-横向
		transverse: function(w, kx, ky, _c) {
			_c.forEach(function(a, b) {
				if(a[ky]) {
					a[ky].mc = 0
				}
			})
		},
		//道具-竖向
		vertical: function(w, kx, ky, _c) {
			_c[kx].forEach(function(a, b) {
				if(a) {
					a.mc = 0
				}
			})
		},
		// --
	}
	return utils
});