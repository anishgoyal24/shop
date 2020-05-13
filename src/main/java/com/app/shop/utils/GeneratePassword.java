package com.app.shop.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class GeneratePassword {

    public String generatePassword() {

        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);

        return generatedString;
    }
}
