package com.example.mainservice.enums;

public enum SortFields {
    ID("id"),
    NAME("name"),
    COORDINATEID("coordinates.id"),
    COORDINATEX("coordinates.x"),
    COORDINATEY("coordinates.y"),
    CREATIONDATE("creationDate"),
    AREA("area"),
    POPULATION("population"),
    METERSABOVESEALEVEL("metersAboveSeaLevel"),
    CLIMATE("Climate"),
    GOVERNMENT("government"),
    STANDARTOFLIVING("standardOfLiving"),
    GOVERNORID("governor.id"),
    GOVERNORAGE("governor.age"),
    GOVERNORHEIGHT("governor.height"),
    GOVERNORBIRTHDAY("governor.birthday");


    private final String text;

    SortFields(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }

    public static boolean isContains(String str) {
        for(SortFields sortField : SortFields.values()) {
            if (sortField.toString().equals(str)) {
                return true;
            }
        }

        return false;
    }
}
