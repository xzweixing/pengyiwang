/* Created by demon on 2017/9/18 0018.*/
;(function () {
    'use strict';

    var pageNumber = 1;
    var totalPages = 0;

    $(function () {
        // sidagaodiTip();//四大高地 点击非陕西旅游演艺 弹窗
        new WOW().init();
        contentWayPoint();
        getSliderPicUrl();//获取swiper图片路径
        initMap();
        initDestination();
        initWay(1);
        initzxzx();
        initzxzxSwiper();
        initzxhd();
        quanJingTu();
        changeMapdata(1);
        getTraceData();//获取线路
    });

    //四大高地 点击非陕西旅游演艺 弹窗
    /*function sidagaodiTip() {
        $(document).on('click', '.lvgd .content .contentimg div.img', function () {
            var name = $(this).attr('name');
            if (name != '陕西旅游演艺') {
                alert('即将上线,敬请期待');
            }
        });

    }*/

//lyzx
    $(document).on('click', '.lyzx .leftbox .sidebox ul li', function () {
        $('.lyzx .leftbox .sidebox ul li').removeClass('hover');
        $(this).addClass('hover');
        var src = $(this).find('img').attr('src');
        var imgHtml = '<img src="' + src + '" alt="活动图片" class="animation-fadeIn">';
        // $(".lyzx .bigitem .picbox img").attr("src", src);
        $(".lyzx .bigitem .picbox").html(imgHtml);
        $('.bigitem').attr('bigitem-id', $(this).attr('data-id'));
        $('.bigitem a').attr('href', $(this).attr('data-url'));
        if (!$(this).attr('data-url')) {
            $('.bigitem a').attr('href', 'hdDetail.html?id=' + $(this).attr('data-id'));
        }
        $('.bigitem .detailbox p').html($(this).attr('data-title'));
        $('.bigitem .detailbox .txt').html($(this).attr('data-time'));
    });

//更多行程
    $(document).on('click', '.jcxc .more', function () {
        var id = $('.jcxc .tabtitle .hover a').attr('type-id');
        window.open('journeyList.html?id=' + id);
    });

    //侧边栏
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

    function initzxhd() {
        var str = '';
        $.ajax({
            type: "get",
            url: '/activity/getlist',
            data: {'pageSize': 5},
            success: function (data) {
                var tpl = $("#hdSwiper").html();
                var template = Handlebars.compile(tpl);
                var html = template(data);
                $('.jchd .swiper-wrapper').html(html);
                //精彩活动轮播
                var mySwiper = new Swiper('.swiperhd', {
                    loop: true,
                    slidesPerView: 4,
                    // 如果需要前进后退按钮
                    nextButton: '.swiper-right',
                    prevButton: '.swiper-left',
                    paginationClickable: true,
                    autoplay: 5000,
                    speed: 1000,
                    autoplayDisableOnInteraction: false
                });
            }
        });
    }

    //初始化最新资讯
    function initzxzx() {
        var str = '';
        var data = {
            pageSize: 4
        };
        $.ajax({
            type: "get",
            url: '/news/getlist',
            data: data,
            success: function (data) {
                var tpl = $("#templatefir").html();
                var template = Handlebars.compile(tpl);
                var html = template(data);
                $('.zxzx .content-r').html(html);
            }
        });
    }

    //Handlebars注册day
    Handlebars.registerHelper("date", function (value) {
        var arr = value.split('-');
        return arr[2];
    });

    //Handlebars注册year
    Handlebars.registerHelper("year", function (value) {
        var arr = value.split('-');
        var str = arr[0] + '.' + arr[1];
        return str;
    });

    //Handlebars注册内容
    Handlebars.registerHelper("cont", function (value) {
        if(value){
            var str = value.substring(0, 55) + "...";
            return str;
        }
    });

    function initzxzxSwiper() {
        $.ajax({
            type: "POST",
            url: '/bannerManagement/bannerList',
            data: {'bannerType': 2},
            success: function (data) {
                var tpl = $("#newsSwiper").html();
                var template = Handlebars.compile(tpl);
                var html = template(data);
                $('.newsSwiper .swiper-wrapper').html(html);
                var newsSwiper = new Swiper('.newsSwiper', {
                    loop: true,
                    direction: 'vertical',
                    autoplay: 5000,
                    speed: 500,
                    effect: 'slide',
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false
                });
            }
        });
    }

    function initDestination() {
        var typeid = $('.tabbox ul .hover a').attr('type-id');
        var cityid = stateCity();
        var _that = $('.tssx .sliderbox .left,.tssx .sliderbox .right');
        var _right = $('.tssx .sliderbox .right');
        var _left = $('.tssx .sliderbox .left');
        var data = {
            type: typeid,
            pageNumber: pageNumber,
            city: cityid
        };
        $.ajax({
            type: "POST",
            url: '/destination/getInfoByType',
            data: data,
            success: function (data) {
                totalPages = data.totalPages;
                var html = '';
                for (var i = 0; i < data.items.length; i++) {
                    html += '<li><a href="scenery.html?id=' + data.items[i].id + '"  target="_blank">' +
                        '<div class="picbox animation-fadeIn">';
                    if (data.items[i].bookTic) {
                        html += '<p class="bookBtn">订</p> ';
                    }
                    if (data.items[i].isSupportScanCode === 0) {
                        html += '<p class="isSupportScanCode"><img class="scan" src="./pic/demon/scan.png" alt=""><span>扫码入园</span></p>';
                    }
                    html += '<img src="' + data.items[i].imgsUrl + '" alt="" class=""><div class="mengimg"></div>' +
                        '</div>' +
                        '<div class="detailbox">' +
                        '<p>' + data.items[i].name + '</p>' +
                        '<div class="txt">' +
                        '<div class="star-wrapper"><div class="star-tool" score="' + data.items[i].score + '" color="1"></div></div>' +
                        '<div class="score">' + data.items[i].remark + '条点评</div>' +
                        '</div>' +
                        '</div></a>' +
                        '</li>';
                }
                $('.tablist ul').html(html);
                (totalPages < 2) ? _that.css('display', 'none') : _that.css('display', 'block');
                (data.pageNumber == totalPages) ? _right.css('display', 'none') : _right.css('display', 'block');
                (data.pageNumber == 1 && totalPages >= 1) ? _left.css('display', 'none') : _left.css('display', 'block');
                initStar();
            }
        });
    }

//城市状态
    function stateCity() {
        var map = $('.map');
        if (map.hasClass('xa')) {
            return '1';
        }
        if (map.hasClass('bj')) {
            return '2';
        }
        if (map.hasClass('xy')) {
            return '3';
        }
        if (map.hasClass('tc')) {
            return '4';
        }
        if (map.hasClass('wn')) {
            return '5';
        }
        if (map.hasClass('ya')) {
            return '6';
        }
        if (map.hasClass('yl')) {
            return '7';
        }
        if (map.hasClass('hz')) {
            return '8';
        }
        if (map.hasClass('ak')) {
            return '9';
        }
        if (map.hasClass('sl')) {
            return '10';
        }
        if (map.hasClass('yangling')) {
            return '11';
        }
        if (map.hasClass('hc')) {
            return '12';
        }
    }

//城市状态2
    function stateCity2() {
        var map = $('.map');
        if (map.hasClass('xa')) {
            return 'xian';
        }
        if (map.hasClass('bj')) {
            return 'baoji';
        }
        if (map.hasClass('xy') || map.hasClass('yangling')) {
            return 'xianyang';
        }
        if (map.hasClass('tc')) {
            return 'tongchuan';
        }
        if (map.hasClass('wn') || map.hasClass('hc')) {
            return 'weinan';
        }
        if (map.hasClass('ya')) {
            return 'yanan';
        }
        if (map.hasClass('yl')) {
            return 'yulin';
        }
        if (map.hasClass('hz')) {
            return 'hanzhong';
        }
        if (map.hasClass('ak')) {
            return 'ankang';
        }
        if (map.hasClass('sl')) {
            return 'shangluo';
        }
        if (map.hasClass('yl')) {
            return 'xianyang';
        }
    }

//查看更多目的地
    $('.tssx .more').on('click', function () {
        var typeid = $('.tabbox ul .hover a').attr('type-id');
        var cityid = stateCity();
        window.open("destinationList.html?cityid=" + cityid + '&typeid=' + typeid + '&tagid=' + "");
    });
//探索陕西翻页加
    $('.tssx .sliderbox .right').on('click', function () {
        if (pageNumber < totalPages) {
            pageNumber++;
            initDestination();
        }
    });
//探索陕西翻页减
    $('.tssx .sliderbox .left').on('click', function () {
        if (pageNumber > 1) {
            pageNumber--;
            initDestination();
        }
    });

//切换目的地类型
    $('.tssx .tabbox ul .li-des').click(function () {
        $('.tssx .tabbox ul .li-des').removeClass('hover');
        $(this).addClass('hover');
        pageNumber = 1;
        initDestination();
    });


    $(document).on('click', '.newsbox ul a .c2', function () {
        var xwId = $(this).parent().parent().attr('data-id');
        var url = "xwDetail.html?id=" + xwId;
        $(this).parent().attr('href', url);
    });

    $(document).on('click', '.newsbox>p a', function () {
        var xwId = $(this).parent().attr('data-id');
        var url = "xwDetail.html?id=" + xwId;
        $(this).attr('href', url);
    });

    function initWay(pageNum, flag) {
        var typeid = $('.jcxc .tabtitle .hover a').attr('type-id');
        var data = {
            type: typeid,
            pageNumber: pageNum
        };
        $.ajax({
            type: "POST",
            url: '/article/getListByType',
            data: data,
            success: function (data) {
                if (flag != false) {
                    initNavbar(data.totalPages);
                }
                var html = '';
                for (var i = 0; i < data.items.length; i++) {
                    html += '<div class="item animation-fadeIn" item-id="' + data.items[i].id + '">' +
                        '<a href="journeyDetail.html?id=' + data.items[i].id + '" target="_blank">' +
                        '<div class="picbox">' +
                        '<img src="' + data.items[i].imgUrl + '" alt="">' +
                        '</div>' +
                        '<div class="detailbox">' +
                        '<p>' + data.items[i].titleName + '</p>' +
                        '<div class="txt">' +
                        '<div class="c1">天数：' + data.items[i].daysNum + '天</div>' +
                        '<div class="c2">观光地：' + data.items[i].sightplace + '个</div>' +
                        '<div class="c3">全程：' + data.items[i].distance + '公里</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>';
                }
                $('.jcxc .tablist').html(html);
            }
        });
    }

    function initNavbar(data) {
        var html = '';
        for (var i = 0; i < data; i++) {
            html += '<div class="c" data-index="' + (i + 1) + '"></div>';
        }
        $('.jcxc .radius').children('div').html(html);
        $('.jcxc .radius .c').eq(0).addClass('hover');

    }

//行程推荐翻页
    $(document).on('click', '.jcxc .radius .c', function () {
        var index = $(this).attr('data-index');
        initWay(index, false);
        $(this).siblings('div').removeClass('hover');
        $(this).addClass('hover');
    });

//行程推荐选择
    $(document).on('click', '.jcxc .tabtitle li', function () {
        $(this).siblings('li').removeClass('hover');
        $(this).addClass('hover');
        initWay(1);
    });

//点击 太美了 陕西-----------------------------------------
    $('.sxqj .sxqj-pic .pic-item:nth-child(1)').click(function () {
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) .ico').css('background', 'url(pic/index/index-720.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) div').css('color', '#fff');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) .ico').css('background', 'url(pic/index/index-audio.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) div').css('color', '#97989b');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) .ico').css('background', 'url(pic/index/index-pic.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) div').css('color', '#97989b');
        quanJingTu();
        $('.sxqj .tablist').unbind("click");
    });
    $('.sxqj .sxqj-pic .pic-item:nth-child(2)').click(function () {
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) .ico').css('background', 'url(pic/index/index-720-black.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) div').css('color', '#97989b');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) .ico').css('background', 'url(pic/index/index-audio-white.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) div').css('color', '#fff');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) .ico').css('background', 'url(pic/index/index-pic.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) div').css('color', '#97989b');
        $('.sxqj .tablist').unbind("click");
        shiPinTu();
        palyVideo();
    });
    $('.sxqj .sxqj-pic .pic-item:nth-child(3)').click(function () {
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) .ico').css('background', 'url(pic/index/index-720-black.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(1) div').css('color', '#97989b');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) .ico').css('background', 'url(pic/index/index-audio.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(2) div').css('color', '#97989b');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) .ico').css('background', 'url(pic/index/index-pic-white.png) no-repeat center');
        $('.sxqj .sxqj-pic .pic-item:nth-child(3) div').css('color', '#fff');
        $('.sxqj .tablist').unbind("click");
        tuKuTu();
    });

