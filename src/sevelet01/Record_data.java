package sevelet01;

import java.util.List;

/**
 * Created by new bee on 2017/7/10.
 */

public class Record_data {
    private List<String> time_footprint;
    private List<List<String>> name_footprint;
    private List<List<String>> chapter_footprint;

    private List<String> pie_name;
    private List<String> pie_value;

    private List<String> ring_name;
    private List<String> ring_value;

    public Record_data(){}
    public Record_data(List<String> time_footprint, List<List<String>> name_footprint, List<List<String>> chapter_footprint, List<String> pie_name, List<String> pie_value, List<String> ring_name, List<String> ring_value) {
        this.time_footprint = time_footprint;
        this.name_footprint = name_footprint;
        this.chapter_footprint = chapter_footprint;
        this.pie_name = pie_name;
        this.pie_value = pie_value;
        this.ring_name = ring_name;
        this.ring_value = ring_value;
    }

    public List<String> getTime_footprint() {
        return time_footprint;
    }

    public void setTime_footprint(List<String> time_footprint) {
        this.time_footprint = time_footprint;
    }

    public List<List<String>> getName_footprint() {
        return name_footprint;
    }

    public void setName_footprint(List<List<String>> name_footprint) {
        this.name_footprint = name_footprint;
    }

    public List<List<String>> getChapter_footprint() {
        return chapter_footprint;
    }

    public void setChapter_footprint(List<List<String>> chapter_footprint) {
        this.chapter_footprint = chapter_footprint;
    }

    public List<String> getPie_name() {
        return pie_name;
    }

    public void setPie_name(List<String> pie_name) {
        this.pie_name = pie_name;
    }

    public List<String> getPie_value() {
        return pie_value;
    }

    public void setPie_value(List<String> pie_value) {
        this.pie_value = pie_value;
    }

    public List<String> getRing_name() {
        return ring_name;
    }

    public void setRing_name(List<String> ring_name) {
        this.ring_name = ring_name;
    }

    public List<String> getRing_value() {
        return ring_value;
    }

    public void setRing_value(List<String> ring_value) {
        this.ring_value = ring_value;
    }
}
