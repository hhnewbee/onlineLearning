/**
 * Created by new bee on 2017/7/18.
 */
$(document).ready(function () {
    var otherDiscussdata=[
        {
            img:"../image/common/备用头像.png",
            nickname:"newbee1",time:"2017/1/1-20:23",
            comments:"3",
            supports:"4",
            opposes:"5",
            content:"这是一个评论的内容"
        },
        {
            img:"../image/common/备用头像.png",
            nickname:"newbee2",time:"2017/1/1-20:23",
            comments:"3",
            supports:"4",
            opposes:"5",
            content:"这是一个评论的内容"
        },
        {
            img:"../image/common/备用头像.png",
            nickname:"newbee3",time:"2017/1/1-20:23",
            comments:"3",
            supports:"4",
            opposes:"5",
            content:"这是一个评论的内容"
        }
    ];
    set_slide();
    discussFrame();

    function set_slide() {
        var div_commmet=$("#comment");
        var div_notic=$("#notice");
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            paginationType : 'custom',
            pagination: '.swiper-pagination',
            paginationCustomRender: function (swiper, current, total) {
                switch (current){
                    case 1:{
                        call_fun(div_commmet);
                        break;
                    }
                    case 2:{
                        call_fun(div_notic);
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
            div_commmet.on("click",function () {
                call_fun(0);
            });
            div_notic.on("click",function () {
                call_fun(1);
            });
            function call_fun(num) {
                $(this).css({backgroundColor:"#4D4D7F"});
                $(this).siblings().css({backgroundColor:"#ffffff"});
                mySwiper.slideTo(num);
            }
        }
    }
    function discussFrame() {
        var divMyReply;
        var div_add_back=$("#add_discuss_back");
        var div_sure=$("#add_sure");
        replySure();
        setMyDiscuss($("#comment_contain"),otherDiscussdata);
        // setMyDiscuss($("#d1"),myDiscussdata);
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
                support_oppose("support","../image/course/已赞.png","../image/course/赞.png");
                support_oppose("oppose","../image/course/已踩.png","../image/course/踩.png");
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
                    "<div class='content_line1_name'>" + data[i].nickname + "</div>" +
                    "<div class='content_line1_time'>" + data[i].time + "</div>" +
                    "</div>" +
                    "<div class='discuss_item_content_line2 line' id='content" + data[i].nickname + "'>" +
                    data[i].content+
                    "</div>" +
                    "<div class='discuss_item_content_line3 line'>" +
                    "<div class='callBack' id='myReply" + data[i].nickname + "'>"+
                    "<img class='imgCallBack' src='../image/discuss/回复.png'>"+
                    "回复"+
                    "</div>"+
                    "<img src='../image/course/更多评论.png' class='line_img' id='comments" + data[i].nickname + "'/>" +
                    "<div class='line_data'>" + data[i].comments + "</div>" +
                    "<img class='line_img' src='../image/course/赞.png' id='support" + data[i].nickname + "'/>" +
                    "<div class='line_data' id='support_num" + data[i].nickname + "'>" + data[i].supports + "</div>" +
                    "<img class='line_img' src='../image/course/踩.png' id='oppose" + data[i].nickname + "'/>" +
                    "<div class='line_data' id='oppose_num" + data[i].nickname + "'>" + data[i].opposes + "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            }
            /*
             * 赞同和反对fun
             * */
            function support_oppose(id, src, src_) {
                //图片元素
                var e_img = $("#" + id + data[i].nickname);
                //将点赞数量与元素绑定
                e_img.data("num", data[i].supports);
                //点赞数量文本
                e_img.data("text_id", id + "_num" + data[i].nickname);
                //防止多次点赞
                e_img.data("jd", false);
                e_img.on("click", function () {
                    if (!$(this).data("jd")) {
                        var send_id = $(this).data("text_id");
                        var num = parseInt($(this).data("num")) + 1;
                        //键值任何变量都会变成字符类型。需要用eval做响应的转化。注意转换格式
                        //发送数据
                        var obj = eval("({" + "'" + send_id + "'" + ":" + "'" + num + "'" + "})");
                        ajax_post( link + "get_data",obj);
                        //本地点赞数变化
                        $("#" + $(this).data("text_id")).text(num);
                        $(this).data("jd", true);
                        //图标变化
                        $(this).attr({"src": src});
                        //取消点赞
                    } else {
                        var send_id_ = $(this).data("text_id");
                        var num_r = parseInt($(this).data("num"));
                        $("#" + $(this).data("text_id")).text(num_r);
                        var obj_ = eval("({" + "'" + send_id_ + "'" + ":" + "'" + num_r + "'" + "})");
                        ajax_post(link + "get_data",obj_ );
                        $(this).attr({"src": src_});
                        $(this).data("jd", false);
                    }
                });
            }
            /*
             * 获取更多的评论
             * */
            function moreComments() {
                $("#comments"+data[i].nickname).on("click",function () {
                    window.name=ajax_get("http", {"discussId":$(this).attr("id")});
                });
            }
            /*
             * 回复
             * */
            function reply() {
                $("#myReply"+data[i].nickname).on("click",function () {
                    divMyReply=$(this);
                    div_add_back.fadeIn();
                    div_add_back.css({display:"flex"});
                });
            }
        }
        /*
         * 回复确定按钮
         * */
        function replySure() {
            div_sure.on("click",function () {
                div_add_back.fadeOut();
                var content=$("#discuss_publish").val();
                divMyReply.parent().siblings(".discuss_item_content_line2").after(
                    "<div class='my_reply'>"+content+"</div>"
                );
                ajax_post("http",{comment:content});
            });
        }
    }
});