//720全景 封面图
    function quanJingTu() {
        $.ajax({
            url: "/overallView/overallViews",
            // url:"/video/videos",
            success: function (data) {
                $('.sxqj .tablist').html('');
                var html1 = '';
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        html1 += '<div class="item big">';
                    } else {
                        html1 += '<div class="item">';
                    }
                    html1 += '<a href="' + data.items[i].url + '" target="_blank" class="animation-fadeIn">' +
                        '<img src="' + data.items[i].coverImgUrl + '" alt="">' +
                        '<span class="txt">' + data.items[i].title + '</span>' +
                        '</a>' +
                        '<a href="' + data.items[i].url + '" target="_blank" class="animation-fadeIn"><div class="overlay"></div></a>' +
                        '</div>'
                }
                $('.sxqj .tablist').append(html1);
                $('.sxqj .more').html('<a href="720Degree.html" target="_blank">查看更多虚拟旅游</a>');
            }
        })
    }

//视频 封面图
    function shiPinTu() {
        $.ajax({
            url: "/video/videos",
            success: function (data) {
                var that = $('.sxqj .tablist');
                that.html('');
                var html1 = '';
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        html1 += '<div class="item big">';
                    } else {
                        html1 += '<div class="item">';
                    }
                    html1 += '<a videoUrl = "' + data.items[i].videoUrl + '" class="animation-fadeIn">' +
                        '<img src="' + data.items[i].coverImgUrl + '" alt="">' +
                        '<span class="txt">' + data.items[i].title + '</span>' +
                        '</a>' +
                        '<div class="overlay"></div>' +
                        '</div>'
                }
                that.append(html1);
                $('.sxqj .more').html('<a href="videoList.html" target="_blank">查看更多视频</a>');
            }
        })
    }

