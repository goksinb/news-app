## 🔒 Security: Common Threats and How I Handled Them

When building any web application, it's important to think about security. My project could potentially face a few common threats, including:

### 1. Denial of Service (DoS) Attacks

This happens when someone sends a large number of requests to the server in a short amount of time, trying to overwhelm it and make it crash or become unavailable to real users.

### 2. Input Validation Issues

If the server doesn't check the data users send properly, attackers could send harmful input — for example, trying to access parts of the system they shouldn't, or even crash the server.

### Mitigation: Rate Limiting (for DoS Prevention)

To help protect my API against DoS attacks, I added rate limiting to my backend. This means that each IP address is only allowed to send a limited number of requests within a set time. If someone tries to send too many requests too fast, they are blocked for a while.

I used the `express-rate-limit` package to add this to my server.
