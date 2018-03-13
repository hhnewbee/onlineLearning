/**
 * Created by new bee on 2017/7/9.
 */
$(document).ready(function() {
    var link="http://192.168.1.135:8080/javaweb01/";

    set_slide();
    // set_course_recommend();
    manage_view();
    function set_slide() {
        var div_pageturn=$("#homepage_turn");
        var div_courseturn=$("#course_turn");
        var div_mineturn=$("#mine_turn");
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            paginationType: 'custom',
            pagination: '.swiper-pagination',
            paginationCustomRender: function (swiper, current, total) {
                switch (current) {
                    case 1: {
                        call_fun(div_pageturn);
                        break;
                    }
                    case 2: {
                        call_fun(div_courseturn);
                        break;
                    }
                    case 3: {
                        call_fun(div_mineturn);
                        break;
                    }
                }

                function call_fun(obj) {
                    obj.css({backgroundColor: "#555399"});
                    obj.siblings().css({backgroundColor: "#ffffff"});
                }
            }
        });
        //点击滑动
        div_click();
        function div_click() {
            div_pageturn.on("click", function () {
                call_fun(0);
            });
            div_courseturn.on("click", function () {
                call_fun(1);
            });
            div_mineturn.on("click", function () {
                call_fun(2);
            });
            function call_fun(num) {
                $(this).css({backgroundColor: "#555399"});
                $(this).siblings().css({backgroundColor: "#ffffff"});
                mySwiper.slideTo(num);
            }
        }
    }

    function set_course_recommend() {
        var div_course_recommend=$("#home_course_recommend");
        var course_info=ajax_get_resourse(link+"course","course=course_info");
        for(var i=0;i<course_info.length-1;i++){
            div_course_recommend.append(
                "<div class='twocourse'>" +
                "<div class='recommend_course'>" +
                "<div class='course_name'>" +
                course_info[i].name+
                "</div>" +
                "<div class='course_content'>" +
                "<div class='course_img'></div>" +
                "<div class='course_kind'>" +
                course_info[i].kind+
                "</div>" +
                "</div>" +
                "<div class='course_info'>" +
                "<div class='course_score'>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "</div>" +
                "<div class='course_num'>" +
                course_info[i].number+
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='recommend_course'>" +
                "<div class='course_name'>" +
                course_info[i+1].name +
                "</div>" +
                "<div class='course_content'>" +
                "<div class='course_img'></div>" +
                "<div class='course_kind'>" +
                course_info[i+1].kind +
                "</div>" +
                "</div>" +
                "<div class='course_info'>" +
                "<div class='course_score'>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "<img class='score_stars'  src='../image/course/stars_gray.svg'/>" +
                "</div>" +
                "<div class='course_num'>" +
                course_info[i+1].number +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
        }
    }

    function set_course_my() {
        
    }
    
    function manage_view() {
        set_manage();
        function set_manage() {
            $("#myupload").on("click",function () {
                window.location.href = link+"learn_online/html/manage_upload.html";
            });
        }
    }

    function ajax_get_resourse(url,content_post) {
        var respose=null;
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
                respose=data;
            }
        });
        return respose;
    }
});