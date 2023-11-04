# M03W07 - Security & Real World HTTP Servers

### To Do
- [x] Storing passwords
- [x] Signed cookies
- [x] REST
- [x] HTTP Secure (HTTPS)

### Security Issue #1: Plain-text passwords
- We **never** want to store passwords as plain text
- Passwords should always be _hashed_
- **Hashing**:
  - Input is passed into a one-way function that transforms it and returns a scrambled output (the _hash_)
  - A hash function is _deterministic_: the same input yields the same hash
  - Given a hash (from a good, unbroken hash function), it is almost impossible to retrieve the
    original input
- Use hash functions specifically designed for password handling: argon2, scrypt, bcrypt
- Good implementations of password-hanlding hash functions add a random but non-secret _salt_ to
  the input prior to hashing
- This [helps to protect against Rainbow Table attacks](https://stackoverflow.com/questions/420843/how-does-password-salt-help-against-a-rainbow-table-attack)

### Security Issue #2: Cookies

#### Issue 2a: Plain-text cookies
- Cookies are sent to the client, so in general it should not contain sensitive data
- Cookies should be **encrypted** no matter its content anyway, for example, with [cookie-encrypter](https://www.npmjs.com/package/cookie-encrypter)
  - **Encryption**:
    - Plaintext and a **key** is passed into a _trapdoor_ function that transforms the plaintext and
      returns a scrambled output (the _ciphertext_)
    - A ciphertext can only be _decrypted_ to retrieve the plaintext given the same **key** that was
      used to encrypt it

#### Issue 2b: Cookie stealing
- Encryption may hide sensitive data, but it does not prevent stealing of cookies.
- How does the server ensure that a cookie it receives is the original one it had sent (e.g. a hacker
  did not just steal the cookie from another user)?
- `cookie-session` helps us verify the integrity of cookies by adding a **signature**
  - The signature is a [keyed-hash message authentication code](https://en.wikipedia.org/wiki/HMAC),
  a method that (1) combines the key and the cookie value, and then (2) hash it.
  - This signature is sent along with the original cookie.
  - When we receive a cookie, `cookie-session` verifies that the signature matches the hash of the cookie
    from the client. If someone tampers with the cookie, the hashes would not match


### Security Issue #3: Man-in-the-middle (MiTM) attack
- Our passwords (along with everything else) are still sent in plaintext.
- HTTP**S** (TLS/SSL 1.3) to the rescue! TLS is a [complex](https://tls13.xargs.org/) protocol.
- A related MiTM problem is how does a client trust that the server it is talking to is actually
  the actual owner of the domain?
    - The server needs to present some proof (**certificate**) that is _signed_ by a
      **Certificate Authority** that the client trusts.
- See [this video](https://www.youtube.com/watch?v=10aVMoalON8) for a high-level explanation of TLS
  and certificates

### REST (Representational State Transfer)

* REST means that the path that we are going to should represent the data being transferred
* An API that uses the REST convention is said to be RESTful
* RESTful routes look like:

  | **Method** | **Path** | **Purpose** |
  |:---:|:---|:---|
  | GET | /resources | Retrieve all of a resource (Browse) |
  | GET | /resources/:id | Retrieve a particular resource (Read) |
  | POST | /resources/:id | Update a resource (Edit) |
  | POST | /resources | Create a new resource (Add) |
  | POST | /resources/:id/delete | Delete an existing resource (Delete) |

* RESTful API's have some advantages:
  * If I know that your API is RESTful, then I can easily guess at what endpoints you have defined and I don't need to read your documentation to figure it out
  * Results in clean URLs (ie. `/resources` instead of `/get-my-resource`)
  * The desired action is implied by the HTTP verb
  * This method of specifying URLs is chainable (eg. `/users/123`, `/users/123/resources` or `/users/123/resources/456`)

* Selectors are typically plural (eg. `/resources`, `/users`)
* Actions are typically singular (eg. `/login`, `/register`)

### More HTTP Methods
- We have more [*verbs*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) available to us than just `GET` and `POST`
- Popular ones are `PUT`, `PATCH`, and `DELETE`
- `PUT`: used to replace an existing resource
- `PATCH`: update part of an exisiting resource
- `DELETE`: delete an existing resource
- We can access these other methods via AJAX requests (we'll introduce you to AJAX in week 4) or by using the [`method-override`](https://www.npmjs.com/package/method-override) package
- Using these new verbs, our routes table now looks like:

  | **Method** | **Path** | **Purpose** |
  |:---:|:---|:---|
  | GET | /resources | Retrieve all of a resource (Browse) |
  | GET | /resources/:id | Retrieve a particular resource (Read) |
  | PUT | /resources/:id | Replace a resource (Edit) |
  | PATCH | /resources/:id | Update a resource (Edit) |
  | POST | /resources | Create a new resource (Add) |
  | DELETE | /resources/:id | Delete an existing resource (Delete) |

### Useful Links
* [How HTTPS Works (...and SSL/TLS too)](https://www.youtube.com/watch?v=10aVMoalON8)
* [RESTful API Tutorial](https://restfulapi.net/)
