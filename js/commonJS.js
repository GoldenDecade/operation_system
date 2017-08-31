/**
 * Created by lenovo on 2017/8/25.
 */
var chartObj = {};
/**
 * 单线图
 * data: [{label:'', value: }]
 * @param id
 * @param url
 * @param seriesname
 * @param formatter
 * @returns {*}
 */
chartObj.single_line = function single_line(id, url, seriesname,formatter) {
    formatter = formatter || "{a} <br/>{b} : {c}"
    var chart = echarts.init(document.getElementById(id))
    var options = {
        tooltip: {
            trigger: 'axis',
            formatter: formatter
        },
        legend: {
            type: 'plain',
            data:[seriesname],
            left: 20,
            top: 10
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: seriesname,
                type:'line',
                itemStyle: {
                    normal: {
                        color:'rgba(35, 183, 229, 1)',
                        label: {
                            show: true,
                            position:'top',
                            textStyle: {
                                color: 'rgba(35, 183, 229, 1)',
                            },
                            formatter: function(p){
                                return p.value >0 ? (p.value): ''
                            }
                        }
                    }
                },
            }
        ]
    }
    chart.setOption(options);
    chart.showLoading();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var x_data = [],
                y_data = [];
            res.forEach(function(elem, index) {
                x_data.push(elem.label)
                y_data.push(elem.value)
            })
            var option = {
                    xAxis: {
                        data: x_data
                    },
                    series: [
                        {
                            data: y_data
                        }
                    ]
                }
            chart.setOption(option)

        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })
    chart.hideLoading()
    window.addEventListener("resize", chart.resize)

    return chart
}
/**
 * 针对绑定成功率
 * @param id
 * @param url
 * @param seriesname
 * @param formatter
 * @returns {*}
 */
chartObj.bind_success_ratio = function single_line(id, url, seriesname) {
    var chart = echarts.init(document.getElementById(id))
    var options = {

        legend: {
            type: 'plain',
            data:[seriesname],
            left: 20,
            top: 10
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: seriesname,
                type:'line',
                itemStyle: {
                    normal: {
                        color:'rgba(35, 183, 229, 1)',
                        label: {
                            show: true,
                            position:'top',
                            textStyle: {
                                color: 'rgba(35, 183, 229, 1)',
                            },
                            formatter: function(p){
                                return p.value >0 ? (p.value*100)+"%": ''
                            }
                        }
                    }
                },
            }
        ]
    }
    chart.setOption(options);
    chart.showLoading();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var x_data = [],
                y_data = [];
            res.forEach(function(elem, index) {
                x_data.push(elem.label)
                y_data.push((elem.success/elem.total).toFixed(2))
            })
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function(p) {
                        var the_index = 0;
                        for(var i=0; i<res.length; i++) {
                            if(res[i].label === p[0].name) {
                                the_index = i;
                                break;
                            }
                        }
                        // return p[0].seriesName+'<br/>'+p[0].name+' : '+p[0].value;
                        return p[0].seriesName+'<br/>'+p[0].name+' : '+p[0].value+'<br/>number of bindings : '+res[the_index].total+'<br/>number of successful bindings : '+res[the_index].success;
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    startValue: x_data[x_data.length-30],
                    endValue: x_data[x_data.length-1]
                }, {
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                xAxis: {
                    data: x_data
                },
                series: [
                    {
                        data: y_data
                    }
                ]
            }
            chart.setOption(option)

        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })
    chart.hideLoading()
    window.addEventListener("resize", chart.resize)

    return chart
}
/**
 * 单饼图
 * data: [{label:'', value: }]
 * @param id
 * @param url
 * @param seriesname
 * @param formatter
 * @returns {*}
 */
