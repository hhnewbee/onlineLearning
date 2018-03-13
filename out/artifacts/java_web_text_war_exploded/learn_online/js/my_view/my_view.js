/**
 * Created by new bee on 2017/5/12.
 */
var my_view_request_post={//请求
    my_set:{
        my_set_password_Original:"string",//原始密码
        my_set_password_Reset:"string",//重置密码
        my_set_position:"string",//我的职位
        my_set_nickname:"String",//昵称
        my_set_picture:"byte",//头像图片上传
        my_set_introduction:"string",//简介
        my_set_free_time:[//空闲时间段
            {
                free_time:"string"//空闲时间
            }
        ]
    },

    my_record_course:{//课程记录查询
        my_course_record_time:"string"//课程记录查询时间
    },

    my_record_comment:{//评论记录查询
        my_comment_record_time:"string"//评论记录查询时间
    },

    my_learn_map: {//报表请求
        my_learn_map_date: "string",//我的学习报表的日期单位
        my_learn_map_length: "string"//我的学习报表的x轴长度
    }
};

var my_view_response={//响应
    my_set_password_Original_ifright:"boolean",//原始密码是否正确

    my_nick_name:"string",//昵称
    my_position:"string",//职位
    my_picture_link:"string",//头像链接
    my_introduction:"string",//简介

    my_record_course:{//课程记录
        my_record_course_time:"string",//学习该课程时间
        my_record_course_list:new Course_list_response().course_list//课程列表
    },

    my_record_comment:new Comment_list_response().comment_list,//我的评论列表

    my_learn_map:[{
        course_time:"string",//课程学习的持续时间
        course_name:"string"//课程名称
        }
    ],

    my_notic:[{
        my_notic_content:"string",//通知的内容
        my_notic_type:"string"//通知的类型
      }
    ]
};