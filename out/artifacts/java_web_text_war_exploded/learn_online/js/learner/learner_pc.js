/**
 * Created by new bee on 2017/7/21.
 */
$(document).ready(function () {
    //获取数据
    var all_data=JSON.parse(window.name);
    var data_get=JSON.parse(window.name).learner_pc;

    //初始化按钮
    var discuss=$("#message_item");
    //初始化设置
    set_left();
    set_right();
    init_view();
    set_fun();
    /*
    * 初始化的页面
    * */
    function init_view() {
        //模拟点击
        discuss.trigger("click");
    }
    /*
    * 设置右边栏
    * */
    function set_right() {
        var div_right=$("#right");
        //空闲时间段
        $("#time_item").on("click",function () {
            div_right.empty();
            time();
        });
        //学习报表选项
        $("#chart_item").on("click",function () {
            div_right.empty();
            hchart();
        });
        //消息选项
        discuss.on("click",function () {
            div_right.empty();
            discussFrame();
        });
        //观看记录
        $("#record_item").on("click",function () {
            div_right.empty();
            video_record();
        });
        //课程上传
        $("#upload_item").on("click",function () {
            div_right.empty();
            course_upload();
        });
        /*
        * 空闲时间段
        * */
        function time() {
            var i=0;
            div_right.append(
                '<div id="chart_title">空闲时段</div>' +
                '<div id="new_time">新建空闲时间段</div>'+
                '<div id="time_contain"></div>'
            );
            $("#new_time").on("click",function () {
                add_item(i+"a");
                $('#timeb'+i+"a").clockTimePicker({});
                $('#timeo'+i+"a").clockTimePicker({});

                $("#begin"+i+"a").one("click",function () {
                    $(this).next().children().css({display:"inline-block"});
                    $(this).css({display:"none"});
                });
                $("#over"+i+"a").one("click",function () {
                    $(this).next().children().css({display:"inline-block"});
                    $(this).css({display:"none"});
                });
                $("#sure"+i+"a").one("click",function () {
                    var a=$(this).siblings(".clock-timepicker").children();
                    $(this).siblings(".begin").css({display:"block"}).text($(a[0]).val());
                    $(this).siblings(".over").css({display:"block"}).text($(a[2]).val());
                    $(this).text("删除");
                    a.css({display:"none"});
                    $(this).one("click",function () {
                        $(this).parent().remove();
                    });
                });
                i++;
            });

            for(var x=0;x<data_get.time.length;x++){
                add_item(x+"d");
                $("#begin"+x+"d").text(data_get.time[x].begin);
                $("#over"+x+"d").text(data_get.time[x].over);
                var sure=$("#sure"+x+"d");
                sure.text("删除");
                sure.one("click",function () {
                    $(this).parent().remove();
                });
            }

            function add_item(y) {
                $("#time_contain").append(
                    '<div class="time_item">' +
                    '<div class="begin" id="begin'+y+'">开始</div>' +
                    '<input class="time time2" type="text" id="timeb'+y+'" value="00:00"/>' +
                    '<div class="line"></div>' +
                    '<div class="over" id="over'+y+'">结束</div>' +
                    '<input class="time time2" type="text" id="timeo'+y+'" value="00:00"/>' +
                    '<div class="sure" id="sure'+y+'">确定</div>' +
                    '</div>'
                );
            }
        }
        /*
        * 学习报表
        * */
        function hchart() {
            var pie_data=[];
            var ring_data=[];
            set_view();
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

            function set_view() {
                $("#right").append(
                    '<div id="chart_title">学习报表</div>'+
                    '<div id="chart">'+
                    '<div id="report_name">' +
                    '学习足迹' +
                    '</div>' +
                    '<div id="container1">' +
                    '<div class="report_form_line1">' +
                    '</div>' +
                    '</div>' +
                    '<div id="container2" style="min-width:400px;height:250px;margin-top:20px"></div>'+
                    '<div id="container3" style="min-width:400px;height:250px;margin-top:20px"></div>'+
                    '</div>'
                );
            }

            function set_pie() {
                var name=data_get.chart.pie.name;
                var value=data_get.chart.pie.value;
                for(var i=0;i<name.length;i++){
                    pie_data[i]=[name[i],parseInt(value[i])];
                }
            }

            function set_ring() {
                var name=data_get.chart.ring.name;
                var value=data_get.chart.ring.value;
                for(var i=0;i<value.length;i++){
                    ring_data[i]=[name[i],parseInt(value[i])];
                }
            }

            function set_footprint() {
                var time=data_get.chart.footprint.time;
                var name=data_get.chart.footprint.name;
                var chapter=data_get.chart.footprint.chapter;
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
        }
        /*
        *评论
        * */
        function discussFrame() {
            set_view();
            //模拟数据
            setMyDiscuss($("#chart"),data_get.discuss);
            /*
            * 设置初始页面
            * */
            function set_view() {
                $("#right").append(
                    '<div id="chart_title">通知管理</div>'+
                    '<div id="chart">'+
                    '</div>'
                );
            }
            /*
             * 生成我的评论
             *
             * */
            function setMyDiscuss(container,data) {
                //内容文字处理
                //命名最好不要用特殊符号，如.,会造成难已发现的错误。
                for(var i=0;i<data.length;i++){
                    // add_discuss();
                    moreComments();
                }
                notice(data,0);
                add_discuss(data,1);
                /*
                * 添加通知
                * */
                function notice(data,i) {
                    container.append(
                      '<div class="content_discuss_item">' +
                      '<img src="'+data[i].img+'" class="discuss_item_img">' +
                      '<div class="discuss_item_content">' +
                      '<div class="discuss_item_content_line1 line">' +
                      '<div class="content_line1_name">' + data[i].name +'</div>' +
                      '<div class="content_line1_time">'+ data[i].time +'</div>' +
                      '</div>' +
                      '<div class="discuss_item_content_line2 line" id="contentnewbee1">' + data[i].content +'</div>' +
                      '</div>' +
                      '</div>'+
                      '<div id="notice_title">评论管理</div>'
                    );
                }
                /*
                 * 添加评论
                 * */
                function add_discuss(data,i) {
                    container.append(
                        "<div class='content_discuss_item'>" +
                        "<img src=" + data[i].img + " class='discuss_item_img'/>" +
                        "<div class='discuss_item_content'>" +
                        "<div class='discuss_item_content_line1 line'>" +
                        "<div class='content_line1_name'>" + data[i].name + "</div>" +
                        "<div class='content_line1_time'>" + data[i].time + "</div>" +
                        "</div>" +
                        "<div class='discuss_item_content_line2 line' id='content" + data[i].name + "'>" +
                        data[i].content+
                        "</div>" +
                        "<div class='discuss_item_content_line3 line'>" +
                        "<img src='../image/course/更多评论.png' class='line_img' id='comments" + data[i].name + "'/>" +
                        "<div class='line_data'>" + data[i].comments + "</div>" +
                        "<img src='../image/discuss/源主题.png' class='line_img sourse"+data[i].name+"' style=width:16px;height:16px;'>" +
                        "<div class='line_data sourse"+data[i].name+"'>源主题</div>"+
                        "</div>" +
                        "</div>" +
                        "</div>"
                    );
                }
                /*
                 * 获取更多的评论
                 * */
                function moreComments() {
                    $("#comments"+data[i].name).on("click",function () {
                        // var data_discuss=ajax_post("http", {"discuss":$(this).attr("id")});
                        var data_discuss={
                            //第一个是我的评论
                            my:[{
                                img:"../image/common/备用头像.png",
                                name:"newbee",
                                time:"2017/1/1-20:23",
                                comments:"3",
                                supports:"4",
                                opposes:"5",
                                content:"这是一个评论的内容"
                            }],
                            other:[
                                {
                                    img:"../image/common/备用头像.png",
                                    name:"newbee1",
                                    time:"2017/1/1-20:23",
                                    comments:"3",
                                    supports:"4",
                                    opposes:"5",
                                    content:"这是一个评论的内容"
                                },
                                {
                                    img:"../image/common/备用头像.png",
                                    name:"newbee2",
                                    time:"2017/1/1-20:23",
                                    comments:"3",
                                    supports:"4",
                                    opposes:"5",
                                    content:"这是一个评论的内容"
                                }
                            ]

                        };
                        all_data.discuss_pc=data_discuss;
                        window.name=JSON.stringify(all_data);
                        window.location.href="discuss_pc.html";
                    });
                    //源主题
                    $(".sourse"+data[i].name).on("click",function () {
                        var data_course={
                            //主页接口
                            main:{
                                video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                                uploader:"newbee",
                                name:"课程名称",
                                chapter:"章节名称",
                                has_watch:"00:00:10",
                                create_time:"2017年12月12日",
                                score:"4",
                                video_play_times:"30",
                                video_download_times:"20",
                                instroctor:"《银魂》分贝咆哮完全不在话下。超拼超敬业的态度和毫无违和的“神演技”获得观众的一致好评，直呼：“大家为《银魂》真的豁出去了”而影片里处处存在的“官方神吐槽”也成为粉丝们拍案叫绝的惊喜：“开头的OP简直不要脸，各种官方吐槽2333”“各种角色梗和jump梗层出不穷，这电影绝对是我看过玩梗最厉害的一部了！",
                                download_sourse:[
                                    {
                                        link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                                        type:"视频文件"
                                    },
                                    {
                                        link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/ppt.pdf",
                                        type:"pdf文件"
                                    }
                                ]
                            },
                            //目录接口
                            chapter: {
                                info:
                                    [
                                        ["第一章","1-入门 (8:00:00)","1-安装 (8:00:00)"],
                                        ["第二章","2-进阶 (8:00:00)"]
                                    ],
                                data:
                                    [
                                        [
                                            {
                                                video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                                video_play_times:"30",
                                                video_download_times:"50"
                                            },
                                            {
                                                video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                                video_play_times:"40",
                                                video_download_times:"60"
                                            }
                                        ],
                                        [
                                            {
                                                video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                                video_play_times:"50",
                                                video_download_times:"70"
                                            }
                                        ]

                                    ]
                            },
                            //讨论
                            discusses:[
                                {
                                    img:"../image/common/备用头像.png",
                                    name:"newbee1",
                                    time:"2017/1/1-20:23",
                                    comments:"3",
                                    supports:"4",
                                    opposes:"5",
                                    content:"这是一个评论的内容"
                                }
                            ],
                            configure:{discuss:"1"},
                            //用户信息
                            user:data_get.user

                        };
                        // data_course_get=ajax_post("http", {"course_discuss":$(this).attr("id")});
                        all_data.course_pc=data_course;
                        window.name=JSON.stringify(all_data);
                        window.location.href="course_pc.html";
                    });
                }
            }
        }
        /*
        * 观看记录
        * */
        function video_record() {
            var record_data=data_get.record;
            div_right.append(
                '<div id="chart_title">观看记录</div>'+
                '<div id="record_contain"></div>'
            );
            for(var i=0;i<record_data.length;i++){
                $("#record_contain").append(
                    '<div class="record_item">' +
                    '<div class="info">' +
                    '<div class="name">' +
                    record_data[i].name +
                    '</div>' +
                    '<div class="chapter">' +
                    record_data[i].chapter+
                    '</div>' +
                    '<div class="watch_time">' +
                    record_data[i].time +
                    '</div>' +
                    '</div>' +
                    '<div class="video_time">' +
                    record_data[i].has_watch+
                    '</div>' +
                    '<div class="keep_watch" id="record'+i+'" data-url="'+ record_data[i].keep_watch+'" data-i="'+i+'">' +
                    '继续观看'+
                    '</div>' +
                    '</div>'
                );
            //继续观看跳转
                $("#record"+i).on("click",function () {
                    //获取该章节的视频的链接,下载数,观看数
                    var i=parseInt($(this).data("i"));
                    // var data=ajax_post("http",{
                    //     course:{
                    //         name:record_data[i].name,
                    //         chapter:record_data[i].chapter,
                    //     }
                    // });
                    //data.main.has_watch=time_change(null,data.main.has_watch),
                    //模拟数据
                    var data_course={
                        //主页接口
                        main:{
                            video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                            name:"PHP数据库",
                            chapter:"1-入门(00:12:17)",
                            has_watch:"00:10:00",
                            uploader:"newbee",
                            create_time:"2017年12月12日",
                            score:"4",
                            video_play_times:"30",
                            video_download_times:"20",
                            instroctor:"讲了该如何使用数据库",
                            download_sourse:[
                                {
                                    link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/code.text",
                                    type:"源码文件"
                                },
                                {
                                    link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/ppt.pdf",
                                    type:"pdf文件"
                                }
                            ]
                        },
                        //目录接口
                        chapter: {
                            info:
                                [
                                    ["第一章","1-入门 (00:12:17)","1-安装 (8:00:00)"],
                                    ["第二章","2-进阶 (00:12:17)"]
                                ],
                            data:
                                [
                                    [
                                        {
                                            video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                            video_play_times:"30",
                                            video_download_times:"50"
                                        },
                                        {
                                            video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                            video_play_times:"40",
                                            video_download_times:"60"
                                        }
                                    ],
                                    [
                                        {
                                            video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                            video_play_times:"50",
                                            video_download_times:"70"
                                        }
                                    ]

                                ]
                        },
                        //讨论
                        discusses:[
                            {
                                img:"../image/common/备用头像.png",
                                name:"newbee",
                                time:"2017/1/1-20:23",
                                comments:"3",
                                supports:"4",
                                opposes:"5",
                                content:"这是一个评论的内容"
                            },
                            {
                                img:"../image/common/备用头像.png",
                                name:"newbee1",
                                time:"2017/1/1-20:23",
                                comments:"3",
                                supports:"4",
                                opposes:"5",
                                content:"这是一个评论的内容"
                            },
                            {
                                img:"../image/common/备用头像.png",
                                name:"newbee2",
                                time:"2017/1/1-20:23",
                                comments:"3",
                                supports:"4",
                                opposes:"5",
                                content:"这是一个评论的内容"
                            }
                        ],
                        //用户信息
                        user:data_get.user,
                        //特殊也页面对的配置信息，如源主页
                        configure:{}
                    };
                    all_data.course_pc=data_course;
                    window.name=JSON.stringify(all_data);
                    window.location.href="course_pc.html";
                });
            }
        }
        /*
        * 课程上传
        * */
        function course_upload() {
            var z=0;
            set_view();
            function set_view() {
                $("#right").append(
                    '<div id="chart_title">课程上传</div>'+
                    '<div id="chart">'+
                    '<div class="upload_info" id="infos'+z+'">' +
                    '<label>'+
                    '<div>' +
                    '<img src="../image/learner/名称(1).png"/>'+
                    '</div>'+
                    '<input type="text" placeholder="课程名称">' +
                    '</label>' +
                    '<label>' +
                    '<div>' +
                    '<img src="../image/learner/类型.png"/>'+
                    '</div>'+
                    '<input type="text" placeholder="课程类型">' +
                    '</label>' +
                    '<label>'+
                    '<div>' +
                    '<img src="../image/learner/标签(1).png"/>'+
                    '</div>'+
                    '<input type="text" placeholder="课程标签">' +
                    '</label>' +
                    '<label id="text">'+
                    '<div>' +
                    '<img src="../image/learner/简%20介(1).png"/>'+
                    '</div>'+
                    '<textarea placeholder="课程简介"></textarea>' +
                    '</label>' +
                    '</div>' +
                    '<div class="upload_file" id="files'+z+'">' +
                    '<div class="file"><input type="file" id="file'+z+'" name="files[]" multiple data-id="'+z+'"/>' +
                    '选择文件 ' +
                    '</div>' +
                    '<div id="upload'+z+'" data-id="'+z+'" class="file">' +
                    '上传'+
                    '</div>' +
                    '<label>'+
                    '<div>'+
                    '<img src="../image/learner/章节.png"/>'+
                    '</div>'+
                    '<input type="text" placeholder="章节名称" id="chapter'+z+'">' +
                    '</label>'+
                    '</div>'+
                    '</div>'
                );
                set_fun();
                z++;
            }
            function set_fun() {
                var files=null;
                var arr=[];
                //上传文件的个数
                var filenames=0;
                //识别多次添加的上传传条
                var x=0;
                //循环函数的解除句柄
                var clear=null;
                //开始上传
                begin_upload();
                //文件选择
                $("#file"+z).on('change',handleFileSelect);
                function handleFileSelect(evt) {
                    files = evt.target.files;
                    var div_info=$("#files"+$(this).data('id'));
                    for (var i = 0, f; f = files[i]; i++) {
                        //防止i相同的识别
                        var y=x+''+i;
                        div_info.append(
                            "<div class='file_info' id='info"+y+"'>" +
                            "<div class='line1'>" +
                            "<div class='name' title='厚度清楚能读取'>" +
                            f.name+
                            "</div>" +
                            "<div class='size'>" +
                            size_change(f.size)+"M"+
                            "</div>" +
                            "<div class='cancel' id='cancel"+y+"' data-id='"+y+"'>" +
                            "cancel " +
                            "</div>"+
                            "</div>" +
                            "</div>"
                        );

                        $("#cancel"+y).on("click",function () {
                            var num=$(this).data("id");
                            $("#info"+num).remove();
                            arr.push(num);
                        });
                    }
                    x++;
                }
                /*
                * 开始上传
                * */
                function begin_upload() {
                   $("#upload"+z).on("click",function () {
                        if(!files||files.length<=0){
                           alert("请选择上传的文件");
                            return;
                        }
                       ajax_info($(this).data("id"));
                       setTimeout(function(){ajax_file($(this).data("id"));},2000);
                        $(".file").append(
                            "<div class='back'>" +
                            "上传中"+
                            "</div>"
                        );
                        //防止点击
                        $(".back").on("click",function (event) {
                            event.stopPropagation();
                        });
                       //删除取消
                       $(".cancel").text("上传中").off("click");
                    });

                }
                /*
                * 课程资料上传
                * */
                function ajax_info(id) {
                    var elemnets=$("#infos"+id).find("input");
                    var contents=[];
                    for(var i=0;i<elemnets.length;i++){
                        contents[i]=elemnets.eq(i).val();
                    }
                    var chapter=$("#chapter"+id).val();
                    // return {
                    //     CoursesEntity: {
                    //         courseName: contents[0],
                    //         courseBigCategory: contents[1],
                    //         courseDescribe: contents[2],
                    //         sourseLittleCategory: data_get.user.name,
                    //         UsersEntity: {
                    //             userId: 124
                    //         }
                    //     }
                    // };
                    ajax_post("http://demoservice.ngrok.cc/admin/uploadcourses2",{
                        CoursesEntity: {
                            courseName:contents[0],
                            courseBigCategory:contents[1],
                            courseDescribe:contents[2],
                            sourseLittleCategory:data_get.user.name,
                            UsersEntity:{userId:124}
                        }
                    });
                }
                /*
                *课程文件上传
                * */
                function ajax_file(id) {
                    $("#files"+id).append(
                        "<div class='line2'>" +
                        "<div class='progress_back'>" +
                        "<div class='progress'></div>" +
                        "</div>" +
                        "<div class='percent'>" +
                        "</div>" +
                        "已有0个文件上传完成"+
                        "</div>"
                    );
                    var formData = new FormData();
                    for(var i=0;i<files.length;i++){
                        var pf=true;
                        for(var x=0;x<arr.length;x++){
                            if(arr[x]==i){
                                pf=false;
                            }
                        }
                        if(!pf){
                            continue;
                        }
                        filenames++;
                        formData.append('file',files[i]);
                    }
                    $.ajax({
                        url: 'http://demoservice.ngrok.cc/admin/uploadcourses3',
                        type: 'POST',
                        cache: false,
                        // data: [formData,JSON.stringify(ajax_info(id))],
                        data:formData,
                        dataType:"json",
                        processData: false,
                        contentType:false
                    }).done(function(res) {}).fail(function(res) {});
                    // clear=setInterval(ajax_progress,1000);
                }
                /*
                * 上传的进度条
                * */
                function ajax_progress() {
                    $.ajax({
                        type: 'get',
                        url: "http://demoservice.ngrok.cc/file/upfile/progress",
                        // data: JSON.stringify({content:"content"}),
                        // data:filenames,
                        // cache: false,
                        // dataType:"json",
                        success:function (data) {
                            var num=parseInt(data["pItems"]);
                            $(".progress").css({"width":parseInt(data["value"])+"%"});
                            $(".percent").text("已有"+num+"文件上传完成");
                            // if($("#info"+(num-1)).length!=0){
                            //     $("#info"+(num-1)).remove();
                            // }
                            if(filenames<=num){
                                $(".cancel").text("上传完成").css({backgroundColor:"#8BC34A"});
                                $(".file").remove(".back");
                                $(".line2").remove();
                                clearInterval(clear);
                            }
                        }
                    });
                }
                /*
                * 单位转换
                * */
                function size_change(size) {
                    return Number(size/1024/1024).toFixed(1);
                    // return size;
                }
            }
        }
    }
    /*
    * 设置左边栏
    * */
    function set_left() {
        set_name();
        manage();
        function set_name() {
            var name_set=$("#name img");
            //获取原来的名字
            $("#name div").text(data_get.user.name);
            var name=$("#name");
            name_set.on("click",function (event) {
                name.empty();
                name.append(
                    "<input type='text' id='set_name'/>"+
                    "<div id='sure_set'>确定</div>"
                );
                $("#sure_set").on("click",function () {
                    var new_name=$(this).siblings("input").val();
                    name.empty();
                    name.append(
                        '<div>'+new_name+'</div>'+
                        '<img src="../image/learner/修改昵称.png">'
                    );
                    ajax_post("http",{user_name:data_get.user.name,new_name:new_name});
                    //重复添加事件，因为刚才被移除了
                    set_name();
                });
                event.stopPropagation();
            });

        }
        function manage() {
            if(data_get.user.name=="newbee"){
                $("#left").append(
                    '<div class="item" id="upload_item">' +
                    '<img src="../image/learner/上传(1).png">' +
                    '<div>课件上传</div>' +
                    '<img src="../image/common/前进.png">' +
                    '</div>'
                );
            }
        }
    }
    /*
    * 设置nav
    * */
    function set_fun() {
        //
        //搜索
        $("#img_search").on("click",function () {
            var content=$("#search").val().trim();
            if(!content){
                alert("请输入内容");
                return;
            }
            if(content.indexOf(" ")>=0){
                alert("请不要输入空格");
                return;
            }
            var r=ajax_post("http",{"course_name":content});
            if(r){
                window.name=JSON.stringify(r);
                window.location.href="course_pc.html";
            }else{
                alert("未有该课程");
                //模拟数据
                var data_course={
                    //主页接口
                    main:{
                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                        uploader:"newbee",
                        name:"课程名称",
                        chapter:"章节名称",
                        has_watch:"00:00:00",
                        create_time:"2017年12月12日",
                        score:"4",
                        video_play_times:"30",
                        video_download_times:"20",
                        instroctor:"《银魂》分贝咆哮完全不在话下。超拼超敬业的态度和毫无违和的“神演技”获得观众的一致好评，直呼：“大家为《银魂》真的豁出去了”而影片里处处存在的“官方神吐槽”也成为粉丝们拍案叫绝的惊喜：“开头的OP简直不要脸，各种官方吐槽2333”“各种角色梗和jump梗层出不穷，这电影绝对是我看过玩梗最厉害的一部了！",
                        download_sourse:[
                            {
                                link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                                type:"视频文件"
                            },
                            {
                                link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/ppt.pdf",
                                type:"pdf文件"
                            }
                        ]
                    },
                    //目录接口
                    chapter: {
                        info:
                            [
                                ["第一章","1-入门 (8:00:00)","1-安装 (8:00:00)"],
                                ["第二章","2-进阶 (8:00:00)"]
                            ],
                        data:
                            [
                                [
                                    {
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                        video_play_times:"30",
                                        video_download_times:"50"
                                    },
                                    {
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                        video_play_times:"40",
                                        video_download_times:"60"
                                    }
                                ],
                                [
                                    {
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/效果演示.mp4",
                                        video_play_times:"50",
                                        video_download_times:"70"
                                    }
                                ]

                            ]
                    },
                    //讨论
                    discusses:[
                        {
                            img:"../image/common/备用头像.png",
                            name:"newbee1",
                            time:"2017/1/1-20:23",
                            comments:"3",
                            supports:"4",
                            opposes:"5",
                            content:"这是一个评论的内容"
                        }
                    ],
                    //特殊也页面对的配置信息
                    configure:{},
                    //用户信息
                    user:data_get.user

                };
                all_data.course_pc=data_course;
                window.name=JSON.stringify(all_data);
                window.location.href="course_pc.html";
            }
        });
        //退出
        $("#quit").on("click",function () {
            ajax_post("http",{"user_name":data_get.user});
            window.location.href="login.html";
        });
        //课程页面
        $("#user_course").on("click",function () {
            // var data=ajax_post("http",{"user_course":user_name});
            // window.name=JSON.stringify(data);
            // window.location.href="courses_pc.html";

            //模拟数据
            var data_courses={
                user:data_get.user
            };
            all_data.courses_pc=data_courses;
            window.name=JSON.stringify(all_data);
            window.location.href="courses_pc.html";
        });
    }
});