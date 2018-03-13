/**
 * Created by new bee on 2017/7/22.
 */
/*
* 模拟接收数据
* */
//学员个人主页
var data_learner_get= {
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
            chapter:"第一节：什么是数据库",
            time:"2017/2/12-1:30",
            has_watch:"00:00:00",
            keep_watch:"course_pc.html"
        },
        {
            name:"PHP数据库的使用",
            chapter:"第一节：什么是数据库",
            time:"2017/2/12-1:30",
            has_watch:"00:00:00",
            keep_watch:"course_pc.html"
        }
    ]
};
//主页
var data_main_get={
    courses:[
        {
            name:"PHP数据库",
            type:"PHP",
            score:"2",
            instructor:"讲了该如何使用数据库",
            learners:"30",
            uploader:"newbee"
        },
        {
            name:"PHP数据库",
            type:"PHP",
            score:"2",
            instructor:"讲了该如何使用数据库",
            learners:"30",
            uploader:"newbee"
        }
    ],
    user:{
        img:"../image/common/备用头像.png",
        name:"小小"
    }
};
//单个课程
var data_course_get={
    //主页接口
    main:{
        video_link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/video.mp4",
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
                link:"http://192.168.1.135:8080/javaweb01/learn_online/resources/video.mp4",
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
    configure:{discuss:"1"},
    //用户信息
    user:user

};
//单个评论
var data_discuss_get={
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
//课程页面
//当前页面获取
var data_courses_get={courses:
    [
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
    ]
};
//上级页面传递
var data_courses={
    user:data_get.user
};


/*
* 发送数据
* */
var data_login_send={
    UsersEntity : {
        name:name,
        userPassword:password
}};