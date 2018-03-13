/**
 * Created by new bee on 2017/5/12.
 */
var main_view_response={//响应
    course_list:new Course_list_response().course_list//主页的课程列表
};

var main_view_request_post={//请求
    my_like:{//我的倾向课程的推送标签
        my_like_type:"string",//类别
        my_like_video_length:"string",//视频时间长度
        my_like_sorce:"string",//评分
        my_like_course_demand:"string"//要求
    }
};