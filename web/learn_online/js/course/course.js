/**
 * Created by new bee on 2017/5/24.
 */
$(document).ready(function() {
    var response_content=null;
    var link="http://192.168.1.135:8080/javaweb01/";
    var div_content=$("div_content");
    //由jq对象转成dom对象
    var vedio=$("#video")[0];
    var div_introduction=$("#div_introduction");
    var div_catalog=$("#div_catalog");
    var div_discuss=$("#div_discuss");
    var div_introduce_line_2=$("#introduce_line_2");
    var img_add_discuss=$("#add_discuss");
    var img_stars=$("#score_stars");

    var div_star_back=$("#star_back");
    var img_star_score_stars=$("#star_score_stars");
    var div_star_score_score=$("#star_score_score");
    var div_star_sure=$("#star_sure");

    var div_content_discuss=$("#content_discuss");

    get_resource();
    set_resource();

    set_introduce_line();
    score_star();
    set_stars();
    play_times();
    set_slide();
    add_discuss();

    //设置内容滑块
    function set_slide() {
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            paginationType : 'custom',
            pagination: '.swiper-pagination',
            paginationCustomRender: function (swiper, current, total) {
                switch (current){
                    case 1:{
                        call_fun(div_introduction);
                        img_add_discuss.css({display:"none"});
                        break;
                    }
                    case 2:{
                        call_fun(div_catalog);
                        img_add_discuss.css({display:"none"});
                        break;
                    }
                    case 3:{
                        call_fun(div_discuss);
                        img_add_discuss.css({display:"block"});
                        break;
                    }
                }

                function call_fun(obj){
                    obj.css({backgroundColor:"#555399"});
                    obj.siblings().css({backgroundColor:"#ffffff"});
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
    //星星的设置
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
        });
    }

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
    function set_introduce_line() {
        var jd=false;
        //换行转义
        // div_introduce_line_2.html("猜得出奇偶家人哦写我的我单位的违法而个人回顾&#10;和肉肥厚而恢复二环vouhewnrvuohruehvurehwoh");
        div_introduce_line_2.on("click",function () {
            if(!jd){
                div_introduce_line_2.css({"white-space":"pre-wrap"});
                jd=true;
            }else{
                div_introduce_line_2.css({"white-space":"nowrap"});
                jd=false;
            }
        });
    }

    vedio.addEventListener("play",function () {
        if(this.currentTime==0){
            alert("ssss");
        }

    });
    function play_times() {
    }

    /*
    * 请求资源
    * */
    function get_resource() {
        get_video_link();
        function get_video_link() {
            response_content=ajax_get_content(link+"Hello",null);
        }
    }

    /*
    * 设置资源
    * */
    function set_resource() {
        //设置视频连接
        vedio.src=response_content.video_source_link;
        //上传者和时间连接
        var div_item_person=$("#div_item_person");
        var div_item_time=$("#div_item_time");
        div_item_person.text(response_content.name);
        div_item_time.text(response_content.date+"建");
        //设置星星分数
        var score=parseInt(response_content.score);
        var div_score_text=$("#score_text");
        var starses = img_stars.find("img");
        for (var i = 0; i < score; i++) {
            starses.eq(i).attr({"src": "../image/course/stars_yellow.svg"});
        }
        //设置分数
        div_score_text.text(score);
        //视频观看次数
        var div_item_watch_times=$("watch_times");
        div_item_watch_times.text(parseInt(response_content.video_play_times)+"播放");
        //视频下载次数
        var div_item_download_times=$("#download_times");
        div_item_download_times.text(parseInt(response_content.video_download_times)+"下载");
        //资源下载连接
        var a_video_link=$("#video_link");
        var a_ppt_link=$("#ppt_link");
        var a_code_link=$("#code_link");
        a_video_link.attr({href:response_content.video_source_link});
        a_ppt_link.attr({href:response_content.ppt_source_link});
        a_code_link.attr({href:response_content.code_source_link});
        //简介
        //文字换行处理
        var reg=/&emsp/g;
        var new_content=response_content.instroctor.replace(reg,'\n');
        div_introduce_line_2.text(new_content);
        //目录
        var catalog=response_content.catalog;
        set_course_chapter(catalog);
        //讨论
        set_course_discuss();
    }
    /*
    * 课程目录设置
    *
    * */
    function set_course_chapter(chapter) {
        var div_catalog_item=$("#catalog_item");
        for(var i =0;i<chapter.length;i++) {
            div_catalog_item.append(
                "<div class='catalog_item_line1' id='chapter"+i+'\''+ " data-id='chapter_c"+i+'\''+">" +
                    "<img src='../image/course/节点.svg'/>" +
                    chapter[i][0] +
                "</div>"
            );
            for(var c=1;c<chapter[i].length;c++){
                div_catalog_item.append(
                    "<div class='catalog_item_line2 chapter_c"+i+'\''+">" +
                        "<div class='catalog_item_line_item'" +" id='course_"+i+c+'\''+" data-course='dcsciwedj"+c+"\'"+">" +
                            "<img src='../image/course/尖角箭头-上.svg'/>" +
                            chapter[i][c]+
                        "</div>" +
                    "</div>"
                );
                $("#course_"+i+c).on("click",function () {
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
    function set_course_discuss() {
        var discuss_arry=response_content.discuss_data;
        var div_discuss_content;
        for(var i=0;i<discuss_arry.length;i++) {
            div_content_discuss.append(
                "<div class='content_discuss_item'>" +
                "<img src="+discuss_arry[i].user_picture+" class='discuss_item_img'/>" +
                "<div class='discuss_item_content'>" +
                "<div class='discuss_item_content_line1 line'>" +
                "<div class='content_line1_name'>"+discuss_arry[i].nickname+"</div>" +
                "<div class='content_line1_time'>"+discuss_arry[i].time+"</div>" +
                "</div>" +
                "<div class='discuss_item_content_line2 line' id='content"+discuss_arry[i].id+"'>" +
                "</div>" +
                "<div class='discuss_item_content_line3 line'>" +
                "<img src='../image/course/更多评论.png' class='line_img'/>" +
                "<div class='line_data'>"+discuss_arry[i].arry.length+"</div>" +
                "<img class='line_img' src='../image/course/赞.png' id='support"+discuss_arry[i].id+"'/>" +
                "<div class='line_data' id='support_num"+discuss_arry[i].id+"'>"+discuss_arry[i].support+"</div>" +
                "<img class='line_img' src='../image/course/踩.png' id='oppose"+discuss_arry[i].id+"'/>" +
                "<div class='line_data' id='oppose_num"+discuss_arry[i].id+"'>"+discuss_arry[i].oppose+"</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
            //内容文字处理
            //命名最好不要用特殊符号，如.,会造成难已发现的错误。
            div_discuss_content=$("#content"+discuss_arry[i].id);
            div_discuss_content.text(discuss_arry[i].content);
            //支持与反对
            support_oppose("support","../image/course/已赞.png","../image/course/赞.png");
            support_oppose("oppose","../image/course/已踩.png","../image/course/踩.png");
        }
        //赞同和反对fun
        function support_oppose(id,src,src_){
            //图片元素
            var e_img=$("#"+id+discuss_arry[i].id);
            //将点赞数量与元素绑定
            e_img.data("num",discuss_arry[i].support);
            //点赞数量文本
            e_img.data("text_id",id+"_num"+discuss_arry[i].id);
            //防止多次点赞
            e_img.data("jd",false);
            e_img.on("click",function () {
                if(!$(this).data("jd")){
                    var send_id=$(this).data("text_id");
                    var num=parseInt($(this).data("num"))+1;
                    //键值任何变量都会变成字符类型。需要用eval做响应的转化。注意转换格式
                    //发送数据
                    var obj=eval("({"+"'"+send_id+"'"+":"+"'"+num+"'"+"})");
                    ajax_post(obj,link+"get_data");
                    //本地点赞数变化
                    $("#"+$(this).data("text_id")).text(num);
                    $(this).data("jd",true);
                    //图标变化
                    $(this).attr({"src":src});
                    //取消点赞
                }else{
                    var send_id_=$(this).data("text_id");
                    var num_r=parseInt($(this).data("num"));
                    $("#"+$(this).data("text_id")).text(num_r);
                    var obj_=eval("({"+"'"+send_id_+"'"+":"+"'"+num_r+"'"+"})");
                    ajax_post(obj_,link+"get_data");
                    $(this).attr({"src": src_});
                    $(this).data("jd",false);
                }
            });
        }
    }
    /*
    * 添加讨论
    *
    * */
    function add_discuss() {
        var img_add=$("#add_discuss");
        var div_sure=$("#add_sure");
        var div_add_back=$("#add_discuss_back");
        img_add.on("click",function (event) {
            //防止点击冒泡
            div_add_back.fadeIn();
            div_add_back.css({display:"flex"});
            // event.stopPropagation();
        });

        div_sure.on("click",function () {
            //我添加评论时要获取的我的头像和昵称
            window.name = JSON.stringify({user_picture:"../image/common/备用头像.png",nickname:"小米"});
            var discuss_response=JSON.parse(window.name);
            div_add_back.fadeOut();
            //获取我的评论内容
            var content=$("#discuss_publish").val();
            div_content_discuss.prepend(
                "<div class='content_discuss_item'>" +
                "<img src="+discuss_response.user_picture+" class='discuss_item_img'/>" +
                "<div class='discuss_item_content'>" +
                "<div class='discuss_item_content_line1 line'>" +
                "<div class='content_line1_name'>"+discuss_response.nickname+"</div>" +
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
            ajax_post({user_name:discuss_response.nickname,user_content:content},"http");
        });
    }
    //发送数据
    function ajax_post(contents,url) {
        $.ajax({
            type: 'post',
            url: url,
            // data: JSON.stringify({content:"content"}),
            data:contents,
            cache: false,
            dataType:"json",
            success:function (data) {
                response_content=data;
            }
        });
    }
    //获取数据
    function ajax_get_content(url,content_post) {
        var respose=null;
        $.ajax({
            type: 'post',
            url: url,
            // data: JSON.stringify({content:"content"}),
            data:content_post,
            cache: false,
            dataType:"json",
            async:false,
            success:function (data) {
                respose=data;
            }
        });
        return respose;
    }
});