//图库 封面图
    function tuKuTu() {
        $.ajax({
            url: "/mapdepot/getMaplist",
            success: function (data) {
                var that = $('.sxqj .tablist');
                that.html('');
                var html1 = '';
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        html1 += '<div class="item big">';
                    } else {
                        html1 += '<div class="item">';
                    }
                    var mainFlags = JSON.parse(data.items[i].imgs);
                    var mainFlagUrl;
                    for (var j = 0; j < mainFlags.length; j++) {
                        if (mainFlags[j].mainFlag == 1) {
                            mainFlagUrl = mainFlags[j].url;
                        }
                    }
                    html1 += '<a picsIndex=' + i + ' class="animation-fadeIn">' +
                        '<img src="' + mainFlagUrl + '" alt="">' +
                        '<span class="txt">' + data.items[i].title + '</span>' +
                        '</a>' +
                        '<div class="overlay"></div>' +
                        '</div>'
                }
                that.append(html1);
                $('.sxqj .more').html('<a href="pictureList.html" target="_blank">查看更多图库</a>');
                showPics(data);
            }
        })
    }

//点击播放对应视频---------------------
    function palyVideo() {
        $('.sxqj .tablist').on('click', '.item', function () {
            var videoUrl = $(this).children('a').attr('videourl');
            var videoTitle = $(this).find('.txt').html();
            showVideo(videoUrl, videoTitle);
        });
    }


    /**
     * 打开遮罩层并播放视频
     */
    function showVideo(videoUrl, videoTitle) {
        $(".mask-body").show();
        $("video").attr({"src": videoUrl});
        $(".pic-info-box .pic-name").html(videoTitle);
        var video = $("#videos");
        video[0].play();
    }

