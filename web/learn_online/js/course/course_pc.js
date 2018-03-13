/**
 * Created by new bee on 2017/5/24.
 */
$(document).ready(function() {
    //获取总资源
    var all_data=JSON.parse(window.name);
    var data_get=JSON.parse(window.name).course_pc;

    var div_content=$("div_content");
    //由jq对象转成dom对象
    var vedio=$("#video")[0];
    var div_introduce=$("#course_brief");
    var img_stars=$("#score_stars");

    var div_star_back=$("#star_back");
    var img_star_score_stars=$("#star_score_stars");
    var div_star_score_score=$("#star_score_score");
    var div_star_sure=$("#star_sure");

    var div_content_discuss=$("#content_discuss");
    //讨论页面的滑块
    var div_discuss=$("#discuss");
    set_resource();
    set_info();

    score_star();
    set_stars();
    play_times();
    set_slide();
    add_discuss();
    init_view();
    set_fun();

    /*
    * 初始页面
    * */
    function init_view() {
        if(data_get.configure.discuss){
            div_discuss.trigger("click");
        }
    }
    /*
    * 导航栏设置
    * */
    function set_info() {
        $("#course_name").text(data_get.main.name);
        $("#course_chapter").text(data_get.main.chapter);
        $("#user_img").attr({src:data_get.user.img});
    }
    /*
    * 设置内容滑块
    *
    * */
    function set_slide() {
        var div_introduction=$("#brief");
        var div_catalog=$("#catalog");
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            paginationType : 'custom',
            pagination: '.swiper-pagination',
            paginationCustomRender: function (swiper, current, total) {
                switch (current){
                    case 1:{
                        call_fun(div_introduction);
                        break;
                    }
                    case 2:{
                        call_fun(div_catalog);
                        break;
                    }
                    case 3:{
                        call_fun(div_discuss);
                        break;
                    }
                }

                function call_fun(obj){
                    obj.css({borderBottom:"2px solid #0B0C12"});
                    obj.siblings().css({borderBottom:"none"});
                }
            }
        });
        //点击滑动
        div_click();
        function div_click() {
            div_introduction.on("click",function () {
                call_fun(0);
            });
            div_catalog.on("click",function () {
                call_fun(1);
            });
            div_discuss.on("click",function () {
                call_fun(2);
            });
            function call_fun(num) {
                $(this).css({backgroundColor:"#555399"});
                $(this).siblings().css({backgroundColor:"#ffffff"});
                mySwiper.slideTo(num);
            }
        }
    }
    /*
    * 星星的设置
    *
    * */
    function score_star() {
        var starses=img_stars.find("img");
        for(var i=0;i<starses.length;i++) {
            starses.eq(i).on("click", function () {
                div_star_back.fadeIn();
                div_star_back.css({display:"flex"});
            });
        }
        div_star_sure.on("click",function () {
            div_star_back.fadeOut();
            ajax_post("http",{course_name:data_get.main.name,course_score:div_star_score_score.text()});
        });
    }
    /*
    * 我的评分
    * */
    function set_stars() {
        var starses=img_star_score_stars.find("img");
        for(var i=0;i<starses.length;i++){
            starses.eq(i).data("d",i);
            starses.eq(i).on("click",function () {
                var si=$(this).data("d");
                if($(this).hasClass("yellow")){
                    for(var r=4;r>=si;r--){
                        starses.eq(r).removeClass("yellow");
                        starses.eq(r).attr({"src":"../image/course/stars_gray.svg"});
                        div_star_score_score.text(si);
                    }
                }else{
                    for(var a=0;a<=si;a++){
                        starses.eq(a).addClass("yellow");
                        starses.eq(a).attr({"src":"../image/course/stars_yellow.svg"});
                        div_star_score_score.text(a+1);
                    }
                }
            });
        }
    }
    /*
     * 课程信息
     *
     * */
    function play_times() {
        vedio.addEventListener("play",function () {
            // if(this.currentTime==0){
            //     alert("ssss");
            // }

        });
        vedio.addEventListener("click",function () {
            //不能用$(this),因為得是js的dom對象
            if(vedio.paused){
                vedio.play();
            }else{
                vedio.pause();
            }
        });
    }
    /*
     * 设置资源
     * */
    function set_resource() {
        $("#name").text(data_get.main.name);
        $("#catalog_name").text(data_get.main.name);
        //获取主数据
        var main_data=data_get.main;
        //设置视频连接
        vedio.src=main_data.video_link;
        //设置视屏播放位置
        vedio.currentTime=time_change(null,main_data.has_watch);
        //上传者和时间连接
        var div_item_person=$("#uploader");
        var div_item_time=$("#usertime");
        div_item_person.text("上传者："+main_data.uploader);
        div_item_time.text(main_data.create_time+"建");
        //设置星星分数
        var score=parseInt(main_data.score);
        var div_score_text=$("#score_text");
        var starses = img_stars.find("img");
        for (var i = 0; i < score; i++) {
            starses.eq(i).attr({"src": "../image/course/stars_yellow.svg"});
        }
        //设置分数
        div_score_text.text(score);
        //视频观看次数
        var div_item_watch_times=$("#plays");
        div_item_watch_times.text(parseInt(main_data.video_play_times)+"播放");
        //视频下载次数
        var div_item_download_times=$("#downloads");
        div_item_download_times.text(parseInt(main_data.video_download_times)+"下载");
        //资源下载连接和在线查看
        var contain=$("#download_item");
        var sourse=main_data.download_sourse;
        for(var i=0;i<sourse.length;i++){
            contain.append(
                '<div class="down">' +
                '<img src="../image/course/课件下载.png">' +
                '<a download href="'+sourse[i].link+'">'+
                sourse[i].type +
                '</a>' +
                '<a id="online" href="'+sourse[i].link+'">在线查看</a>'+
                '</div>'
            );
        }
        //简介
        //文字换行处理
        // var reg=/&emsp/g;
        // var new_content=data_get.instroctor.replace(reg,'\n');
        div_introduce.text(main_data.instroctor);
        //目录呈现
        set_course_chapter();
        //讨论
        discussFrame();
    }
    /*
     * 课程目录设置
     *
     * */
    function set_course_chapter() {
        var chapter=data_get.chapter.info;
        var div_catalog_item=$("#catalog_item");
        for(var i =0;i<chapter.length;i++) {
            div_catalog_item.append(
                "<div class='catalog_item_line1' id='chapter"+i+'\''+ " data-id='chapter_c"+i+'\''+">" +
                "<img src='../image/course/节点.png'/>" +
                chapter[i][0] +
                "</div>"
            );
            for(var c=1;c<chapter[i].length;c++){
                div_catalog_item.append(
                    "<div class='catalog_item_line2 chapter_c"+i+'\''+">" +
                    "<div class='catalog_item_line_item'" +" id='course_"+i+c+'\''+" data-course='"+i+"-"+c+"\'"+">" +
                    "<img src='../image/course/尖角箭头-上.svg'/>" +
                    chapter[i][c]+
                    "</div>" +
                    "</div>"
                );
                //跳转到该课程页，只是视频页面改了而已

                $("#course_"+i+c).on("click",function () {
                    var attr=$(this).data("course").split("-");
                    var i=parseInt(attr[0]);
                    //第一个是章节信息，应该跳过
                    var c=parseInt(attr[1])-1;
                    data_get.main.chapter=data_get.chapter.info[i][c+1];
                    data_get.main.video_link=data_get.chapter.data[i][c].video_link;
                    data_get.main.video_play_times=data_get.chapter.data[i][c].video_play_times;
                    data_get.main.video_download_times=data_get.chapter.data[i][c].video_download_times;
                    all_data.course_pc=data_get;
                    window.name=JSON.stringify(all_data);
                    window.location.reload();
                    alert($(this).data("course"));
                });
            }

            $("#chapter"+i).on("click",function () {
                $("."+$(this).data("id")).slideToggle(200);
            });
        }
        //注意如果动态添加元素，一定要先添加，再获取
    }
    /*
     * 获取讨论
     *
     * */
    function discussFrame() {
        var divMyReply;
        setMyDiscuss($("#content_discuss"),data_get.discusses);
        /*
         * 生成我的评论
         *
         * */
        function setMyDiscuss(container,data) {
            //内容文字处理
            //命名最好不要用特殊符号，如.,会造成难已发现的错误。
            for(var i=0;i<data.length;i++){
                add_discuss();
                moreComments();
                reply();
                support_oppose("support","../image/course/已赞.png","../image/course/赞.png",data[i].supports);
                support_oppose("oppose","../image/course/已踩.png","../image/course/踩.png",data[i].opposes);
            }
            /*
             * 添加评论
             * */
            function add_discuss() {
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
                    "<div class='callBack' id='Reply" + data[i].name + "'>"+
                    "<img class='imgCallBack' src='../image/discuss/回复.png'>"+
                    "回复"+
                    "</div>"+
                    "<img src='../image/course/更多评论.png' class='line_img' id='comments" + data[i].name + "'/>" +
                    "<div class='line_data'>" + data[i].comments + "</div>" +
                    "<img class='line_img' src='../image/course/赞.png' id='support" + data[i].name + "'/>" +
                    "<div class='line_data' id='support_" + data[i].name + "'>" + data[i].supports + "</div>" +
                    "<img class='line_img' src='../image/course/踩.png' id='oppose" + data[i].name + "'/>" +
                    "<div class='line_data' id='oppose_" + data[i].name + "'>" + data[i].opposes + "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            }
            /*
             * 赞同和反对fun
             * */
            function support_oppose(id, src, src_,num) {
                //图片元素
                var e_img = $("#" + id + data[i].name);
                //将点赞数量与元素绑定
                e_img.data("num",num);
                //点赞数量文本
                e_img.data("text_id", id + "_" + data[i].name);
                //防止多次点赞
                e_img.data("jd", 0);
                e_img.on("click", function () {
                    var type = id;
                    var discuss_name =$(this).data("text_id").split("_")[1];
                    var user_name=data_get.user.name;
                    var score=e_img.data("jd");
                    if (!$(this).data("jd")) {
                        var num = parseInt($(this).data("num")) + 1;
                        //键值任何变量都会变成字符类型。需要用eval做响应的转化。注意转换格式
                        //发送数据
                        // var obj = eval("({" + "'" + send_id + "'" + ":" + "'" + num + "'" + "})");
                        var obj={
                            type:type,
                            score:score,
                            discuss_name:discuss_name,
                            user_name:user_name
                        };
                        ajax_post("http",obj);
                        //本地点赞数变化
                        $("#" + $(this).data("text_id")).text(num);
                        $(this).data("jd",1);
                        //图标变化
                        $(this).attr({"src": src});
                        //取消点赞
                    } else {
                        // var send_id_ = $(this).data("text_id");
                        var num_r = parseInt($(this).data("num"));
                        $("#" + $(this).data("text_id")).text(num_r);
                        // var obj_ = eval("({" + "'" + send_id_ + "'" + ":" + "'" + num_r + "'" + "})");
                        var obj_={
                            type:type,
                            score:score,
                            discuss_name:discuss_name,
                            user_name:user_name
                        };
                        ajax_post("http",obj_ );
                        $(this).attr({"src": src_});
                        $(this).data("jd", 0);
                    }
                });
            }
            /*
             * 获取更多的评论
             * */
            function moreComments() {
                $("#comments"+data[i].name).on("click",function () {
                    // var data_discuss=ajax_post("http", {"discuss_name":$(this).attr("id")});
                    //模拟数据
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
            }
            /*
             * 回复
             * */
            function reply() {
                $("#Reply"+data[i].name).on("click",function () {
                    divMyReply=$(this);
                    replySure();
                });
            }
        }
        /*
         * 回复确定按钮
         * */
        function replySure() {
            var re=[];
            re=u_discuss_pop();
            re[0].on("click", function () {
                var content = $("#discuss_publish").val();
                if (!content) {
                    layer.msg('请输入内容');
                    return;
                }
                layer.close(re[1]);
                divMyReply.parent().siblings(".discuss_item_content_line2").after(
                    "<div class='my_reply'>" + content + "</div>"
                );
                ajax_post("http", {
                    user_name: data_get.user.name,
                    discuss_name: divMyReply.attr("id").split("y")[1],
                    content: content
                });
                $(this).off("click");
            });
        }
    }
    /*
     * 添加讨论
     *
     * */
    function add_discuss() {
        //添加评论
        var add_discuss=$("#add_discuss");
        add_discuss.on("click",function (event) {
            //防止点击冒泡
            // div_add_back.fadeIn();
            // div_add_back.css({display:"flex"});
            // event.stopPropagation();
            //弹出框,确定评论并且关闭弹出框
            var re=[];
            re=u_discuss_pop();
                re[0].on("click",function () {
                var content=$("#discuss_publish").val();
                if(!content){
                    layer.msg('请输入内容');
                    return;
                }
                //关闭弹出层
                layer.close(re[1]);
                //我添加评论时要获取的我的头像和昵称
                var userdata=data_get.user;
                //获取我的评论内容
                div_content_discuss.prepend(
                    "<div class='content_discuss_item'>" +
                    "<img src="+userdata.img+" class='discuss_item_img'/>" +
                    "<div class='discuss_item_content'>" +
                    "<div class='discuss_item_content_line1 line'>" +
                    "<div class='content_line1_name'>"+userdata.name+"</div>" +
                    "<div class='content_line1_time'>刚刚</div>" +
                    "</div>" +
                    "<div class='discuss_item_content_line2 line' id='content_my'>" +
                    content+
                    "</div>" +
                    "<div class='discuss_item_content_line3 line'>" +
                    "<img src='../image/course/更多评论.png' class='line_img'/>" +
                    "<div class='line_data'></div>" +
                    "<img class='line_img' src='../image/course/赞.png' id='support_my'/>" +
                    "<div class='line_data' id='support_num_my'>0</div>" +
                    "<img class='line_img' src='../image/course/踩.png' id='oppose_my'/>" +
                    "<div class='line_data' id='oppose_num_my'>0</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
                ajax_post("http",{user_name:userdata.name,discuss_content:content});
                //有多个点击事件共享，所以要移除
                $(this).off("click");
            });
        });
    }
    /*
     * 功能设置
     *
     * */
    function set_fun() {
        //个人主页/消息页面
        $(".pm,#user_center").on("click",function () {
            // var data_learner=ajax_post("http",{user_name:data_get.user.name});
            var data_learner= {
                user:data_get.user,
                time: [
                    {begin: "21:00", over: "21:00"},
                    {begin: "20:00", over: "21:00"}
                ],
                chart:{
                    footprint:{
                        time:["6月12日","8月11日"],
                        name:[
                            ["PHP数据库","JAVA服务器"],
                            ["PHP服务器的搭建","JAVA服务器"]
                        ],
                        chapter:[
                            ["第一章","第二章"],
                            ["第一章","第二章"]
                        ]
                    },
                    pie:{
                        name:["PHP","Java","JavaScript"],
                        value:["70","80","90"]
                    },
                    ring:{
                        name:["1:00-2:00","21:00-22:00","12:00-13:00"],
                        value:["30","60","80"]
                    }
                },
                discuss:[
                    {
                        img:"../image/common/备用头像.png",
                        name:"newbee1",
                        time:"2017/1/1-20:23",
                        comments:"3",
                        content:"这是一个评论的内容",
                        source:"discuss_pc.html"
                    },
                    {
                        img:"../image/common/备用头像.png",
                        name:"newbee2",
                        time:"2017/1/1-20:23",
                        comments:"3",
                        content:"这是一个评论的内容",
                        source:"discuss_pc.html"
                    }
                ],
                record:[
                    {
                        name:"PHP数据库的使用",
                        chapter:"什么是数据库",
                        time:"2017/2/12-1:30",
                        has_watch:"00:00:00",
                        keep_watch:"course_pc.html"
                    },
                    {
                        name:"PHP数据库的使用",
                        chapter:"如何操作数据库",
                        time:"2017/2/12-1:30",
                        has_watch:"00:00:00",
                        keep_watch:"course_pc.html"
                    }
                ]
            };
            all_data.learner_pc=data_learner;
            window.name=JSON.stringify(all_data);
            window.location.href="learner_pc.html";
        });
        //消息获取
        var has=$("#hasmessage");
        setInterval(function () {
            // var messages=ajax_post("http",{"user_message":data_get.user.name});
            var messages=2;
            if(!messages){
                if(has.length>0){
                    has.remove();
                }
            }else{
                has.text(messages);
            }
        },1000);
    }
    /*
    *添加评论弹出框架
    * */
    function u_discuss_pop() {
        var re=[];
        var close=layer.open({
            type: 1,
            title:"请输入你的评论",
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '240px'], //宽高
            success:function () {
                $(".layui-layer-content").append(
                    '<textarea id="discuss_publish" autofocus placeholder="评论内容"></textarea>' +
                    '<div id="add_sure" class="back_sure">' +
                    '发布 ' +
                    '</div>'
                );
            }

        });
        re[0]=$(".back_sure");
        re[1]=close;
        //输入内容确定
        return re;
    }
});