package sevelet01;

/**
 * Created by new bee on 2017/7/5.
 */
public class Course_discuss {
    public String id;
    public String user_picture;
    public String nickname;
    public String time;
    public String support;
    public String oppose;
    public String content;
    public Course_discuss arry[];

    public String getUser_picture() {
        return user_picture;
    }

    public void setUser_picture(String user_picture) {
        this.user_picture = user_picture;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSupport() {
        return support;
    }

    public void setSupport(String support) {
        this.support = support;
    }

    public String getOppose() {
        return oppose;
    }

    public void setOppose(String oppose) {
        this.oppose = oppose;
    }

    public Course_discuss[] getArry() {
        return arry;
    }

    public void setArry(Course_discuss[] arry) {
        this.arry = arry;
    }
}
