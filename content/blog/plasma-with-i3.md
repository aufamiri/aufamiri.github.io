---
title: "Lazy Modder, Combining Plasma with I3"
date: 2020-11-26T14:56:48+07:00
publishdate: 2020-11-26T14:56:48+07:00
summary: " Dengan menggabungkan kemudahan plasma dan ketangkasan dari I3, kita bisa membuat DE yang enak tanpa memerlukan setup yang sangat banyak tanpa perlu menghilangkan estetika dan kemudahan dari I3. Bonusnya ? tampilan desktop yang lain dari yang lain dan enak dilihat ! " 
image: "/img/plasma+i3.png"
tags: ["Linux", "UI", "Plasma", "I3"]
---

![plasma-result.png](/img/plasma-result.png)

Plasma adalah satu DE yang paling terkenal dan paling banyak dipakai di Linux. Salah satu aspek yang paling disukai oleh para penggunanya adalah kustomisasinya yang sangat banyak, tapi, masih membuat usernya lebih produktif. Untuk pengguna yang baru menyelami Linux, sepertinya DE Plasma ini menjadi salah satu DE yang paling sering dipilih karena kemiripannya dengan UI Windows pada umumnya.

I3 adalah sebuah WM yang paling sering digunakan oleh pengguna Linux yang sudah cukup advance. Ukurannya yang kecil baik dari sisi memory maupun storage, ditambah dengan semakin berkurangnya user untuk menggunakan mouse (terutama dalam hal pindah - pindah window) membuat banyak sekali orang suka dengan filosofi dasar dari I3 ini.

Dari tadi, saya pakai term aneh - aneh seperti DE dan WM, tapi, apakah 2 kata itu ? DE atau _Dekstop Environment_ adalah tampilan dari suatu desktop di Linux. Anggap saja seperti Launcher kalo di Android. DE sendiri ada banyak macemnya, mulai dari Plasma, Gnome, Budgie, Deepin dan banyak lagi. 

Sedangkan WM, atau _Window Manager_ basically adalah bagian dari suatu DE yang bertanggung jawab untuk mengatur behaviour dari window - window dari program. Biasanya, suatu DE sudah memiliki WM yang diinclude kan di dalamnya, sebagai contoh adalah Plasma dengan KWin nya. Namun, ada juga WM yang dapat berdiri sendiri, seperti I3, Awesome, BSPWM dan banyak lagi.

Terkadang, Plasma (walaupun tampilannya sangat enak dilihat dan mudah dipake) masih memerlukan penggunanya untuk banyak pakai mouse dan sebagai seorang yang lumayan sering ngetik, sering - sering pegang mouse sepertinya bukan ide yang bagus karena bisa saja menimbulkan carpal-tunner dan sesuatu yang seperti itu. Di sisi lain, I3, setupnya makan banyak waktu, belum lagi kalo perlu debug gara - gara ada hal absurd yang terjadi yang disebabkan oleh config yang ga beres. 

Solusinya ? Gabungkan saja dua DE dan WM yang paling banyak dipake ini dan jadilah, sebuah Desktop yang mudah dioperasikan dari Plasma, tapi masih terasa jejak - jejak ketangkasan dari I3. Tentu saja ditambah tampilan yang unik dan lebih enak dipandang dari desktop Plasma biasa.

### Prequisites

- `plasma`, (kayaknya udah pasti deh... '-')
- `i3-gaps` atau kalo mau pinggiran windownya rada rounded, bisa pakai `i3-gaps-rounded-git`
- `picom`, kompositor yang lebih modern, penerus `compton`
- `feh`, wallpaper changer

