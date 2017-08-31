/**
 * Created by lenovo on 2017/8/25.
 */
/**
 *   两个对象中同一属性的比较
 * @param str
 * @returns {Function}
 */
function attrSort(str){
    return function(a, b) {
        if(a[str] > b[str]) {
            return 1
        }else if(a[str] === b[str]) {
            return 0
        }else {
            return -1
        }
    }
}
/**
 *   增加百分号
 * @param val
 * @returns {*}
 */
function percent(val) {
    val = val*100;
    if(val < Math.ceil(val) && val> Math.floor(val)) {
        val = val.toFixed(2);
    }else {
        val = val.toFixed(0);
    }
    if(val == 0) {
        return 0;
    }else if(val> 100) {
        return val/100;
    }
    return val+"%"
}

/**
 *   得出每一个domain中的最大值
 * @param obj
 * @returns {*}
 */
function maxValueformDomain(obj) {
    var arr = []
    obj.value.forEach(function(elem, index) {
        arr.push(elem.value)
    })
    arr.sort(function(a, b) {
        return b - a
    })
    return arr[0]
}

/**
 * 是否是瑞年
 * @param year
 * @returns {boolean}
 */
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 瑞年和平年中每月的天数
 * @param year
 * @param month
 * @returns {*|number}
 */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}
/**
 * 某天在这一年中属于哪个星期
 * @param y
 * @param m
 * @param d
 * @returns {*}
 */
function getWeekNumber(y, m, d) {
    var now = new Date(y, m - 1, d),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / 7);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7);
    }
    return week;
}
/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns {*}
 */
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var k in o) {
        if (new RegExp("("+k+")").test(fmt)) {
            var str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
/**
 * 保持两位数，如果不足前面加0
 * @param str
 * @returns {string}
 */
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}