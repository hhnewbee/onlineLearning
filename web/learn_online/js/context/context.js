/**
 * Created by new bee on 2017/5/12.
 */
function Comment_list_response(){//评论响应列表
    this.comment_list=[{//评论列表
         comment_id: "string",//评论的id
         comment_picture: "string",//评论的头像
         comment_content: "string",///评论的正文
         comment_time: "string",//评论的时间
         comment_yes_times: "string",//同意该评论的次数
         comment_no_times: "string",//反对该评论的次数
         comment_other_comment:this.comment_list,//该评论的其他评论
         comment_flash:"string"//课程列刷新
        }
    ]
}

function Course_list_response(){//课程响应列表
    this.course_list=[{//课程
        course_view_link: "string",//课程主页的链接
        course_name: "string",//名称
        course_type: "string",//类别
        course_source: "string",//资源(视频/ppt)
        course_video_length: "string",//视频时长
        course_score: "string",//评分
        course_introduction:"string",//简介
        course_demand:"string",//要求
        course_flash:"string",//课程列刷新
        course_upload_time:"int"//课程创建的时间
    }
  ]
}
