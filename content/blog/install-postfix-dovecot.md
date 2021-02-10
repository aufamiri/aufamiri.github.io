---
title: "Install Postfix dan Dovecot"
date: 2021-02-10T10:34:24+07:00
summary: "Membuat mailserver sendiri, kirim email ke berbagai mailserver yang sering dipakai orang lain (contoh : gmail), dan mengakses mailserver tersebut secara remote lewat telnet atau smtp client lainnya"
tags: ["Linux", "Server"]
draft: true
---

### Background

Postfix adalah sebuah MailServer yang paling banyak dipakai oleh administrator - administrator server Linux di dunia. Konfigurasinya yang mudah dan tidak terlalu banyak membuat Postfix menjadi pilihan pertama banyak orang.

Dovecot adalah IMAP dan POP3 client yang juga sering dipakai dan biasanya disandingkan dengan postfix sebagai client nya. IMAP dan POP3 adalah protokol yang digunakan untuk menerima dan mengirimkan email dari server secara remote. Untuk client IMAP dan POP3 sendiri sudah sangat banyak, seperti Mozilla Thunderbird, Outlook dan bahkan aplikasi email bawaan yang dulu biasanya ada di Android (dan ga pernah dipake karena gmail udah jadi bawaan dan ga bisa uninstall....)

### Prequisites

- `postfix`
- `mailtuils`, untuk melakukan test di lokal server
- `dovecot-imapd`, dovecot IMAP Protokol Support
- `dovecot-pop3d`, dovecot POP3 Protokol Support
- domain


