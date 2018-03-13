/**
 * Created by new bee on 2017/5/11.
 */
var search_request_post={//搜索请求
    course_type:"string",//课程种类
    course_length:"string",//课程时长
    course_name:"string"//课程名称
};

var search_response={
    search_course_list:new Course_list_response().course_list//搜索结果列表
};
