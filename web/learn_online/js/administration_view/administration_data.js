/**
 * Created by new bee on 2017/5/12.
 */
var administration_view_request_post={
    course_create:{
        course_name:"string",//课程名称
        course_type:"string",//课程类别
        course_demand:"string",//课程要求
        course_picture:"string",//课程图片
        course_instruction:"string"//课程简介
    },

    course_video:[{//上传视频
        video_tag:"string",//上传对相应的课程
        video_source:"byte",//视频资源
        video_name:"string",//文件名
        video_size:"string",//上传文件的大小
        video_picture:"byte"//上传的缩略图
    }],

    course_ppt:[{//上传ppt
        ppt_tag:"string",//上传的对应的课程
        ppt_source:"byte",//ppt资源
        ppt_name:"string",//文件名
        ppt_size:"string",//上传文件的大小
        ppt_picture:"byte"//上传的缩略图
    }],

    course_manage:{
        Aministrator_id:"string",//管理员id
        Aministrator_nickname:"string",//管理员昵称
        course_delect_name:"string",//要删除的课程的名称
        course_time:"string"//搜索该时间创建的课程（精确到秒）
    },

    student_manage:{
        student_name:"string",//学员的名字
        student_position:"string",//学员的职位
        student_id:"string",//学员的工号
        student_lately:"string"//最近活跃学员

    }
};

var administration_view_response={//管理员页面响应
    comment_student:new Comment_list_response().comment_list,//已创建课程列表
    course_has_create:new Course_list_response().course_list,//学员评论课程列表
    student_evaluate:[{//学员评价
        student_evaluate_content:"string",//评价正文
        student_evaluate_id:"string",//评价id
        student_evaluate_time:"string",//评价时间
        student_evaluate_picture:"byte",//头像
        student_evaluate_nickname:"string"//昵称
        }
    ],

    student_learn_map: {//报表请求
        student_learn_map_date: "string",//学员的学习报表的日期单位
        student_learn_map_length: "string"//学员的学习报表的x轴长度
    }
};