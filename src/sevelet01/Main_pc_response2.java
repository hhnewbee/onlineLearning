package sevelet01;

import java.util.List;

/**
 * Created by new bee on 2017/7/14.
 */
public class Main_pc_response2 {
    private List<List<String>> course_list;

    private String user_name;
    private String user_img;
    private String user_messages;
    public Main_pc_response2(){}
    public Main_pc_response2(List<List<String>> course_list, String user_name, String user_img, String user_messages) {
        this.course_list = course_list;
        this.user_name = user_name;
        this.user_img = user_img;
        this.user_messages = user_messages;
    }

    public List<List<String>> getCourse_list() {
        return course_list;
    }

    public void setCourse_list(List<List<String>> course_list) {
        this.course_list = course_list;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_img() {
        return user_img;
    }

    public void setUser_img(String user_img) {
        this.user_img = user_img;
    }

    public String getUser_messages() {
        return user_messages;
    }

    public void setUser_messages(String user_messages) {
        this.user_messages = user_messages;
    }
}