//点击显示对应图库-----------------------------------------
    function showPics(data) {
        $('.sxqj .tablist').on('click', '.item', function () {
            var picsIndex = $(this).children('a').attr('picsindex');
            var picsTitle = $(this).find('.txt').html();
            var picsIndexPicData = JSON.parse(data.items[picsIndex].imgs);
            var picsIndexPicUrl = [];
            for (var i = 0; i < picsIndexPicData.length; i++) {
                picsIndexPicUrl.push(picsIndexPicData[i].url);
            }
            queryPic(picsTitle);
            readerImgs(picsIndexPicUrl);
        });

        /**
         * 打开图库
         * @param obj 通过对象Id获取图库
         */
        function queryPic(picsTitle) {
            $(".mask-k").show();
            $(".pic-info-box .pic-name").html(picsTitle);
        }


        /**
         * 渲染遮罩层轮播页面
         * @param result
         * @param pageIndex 当前第几页 可以为空
         */
        function readerImgs(result) {
            $(".mask-k #imgList").html('');
            var data = result;
            $.each(data, function (i, o) {
                $("<div>", {"class": "imgitem"})
                    .append(
                        $("<img>", {
                            "src": o
                        })
                    ).appendTo(".mask-k #imgList");
            });
            readyMovePic();
        }
    }