chartObj.single_pie = function single_pie(id, url, seriesname, formatter) {
    formatter = formatter || "{a} <br/>{b} : {c} ({d}%)"
    var chart = echarts.init(document.getElementById(id))
    var options = {
        legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 'left',
            top: 10,
            bottom: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: formatter
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        series : [
            {
                name: seriesname,
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    chart.setOption(options);
    chart.showLoading();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var legend_data = []
            var data = res.map(function(elem, index) {
                elem.name = elem.label
                legend_data.push(elem.label)
                return elem
            })
            var option = {
                legend: {
                    data: legend_data
                },
                series: [
                    {data: data}
                ]
            }

            chart.setOption(option);
            chart.hideLoading();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })

    chart.hideLoading()
    window.addEventListener("resize", chart.resize)

    return chart
}
/**
 * 双环图
 * @param id
 * @param url
 * @param seriesname
 * @returns {*}
 */
chartObj.double_ring = function double_ring(id, url, seriesname) {
    var chart = echarts.init(document.getElementById(id))
    var options = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 'left',
            top: 10,
            bottom: 10
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        series : [
            {
                name: seriesname,
                type: 'pie',
                selectedMode: 'single',
                radius : [0, '30%'],
                center: ['50%', '50%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },

            },
            {
                name:seriesname,
                type:'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
            }
        ]
    }
    chart.setOption(options);
    chart.showLoading();

    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var legend_data = []
            var inner_data = res.inner.map(function(elem, index) {
                elem.name = elem.label
                legend_data.push(elem.label)
                console.log(delete(elem.label));
                return elem
            })
            var outer_data = res.outer.map(function(elem, index) {
                elem.name = elem.label
                legend_data.push(elem.label)
                console.log(delete(elem.label));
                return elem
            })
            var option = {
                legend: {
                    data: legend_data
                },
                series: [
                    {data: inner_data},
                    {data: outer_data}
                ]
            }

            chart.setOption(option);
            chart.hideLoading();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })

    chart.hideLoading()
    window.addEventListener("resize", chart.resize)

    return chart
}
/**
 * 带有缩放功能的单线图
 * @param id
 * @param url
 * @param seriesname
 * @param formatter
 * @returns {*}
 */
chartObj.single_line_dataZoom = function single_line_dataZoom(id, url, seriesname,formatter) {
    formatter = formatter || "{a} <br/>{b} : {c}"
    var chart = echarts.init(document.getElementById(id))
    var options = {
        tooltip: {
            trigger: 'axis',
            formatter: formatter
        },
        legend: {
            type: 'plain',
            data:[seriesname],
            left: 20,
            top: 10
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 40,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },

        series: [
            {
                name: seriesname,
                type:'line',
                itemStyle: {
                    normal: {
                        color:'rgba(35, 183, 229, 1)',
                        label: {
                            show: true,
                            position:'top',
                            textStyle: {
                                color: 'rgba(35, 183, 229, 1)',
                            },
                            formatter: function(p){
                                return p.value >0 ? (p.value): ''
                            }
                        }
                    }
                },
            }
        ]
    }
    chart.setOption(options);
    chart.showLoading();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var x_data = [],
                y_data = [];
            res.forEach(function(elem, index) {
                x_data.push(elem.label)
                y_data.push(elem.value)
            })
            var option = {
                xAxis: {
                    data: x_data
                },
                series: [
                    {
                        data: y_data
                    }
                ],
                dataZoom: [{
                    type: 'inside',
                    startValue: x_data[x_data.length-30],
                    endValue: x_data[x_data.length-1]
                }, {
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
            }


            chart.setOption(option)

        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })
    chart.hideLoading()
    window.addEventListener("resize", chart.resize)

    return chart
}
/**
 * 堆积图
 * @param id
 * @param url
 */
