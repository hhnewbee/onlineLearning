package sevelet01;

import com.alibaba.fastjson.JSON;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
/**
 * Created by new bee on 2017/6/1.
 */
@WebServlet(name = "Servlet01",urlPatterns={"/Hello"})
public class Servlet01 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String sourse_link="http://192.168.1.135:8080/javaweb01/resources/";
        String sourse_link_discuss_picture="http://192.168.1.135:8080/javaweb01/resources/discuss_picture/";
        response.setCharacterEncoding("utf-8");
        String instroctor_content=
                "你回复IQ我会否二哈否决of奇偶IE案件覅偶解放军啊搜ifJoe文件foe埃及佛教为傲" +
                "\nID偶就无敌哦今儿我ID就群殴我基地哦亲京东IE外景地偶就去我ID奇偶i" +
                "\ncireqjdfioeqrjfoijerwfjoerwhvnowreuvhwreuoifho";
        PrintWriter out=response.getWriter();
        Course_data course_data=new Course_data();
//        "newbee","http://192.168.43.189:8080/javaweb01/resources/video.mp4"
//        JSONObject jobj = new JSONObject();
//        jobj.put("name","jj");
        course_data.setName("newbee");
        course_data.setDate("2015年12月12日");
        course_data.setScore("4");
        course_data.setVideo_play_times("1500");
        course_data.setVideo_download_times("400");
        course_data.setVideo_source_link(sourse_link+"实体个例.mp4");
        course_data.setPpt_source_link(sourse_link+"code.text");
        course_data.setCode_source_link(sourse_link+"ppt.pdf");
        course_data.setInstroctor(instroctor_content);
        String[][] chapters;
        chapters= new String[][]{{"第一章","1-入门"+" (8:00:00)","1-安装"+"8:00:00"},{"第二章","2-进阶"+"8:00:00"}};
        course_data.setCatalog(chapters);
        /*
        * 讨论数据
        * */
        Course_discuss discuss_data1_1=new Course_discuss();
        discuss_data1_1.id="1_1";
        discuss_data1_1.user_picture=sourse_link_discuss_picture+"头像.svg";
        discuss_data1_1.nickname="ppx1";
        discuss_data1_1.time="20";
        discuss_data1_1.oppose="10";
        discuss_data1_1.support="10";
        discuss_data1_1.content="php好还是java好呢" ;
        Course_discuss discuss_data1_2=new Course_discuss();
        discuss_data1_2.id="1_2";
        discuss_data1_2.nickname="ppx1_2";
        discuss_data1_2.time="20";
        discuss_data1_2.oppose="10";
        discuss_data1_2.support="10";
        discuss_data1_2.content="php好还是java好呢";
        discuss_data1_2.arry=new Course_discuss[]{new Course_discuss()};
        discuss_data1_1.arry=new Course_discuss[]{discuss_data1_2};

        Course_discuss discuss_data2_1=new Course_discuss();
        discuss_data2_1.user_picture=sourse_link_discuss_picture+"头像.svg";
        discuss_data2_1.id="2_1";
        discuss_data2_1.nickname="ppx2";
        discuss_data2_1.time="20";
        discuss_data2_1.oppose="10";
        discuss_data2_1.support="10";
        discuss_data2_1.content="php好还是java好呢";
        discuss_data2_1.arry=new Course_discuss[]{new Course_discuss()};
//      discuss数组
        Course_discuss arry[]=new Course_discuss[]{discuss_data1_1,discuss_data2_1};
//      装载discuss
        course_data.setDiscuss_data(arry);
//      发送json形式的数据
        String jsonStr = JSON.toJSONString(course_data);
//      out.print(jobj.toString());
        out.print(jsonStr);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

}