### Installations
1.  Install seluruh package yang dibutuhkan pakai pacman atau yay. Kalau pake distro Linux yang lain (misal, Ubuntu) silahkan disesuaikan.

   ```
    sudo pacman -Syy
    sudo pacman-S feh picom i3-gaps
    ```

    atau, kalau ingin pakai yang versi rounded dari I3, kebetulan sudah ada yang bikin packagenya di [AUR](https://aur.archlinux.org/packages/i3-gaps-rounded-git/), silahkan pakai command ini apabila sudah terinstall yay sebelumnya. Atau kalau belum, bisa pakai AUR Helper lain atau ikuti [ini](https://wiki.archlinux.org/index.php/Arch_User_Repository#Installing_and_upgrading_packages)

    ```
    sudo pacman -Syy
    yay -S i3-gaps-rounded-git
    ```

2. jalankan `i3-config-wizard`. Command ini akan otomatis membuat config default I3 yang nantinya akan dikustomisasi lebih lanjut.

### Replace KWIN with I3
KWIN adalah WM yang sudah secara default dipakai di Plasma. Sebenarnya sudah ada dokumentasi yang lebih lengkap tentang bagaimana cara mengganti KWIN dengan WM yang lain di [site docs plasma](https://userbase.kde.org/Tutorials/Using_Other_Window_Managers_with_Plasma), tapi ya demi catetan yang lengkap, saya copas-kan saja kesini.

1. Buat bash script baru dan kasih nama `wm.sh`, copas code dibawah:
    ```
    #!/bin/sh
    export KDEWM=/usr/bin/i3
    ```
    Inti dari kode diatas adalah mengganti variabel default KDEWM yang awalnya adalah KWIN atau `/usr/bin/kwin` menjadi path ke I3. Plasma nantinya tinggal melakukan eksekusi KDEWM seperti biasa.

2. Buka terimnal, navigate ke direktori tempat script `wm.sh` tadi dibuat dan jalankan command `chmod +x wm.sh` supaya scriptnya bisa di execute.
3. Masuk ke **System Settings** -> **Startup and Shutdown** -> **AutoStart**
4. Klik tombol **Add Script**
5. Arahkan ke file yang sudah dibuat
6. Di kolom **Run On**, pilih **Before Session Startup** dari pilihan yang ada

![plasma-autostart.png](/img/plasma-autostart.png)

>  ⚠️ **Warning** ⚠️ : Jangan log out atau melakukan restart tanpa melakukan setup I3 terlebih dulu karena dapat menimbulkan masalah seperti ga bisa login balik ke desktop

### Configuring I3
Berhubung saya sudah merasa nyaman dan enak dengan keybinding dari VIM (Bahkan VSCode juga pake keybinding VIM :V), setup I3 saya kebanyakan mengambil dari sana. Kalo kurang suka dengan VIM, silahkan edit saja, ndak sulit kok.

Ada beberapa pengaturan yang wajib ada dalam file config I3 ini, kebanyakan dari setting - setting yang harus ada itu adalah konfigurasi khusus untuk Plasma seperti beberapa app yang harus di set sebagai floating window, notification shade agar tidak "mencuri" fokus saat muncul, dan banyak lagi...

1. Pergi ke https://gitlab.com/chillytaka/dotfiles/-/blob/master/i3_plasma/config dan download seluruh file yang ada.
2. Copas file yang sudah di download ke `/home/$USER/.config/i3/` (Ganti `$USER` dengan username saat ini). Kalo direktori `i3` nya belum ada, silahkan dibikin dulu.

### Kustomisasi I3
Before you start, there is a few things to watch out for
Sebelum melakukan restart atau log out, ada beberapa hal yang harus diperhatikan terlebih dahulu

### Merubab Default Modifier

Dalam I3 terdapat konsep modifier atau `$mod`. Ini digunakan oleh I3 untuk membedakan shortcut mana yang untuk I3, dan yang mana untuk program yang lain. Dalam konfigurasi dotfiles saya, saya memilih untuk menggunakan modifier `super`, karena.. yaa daripada ga kepake kan :v. Tapi kalo mau, bisa diganti menjadi tombol `Alt` dengan cara :

1. Pergi ke direktori `/home/$USER/.config/i3/` dan buka file `config` yang ada di situ.
2. Cari line

```
set $mod Mod4
```

 dan ganti dengan

```
set $mod Mod1
```

#### Merubah Konfigurasi Shortcut

Untuk informasi lebih lengkap tentang konfigurasi yang biasanya saya gunakan, silahkan lihat [dokumentasi berikut ini](https://gitlab.com/chillytaka/dotfiles#shortcut). Silahkan diganti senyamannya.

Contoh, untuk merubah shortcut untuk menutup window dari yang awal nya `$mod+shift+w` (menutup window disini maksudnya mirip seperti saat melakukan shortcut `alt+F4` yang biasa), cari line berikut :

```
# kill focused window
bindsym $mod+Shift+w kill
```

dan rubah ke (misal) `$mod+Ctrl+q`

```
# kill focused window
bindsym $mod+Ctrl+q kill
```
---

#### Merubah Folder Wallpaper 

Wallpaper disini dihandle menggunakan software `feh`. Default folder yang akan digunakan sebagai sumber foto wallpaper berada di `/home/$USER/Pictures/WP`. Ganti aja sesuai kebutuhan.


1. Pergi ke direktori `/home/$USER/.config/i3/` dan buka file `config` yang ada di situ.
2. cari line ini

```
exec --no-startup-id feh --randomize --bg-fill $HOME/Pictures/WP
```

dan ganti sesuai keinginan. Kalau tidak kepingin menggunakan 1 folder, bisa juga dengan hanya menggunakan 1 file seperti ini :

```
exec --no-startup-id feh --bg-fill $HOME/Pictures/cool-wallpaper.png
```

dokumentasi FEH dapat dilihat [disni](https://www.systutorials.com/docs/linux/man/1-feh/), atau buka terminal dan masukkan command `feh --help`

---

#### Rounded Gaps

Kalau memilih varian rounded dari I3, tambahkan line ini dibagian paling bawah config.

1. Pergi ke direktori `/home/$USER/.config/i3/` dan buka file `config` yang ada di situ.
2. tambahkan line berikut.

```
#Border Radius
border_radius 10
```

### Konfigurasi Picom

Picom adalah sebuah XWindow Compositor. Normalnya, Plasma sudah memiliki compositor built-in yang sudah secara otomatis terinstall saat kita melakukan instalasi Plasma. Sayangnya, kompositor bawaan Plasma ini tidak bisa mempengaruhi window yang dihandle oleh I3, sehingga mau tidak mau, kita harus menggunakan kompositor lain. Dan salah satu yag paling sering digunakan saat ini adalah Picom.

Tapi, apa sih kompositor itu ? Kompositor adalah sebuah program simpel yang akan memberi arahan pada XServer (Software yang menghandle seluruh GUI di Linux) bagaimana caranya untuk melakukan render suatu window. Beberapa kompositor sangat basic dengan settingan yang default dan tidak bisa dikustomisasi lagi, beberapa yang lain memiliki fitur yang sangat banyak dengan kustomisasi seabrek.

Dan FYI, kompositor inilah yang membuat window di screenshot di atas menjadi sedikit transparent dengan background blur dan tidak full opaque pada umumnya.

 Untuk menambahkan konfigurasi picom tersebut, silahkan lakukan langkah berikut,

1. Bikin direktori baru di `/home/$USER/.config/picom` (Ganti `$USER` dengan username saat ini).
2. Donwload file konfigurasi di https://gitlab.com/chillytaka/dotfiles/-/blob/master/picom/picom.conf
3. Copas file nya ke `/home/$USER/.config/picom/`

### Reload & Enjoy

Setelah semuanya disetup dengan baik dan benar, coba Log Out / Restart / Cabut - Pasang. Dan nikmati tampilan plasma yang baru ^_^