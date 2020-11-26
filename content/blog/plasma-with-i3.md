---
title: "Lazy Modder, Combining Plasma with I3"
date: 2020-11-26T14:56:48+07:00
publishdate: 2020-11-26T14:56:48+07:00
image: "/img/plasma+i3.png"
draft: true
---

## Prequisites

- `plasma`, (obviously... '-')
- `i3-gaps` or if you wanted to have a rounded corner, use `i3-gaps-rounded-git`
- `picom`, a modern compositor, replacing `compton`
- `feh`, wallpaper changer

## Installations
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

## Replace KWM with I3
KWM is the default Window Manager on Plasma. There is a good documentation about changing KWM into another WM on plasma site, but for the sake of keeping notes, I will included it here as well.