package sevelet01;

/**
 * Created by new bee on 2017/6/5.
 */
public class Course_data {
    private String name;
    private String date;
    private String score;
    private String video_play_times;
    private String video_download_times;

    private String ppt_source_link;
    private String code_source_link;
    private String video_source_link;

    private String instroctor;

    private String[][] catalog;

    private String discuss_item_img_link;

    private Course_discuss discuss_data[];

    public String[][] getCatalog() {
        return catalog;
    }

    public void setCatalog(String[][] catalog) {
        this.catalog = catalog;
    }

    public String getDiscuss_item_img_link() {
        return discuss_item_img_link;
    }

    public void setDiscuss_item_img_link(String discuss_item_img_link) {
        this.discuss_item_img_link = discuss_item_img_link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getVideo_play_times() {
        return video_play_times;
    }

    public void setVideo_play_times(String video_play_times) {
        this.video_play_times = video_play_times;
    }

    public String getVideo_download_times() {
        return video_download_times;
    }

    public void setVideo_download_times(String video_download_times) {
        this.video_download_times = video_download_times;
    }

    public String getPpt_source_link() {
        return ppt_source_link;
    }

    public void setPpt_source_link(String ppt_source_link) {
        this.ppt_source_link = ppt_source_link;
    }

    public String getCode_source_link() {
        return code_source_link;
    }

    public void setCode_source_link(String code_source_link) {
        this.code_source_link = code_source_link;
    }

    public String getVideo_source_link() {
        return video_source_link;
    }

    public void setVideo_source_link(String video_source_link) {
        this.video_source_link = video_source_link;
    }

    public String getInstroctor() {
        return instroctor;
    }

    public void setInstroctor(String instroctor) {
        this.instroctor = instroctor;
    }

    public String getScore(){
        return this.score;
    }
    public void setScore(String score){
        this.score=score;
    }

    public Course_discuss[] getDiscuss_data() {
        return discuss_data;
    }

    public void setDiscuss_data(Course_discuss discuss_data[]) {
        this.discuss_data = discuss_data;
    }
}
