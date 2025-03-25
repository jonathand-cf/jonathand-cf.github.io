---
title: "Adding Ruby to Windows Terminal"
categories: tutorials
open_new_tab: true
toc_sticky: true
author_profile: false
toc: true
---
## How to add Ruby to windows terminal

### First you need to install Ruby

I used [RubyInstaller](https://rubyinstaller.org/downloads/) with Devkit, but you can get it [however you like](https://www.ruby-lang.org/en/documentation/installation).

Now Ruby should be installed at ```%SystemDrive%\RubyXX-XXX```

### Open Windows Terminal Settings

![Terminal Settings screenshot](/assets/images/terminalSettings.png)

Scroll to the bottom on the *left pane* and click:

> \+ Add a new profile

> \+ New empty profile

![Terminal Open screenshot](/assets/images/terminalOpen.png)

#### Name it Ruby (or whatever you like)

If Ruby was installed at ```%SystemDrive%\RubyXX-XXX``` open the *Command line* dropdown and paste:

```
%SystemRoot%\System32\cmd.exe /E:ON /K "C:\Ruby33-x64\bin\ridk enable && cls"
```

**Change ```Ruby33-x64``` to whatever version of ruby you installed**

![Command line](/assets/images/rubyCommandLine.png)

### Done

Remember to save

#### Add an icon

You should also find the Ruby icon here:

```
%SystemDrive%\Ruby33-x64\share\doc\ruby\html\images\ruby-doc.ico
```

or download it [here](https://iconduck.com/icons/102383/file-type-ruby#).
