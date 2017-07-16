class OperatorCookie {
    setCookie(name, value, expiredays) { //设置cookie
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = `${name}=${escape(value)};expires=${exdate.toGMTString()}`;

        return this;
    }

    getCookie(name) {
        //获取cookie
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    deleteCookie(name) {
        //删除cookie
        let exdate = new Date();
        exdate.setTime(exdate.getTime() - 100);

        document.cookie = `${name}=v;expires=${exdate.toGMTString()}`;
        return this;
    }
}

export default new OperatorCookie()