//轮播图 上的 搜索框 点击改变 背景图片和placeholder
    $('#searchBoxWrap .searchBox .box-t ul').on('click', 'li', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
        }
        //改变placeholder
        var index = $(this).index();
        var $searchWord = $('#searchBoxWrap .searchBox .box-b .searchWord');
        switch (index + 1) {
            case 1:
                $searchWord.attr('placeholder', '大唐芙蓉园');
                break;
            case 2:
                $searchWord.attr('placeholder', '陕南山水间的高颜值小村');
                break;
            case 3:
                $searchWord.attr('placeholder', '长安国际青年音乐节');
                break;
            case 4:
                $searchWord.attr('placeholder', '国际龙舟精英赛');
                break;
            case 5:
                $searchWord.attr('placeholder', '陕西欢迎你');
                break;
        }
    });
//轮播图下面的 小轮播
    var activityBoxSwiper = new Swiper('#activityBox .activityBoxSwiper', {
        loop: true,
        autoplay: 2000,
        speed: 500,
        effect: 'fade',
        autoplayDisableOnInteraction: false
    });

//点击地图 改变天气和人数 的数据
    function changeMapdata(addressId) {
        var mapDataArr = [
            {
                id: 1,
                adcode: 610100
            }, {
                id: 8,
                adcode: 610700
            }, {
                id: 9,
                adcode: 610900
            }, {
                id: 10,
                adcode: 611000
            }, {
                id: 2,
                adcode: 610300
            }, {
                id: 3,
                adcode: 610400
            }, {
                id: 5,
                adcode: 610500
            }, {
                id: 4,
                adcode: 610200
            }, {
                id: 6,
                adcode: 610600
            }, {
                id: 7,
                adcode: 610800
            }, {
                id: 11,
                adcode: 610403
            }, {
                id: 12,
                adcode: 610581
            }

        ];

        for (var i = 0; i < mapDataArr.length; i++) {
            if (addressId == mapDataArr[i].id) {
                /*
                 $('.spotInfoBox .box-t h5 span').html(mapDataArr[i].address);//地址
                 //总人数依次填入 开始---------------------
                 $('.spotInfoBox .peopleCount li .numCont').css('top', 0);
                 var peopleNumString = String(mapDataArr[i].peopleNum);
                 var peopleNumlength = peopleNumString.length;
                 for (var j = peopleNumlength - 1; j >= 0; j--) {
                 var perNum = peopleNumString.charAt(j);
                 var top = (-perNum * 27) + 'px';
                 $('.spotInfoBox .peopleCount li:nth-child(' + (7 - peopleNumlength + j + 1) + ') .numCont').css('top', top);
                 }
                 //总人数依次填入 结束---------------------
                 */

                var adcode = mapDataArr[i].adcode;//天气查询的城市ID
                weather(adcode, mapDataArr, i);
                break;
            }
        }

    }

    //获取天气
    function weather(adcode, mapDataArr, i) {
        $.ajax({
            url: 'http://restapi.amap.com/v3/weather/weatherInfo?city=' + adcode + '&key=15ab59270648ca9f4979aa3ff6935df0',
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var weather = data.lives[0].weather;
                var temperature = data.lives[0].temperature;
                var boxBhtml = '<div class="animation-fadeIn" >' +
                    '<h5><span>' + temperature + '</span>°C</h5>' +
                    '<ul>' +
                    '<!--<li class="icon"><img src="' + mapDataArr[i].icon + '" alt=""></li>-->' +
                    '<li class="weather">' + weather + '</li>' +
                    '<li>|</li>' +
                    '<li class="airInfo"></li>' +
                    '<li class="airDegree"></li>' +
                    '</ul>' +
                    '</div>';
                $('.spotInfoBox .box-b').html(boxBhtml);
                getaqi();
            }
        });
    }

    function getaqi() {
        var city = stateCity2();
        $.ajax({
            url: '/airQuality/getAirQuality?city=' + city,
            type: 'get',
            dataType: 'JSON',
            success: function (data) {
                var obj = JSON.parse(data.result);
                $('.airInfo').html('空气' + obj.quality);
                $('.airDegree').html(obj.AQI);
            }
        });
    }

    var contentWayPoint = function () {
        //var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                //i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {offset: '85%'});
    };


