---
title: "PwnSec CTF 2025 - Warmup Challenge Writeup"
categories: writeups
open_new_tab: true
author_profile: true
classes: wide
---

Though this writeup only covers the warmup challenge (all I had time for), I found it interesting enough to document. Here's how I approached it.

---

## Challenge Details

**Name:** warmup  
**Category:** Web  
**Difficulty:** Easy  
**Points:** 100  
**Solves:** 242  

**Description:**  
> Just a normal warmup challenge. Here are the guest credentials: `guest:guest123`. The flag is in `/flag.txt`. — @qlashx

**CTF URL:** <https://pwnsec.ctf.ae/>

---

## Initial Reconnaissance

Of course, my first attempt was to access the flag directly at `https://987f83272321cbb2.chal.ctf.ae/flag.txt`, but that returned a 404 no matter how I tried (curl, browser, different formats).

For any web challenge with an authentication screen, Burp Suite is my go-to tool.

## Exploiting the Password Change Function

After logging in with the provided credentials (`guest:guest123`), I noticed the application had a password change feature that only required a user ID. Since the guest user was ID 1, I suspected I could change passwords for other users, including the admin.

![Change Password Screen](/assets/images/pwnsecWriteup/change_password.png)

### Finding the Admin User ID

Looking at the requests in burp suite, i noticed all passwords are changed with the payload:

```http
user_id=1&new_password=password&confirm_password=password
```

To find the admin user's ID, I used Burp Suite's **Intruder** tool to brute-force user IDs.

![Intruder Configuration](/assets/images/pwnsecWriteup/passwordIntruder.png)

I configured the attack to increment `user_id` from 1 to 100 with the following payload:

```http
user_id=§1§&new_password=password&confirm_password=password
```

After the attack completed, I logged in with `admin:password` and gained access to the admin panel.

![Admin Panel](/assets/images/pwnsecWriteup/admin_panel.png)

Success! I was now in the admin panel.

## Directory Enumeration

Next, I attempted to fuzz the site with **gobuster** using my authenticated admin session cookie, but didn't find much beyond the expected routes:

```bash
===============================================================
Gobuster v3.8.2
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     https://cc21c2f2893d11cf.chal.ctf.ae
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                SecLists/Discovery/Web-Content/common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.8.2
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
admin                (Status: 200) [Size: 8172]
change_password      (Status: 200) [Size: 8402]
dashboard            (Status: 200) [Size: 7361]
login                (Status: 200) [Size: 7715]
logout               (Status: 302) [Size: 189] [--> /]
Progress: 4750 / 4750 (100.00%)
===============================================================
Finished
===============================================================
```

Nothing particularly useful there.

## Exploiting the Web Crawler

The admin panel featured an **external web crawler** tool with some interesting restrictions:

- No numbers allowed (so I couldn't use the challenge URL directly)
- No `localhost` allowed

After some research (and maybe a nudge from ChatGPT), I remembered that `file://` is a valid URI scheme that bypasses these restrictions. Given the challenge description mentioned the flag at `/flag.txt`, I tried:

```text
file:///flag.txt
```

And boom, the crawler returned the flag!

![Crawled Flag](/assets/images/pwnsecWriteup/crawled_flag.png)

I really should have thought of the `file://` URI scheme earlier!

## Flag

```txt
flag{02c31aad154f4027}
```

---

## Lessons Learned

- **IDOR (Insecure Direct Object Reference)**: The password change function didn't validate user permissions, allowing privilege escalation.
- **SSRF (Server-Side Request Forgery)**: The web crawler accepted `file://` URIs, enabling local file access.
