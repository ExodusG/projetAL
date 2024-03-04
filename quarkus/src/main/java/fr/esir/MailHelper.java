package fr.esir;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.Collections;

@Path("/mail")
public class MailHelper {

    @Inject
    ReactiveMailer reactiveMailer;
    @GET
    public Uni<Void> hello() {
        Mail mail = new Mail();
        mail.setFrom("test@gmail.com");
        mail.setSubject("Test");
        mail.setTo(Collections.singletonList("testto@gmail.com"));
        mail.setText("Test body");
        return reactiveMailer.send(mail);
    }
}
