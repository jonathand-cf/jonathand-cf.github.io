---
title: "Jellyfin 2FA: A standalone login flow for TOTP"
categories: projects
open_new_tab: true
author_profile: true
toc: true
toc_sticky: true
---

This plugin adds a standalone 2FA login flow for Jellyfin and backend endpoints for enrolling users in TOTP.

![2fa](/assets/images/jlfin2fa.png)

[![Repo](https://img.shields.io/badge/repo-jonathand--cf%2Fjellyfin--plugin--twoFA-1f2937?logo=github)](https://github.com/jonathand-cf/jellyfin-plugin-twoFA)

## Why I built this

I wanted to share my Jellyfin server publicly, but still require 2FA for browser logins.
Instead of modifying `jellyfin-web`, I made a standalone 2FA login flow that lives at
`/sso/2fa`. The default Jellyfin login page still works, which keeps existing clients
and the official web UI unchanged. I wanted it to be *easier* to connect to SSO authentications like Authentik, but it seems to be harder than i imagined.

## What it does

- A dedicated 2FA login page at `/sso/2fa`
- TOTP enrollment and verification
- Optional per-user enrollment without touching `jellyfin-web`

## Preview

![2fapreview](/assets/images/2fa.png)

If you want more screenshots and gifs, check the README in this repo.

## How it works

1. User opens `/sso/2fa`
2. Enrolls once by generating a secret and scanning it in an authenticator app
3. Logs in with username, password, and the TOTP code

## Install

Build and copy the plugin output into your Jellyfin plugins folder, then restart.

If you prefer the repo URL, add this in Dashboard -> Plugins -> Repositories:

```url
https://raw.githubusercontent.com/jonathand-cf/jellyfin-plugin-twoFA/dist/manifest.json
```

## Usage

Open the 2FA login page:

```url
http://YOUR_JELLYFIN:8096/sso/2fa
```

With a reverse-proxy path like `/jellyfin`:

```url
https://yourdomain/jellyfin/sso/2fa
```

Enroll:

- Enter username and password
- Click "Generate secret"
- Add the secret or OTP URI to your authenticator app
- Enter the code and confirm

Then sign in with username, password, and OTP.

## Reverse proxy redirect (optional)

To force browser logins through the 2FA page, redirect `/web/index.html` when it has
the login query.

Nginx example:

```bash
location = /web/index.html {
  if ($args ~* "login") {
    return 302 /sso/2fa;
  }
}
```

Caddy example:

```bash
@login path /web/index.html
@login query *login*
redir @login /sso/2fa 302
```

## Notes

- The default Jellyfin login remains available.
- The plugin stores per-user 2FA settings in the plugin configuration directory.
- I use Cloudflare tunnels and block the Jellyfin auth endpoints at the tunnel level
  so browser logins go through `/sso/2fa`, while native clients keep working.

## Build

```bash
dotnet build Jellyfin.Plugin.2FA.sln
```

```bash
dotnet publish Jellyfin.Plugin.2FA/Jellyfin.Plugin.2FA.csproj -c Release -o ./publish
```
