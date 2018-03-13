$(document).ready(function() {
    vload();
    function vload() {
        var video=$("<video src='http://192.168.1.135:8080/javaweb01/resources/实体个例.mp4'/>")[0];
        var video_img=$("#video_img_record");
        var alltime=video.duration;
        var vimg = $("<img/>")[0];
        setTimeout(function(){captureImage(video,video_img,vimg);},400);
        // video_img.prepend(vimg);
        video.remove();
    }
    function captureImage(video,target,output) { //截图
        var scale = 0.8; //缩放
        try {
            var videocanvas = $("<canvas/>")[0];
            videocanvas.width = target.width();
            videocanvas.height = target.height() * scale;
            videocanvas.getContext('2d').drawImage(video, 0, 0, videocanvas.width, videocanvas.height);
            output.src = videocanvas.toDataURL("image/png");
            target.prepend(output);
            // delete videocanvas;
        } catch (e) {
            output.src = "加载动画.gif";
        }
    }
});