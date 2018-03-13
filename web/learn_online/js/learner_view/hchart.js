/**
 * Created by new bee on 2017/7/10.
 */
$(function () {
    var link="http://192.168.1.135:8080/javaweb01/";
    var response_data;
    var pie_data=[];
    var ring_data=[];
    ajax_get_resourse(link+"course",{course:"record"});
    set_pie();
    set_ring();
    set_footprint();

    //饼状图
    $('#container2').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation:false
        },
        title: {
            x:20,
            align: 'left',
            text: "技术类型"
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.0f} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '技术类型',
            data: pie_data
        }]
    });

    //环装图
    $('#container3').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation:false
        },
        title: {
            x:20,
            align: 'left',
            text: '时间分布'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>/{point.percentage:.0f}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '时间分布',
            data: ring_data
        }]
    });

    function set_pie() {
        var name=response_data.pie_name;
        var value=response_data.pie_value;
        for(var i=0;i<name.length;i++){
            pie_data[i]=[name[i],parseInt(value[i])];
        }
    }

    function set_ring() {
        var name=response_data.ring_name;
        var value=response_data.ring_value;
        for(var i=0;i<value.length;i++){
            ring_data[i]=[name[i],parseInt(value[i])];
        }
    }
    
    function set_footprint() {
        var time=response_data.time_footprint;
        var name=response_data.name_footprint;
        var chapter=response_data.chapter_footprint;
        for(var i=0;i<time.length;i++){
            var div_cotent1=$("#container1");
            div_cotent1.append(
                "<div class='report_form_line1' id='line1_"+i+"'>" +
                "<div class='report_st'>" +
                "<img class='report_spot' src='../image/learner/点.png' id='point1_"+i+"'/>" +
                "<div class='report_time'>" +
                time[i]+
                "</div>"+
                "</div>" +
                "</div>"
            );

            var div_cotent2=$("#line1_"+i);
            var arr1=[];
            for(var x=0;x<name[i].length;x++) {
                div_cotent2.append(
                    "<div class='report_form_line2' id='line2_" + i+x + "'>" +
                    "<div class='report_st'>" +
                    "<img class='report_spot' src='../image/learner/点.png' id='point2_"+i+x+"'/>" +
                    "<div class='content_title'>" +
                    name[i][x] +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
                arr1[x]="#line2_"+i+x;

                var div_content3=$("#line2_"+i+x);
                var arr2=[];
                for(var y=0;y<chapter[x].length;y++) {
                    div_content3.append(
                        "<div class='content_chapter' id='line3_" + i+x+y + "'>" +
                        chapter[x][y] +
                        "</div>"
                    );
                   arr2[y]="#line3_"+i+x+y;

                }
                //添加事件
                var ponit2=$("#point2_"+i+x);
                ponit2.data("id",arr2);
                ponit2.on("click",function () {
                    for(var id=0;id<($(this).data("id")).length;id++){
                        $($(this).data("id")[id]).slideToggle();
                    }
                });
            }
            //添加事件
            var ponit1=$("#point1_"+i);
            ponit1.data("id",arr1);
            ponit1.on("click",function () {
                for(var id=0;id<($(this).data("id")).length;id++){
                    $($(this).data("id")[id]).slideToggle();
                }
            });
        }
    }

    function ajax_get_resourse(url,content_post) {
        $.ajax({
            // contentType:"charset=utf-8",
            type: 'post',
            url: url,
            // data: JSON.stringify({content:"content"}),
            data:content_post,
            cache: false,
            dataType:"json",
            async:false,
            success:function (data) {
                response_data=data;
            }
        });
    }
});
