package com.app.shop.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class EmailServiceImpl{

//    @Autowired
//    public JavaMailSender javaMailSender;

    public void sendMail(String to, String text, String subject) throws Exception{
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        MimeMessage mimeMessage = new MimeMessage();
//        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
//        mimeMessageHelper.setTo(to);
//        mimeMessageHelper.setSubject(subject);
//        mimeMessageHelper.setText(text);
//        javaMailSender.send(mimeMessage);

        Properties props = new Properties();
        props.put("mail.smtp.ssl.enable", "true"); // required for Gmail
        props.put("mail.smtp.sasl.enable", "true");
        props.put("mail.smtp.sasl.mechanisms", "XOAUTH2");
        props.put("mail.smtp.auth.login.disable", "true");
        props.put("mail.smtp.auth.plain.disable", "true");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props);
        Transport transport = session.getTransport("smtp");
        transport.connect("smtp.gmail.com", "saifcoapp@gmail.com", "4/yQENJuf5T4srV1m-0rRas9sGVYQAwNml2f80oxItVI7ml_icYSseX7g");

        MimeMessage mimeMessage = new MimeMessage(session);
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(text);
        transport.send(mimeMessage, mimeMessage.getAllRecipients());
    }

}
