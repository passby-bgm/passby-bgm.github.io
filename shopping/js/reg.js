window.onload = function() {
    var regtel = /^1[3|4|5|7|8]\d{9}$/; //手机号
    var regqq = /^[0-9]\d{4,}$/; //QQ
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/; //昵称
    var regmsg = /^\d{6}$/; //短信验证码
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/; //密码

    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd')
    var surepwd = document.querySelector('#surepwd')

    regexp(tel, regtel);
    regexp(qq, regqq);
    regexp(nc, regnc);
    regexp(msg, regmsg);
    regexp(pwd, regpwd);

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜你输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请重新输入';
            }
        }
    }

    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜你输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';
        }
    }
}