/**
 * Created by new bee on 2017/5/25.
 */
$(document).ready(function() {

    var div_video=$("#video")[0];
    var div_play_pause=$("#div_play_pause");
    var video_content=$("#video_content");
    var img_play_pause=$("#div_play_pause");
    var img_constrol_play=$("#div_constrol_play");
    var div_bar_button=$("#div_btn");
    var div_bar_step=$("#div_bar").find("div").eq(0);
    var div_current_time=$("#text");
    var div_bar=$("#div_bar");
    var span_currentTime=$("#currentTime");
    var span_duration=$("#duration");
    //jq没有提供操作video的方法
    init_event();
    init_data();

    function init_event() {
        video_content.on("click",function () {
            playControl();
        });

        img_constrol_play.on("click",function () {
            playControl();
        });
    }
    
    function init_data() {
        div_video.addEventListener("loadedmetadata",function () {
            span_duration.text(formatSeconds(div_video.duration));
        });
    }

    //视频播放控制
    function playControl() {
        if (div_video.paused) {
            div_video.play();
            img_play_pause.attr({"src":"../image/video/pause.svg"});
            div_play_pause.fadeOut(500);
            img_constrol_play.attr({"src":"../image/video/pause.png"});
        } else {
            div_video.pause();
            img_play_pause.attr({"src":"../image/video/play.svg"});
            div_play_pause.fadeIn(500);
            img_constrol_play.attr({"src":"../image/video/play.svg"});
        }
    }

    function set_play() {
    }

    //进度条更新
    div_video.addEventListener('timeupdate', function() {
        // currentTime.text(formatSeconds(playVideo[0].currentTime));
        //设置进度条
        var step=100 * div_video.currentTime / div_video.duration;
        div_bar_step.css({'width':step+"%"});
        //一开始btn就占领bar的百分比
        div_bar_button.css({"left":Math.max(step,0)+"%"});
        // div_current_time.text(step+"%");
        span_currentTime.text(formatSeconds(div_video.currentTime));
    });

    //视频更新
    var update_bar = function(x) {
        //返回视频的长度，以秒计
        var maxduration = div_video.duration; //Video
        div_video.currentTime = maxduration *(x / 100);
    };

    var Scale = function (btn,bar,title){
        //移动的按钮
        this.btn=document.getElementById(btn);
        //总的进度条
        this.bar=document.getElementById(bar);
        this.title=document.getElementById(title);
        //进度条的进度
        this.step=this.bar.getElementsByTagName("div")[0];
        this.init_phone();
    };
    Scale.prototype={
        //init可以看做func的函数名
        init:function (){
            var f=this,g=document,b=window,m=Math;
            //offsetWidth是指对象自身的宽度，整型，单位像素（含边线
            //滑动动条的宽度减去当前按钮的宽度，滑动条尽头的进度
            var max=f.bar.offsetWidth;
            //鼠标点击下来
            f.btn.onmousedown=function (e) {
                //clientX 设置或获取鼠标指针位置相对于当前窗口的 x 坐标
                var x = (e || b.event).clientX;
                //获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
                //固定好已滑动的进度
                var l = this.offsetLeft;
                //鼠标移动
                g.onmousemove = function (e) {
                    var thisX = (e || b.event).clientX;
                    //现滑动的进度加上已滑动的
                    //有最大值max，限制btn的滑动范围
                    var to = m.min(max, m.max(-2, l + (thisX - x)));
                    f.btn.style.left = to + 'px';
                    f.ondrag(m.round(m.max(0, to / max) * 100), to);
                    // b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                };

                g.onmouseup = function () {
                    this.onmousemove = null;
                };

            };
            f.btn.onclick = function (e) {
                // 阻止事件冒泡
                e.stopPropagation();
                //阻止默认事件
                e.preventDefault();
            };
            this.bar.onclick = function (e) {
                var step = e.offsetX;
                var to = m.min(max, step);
                f.btn.style.left = to + "px";
                f.ondrag(m.round(m.max(0, to / max) * 100), to);
            }
        },

        init_phone:function() {
            var f=this,m=Math;
            var max=f.bar.offsetWidth;
            var l;
            var x;
            $("#div_btn").on('touchstart',function(e) {
                l = this.offsetLeft;
                x = e.targetTouches[0].pageX;
                $(document).on('touchmove',function(e) {
                    var thisX= e.targetTouches[0].pageX;
                    var to = m.min(max, m.max(-2, l + (thisX - x)));
                    $("#div_btn").css({"left":to+"px"});
                    f.ondrag(m.round(m.max(0, to / max) * 100), to);
                    // if(to>300){
                    //     alert("aaaaaaaa");
                    // }
                });
            });

            f.btn.onclick = function (e) {
                // 阻止事件冒泡
                e.stopPropagation();
                //阻止默认事件
                e.preventDefault();
            };
            this.bar.onclick = function (e) {
                var step = e.offsetX;
                var to = m.min(max, step);
                f.btn.style.left = to + "px";
                f.ondrag(m.round(m.max(0, to / max) * 100), to);
            }
        },

        ondrag:function (pos,x){
            this.step.style.width=Math.max(0,x)+'px';
            // this.title.innerHTML=pos+'%';
            update_bar(pos);
        }
    };
    //秒转时间
    function formatSeconds(value) {
        value = parseInt(value);
        var time;
        if (value > -1) {
            hour = Math.floor(value / 3600);
            min = Math.floor(value / 60) % 60;
            sec = value % 60;
            day = parseInt(hour / 24);
            if (day > 0) {
                hour = hour - 24 * day;
                time = day + "day " + hour + ":";
            } else time = hour + ":";
            if (min < 10) {
                time += "0";
            }
            time += min + ":";
            if (sec < 10) {
                time += "0";
            }
            time += sec;
        }
        return time;
    }
    //全屏
    $('#img_fullscreen').on('click', function() {
        if ($(this).hasClass('cancleScreen')) {
                document.exitFullscreen();
            // $(this).removeClass('cancleScreen');
            // elementPlayControl.css({
            //     'bottom': -48
            // }).removeClass('fullControll');
        } else {
            // div_video.style.transform="rotateZ(90deg)";
            // window.screen.lockOrientation = screen.lockOrientation ||screen.mozLockOrientation || screen.msLockOrientation;
            // $("#video_content").css({"height":"100vh","width":"100vw","position": "absolute"});
            // if (div_video.requestFullscreen) {
            //     div_video.requestFullscreen();
            // } else if (div_video.mozRequestFullScreen) {
            //     div_video.mozRequestFullScreen();
            // } else if (div_video.webkitRequestFullscreen) {
            //     div_video.webkitRequestFullscreen();
            // } else if (div_video.msRequestFullscreen) {
            //     div_video.msRequestFullscreen();
            // }
        }
        return false;
    });
    new Scale("div_btn","div_bar","text");
});