chartObj.stack_line = function stack_line(id, url) {
    var chart = echarts.init(document.getElementById(id));
    var bar_colors = ["#B31800", "#2F4554", "#56A36C", "#5E8579", "#7E884F", "#1DB0B8", "#E08031", "#044D22", "#D0E9FF"];
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        ifModified: true,
        async: true,
        cache: false,
        success: function(data) {
            var obj = {};
            obj.xAxis = [];
            obj.score = [];
            obj.legend = [];
            obj.all_keys = [];
            for(var i=0; i<data.length; i++) {
                obj.xAxis.push(data[i].label);
                obj.score.push(data[i].score);
                obj.all_keys = obj.all_keys.concat(data[i].data);
            }
            for(var j=0; j<obj.all_keys.length; j++) {
                var item = obj.all_keys[j];
                if(obj.legend.indexOf(item.label) == -1) {
                    obj.legend.push(item.label);
                }
            }
            for(var m=0; m<obj.all_keys.length; m++) {
                var elem = obj.all_keys[m];
            }
            for(var n=0; n<data.length; n++) {
                var el = data[n].data;
                var arr = JSON.parse(JSON.stringify(obj.legend));
                for(var k=0; k<el.length; k++) {
                    arr.splice(arr.indexOf(el[k].label), 1)
                }
                for(var q=0; q<arr.length; q++) {
                    el.push({
                        label: arr[q],
                        value: 0
                    })
                }
                el.sort(attrSort('label'));

                data[n].data = el.map(function(elem, index) {
                    return elem['value'];
                })
            }
            var series = [];
            for(var x=0; x<obj.legend.length; x++) {
                var series_data = [];
                for(var y=0; y<data.length; y++) {
                    series_data.push(data[y].data[x])
                }
                series.push({
                    name: obj.legend[x],
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: bar_colors[x]
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: function(val) {
                                val = val.data*100;
                                if(val < Math.ceil(val) && val> Math.floor(val)) {
                                    val = val.toFixed(2);
                                }else {
                                    val = val.toFixed(0);
                                }
                                if(val < 6) {
                                    return ''
                                }
                                return val+"%"
                            }
                        }
                    },
                    data: series_data
                })
            }
            series.push({
                name: "score",
                type: 'line',
                data: obj.score,
                yAxisIndex: 1,
                label: {
                    normal: {
                        show: true,
                        color: "green",
                        position: "right",
                        textStyle: {
                            color: "#fff",
                            fontSize: 14
                        }
                    },
                },
                itemStyle: {
                    normal: {
                        color: "#0F75AC"
                    }
                },
                lineStyle: {
                    normal: {
                        color: "#0F75AC"
                    }
                }
            });
            obj.legend.push("score");
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(p) {
                        var str = p[0].name;
                        p.forEach(function(elem, index) {
                            str += '<br/><span '+
                                'style="display:inline-block;width:10px; height:10px;border-radius:50%;background-color:'+bar_colors[index]+';vertical-align: middle;">' +
                                '</span>&nbsp;'+elem.seriesName+':&nbsp;&nbsp;'+percent(elem.data);
                        });
                        return str;
                    }
                },
                grid: {
                    left: 20,
                    right: 20,
                    bottom: 10,
                    top: 40,
                    containLabel: true
                },
                legend: {
                    type: 'scroll',
                    left: 20,
                    top: 10,
                    data: obj.legend
                },
                toolbox: {
                    right: 20,
                    top: 10,
                    feature: {
                        saveAsImage: {},
                        dataView: {
                            show: true
                        }
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        max: 'dataMax',
                        axisLabel: {
                            formatter: function(val) {
                                return val*100+"%";
                            }
                        }
                    },
                    {
                        type: 'value',
                        yAxisIndex: 1,
                    }
                ],
                xAxis: {
                    data: obj.xAxis
                },
                series: series
            });
            window.addEventListener("resize", chart.resize)
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error: %s, %s', xhr.status, textStatus);
        }
    })
    return chart
}
/**
 * 柱状图   数据多少均可
 * @param id
 * @param url
 * @param barWidth
 * @param barGap
 */
