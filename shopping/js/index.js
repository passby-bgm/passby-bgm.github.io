window.addEventListener('load', function() {
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //2.鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用事件
            arrow_r.click();
        }, 2000);
    });
    //3.动态生成小圆圈 
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //记录当前li的索引号,通过自定义属性
        li.setAttribute('date-index', i);
        ol.appendChild(li);
        //4.小圆圈排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            };
            //留下我自己
            this.className = 'current';
            //5.点击小圆圈，移动图片 当然移动的是ul
            //ul的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //当我们点击了某个li 就拿到当前li的索引号
            var index = this.getAttribute('date-index');
            //当我们点击了某个li就要把这个li的索引号给num
            num = index;
            circle = index;
            // num = circle = index;
            animate(ul, -index * focusWidth);
        });
    };
    //把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    //6.克隆第一张图片，放到ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //7.点击右侧按钮，滚动图片
    var num = 0;
    //控制小圆圈
    var circle = 0;
    //节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到最后一张复制的图片，num就复原为0,ul 的left改为0
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //8.点击右侧按钮，小圆圈跟随变化 可以声明一个变量控制小圆圈的播放
            circle++;
            //如果circle == 4说明走到最后一张，我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            };
            circleChange()
        }
    });
    //9.左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //如果circle < 0 说明第一张图片，则小圆圈要改为第4个小圆圈
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // };
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange()
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        };
        ol.children[circle].className = 'current';
    };
    // 10.自动播放
    var timer = setInterval(function() {
        //手动调用事件
        arrow_r.click();
    }, 2000);
})