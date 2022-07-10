<?php

use Mailgun\Mailgun;

// MAILER
function mailer($mail){

    $SENDER_DOMAIN = "ecomistan.com";
    $MAILGUN_FROM_EMAIL = "info@ecomistan.com";

    $mg = Mailgun::create("key-528ca6d92f9006dea5fdb43e68464ee8"); // API PUBLIC KEY

    $mg->messages()->send($SENDER_DOMAIN, [
        'from'    => 'ecomistan <postmaster@ecomistan.com>',
        'to'      => ''.$mail['name'].' <'.$mail['email'].'>',
        'subject' => ''.$mail['subject'].'',
        'template'    => 'global',
        'h:X-Mailgun-Variables'    => '{
            "link": "'.$mail['link'].'",
            "code":"'.$mail['code'].'",
            "title":"'.$mail['subject'].'",
            "content_title":"'.$mail['content_title'].'",
            "content":"'.$mail['content'].'"
        }'
    ]);
    return $mg;
}