chartObj.sort_bar = function sort_bar (id, url,seriesname,barWidth,barGap) {
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var options = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 10,
                    top: 10,
                    containLabel: true
                },
                toolbox: {
                    right: 20,
                    top: 10,
                    feature: {
                        saveAsImage: {},
                        dataView: {
                            show: true
                        }
                    },
                },
                xAxis : {
                    show: false,
                    type : 'value',
                    boundaryGap: [0,'5%']
                },
                yAxis : {
                    type : 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                textStyle: {
                    color:  "#1c83c6"
                },
                series : [
                    {
                        name: seriesname,
                        type:'bar',
                        barWidth: barWidth,
                        barGap: barGap,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    color: "#1c83c6"
                                },
                                position: 'right'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#23b7e5"
                            }
                        }
                    }
                ]
            }
            var arr1, inner_height, chart, y_data, data, option;
            var outer_height = $("#"+id).height();
            var wrap_div_height = outer_height -30;
            if(res.length > 10) {
                arr1 = res.slice(0,10);
                $("#"+id).html('<div style="height: '+wrap_div_height+'px;"><div id="'+id+'_inner"></div></div><button class="inner_flag">more...</button>')
                inner_height = (parseInt(barWidth)+parseInt(barGap))*arr1.length + parseInt(20)
                $("#"+id+"_inner").css({height: inner_height})
                chart = echarts.init(document.getElementById(id+"_inner"))
                chart.setOption(options)
                y_data = [],
                    data = []
                arr1.forEach(function(elem, index) {
                    y_data.push(elem.label)
                    data.push(elem.value)
                })

                // 点击more
                $(document).on('click','.inner_flag', function() {
                    if($(this).html()==='more...') {
                        $("#"+id).html('<div style="height: '+wrap_div_height+'px; overflow-y: scroll;"><div id="'+id+'_inner"></div></div><button class="inner_flag">hide...</button>')
                        inner_height = (parseInt(barWidth)+parseInt(barGap))*res.length + parseInt(20)
                        $("#"+id+"_inner").css({height: inner_height})
                        chart = echarts.init(document.getElementById(id+"_inner"))
                        chart.setOption(options)
                        y_data = [],
                            data = []
                        res.forEach(function(elem, index) {
                            y_data.push(elem.label)
                            data.push(elem.value)
                        })
                        option = {
                            yAxis: {
                                data: y_data
                            },
                            series: [
                                {
                                    data: data
                                }
                            ]
                        }
                        chart.setOption(option)
                        window.addEventListener("resize", chart.resize)
                        return chart
                    }else if($(this).html()==='hide...') {
                        $("#"+id).html('<div style="height:  '+wrap_div_height+'px;"><div id="'+id+'_inner"></div></div><button class="inner_flag">more...</button>')
                        inner_height = (parseInt(barWidth)+parseInt(barGap))*arr1.length + parseInt(20)
                        $("#"+id+"_inner").css({height: inner_height})
                        chart = echarts.init(document.getElementById(id+"_inner"))
                        chart.setOption(options)
                        y_data = [],
                            data = []
                        arr1.forEach(function(elem, index) {
                            y_data.push(elem.label)
                            data.push(elem.value)
                        })
                        option = {
                            yAxis: {
                                data: y_data
                            },
                            series: [
                                {
                                    data: data
                                }
                            ]
                        }
                        chart.setOption(option)
                        window.addEventListener("resize", chart.resize)
                        return chart
                    }
                })
            }else {
                chart = echarts.init(document.getElementById(id))
                chart.setOption(options)
                y_data = [],
                    data = []
                res.forEach(function(elem, index) {
                    y_data.push(elem.label)
                    data.push(elem.value)
                })
            }
            option = {
                yAxis: {
                    data: y_data
                },
                series: [
                    {
                        data: data
                    }
                ]
            }
            chart.setOption(option)
            window.addEventListener("resize", chart.resize)
            return chart
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })

}
/**
 * 漏斗图   预期与实际值
 * @param id
 * @param url
 * @returns {*}
 */
chartObj.funnel = function funnel(id, url) {
    var chart = echarts.init(document.getElementById(id))
    var options = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
            type: 'scroll',
            left: 'left',
            top: 10
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        series: [
            {
                name: '预期',
                type: 'funnel',
                left: '10%',
                width: '70%',
                right: '20%',
                label: {
                    normal: {
                        formatter: '{b}预期'
                    },
                    emphasis: {
                        position:'inside',
                        formatter: '{b}预期: {c}%'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.7
                    }
                }
            },
            {
                name: '实际',
                type: 'funnel',
                left: '10%',
                width: '70%',
                right: '20%',
                maxSize: '70%',
                label: {
                    normal: {
                        position: 'inside',
                        formatter: '{c}%',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        position:'inside',
                        formatter: '{b}实际: {c}%'
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.5,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                }
            }
        ]
    }
    chart.setOption(options)
    chart.showLoading()
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var legend_arr = []
            res.expect.forEach(function(elem, index) {
                legend_arr.push(elem.label)
                elem.name = elem.label
                delete elem.label
            })
            res.fact.forEach(function(elem, index) {
                elem.name = elem.label
                delete elem.label
            })
            var option = {
                legend: {
                    data: legend_arr
                },
                series: [
                    {
                        data: res.expect
                    },
                    {
                        data: res.fact
                    }
                ]
            }
            chart.setOption(option)
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })
    chart.hideLoading()
    window.addEventListener("resize", chart.resize)
    return chart
}
/**
 * 雷达图
 * @param id
 * @param url
 */