//首页轮播图
    function initSwiper() {
        var mySwiper = new Swiper('.swiper1', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable: true,
            // 如果需要前进后退按钮
            nextButton: '.swiper-right',
            prevButton: '.swiper-left',
            autoplay: 3000,
            speed: 1000,
            autoplayDisableOnInteraction: false
        });

        $(".pic").mouseenter(function () {//滑过悬停
            mySwiper.stopAutoplay();//mySwiper 为上面你swiper实例化的名称
        }).mouseleave(function(){//离开开启
            mySwiper.startAutoplay();
        });
    }



//地图开始-------------------------------
    function initMap() {
        //tssx
        var SXMapObj = [];
        var maparr = '';
        var mapflag = false;
        var curNum = 0;
        $('.tssx .map > div').not('.tssx .map .point').each(function () {
            var name = $(this).attr('class');
            var data = $(this).data('map').split(',');
            for (var i = 0; i < data.length; i++) data[i] = parseInt(data[i]);
            if (name && data) SXMapObj.push({name: name, data: data});
        });
        $('.tssx button').click(function () {
            if (!mapflag) {
                //开始
                //$('.tssx .map .t').remove();
                $(this).html('点击结束');
                maparr = '';
            } else {
                //结束
                $(this).html('点击开始');
            }
            mapflag = !mapflag;
        });
        $('.tssx .map').click(function (e) {
            var offset = $(this).offset();
            var relativeX = parseInt(e.pageX - offset.left);
            var relativeY = parseInt(e.pageY - offset.top);
            var mouseobj = {x: relativeX, y: relativeY};
            if (mapflag) {
                $(this).append('<div class="t" style="top: ' + mouseobj.y + 'px; left: ' + mouseobj.x + 'px;"></div>');
                maparr += mouseobj.x + ',' + mouseobj.y + ',';
                return false;
            }
            for (var i = 0; i < SXMapObj.length; i++) {
                var item = SXMapObj[i];
                if (detectMapPos(item.name, item.data, mouseobj)) {
                    $('.tssx .map').removeClass('xa xy bj wn sl tc ya yl hz ak yangling hc').addClass(item.name);
                    pageNumber = 1;
                    initDestination();
                    break;
                }
            }
            changeMapdata(stateCity());//改变地图左上角数据

        });

        //sysy
        $('.sxsy .tablist .item .box img').click(function () {
            var x = document.getElementById("myAudio");
            var state = document.getElementById("myAudio").paused;
            if (state) {
                x.play();
                $(this).attr('src', 'pic/demon/furongyuan1-2.jpg')
            }
            else {
                x.pause();
                $(this).attr('src', 'pic/demon/furongyuan1.jpg')
            }
        });

        function detectMapPos(mapname, mapdata, mouseobj) {
            var mapobj = [];
            var minX = 9999, maxX = 0, minY = 9999, maxY = 0;
            var flag = false;
            for (var i = 0; i < mapdata.length - 1; i++) {
                mapobj.push({x: mapdata[i], y: mapdata[i + 1]});
                if (mapdata[i] < minX) minX = mapdata[i];
                if (mapdata[i] > maxX) maxX = mapdata[i];
                if (mapdata[i + 1] < minY) minY = mapdata[i + 1];
                if (mapdata[i + 1] > maxY) maxY = mapdata[i + 1];
                i++;
            }
            if (mouseobj.x < minX || mouseobj.x > maxX || mouseobj.y < minY || mouseobj.y > maxY) {
                return false;
            }
            for (var i = 0, j = mapobj.length - 1; i < mapobj.length; j = i++) {
                if (( (mapobj[i].y > mouseobj.y) != (mapobj[j].y > mouseobj.y) ) &&
                    (mouseobj.x < (mapobj[j].x - mapobj[i].x) * (mouseobj.y - mapobj[i].y) / (mapobj[j].y - mapobj[i].y) + mapobj[i].x))
                    flag = !flag;
            }
            if (flag) {
                return true;
            } else {
                return false;
            }
        }

        function changeMapTabBox(json) {
            var str = '';
            for (var i = 0; i < json.length; i++) {
                str += '<li><a href="way.html"  target="_blank">' +
                    '<div class="picbox">' +
                    '<img src="' + json[i].url + '" alt=""><em>' + json[i].type + '</em><div class="mengimg"></div>' +
                    '</div>' +
                    '<div class="detailbox">' +
                    '<p>' + json[i].name + '</p>' +
                    '<div class="txt">' + json[i].price + '</div>' +
                    '</div></a>' +
                    '</li>';
            }
            $('.tssx .sliderbox .tablist ul').html(str);
        }
    }

    //地图结束-------------------------------

    //目的地全部跳转
    $('.destinationAll').click(function () {
        window.open('cityDetail.html?id=' + stateCity());
    });

    //获取首页 大轮播图
    function getSliderPicUrl() {
        var $swiper = $('.slider .pic .swiper1 .swiper-wrapper');
        $swiper.empty();
        $.ajax({
            url: "/bannerManagement/bannerList",
            success: function (data) {
                var html;
                $.each(data, function (key, val) {
                    if (val.bannerLink) {
                        html = '<div class="swiper-slide"><a href="' + val.bannerLink + '" target="_blank"><img src="' + val.bannerUrl + '" alt="景区图片"></a></div>'
                    } else {
                        html = '<div class="swiper-slide"><img src="' + val.bannerUrl + '" alt="景区图片"></div>'
                    }
                    $swiper.append(html);
                });
                initSwiper();
            }
        });
    }

    //点击轮播图里面的搜索
    $(document).on('click', '.slider #searchBoxWrap .searchBox .box-b .searchBtn', function () {
        var that = $('.searchWord');
        var searchInput = that.val();
        if (!searchInput) {
            searchInput = that.attr('placeholder');

        }
        var type = $('.searchBox .box-t li.active').attr('type');
        type = type ? type : '';
        searchInput = encodeURI(searchInput);
        window.open('search.html?type=' + type + '&key=' + searchInput);
    });
    
    //获取线路
    function getTraceData() {
        $.ajax({
            url: '/route/getListForPc',
            success: function (data) {
                console.log(data);

                var tpl = $("#trace-hb").html();
                var template = Handlebars.compile(tpl);
                var html = template(data.items);
                $('.lxtc .tablist').html(html);
            }
        });
    }
    //线路 每个项目 动画的延时时间
    Handlebars.registerHelper('traceDelayTimeHelper',function(v1){
        var x = v1 + 2;
        x = x * 200 - 100;
        return x + 'ms';
    });

    $('.J_SlideLeftClick').on('click', function () {
        var slideFirst = $(".J_YouQingTuiJian .slide-first"), slideSecond = $(".J_YouQingTuiJian .slide-second");
        var leftFirst = parseInt(slideFirst.css("left"), 10), leftSecond = parseInt(slideSecond.css("left"), 10);
        if(leftFirst < 0){
            slideFirst.css('left', '0px');
            slideSecond.css('left', '0px');
        }else{
            slideFirst.css('left', '-1020px');
            slideSecond.css('left', '-1020px');
        }
    });
    $('.J_SlideRightClick').on('click', function () {
        var slideFirst = $(".J_YouQingTuiJian .slide-first"), slideSecond = $(".J_YouQingTuiJian .slide-second");
        var leftFirst = parseInt(slideFirst.css("left"), 10), leftSecond = parseInt(slideSecond.css("left"), 10);
        if(leftFirst < 0){
            slideFirst.css('left', '0px');
            slideSecond.css('left', '0px');
        }else{
            slideFirst.css('left', '-1020px');
            slideSecond.css('left', '-1020px');
        }
    });
}());


/**
 * 关闭视频
 */
function closeVideo() {
    var mask = $(".mask-body");
    var video = $("#videos");
    video[0].pause();
    mask.hide();
}
/**
 * 关闭遮罩层
 */
function closePic() {
    var mask = $(".mask-k");
    mask.hide();
}