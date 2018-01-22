(function ($) {

    $.fn.setSlide = function (option) {
        var set = $.extend({
            slideElem: $(this)
        }, option),
            city = function () {
                var li = ''
                cityJson.map(function (i) {
                    li += '<a data-value="' + i.value + '">' + i.text + '</a>';
                })
                $('.region .province ').append(li)
            };
        set.slideElem.append('<dl class="m-select" id="AreaSelector">' +
            '<dt>请选择</dt><i></i>' +
            '<dd class="region none" style="height:210px;">' +
            '<input type="hidden" name="" value="">' +
            '<ul class="tab">' +
            '<li class="province-title on">省份</li>' +
            '<li class="city-title">城市</li>' +
            '<em>清空</em>' +
            '</ul>' +
            '<div class="tab-con province clearfix"> ' +
            '</div>' +
            '<div class="tab-con city clearfix none"> ' +
            '</div>' +
            '</dd>' +
            '</dl>');
        city();
        var selectBtn = set.slideElem.find('dt'),
            cityBlock = set.slideElem.find('dd'),
            provinceBtn = cityBlock.find('.province a'),
            select = cityBlock.find('.m-select')
            navLi = cityBlock.find('.tab li'),
            clear = cityBlock.find('.tab em');
        // 弹出框
        selectBtn.click(function () {
            select.toggleClass('on')
            cityBlock.toggle()
        })
        provinceBtn.on('click', function () {
            var t = $(this), html = t.html(), block = t.closest('.tab-con');
            t.addClass('on').siblings().removeClass('on');
            $('.province-title').html(html);
            block.hide().siblings('.tab-con').show();
            var val = t.attr('data-value')
            var cityData = ''
            cityJson.map(function (i) {
                if (i.value == val) {
                    i.children.map(function (k) {
                        cityData += '<a data-value="' + k.value + '">' + k.text + '</a>'
                    })
                }
            })
            $('.city-title').html('城市').addClass('on').siblings('li').removeClass('on')
            $('.region .city').html(cityData)
            var cityBtn = cityBlock.find('.city a');
            cityBtn.on('click', function () {
                var t = $(this), html = t.html();
                t.addClass('on').siblings().removeClass('on');
                $('.city-title').html(html);
                cityBlock.hide();
                var str = ''
                navLi.each(function () {
                    var $t = $(this).html();
                    str += $t + '/';
                })
                str = str.substring(0, str.length - 1);
                selectBtn.html(str)
                select.removeClass('on')
            })
            navLi.on('click', function () {
                var t = $(this), index = t.index();
                if (t.hasClass('city-title')) {
                    if ($('.tab-con.province').find('.on').length == 0) {
                        return
                    }
                }
                t.addClass('on').siblings('li').removeClass('on');
                $('.tab-con').eq(index).show().siblings('.tab-con').hide()
            })
        })

        clear.click(function () {
            $('.province-title').html('省份').addClass('on').siblings('li').html('城市').removeClass('on');
            $('.tab-con.province').show().siblings('.tab-con').hide();
            city();
            cityBlock.hide();
            selectBtn.html('请选择')
            select.removeClass('on')
            $('.region .city').html('')
            $('.tab-con a').removeClass('on')
        })
        $(document).on('click', function (e) {
            var e = e || window.event;
            var elem = e.target || e.srcElement;
            while (elem) {
                if (elem.className && elem.className.indexOf('address-block') > -1) {
                    return;
                }
                elem = elem.parentNode;
            }
            cityBlock.hide();
        })


    }


})(jQuery);

