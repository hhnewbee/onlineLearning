package sevelet01;

/**
 * Created by new bee on 2017/7/9.
 */
public class Course_content_data {
    private String kind;
    private String name;
    private String Chapter;
    private String score;
    private String number;
    public Course_content_data(){};
    public Course_content_data(String kind, String name, String chapter, String score, String number) {
        this.kind = kind;
        this.name = name;
        this.Chapter = chapter;
        this.score = score;
        this.number = number;
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

    public String getChapter() {
        return Chapter;
    }

    public void setChapter(String chapter) {
        Chapter = chapter;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