chartObj.radar = function radar(id,url) {
    var chart = echarts.init(document.getElementById(id));
    var option = {
        color: ["#C23531","#2F4554","#61A0A8", "blueviolet","#91C7AE","#CA8622","#546570","#23B7E5","green","chartreuse","orchid"],
        tooltip: {
            trigger: 'axis',
        },

        radar: [
            {
                center: ['50%','50%'],
                radius: "60%"
            }
        ],
        series: [
            {
                type: 'radar',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    };
    chart.setOption(option)
    chart.showLoading()
    var response = null, indicatorData =[];
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var legendData = [],
                selectData = {},
                data = [];
            response = res,
                $.each(res.decision, function(index, elem) {
                    indicatorData.push({
                        text: elem[0],
                        max: maxValueformDomain(res.domain[0])
                    })
                })

            for(var i=0; i<res.domain.length; i++) {
                var domain = res.domain[i]
                legendData.push(domain.label)
                i ==0 ? selectData[domain.label] = true : selectData[domain.label] = false
                var obj = {}
                obj.name = domain.label
                obj.value = []
                for(var j=0;j<indicatorData.length;j++) {
                    for(var k=0; k<domain.value.length; k++) {
                        if(indicatorData[j].text ==domain.value[k].label ) {
                            obj.value.push(domain.value[k].value)
                            break;
                        }
                    }
                }
                data.push(obj)
            }

            chart.setOption({
                legend: {
                    type: 'scroll',
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 30,
                    data: legendData,
                    selected: selectData
                },
                radar: [
                    {
                        indicator: indicatorData
                    }
                ],
                series: [
                    {
                        data: data
                    }
                ]
            })
            chart.hideLoading()
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })


    chart.on('legendselectchanged', function(params) {
        var selected = [], maxArr= [];
        for(var key in params.selected) {
            if(params.selected[key]) {
                selected.push(key)
            }
        }
        var selectedDetail = response.domain.filter(function(elem, index) {
            for(var i = 0; i<selected.length; i++) {
                if(elem.label == selected[i]) {
                    return elem
                }
            }
        })
        selectedDetail.forEach(function(elem, index) {
            maxArr.push(maxValueformDomain(elem))
        })
        maxArr.sort(function(a, b) {return b-a})
        indicatorData.forEach(function(elem, index) {
            elem.max = maxArr[0]
        })
        chart.setOption({
            radar: [
                {
                    indicator: indicatorData
                }
            ],
        })
    })
    window.addEventListener("resize", chart.resize)
}
/**
 * 全球地图
 * @param id
 * @param url
 * @param seriesname
 * @returns {*}
 */
chartObj.global_map = function global_map(id, url, seriesname) {
    var chart = echarts.init(document.getElementById(id))
    var options = {
        tooltip: {
            trigger: 'item',
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        visualMap: {

            text:['High','Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        series: [
            {
                name: seriesname,
                type: 'map',
                mapType: 'world',
                roam: false,
                itemStyle: {
                    emphasis: {label: {show: true}}
                }
            }
        ]
    }
    chart.setOption(options)
    chart.showLoading()

    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var arr = []
            res.forEach(function(elem, index) {
                arr.push(elem.value)
                elem.name = elem.label
                delete elem.label
            })
            arr.sort(function(a, b) {
                return a-b
            })
            var option = {
                visualMap: {
                    min: arr[0],
                    max: arr[arr.length-1],
                },
                series: [
                    {
                        data: res
                    }
                ]
            }
            chart.setOption(option)

        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('error:%s, %s',xhr.status, errorThrown);
        }
    })
    chart.hideLoading()
    window.addEventListener("resize", chart.resize)
    return chart
}
/**
 * 双线图
 * @param id
 * @param url1
 * @param url2
 * @param seriesname1
 * @param seriesname2
 * @returns {*}
 */
