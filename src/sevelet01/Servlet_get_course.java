package sevelet01;

import com.alibaba.fastjson.JSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by new bee on 2017/7/9.
 */
@WebServlet(name = "Servlet_get_course",urlPatterns={"/course"})
public class Servlet_get_course extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        PrintWriter out=response.getWriter();
        String support_num=request.getParameter("course");
        if("course_info".equals(support_num)){
            out.print(course_info());
        }else if("record".equals(support_num)){
            out.print(learner_record());
        }else if("main_pc".equals(support_num)){
            out.print(get_main_pc());
        }else if("全部".equals(support_num)){
            out.print(get_courses_pc2());
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    private String course_info(){
        Course_content_data course_content[]=new Course_content_data[]{
                new Course_content_data("PHP","PHP数据库学习","第一章","11","123"),
                new Course_content_data("PHP","PHP数据库学习","第二章","12","125"),
                new Course_content_data("PHP","PHP数据库学习","第三章","11","128")
        };
        return JSON.toJSONString(course_content);
    }

    private String learner_record(){
        Record_data record_data=new Record_data(
            Arrays.asList("8月11日","8月12日"),
            Arrays.asList(Arrays.asList("PHP数据库","JAVA服务器"),Arrays.asList("PHP服务器的搭建","JAVA服务器")),
            Arrays.asList(Arrays.asList("第一章","第二章"),Arrays.asList("第一章")),
            Arrays.asList("1","EEE","RRR"),
            Arrays.asList("10","20","50"),
            Arrays.asList("1","EEE","RRR"),
            Arrays.asList("20","50","80")
         );
        return JSON.toJSONString(record_data);
    }

    private String get_main_pc(){
        List<Main_pc_response> main_pcs=new ArrayList<>();
        main_pcs=Arrays.asList(
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),

                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),

                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9")
                );
        return JSON.toJSONString(main_pcs);

    }

    private String get_courses_pc2(){
        Main_pc_response2 main_pcs2=new Main_pc_response2(
                Arrays.asList(
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http"),
                        Arrays.asList("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http")
                        ),
                "小米",
                "http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png",
                "9"
        );
        return JSON.toJSONString(main_pcs2);
    }

    private String get_courses_pc(){
        List<Main_pc_response> main_pcs=new ArrayList<>();
        main_pcs=Arrays.asList(
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9"),
                new Main_pc_response("PHP","PHP数据库的使用","如何使用数据库,实例操作,名师指导,大量名例分析","1","200","皮皮虾","http","小米","http://192.168.1.135:8080/javaweb01/learn_online/imgage/common/备用头像.png","9")
        );
        return JSON.toJSONString(main_pcs);

    }
}
