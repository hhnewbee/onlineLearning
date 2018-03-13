package text;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by new bee on 2017/6/4.
 */
@WebServlet(name = "CookieServlet")
public class Cookie_servlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out=response.getWriter();
        String name=request.getParameter("name");
        String nickname=request.getParameter("nickname");
        Cookie ck_name=new Cookie("name",name);
        Cookie ck_nickname=new Cookie("nickname",nickname);
        response.addCookie(ck_name);
        response.addCookie(ck_nickname);
        Cookie []cks=request.getCookies();
        String last_nick_name=null;
        for(int i=0;cks!=null&&i<cks.length;i++){
            if("nickname".equals(cks[i].getName())){
                last_nick_name=cks[i].getValue();
            }

        }
        if(last_nick_name!=null){
            out.print("欢迎你，<b><i>"+last_nick_name+"</i></b>!<br>");
        }else{
            out.print("欢迎你，<b><i>"+last_nick_name+"</i></b>!<br>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
