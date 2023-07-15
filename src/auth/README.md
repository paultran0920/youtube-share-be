### How does it work
1. User login with user and password with `/auth/login`
2. The `LocalAuthGuard` will verify given user and password, see the `validate` function, it will return a User object if valid
3. The `/auth/login` will call to `login` to generate a JWT key and return to the Client
4. The Client uses the returned access_token to call APIs
5. When calling a protected API, the `JwtAuthGuard` will validate the access_token in the request and extract it to a JSON object then call the `validate` function to validate it again (if needed), the result of `validate` function will be set back to request object
6. Now we can do the bussiness of API if the token is valid
