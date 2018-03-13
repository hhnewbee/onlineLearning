/**
 * Created by new bee on 2017/5/11.
 */
$(document).ready(function () {
    init_view();
    set_img();
    send();

    /*
    * 界面初始化
    * */
    function init_view() {
        //输入错误的提示信息的触发元素
        var body=$("body");
        body.append('<div id="tips_trigger"></div>');
    }
    /*
    * 设置不同布局的图片
    * */
    function set_img() {
        var img_user=$("#img_user");
        var img_password=$("#img_password");
        if($(window).width()>700){
            img_password.attr({"src":"../image/login/user_icon_black.png"});
            img_user.attr({"src":"../image/login/password_black.png"});
        }else{
            img_password.attr({"src":"../image/login/password_while.png"});
            img_user.attr({"src":"../image/login/user_icon_while.png"});
        }
    }
    /*
    *密码和账号的发送
    * */
    function send() {
        var div_login=$("#div_login_button");
        var input_number=$("#input_number");
        var input_password=$("#input_password");
        div_login.on("click",function () {
            var name=input_number.val().trim();
            var password=input_password.val().trim();
            if(!name){
                tips("#input_number","请输入用户名");
            }
            else if(name.indexOf(" ")>=0){
                tips("#input_number","请不要输入空格");
            }
            else if(!password){
                tips("#input_password","请输入密码");
            }else if(password.indexOf(" ")>=0){
                tips("#input_password","请不要输入空格");
            }else{
                //发送登录信息获取对应的资源
                var data=ajax_post("http",{
                    login: {
                        name:name,
                        password:password
                    }
                });
                // 密码正确与否判断
                if(!data){
                    tips("#div_login_button","你的密码或者账号有误!");
                    return;
                }else{
                    //封装在window.name中传递
                    window.name=JSON.stringify(data);
                    window.location.href="main_pc.html";
                }
                //模拟数据：main_pc的course有11个
                var data_main={
                    main_pc:{
                        courses:[
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            },
                            {
                                name:"PHP数据库",
                                type:"PHP",
                                score:"2",
                                instructor:"讲了该如何使用数据库",
                                learners:"2",
                                uploader:"newbee"
                            }
                        ],
                        user:{
                            img:"../image/common/备用头像.png",
                            name:name
                        }
                    }};
                window.name=JSON.stringify(data_main);
                window.location.href="main_pc.html";
            }
        });
    }

    /*
     * 提示框
     * */
    function tips(target,content) {
        var tips_trigger=$("#tips_trigger");
        tips_trigger.one("click",function () {
            layer.tips(content, target,{
                time:0,
                //弹出成功后回调更改tips的样式
                success: function(layero, index){
                    $(".layui-layer-content").css({backgroundColor:"#dc0b0b"});
                    $(".layui-layer-content i").css({borderBottomColor:"#dc0b0b"});
                    //再次输入后提示框关闭
                    $(target).one("input",function () {
                        layer.close(index);
                    });
                }
            });
        });
        tips_trigger.trigger("click");
    }
});