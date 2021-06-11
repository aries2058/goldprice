package com.dandj.jtoday.service.func;

import com.dandj.jtoday.dto.apis.MailDto;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "YOUR_EMAIL_ADDRESS";

    public void mailSend(MailDto mailDto) {
        MimeMessagePreparator messagePreparator = miemMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(miemMessage);
            messageHelper.setFrom(MailService.FROM_ADDRESS);
            messageHelper.setTo(mailDto.getAddress());
            messageHelper.setSubject(mailDto.getTitle());
            String content = mailDto.getMessage();
            messageHelper.setText(content,true);

        };
        mailSender.send(messagePreparator);
    }
}