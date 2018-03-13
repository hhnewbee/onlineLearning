/**
 * Created by new bee on 2017/7/16.
 */
$(document).ready(function () {
    //获取数据
    var all_data=JSON.parse(window.name);
    var data_get=JSON.parse(window.name).courses_pc;
    //课程种类数据
    var data_courses;
    var div_item4=$("#l4");
    var div_item3=$("#l3");

    set_user();
    set_page();
    set_choose();
    set_courses();
    set_fun();
    /*
    * 用户信息设置
    * */
    function set_user() {
        $("#text_user").text(data_get.user.name);
        $("#img_user").find("img").attr({src:data_get.user.img});
    }
    /*
    * 选项设置
    *
    * */
    function set_choose() {
        //模拟数据
        data_courses=[
            {
                name:"PHP数据库",
                type:"PHP",
                score:"2",
                instructor:"讲了该如何使用数据库",
                learners:"0"
            },
            {
                name:"JavaScript",
                type:"前端",
                score:"3",
                instructor:"JavaScript学习",
                learners:"0"
            },
            {
                name:"Java基础学习",
                type:"Java",
                score:"4",
                instructor:"Java基础学习",
                learners:"0"
            }
        ];
        var content={"choose":{"direction":"全部","classification":"全部","type":"全部"}};
        var div_item=$("#l1");
        var div_item2=$("#l22");
        var div_item2_1=$("#l12_23");
        var chooses={
            line1:["前端开发","后端开发","数据库","云计算&大数据","运维&测试","UI设计"],
            line2:["Java","PHP","C++","C","C#","JavaScript","Python","CSS","HTML5","Ruby","react","GO","Node.js","Jquery","Vue.js","Angular","MySql","SqLife","Webapp","sass","Android","IOS"],
            line3:["基础","案例","框架","实例","工具","设计模式"]
        };
        for(var i=0;i<chooses.line1.length;i++){
            div_item.append("<div class='l12c'>"+chooses.line1[i]+"</div>");
        }
        for(var x=1;x<=chooses.line2.length;x++){
            div_item2_1.append("<div class='l12c'>"+chooses.line2[x-1]+"</div>");
            if(x%10==0||x==chooses.line2.length){
                div_item2.append(div_item2_1);
                div_item2_1=$("<div class='l12_23c'></div>");
            }
        }
        for(var y=0;y<chooses.line3.length;y++){
            div_item3.append("<div class='l12c'>"+chooses.line3[y]+"</div>");
        }

        $(".l12c").on("click",function () {
            var ob=$(this);
            if(ob.parent().attr("class")=="l12_23c"){
                ob.parent().siblings().children(".l12c").css({backgroundColor:"#ffffff"});
                content.choose.classification=ob.text();
            }else if(ob.parent().attr("id")=="l1"){
                content.choose.direction=ob.text();
            }else if(ob.parent().attr("id")=="l3"){
                content.choose.type=ob.text();
            }
            ob.css({backgroundColor:"#444263"});
            ob.siblings().css({backgroundColor:"#ffffff"});
            //模拟数据
            // data_courses=ajax_post("http",content);
            if(content.choose.direction=="后端开发"&&content.choose.classification!="PHP"){
                data_courses=[
                    {
                        name:"PHP数据库",
                        type:"PHP",
                        score:"2",
                        instructor:"讲了该如何使用数据库",
                        learners:"0"
                    },
                    {
                        name:"Java基础学习",
                        type:"Java",
                        score:"4",
                        instructor:"Java基础学习",
                        learners:"0"
                    }
                ];
            }else{
                data_courses=[
                    {
                        name:"PHP数据库",
                        type:"PHP",
                        score:"2",
                        instructor:"讲了该如何使用数据库",
                        learners:"2"
                    }
                ];

            }
            //再次生成课程列表
            set_courses();
        });
        // data_courses=ajax_post("http",content);
        //模拟数据
    }
    /*
    *课程设置
    *
    * */
    function set_courses() {
        $(".course_view").remove();
        add_contains();
        function add_contains() {
            var num=data_courses.length;
            var contains= Math.ceil(num/4);
            for(var i=0;i<contains;i++){
                div_item4.before(
                    '<div class="course_view" >' +
                    '<div class="course_line1" id="course_line1'+i+'"></div>'+
                    '</div>'
                );

                for(var x=0;x<4;x++){
                    num--;
                    add_course($("#course_line1"+i),data_courses[num]);
                    if(num<=0){
                        break;
                    }
                }
            }
        }

        function add_course(contain,data) {
            var score=parseInt(data.score)-1;
            function set_star() {
                return ((score--)<0)?'stars_gray.svg':'stars_yellow.svg';
            }
            contain.append(
                "<div class='course_line2' id='"+data.name+"'>" +
                "<div class='course_line3'>" +
                "<div class='course_kind'>" +
                data.type+
                "</div>" +
                "<div class='course_line4'>" +
                "<div class='course_name'>" +
                data.name+
                "</div>" +
                "<div class='course_introduction'>" +
                data.instructor+
                "</div>" +
                "</div>" +
                "<div class='course_line5'>" +
                "<div class='course_star'>" +
                "<img class='score_stars' src='../image/course/"+set_star()+"'/>" +
                "<img class='score_stars' src='../image/course/"+set_star()+"'/>" +
                "<img class='score_stars' src='../image/course/"+set_star()+"'/>" +
                "<img class='score_stars' src='../image/course/"+set_star()+"'/>" +
                "<img class='score_stars' src='../image/course/"+set_star()+"'/>" +
                "</div>" +
                "<div class='course_number'>" +
                data.learners+"人在学习"+
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
            $("#"+data.name).on("click",function () {
                //var data_course=ajax_post("http",{"course_name":courses[$(this).data("id")].name});
                //模拟数据
                var data_course={
                    //主页接口
                    main:{
                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                        has_watch:"00:00:00",
                        uploader:"newbee",
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
                            name:"newbee1",
                            time:"2017/1/1-20:23",
                            comments:"3",
                            supports:"4",
                            opposes:"5",
                            content:"这是一个评论的内容"
                        }
                    ],
                    //用户信息
                    user:data_get.user,
                    //特殊也页面对的配置信息
                    configure:{}
                };
                all_data.course_pc=data_course;
                window.name=JSON.stringify(all_data);
                window.location.href="course_pc.html";
            });
        }
    }
    /*
    *设置页数
    *
    * */
    function set_page() {
        var div_first=$("#first");
        var div_last=$("#last");
        var div_next=$("#next");
        var div_foot=$("#foot");
        var div_numbers=$("#l23");
        for(var i=1;i<=1;i++){
            div_numbers.append('<div class="l231" id="number'+i+'">'+i+'</div>');
        }
        $("#number1").css({backgroundColor: "#7a7f82",color:"#D7DDE0"});
        $(".l231").on("click",function () {
            $(this).css({backgroundColor: "#7a7f82",color:"#D7DDE0"});
            $(this).siblings().css({backgroundColor: "#D7DDE0",color:"#7a7f82"})
        });
    }
    /*
    * 功能设置
    * */
    function set_fun() {
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
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                                        video_play_times:"30",
                                        video_download_times:"50"
                                    },
                                    {
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/翘边阴影.mp4",
                                        video_play_times:"40",
                                        video_download_times:"60"
                                    }
                                ],
                                [
                                    {
                                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/翘边阴影.mp4",
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
});