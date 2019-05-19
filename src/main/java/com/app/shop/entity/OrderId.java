package com.app.shop.entity;

import javax.persistence.Embeddable;
import java.time.Year;
import java.util.Calendar;

@Embeddable
public class OrderId {

    private String year;
    private String month;
    private int counter;

    public OrderId() {
        this.year = String.valueOf(Year.now().getValue());
        this.month = String.valueOf(Calendar.getInstance().get(Calendar.MONTH) + 1);
    }

    @Override
    public String toString() {
        return year+month+counter;
    }
}
