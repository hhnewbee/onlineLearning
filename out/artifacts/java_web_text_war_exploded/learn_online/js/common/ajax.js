/**
 * Created by new bee on 2017/7/16.
 */
var link="http://192.168.1.135:8080/javaweb01/";
function ajax_post(url,content_post) {
    var response_post;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(content_post),
        cache: false,
        dataType:"json",
        contentType:"application/json;charse=UTF-8",
        success:function (data) {
            response_post=data;
        }
    });
    return response_post;
}

function ajax_post_async(url,content_post) {
    var response_post;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(content_post),
        cache: false,
        dataType:"json",
        async:false,
        success:function (data) {
            response_post=data;
        }
    });
    return response_post;
}

function time_change(time1,time2) {
    var sec="00";
    var min="00";
    var hou="00";
    if(time1) {
        if (time1 >= 60) {
            min = time1 / 60;
            sec = time1 % 60;
            if (min >= 60) {
                hou = min / 60;
                min = min % 60;
                sec = sec.length > 2 ? sec.toString() : "0" + sec;
                min = min.length > 2 ? min.toString() : "0" + min;
                hou = hou.length > 2 ? hou.toString() : "0" + hou;
            } else {
                sec = sec.length > 2 ? sec.toString() : "0" + sec;
                min = min.length > 2 ? min.toString() : "0" + min;
            }
        } else {
            sec = time1;
            sec = sec.length > 2 ? sec.toString() : "0" + sec;
        }
        return hou+min+sec;
    }else{
        var time=time2.split(":");
        hou=parseInt(time[0])*3600;
        min=parseInt(time[1])*60;
        sec=parseInt(time[2]);
        return hou+min+sec;
    }

}