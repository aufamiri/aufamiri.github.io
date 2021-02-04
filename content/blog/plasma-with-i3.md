---
title: "Lazy Modder, Combining Plasma with I3"
date: 2020-11-26T14:56:48+07:00
publishdate: 2020-11-26T14:56:48+07:00
summary: " Dengan menggabungkan kemudahan plasma dan ketangkasan dari I3, kita bisa membuat DE yang enak tanpa memerlukan setup yang sangat banyak tanpa perlu menghilangkan estetika dan kemudahan dari I3. Bonusnya ? tampilan desktop yang lain dari yang lain dan enak dilihat ! " 
image: "/img/plasma+i3.png"
tags: ["Linux", "UI", "Plasma", "I3"]
drafts: true
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
3. Go to **System Settings** -> **Startup and Shutdown** -> **AutoStart**
4. Click the **Add Script** button
5. Navigate to the script created earlier
6. In the **Run On** column, select **Before Session Startup** from the dropdown list

![plasma-autostart.png](/img/plasma-autostart.png)

>  ⚠️ **Warning** ⚠️ : Do not log out before you setup the I3 properly as it can cause unnecessary problems such as unable to start the plasma desktop.

### Configuring I3
As I already used to the VIM Keybinding, My I3 setup is heavily inspired by it. You can however, edit all those shorcuts to your liking. 

Inside the config there is some Plasma specific configuration as well such as, some apps need to be set as floating window, notification need to have their proper focus settings, etc... 

1. Go to https://gitlab.com/chillytaka/dotfiles/-/blob/master/i3_plasma/config and download the files.
2. Copy the files to `/home/$USER/.config/i3/`. Make sure to change the `$USER` to your username. Feel free to create the directory if the directory is missing.

### Customizing I3
Before you start, there is a few things to watch out for

#### Change the Shortcut

For more information about my pre-configured setup, see [this doc](https://gitlab.com/chillytaka/dotfiles#shortcut). Feel free to change it to your liking.

for example, to change the quit windows shortcut from the default `super+shift+w` ( think of it like the usual `alt+F4` shortcut ), search for this line :

```
# kill focused window
bindsym $mod+Shift+w kill
```

and change it to for example `super+ctrl+q`

```
# kill focused window
bindsym $mod+Ctrl+q kill
```
---

#### Change Wallpaper

the default folder for Wallpaper is at `/home/$USER/Pictures/WP`. You can change to whatever directory that you desire.


file location : `/home/$USER/.config/i3/config`

search for this line

```
exec --no-startup-id feh --randomize --bg-fill $HOME/Pictures/WP
```

and change it to whatever that you desire. You can even change it to only use a single file like this

```
exec --no-startup-id feh --bg-fill $HOME/Pictures/cool-wallpaper.png
```

---

#### Rounded Gaps

If you are using a the rounded gaps, add this to bottom of the config

file location : `/home/$USER/.config/i3/config`

```
#Border Radius
border_radius 10
```

### Picom Setup
Picom is a Xwindow compositor. Normally, Plasma has has its own built-in compositor, unfortunately, there is no way to make the built-in compositor affecting our i3 window as well, so we need another compositor to handle that.

So, what is a compositor ? A compositor is a simple program that dictate how a window will render on the screen. Some compositor is very basic with little to no customization available to the user, some is complex with vast amount of customization.

 To add picom config, 

 1. If it is not available, create a new directory in `/home/$USER/.config/picom/`
 2. download the files at https://gitlab.com/chillytaka/dotfiles/-/blob/master/picom/picom.conf

3. place the files at the `/home/$USER/.config/picom/`

### Reload & Enjoy

After everything is setup properly, try to logout and then log back in. Enjoy your new plasma looks !