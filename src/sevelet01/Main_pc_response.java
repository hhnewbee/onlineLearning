package sevelet01;

/**
 * Created by new bee on 2017/7/14.
 * pc版主页获取的数据
 */
public class Main_pc_response {

    private String kind;
    private String name;
    private String instructor;
    private String score;
    private String learners;
    private String uploader;
    private String course_url;

    private String user_name;
    private String user_img;
    private String user_messages;

    public Main_pc_response(){}
    public Main_pc_response(String kind, String name, String instructor, String score, String learners, String uploader, String course_url, String user_name, String user_img,String user_messages) {
        this.kind = kind;
        this.name = name;
        this.instructor = instructor;
        this.score = score;
        this.learners = learners;
        this.uploader = uploader;
        this.course_url = course_url;
        this.user_name = user_name;
        this.user_img = user_img;
        this.user_messages=user_messages;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getLearners() {
        return learners;
    }

    public void setLearners(String learners) {
        this.learners = learners;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public String getCourse_url() {
        return course_url;
    }

    public void setCourse_url(String course_url) {
        this.course_url = course_url;
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
