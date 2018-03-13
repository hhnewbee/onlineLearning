/**
 * Created by new bee on 2017/7/17.
 */

$(document).ready(function() {
    //获取数据
    var all_data=JSON.parse(window.name);
    var data_get=JSON.parse(window.name).discuss_pc;

    discussFrame();

    $("#d2").text("评论"+data_get.other.length+"条");
    /*
     * 评论添加
     * */
    function discussFrame() {
        var divMyReply;
        var div_add_back=$("#add_discuss_back");
        var div_sure=$("#add_sure");
        replySure();
        setMyDiscuss($("#d3"),data_get.other);
        setMyDiscuss($("#d1"),data_get.my);
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
                    "<div class='content_line1_name'>" + data[i].name + "</div>" +
                    "<div class='content_line1_time'>" + data[i].time + "</div>" +
                    "</div>" +
                    "<div class='discuss_item_content_line2 line' id='content" + data[i].name + "'>" +
                    data[i].content+
                    "</div>" +
                    "<div class='discuss_item_content_line3 line'>" +
                    "<div class='callBack' id='myReply" + data[i].name + "'>"+
                    "<img class='imgCallBack' src='../image/discuss/回复.png'>"+
                    "回复"+
                    "</div>"+
                    "<img src='../image/course/更多评论.png' class='line_img' id='comments" + data[i].name + "'/>" +
                    "<div class='line_data'>" + data[i].comments + "</div>" +
                    "<img class='line_img' src='../image/course/赞.png' id='support" + data[i].name + "'/>" +
                    "<div class='line_data' id='support_num" + data[i].name + "'>" + data[i].supports + "</div>" +
                    "<img class='line_img' src='../image/course/踩.png' id='oppose" + data[i].name + "'/>" +
                    "<div class='line_data' id='oppose_num" + data[i].name + "'>" + data[i].opposes + "</div>" +
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
                var e_img = $("#" + id + data[i].name);
                //将点赞数量与元素绑定
                e_img.data("num", data[i].supports);
                //点赞数量文本
                e_img.data("text_id", id + "_num" + data[i].name);
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
                $("#comments"+data[i].name).on("click",function () {
                    window.name=ajax_get("http", {"discussId":$(this).attr("id")});
                });
            }
            /*
             * 回复
             * */
            function reply() {
                $("#myReply"+data[i].name).on("click",function () {
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