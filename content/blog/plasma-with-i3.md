---
title: "Lazy Modder, Combining Plasma with I3"
date: 2020-11-26T14:56:48+07:00
publishdate: 2020-11-26T14:56:48+07:00
summary: " By combining the ease of use of Plasma and the versatility of I3, we can create a wonderful Desktop Environment that require little setup while not losing the essence of I3. And the good looks come as a bonus ! " 
image: "/img/plasma+i3.png"
tags: ["Linux", "UI", "Plasma", "I3"]
drafts: true
---

![plasma-result.png](/img/plasma-result.png)

Plasma is one of the most widely-used Dekstop Environment on Linux. It boast lots of customization while still keeping the user more productive. For a new user, Plasma might be their first choice of Dekstop Environment as it is closely resemble a Windows UI.

I3 is one of the most widely-used Tiling Window Manager. With its little footprint both in memory and storage, not to mention reduce usage of mouse handling, many people like the philosopy of the I3.

Sometime, Plasma (while good looking and easy to use) required the user to use lots of mouse handling and as a typist, this might be not desirable because of carpal-tunnel and the like. I3 however, require lots of time to setup, not including some unknown things happening when our config didn't work properly.

By combining the ease of use of Plasma and the versatility of I3, we can create a wonderful Desktop Environment that require little setup while not losing the essence of I3. And the good looks come as a bonus !

### Prequisites

- `plasma`, (obviously... '-')
- `i3-gaps` or if you wanted to have a rounded corner, use `i3-gaps-rounded-git`
- `picom`, a modern compositor, replacing `compton`
- `feh`, wallpaper changer

### Installations
1. First install all of the above packages using pacman and yay. If you are using another distro (like Ubuntu for example) use your own package manager 
   ```
    sudo pacman -Syy
    sudo pacman-S feh picom i3-gaps
    ```
    or if you want to use the rounded version of i3-gaps, it is available in [AUR](https://aur.archlinux.org/packages/i3-gaps-rounded-git/), so use this command instead
    ```
    sudo pacman -Syy
    yay -S i3-gaps-rounded-git
    ```

2. run `i3-config-wizard`. This command will initialize the default i3 configuration.

### Replace KWM with I3
KWM is the default Window Manager on Plasma. There is a good documentation about changing KWM into another WM on the Plasma [site](https://userbase.kde.org/Tutorials/Using_Other_Window_Managers_with_Plasma), but for the sake of keeping notes, I will included it here as well.

1. Create a new shell script named it `wm.sh`, copy-paste the following codes:
    ```
    #!/bin/sh
    export KDEWM=/usr/bin/i3
    ```
2. Open terminal, go to the directory of the created `wm.sh` and run `chmod +x wm.sh` to make the script executable
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