chartObj.doubleLine = function doubleLine(id, url1,url2,seriesname1,seriesname2) {
    var chart = echarts.init(document.getElementById(id));
    var options = {
        legend: {
            type: 'plain',
            data:[
                {
                    name: seriesname1
                },
                {
                    name: seriesname2
                }
            ],
            left: 20,
            top: 10
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 30,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                show: true,
                rotate: 50,
                interval:'auto',
                textStyle: {
                    color: 'rgba(15, 117, 172, 1)'
                }
            },
            axisTick: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            show:false,
            type: 'value',
            boundaryGap: false
        },
        series: [
            {
                name: seriesname1,
                smooth: true,
                type:'line',
                lineStyle: {
                    normal: {
                        color: 'rgba(15, 117, 172, 1)'
                    }
                },
                itemStyle: {
                    normal: {
                        color:'rgba(15, 117, 172, 1)',
                        label: {
                            show: true,
                            position:'top',
                            textStyle: {
                                color: '#800080'
                            },
                            formatter: function(p){
                                return p.value >0 ? (p.value): ''
                            }
                        }
                    }
                },
            },
            {
                name: seriesname2,
                smooth: true,
                type:'line',
                lineStyle: {
                    normal: {
                        color: "#C23531"
                    }
                },
                itemStyle: {
                    normal: {
                        color:'#C23531',
                        label: {
                            show: true,
                            position:'top',
                            textStyle: {
                                color: '#800080'
                            },
                            formatter: function(p){
                                return p.value >0 ? (p.value): ''
                            }
                        }
                    }
                },
            }
        ]
    }
    chart.setOption(options)
    chart.showLoading()
    var req1 = false,
        req2 = false,
        xlabel = [],
        label = [],
        count1 = [],
        count2 = [];
    $.ajax({
        url: url1,
        type: "get",
        dataType:"json",
        success:function(d){
            $.each(d, function(i,p){
                label[i] = p['label'];
                count1[i]= p['value'];
            });

            xlabel = label.map(function(elem, index) {
                return getWeekNumber(elem.slice(0,4), elem.slice(5,7), elem.slice(8,10))+" week"
            })
            req1 = true
            if(req1 && req2) {
                chart.setOption({
                    xAxis: {
                        data: xlabel
                    },
                    dataZoom: [{
                        type: 'inside',
                        startValue: xlabel[xlabel.length-12],
                        endValue: xlabel[xlabel.length-1]
                    }, {
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    tooltip: {
                        show: true,
                        confine: true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    series: [
                        {
                            data: count1
                        },
                        {
                            data: count2
                        }
                    ]
                })
                chart.hideLoading()
                window.addEventListener("resize", chart.resize)
            }
        }
    })
    $.ajax({
        url: url2,
        type: "get",
        dataType:"json",
        success:function(d){
            $.each(d, function(i,p){
                count2[i]= p['value'];
            });
            req2 = true
            if(req1 && req2) {
                chart.setOption({
                    xAxis: {
                        data: xlabel
                    },
                    dataZoom: [{
                        type: 'inside',
                        startValue: xlabel[xlabel.length-12],
                        endValue: xlabel[xlabel.length-1]
                    }, {
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    tooltip: {
                        show: true,
                        confine: true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    series: [
                        {
                            data: count1
                        },
                        {
                            data: count2
                        }
                    ]
                })
                chart.hideLoading()
                window.addEventListener("resize", chart.resize)
            }
        }
    })
    return chart
}

chartObj.relation = function relation(id, url) {
    var chart = echarts.init(document.getElementById(id));
    var option = {
        grid: {
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
            containLabel: true
        },
        toolbox: {
            right: 20,
            top: 10,
            feature: {
                saveAsImage: {},
                dataView: {
                    show: true
                }
            },
        },

        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}',
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            edgeLabel: {
                normal: {
                    position: 'right',
                    formatter: '{b}',
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            silent:false,//是否响应点击事件，为false的时候就是响应
            draggable: true,
            force: {
                repulsion: 100,
                gravity: 0.0001,
                edgeLength: 70
            },
            nodeScaleRatio: 0.2,
            categories: [],


        }]
    }
    chart.setOption(option)
    chart.showLoading()
    var category_SymbolSize = function (num) {
        var result = 0
        switch(parseInt(num)) {
            case 0:
                result = 50
                break;
            case 1:
                result = 40
                break;
            default:
                result = 30
                break;
        }
        return result
    }
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        ifModified: true,
        success: function(res, textStatus) {
            var data = [], links = [], categories= [];
            res.forEach(function(elem, index) {
                data.push({
                    name: elem.label,
                    value: elem.value,
                    x: null,
                    y: null,
                    symbolSize: category_SymbolSize(elem.category),
                    category: 1,
                    itemStyle: {
                        normal: {
                            color: 'green'
                        }
                    },
                    label: {
                        normal: {
                            show : true,
                            position: 'inside',
                            formatter: function(a) {
                                var arr = a.name.split('_')
                                return arr[arr.length -1]
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: 12,
                                fontFamily: 'SimHei'
                            }
                        }
                    }
                })
                if(elem.source === "") {
                    links.push({
                        "source": '',"target": elem.label
                    })
                }else {
                    links.push({
                        "source": res[elem.source].label,"target": elem.label
                    })
                }
            })


            var options = {
                tooltip: {
                    formatter: function(a) {
                        var arr = a.name.split('_')
                        return "<span style='display:inline-block;width:10px; height:10px;border-radius:50%;background-color:rgba(15, 117, 172,1);vertical-align: middle;'></span> "+ arr[arr.length -1] +" : "+a.data.value;
                    },
                },
                series: [{
                    data: data,
                    links: links
                }]
            }
            chart.setOption(options)
            chart.hideLoading()

            window.addEventListener('resize', chart.resize)
            return chart
        }
    })
}