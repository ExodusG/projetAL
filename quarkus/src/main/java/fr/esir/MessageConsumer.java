package fr.esir;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Collections;
import java.util.concurrent.CompletionStage;

@ApplicationScoped
public class MessageConsumer {
    @Inject
    ReactiveMailer mailer;
    @Incoming("msg")
    public Uni<Void> consume(byte[] msg) {
        System.out.println("Payload: " + new String(msg));
        Mail mail = new Mail();
        mail.setFrom("test@gmail.com");
        mail.setSubject("Test");
        String message=new String(msg);
        String[] mails=message.split("\"*\"");
        mail.setTo(Collections.singletonList(mails[9]));
        //mail.setText("Test body");
        mail.setText(mails[9]);
        return mailer.send(mail);
    }
}
