/**
 * Created by new bee on 2017/8/5.
 */
$(document).ready(function () {
    init_view();
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
     *密码和账号的发送/忘记密码
     * */
    function send() {
        var div_login=$("#login_button");
        var input_name=$("#name").find("input");
        var input_password=$("#password").find("input");
        var input_code=$("#code").find("input");
        //获取验证码
        get_code();
        //忘记密码
        forget();
        div_login.on("click",function () {
            var name=input_name.val().trim();
            var password=input_password.val().trim();
            var code=input_code.val().trim();
            if(!name){
                tips("#name input","请输入用户名");
            }
            else if(name.indexOf(" ")>=0){
                tips("#name input","请不要输入空格");
            }
            else if(!password){
                tips("#password input","请输入密码");
            }else if(password.indexOf(" ")>=0){
                tips("#password input","请不要输入空格");
            }else if(code==""){
                tips("#code_img","请输入验证码");
            }else{
                //获取验证码的正确与否
                var code_get=ajax_post_async("http",{code:code});
                if(code_get=="0"){
                    tips("#code_img","验证码错误");
                }else{
                    //发送登录信息获取对应的资源
                    var data=ajax_post_async("http",{
                        login: {
                            userName:name,
                            userPassword:password
                        }
                    });
                    //密码正确与否判断
                    if(!data){
                        tips("#login_button","你的密码或者账号有误!");
                        //模拟数据
                        analog_data();
                    }else{
                            //封装在window.name中传递
                            window.name=JSON.stringify(data);
                            window.location.href="main_pc.html";
                        }
                    }
                }
        });
        /*
        * 获取验证码图片
        * */
        function get_code() {
            var code_img=$("#code_img");
            code_img.on("click",function () {
                code_img.src=ajax_post("http","");
            });
        }
        /*
         *忘记密码
         * */
        function forget() {
            var div_forget=$("#forget");
            div_forget.click(function () {
                var name=input_name.val().trim();
                var code=input_code.val().trim();
                if(!name){
                    tips("#name input","请输入用户名");
                }else if(name.indexOf(" ")>=0){
                    tips("#name input","请不要输入空格");
                }else if(code=="") {
                    tips("#code_img", "请输入验证码");
                }else {
                    //获取验证码的正确与否
                    var code_get = ajax_post_async("http", {code:code});
                    if (code_get == "0") {
                        tips("#code_img", "验证码错误");
                    }else {
                        //用户名是否存在
                        var name_right=ajax_post_async("http", {name:name});
                        if(name_right=="1"){
                            div_forget.click(function () {
                                layer.alert('密码已经发至尾号为1234的手机上', {
                                    skin: 'layui-layer-molv', //样式类名
                                    closeBtn: 0
                                });
                            });
                        }else{
                            tips("#forget","该用户名不存在");
                        }
                    }
                }
            });
        }
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
                    $(".layui-layer-content").css({backgroundColor:"rgb(185, 85, 77)"});
                    $(".layui-layer-content i").css({borderBottomColor:"rgb(185, 85, 77)"});
                    //再次输入后提示框关闭
                    $(target).one("input",function () {
                        layer.close(index);
                    });
                }
            });
        });
        tips_trigger.trigger("click");
    }
    /*
    * 模拟数据
    * */
    function analog_data() {
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
                    name:"newbee"
                }
            }};
        window.name=JSON.stringify(data_main);
        window.location.href="main_pc.html";
    }
});