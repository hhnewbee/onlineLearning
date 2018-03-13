/**
 * Created by new bee on 2017/7/14.
 */
$(document).ready(function () {
    //获取数据
    var all_data=JSON.parse(window.name);
    var data_get=JSON.parse(window.name).main_pc;

    set_user();
    set_course();
    set_fun();
    /*
    * 课程设置
    * */
    function set_course() {
        var score;
        var courses=data_get.courses;
        for(var i=0;i<4;i++){
            add_course($("#recommand"),i);
        }

        for(var x=4;x<8;x++){
            add_course($("#my"),x);
        }

        for(var y=9;y<courses.length;y++){
            $("#new").append(
                '<div class="new_item" id="course'+y+'" data-id="'+y+'">' +
                '<div class="item1 item">' +
                courses[y].name +
                '</div>' +
                '<div class="item2 item">' +
                '<div class="uploader">' +
                '上传者:'+courses[y].uploader +
                '</div>' +
                '<div class="learner">' +
                courses[y].learners+'人在学习'  +
                '</div>' +
                '</div>' +
                '<div class="constroctor item">' +
                courses[y].instructor +
                '</div>' +
                '</div>'
            );
            $("#course"+y).on("click",function () {
                //获取课程页数据
                // var data_course=ajax_post("http",{"course_name":respose[$(this).data("id")].name});

                //模拟数据
                data_course();
            });
        }
        function set_star() {
            return ((score--)<0)?'stars_gray.svg':'stars_yellow.svg';
        }

        function add_course(target,i) {
            score=parseInt(courses[i].score)-1;
            target.append(
                "<div class='course_line2' id='course"+i+"' data-id='"+i+"'>" +
                "<div class='course_line3'>" +
                "<div class='course_kind'>" +
                courses[i].type+
                "</div>" +
                "<div class='course_line4'>" +
                "<div class='course_name'>" +
                courses[i].name+
                "</div>" +
                "<div class='course_introduction'>" +
                courses[i].instructor+
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
                courses[i].learners+"人在学习"+
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
            $("#course"+i).on("click",function () {
                //var data_course=ajax_post("http",{"course_name":courses[$(this).data("id")].name});

                //模拟数据
                data_course();
            });
        }

        function data_course() {
            var data_course={
                //主页接口
                main:{
                    video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                    name:"PHP数据库",
                    chapter:"1-入门(00:12:17)",
                    has_watch:"00:00:00",
                    uploader:"newbee",
                    create_time:"2017年7月26日",
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
                            link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/pdf.pdf",
                            type:"pdf文件"
                        }
                    ]
                },
                //目录接口
                chapter: {
                    info:
                        [
                            ["第一章","1-入门 (00:12:17)","1-安装 (00:18:20)"],
                            ["第二章","2-进阶 (00:12:17)"]
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
                        name:"newbee",
                        time:"2017/7/26-20:23",
                        comments:"3",
                        supports:"4",
                        opposes:"5",
                        content:"这是一个评论的内容"
                    },
                    {
                        img:"../image/common/备用头像.png",
                        name:"newbee1",
                        time:"2017/7/26-20:23",
                        comments:"3",
                        supports:"4",
                        opposes:"5",
                        content:"这是一个评论的内容"
                    },
                    {
                        img:"../image/common/备用头像.png",
                        name:"newbee2",
                        time:"2017/7/26-20:23",
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

        }
    }
    /*
    * 用户信息设置
    * */
    function set_user() {
        $("#img_user img").attr({"src": data_get.user.img});
        $("#text_user").text(data_get.user.name+",欢迎回来");
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
            //ajax数据发送
            // var r=ajax_post("http",{"course_name":content});
            // window.name=JSON.stringify(r);
            // window.location.href="course_pc.html";
            if(data_get.user.name=="newbee"&&content=="Javaweb数据库"){
                //模拟数据
                var data_course={
                    //主页接口
                    main:{
                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                        uploader:"newbee",
                        name:"Javaweb数据库",
                        chapter:"1-入门(00:12:07)",
                        has_watch:"00:00:00",
                        create_time:"2017年7月26日",
                        score:"4",
                        video_play_times:"30",
                        video_download_times:"20",
                        instroctor:"讲了该如何使用数据库",
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
            }else if(content=="PHP数据库"){
                var data_course={
                    //主页接口
                    main:{
                        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/实体个例.mp4",
                        uploader:"newbee",
                        name:"PHP数据库",
                        chapter:"1-入门(00:12:07)",
                        has_watch:"00:00:00",
                        create_time:"2017年7月26日",
                        score:"4",
                        video_play_times:"30",
                        video_download_times:"20",
                        instroctor:"讲了该如何使用数据库",
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
            }else{
                alert("未有该课程或你无查看权限");

            }
        });
        //退出
        $("#quit").on("click",function () {
            ajax_post("http",{"user_name":data_get.user});
            window.location.href="login.html";
        });
        //更多
        $(".more").click(function () {
            // var data=ajax_post("http",{"user_course":user_name});
            // window.name=JSON.stringify(data);
            // window.location.href="courses_pc.html";

            //模拟数据
            var data_courses={
                courses:[
                    {
                        name:"PHP数据库",
                        type:"PHP",
                        score:"2",
                        instructor:"讲了该如何使用数据库",
                        learners:"30"
                    },
                    {
                        name:"PHP数据库",
                        type:"PHP",
                        score:"2",
                        instructor:"讲了该如何使用数据库",
                        learners:"30"
                    }
                ],
                user:data_get.user
            };
            all_data.courses_pc=data_courses;
            window.name=JSON.stringify(all_data);
            window.location.href="courses_pc.html";
        });
        //个人主页/消息页面
        $(".pm,#user_center").on("click",function () {
            // var data_learner=ajax_post("http",{user_name:data_get.user.name});
            var data_learner= {
                user:data_get.user,
                time: [
                    {begin: "13:00", over: "15:00"},
                    {begin: "8:00", over: "8:30"}
                ],
                chart:{
                    footprint:{
                        time:["7月25日","7月26日"],
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
                        name:"newbee",
                        time:"2017/7/26-20:23",
                        comments:"3",
                        content:"请抓紧时间学习PHP数据库课程",
                        source:"discuss_pc.html"
                    },
                    {
                        img:"../image/common/备用头像.png",
                        name:"newbee2",
                        time:"2017/7/26-20:23",
                        comments:"3",
                        content:"这是一个评论的内容",
                        source:"discuss_pc.html"
                    }
                ],
                record:[
                    {
                        name:"PHP数据库",
                        chapter:"入门",
                        time:"2017/7/26-1:30",
                        has_watch:"00:10:00",
                        keep_watch:"course_pc.html"
                    },
                    {
                        name:"PHP数据库",
                        chapter:"入门",
                        time:"2017/7/26-1:30",
                        has_watch:"00:12:00",
                        keep_watch:"course_pc.html"
                    }
                ],
                configure:{type:"1"}
            };
            all_data.learner_pc=data_learner;
            window.name=JSON.stringify(all_data);
            window.location.href="learner_pc.html";
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