//侧边栏,回到顶部
$(window).scroll(function () {
	var dis = $(window).scrollTop();
	var that = $('.right-bot');
	dis >= 250 ? that.fadeIn() : that.fadeOut();
});

$(document).on('click', '.jumpTop', function () {
	$("html, body").animate({
		scrollTop: "0"
	}, {
		duration: 300,
		easing: "swing"
	});
});

//首页轮播图
! function (t) {
    function i(t, i) {
        this.init(t, i)
    }
    i.prototype = {
        init: function (i, n) {
            this.ele = i, this.opts = t.extend({}, {
                index: 0,
                auto: !0,
                time: 4e3,
                indicators: !0,
                buttons: !0
            }, n), this.index = this.opts.index, this.render(), this.eventBind(), this.opts.auto && this.loop()
        }, render: function () {
            this.renCas(), this.opts.indicators && this.renIns(), this.opts.buttons && this.renBtns()
        }, renCas: function () {
            var t = this.ele.find(".carousel-inner"),
                i = t.find(".carousel-item"),
                n = i.length,
                e = i.eq(n - 1).clone(),
                s = i.eq(0).clone(),
                o = this.ele.width();
            this.index = this.index < 0 || this.index > n - 1 ? 0 : this.index, t.width((n + 2) * o).prepend(e).append(s).css("left", (this.index + 1) * -o), t.find(".carousel-item").width(o)
        }, renIns: function () {
            for (var t = this.ele.find(".carousel-item").length - 2, i = '<div class="carousel-indicators">', n = 0; n < t; n++) i += '<span data-index="' + n + '"></span>';
            i += "</div>", this.ele.append(i).find(".carousel-indicators span").eq(this.index).addClass("active")
        }, renBtns: function () {
            this.ele.append('<span class="carousel-btn carousel-prev-btn"></span><span class="carousel-btn carousel-next-btn"></span>')
        }, animate: function (t) {
            var i = this,
                n = this.ele.find(".carousel-inner"),
                e = this.ele.width(),
                s = n.find(".carousel-item").length;
            this.opts.indicators;
            n.stop(!0, !0).animate({
                left: n.position().left + t
            }, function () {
                var o = n.position().left;
                t < 0 && o < -e * (s - 2) && n.css("left", -e), t > 0 && o > -e && n.css("left", -e * (s - 2)), i.index = n.position().left / -e - 1, i.opts.buttons && i.showBtn()
            })
        }, showBtn: function () {
            this.ele.find(".carousel-indicators span").removeClass("active").eq(this.index).addClass("active")
        }, loop: function () {
            var t = this.ele.find(".carousel-next-btn");
            this.timer = setInterval(function () {
                t.trigger("click")
            }, this.opts.time)
        }, eventBind: function () {
            var i = this,
                n = this.ele.find(".carousel-prev-btn"),
                e = this.ele.find(".carousel-next-btn"),
                s = this.ele.find(".carousel-indicators"),
                o = this.ele.width(),
                a = (this.ele.find(".carousel-item").length, this.opts.auto);
            e.on("click", function () {
                i.animate(-o)
            }), n.on("click", function () {
                i.animate(o)
            }), s.on("click", "span", function () {
                i.animate((t(this).data("index") - i.index) * -o)
            }), a && this.ele.hover(function () {
                clearInterval(i.timer)
            }, function () {
                i.loop()
            })
        }
    }, t.fn.FtCarousel = function (n) {
        return this.each(function () {
            new i(t(this), n)
        })
    }
}(jQuery);