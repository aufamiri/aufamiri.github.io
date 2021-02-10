---
title: "Install Smtp Client"
date: 2021-02-09T16:46:08+07:00
publishdate: 2021-02-09T16:46:08+07:00
summary: " Cara melakukan instalasi SMTP Client, merupakan serangkaian tools yang **niatnya** saya pakai untuk melakukan server monitoring..... sebelum akhirnya projectnya mangkrak dan milih pake uptimerobot :v " 
image: "/img/msmtp.png"
tags: ["Linux", "Server"]
---

![plasma-result.png](/img/msmtp.png)

# Background Story

Setelah proses instalasi icinga2 pada Raspberry Pi berhasil, saya perlu menemukan cara kalau server yang saya pantau sedang down. Icinga2 sendiri memiliki beberapa protokol yang bisa digunakan untuk mengirimkan notifikasi, menurut saya, yang paling enak adalah mengirimkan notifikasi melalui email sehingga notifikasi tersebut pasti akan langsung masuk ke HP saya. Selain itu, proses konfigurasi yang (seharusnya) relatif mudah juga menjadi salah satu faktor utama.

# Requirements
1. Raspberry PI
2. akun gmail

# Installation

## Sebelum Mulai

Secara default, gmail akan memblokir akses ke akun email melalui port 587. Satu - satunya cara adalah dengan melakukan enable pada **Less Secure App Access** di bagian setting google.

1. Masuk ke bagian pengaturan google
2. Pilih tab **Security**
3. Enable Less Secure App Access

**Note** : Apabila akun menggunakan 2FA, bisa menggunakan **App Passwod**. Petunjuk untuk melakukan itu bisa dilihat [disini](https://support.google.com/accounts/answer/185833)

## Install SMTP client
Kita perlu menginstall sebuah client untuk membantu kita dalam membuat request kepada smtp milik gmail, ada banyak sekali smtp client yang terkenal dan sering dipakai, seperti misalnya **ssmtp**, **msmtp** dan **OpenSMTPD**. Disini saya akan menggunakan **msmtp** karena walaupun ssmtp lebih terkenal dan lebih sering dipakai, per bulan **Maret 2019** status ssmtp berubah menjadi unmantained.

silahkan lakukan command berikut :

```
sudo apt update
sudo apt install msmtp msmtp-mta
```

Kemudian masuk ke direktori `$HOME` dan bikin file baru dengan nama `.msmtprc`

Silahkan copy paste isi file `.msmtprc`:

```

# Set default values for all following accounts.
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        ~/.msmtp.log

# Gmail
account        gmail
host           smtp.gmail.com
port           587
from           USERNAME_GMAIL@gmail.com
user           USERNAME_GMAIL 
password       PASSWORD_GMAIL

# Set a default account
account default : gmail 

```

**penjelasan**
auth : lakukan autentikasi pada server smtp yang dituju
tls : gunakan protokol tls
tls_trust_file : ca-certificates untuk sertificate tls nya
logfile : lokasi tempat msmtp menyimpan log file nya.

account : nama akun
host : server smtp yang ingin dihubungkan
port : port smtp server (biasanya 465 atau 587)
from : sender email
user : username akun email
password : password akun email

account default : opsi ini berguna apabila terdapat beberapa email dalam satu konfigurasi, sebagai akun default tempat email dikirimkan

untuk mengetest apakah konfigurasi sudah benar atau tidak, lakukan command berikut :
`echo "HALO" | mail -s "test" email.tujuan@gmail.com`
apabila email sudah diterima di email tujuan, selamat, berarti konfigurasi sudah benar !

