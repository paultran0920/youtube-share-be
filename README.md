# First time app setting up
## Generate the Super Admin token
1. Open the API request tool
2. Try the `POST` request to this path `<domain>/auth/login` whith the following JSON in the request body

```json
{
    "username": "super.admin@gmail.com",
    "password": "Abc@123456"
}
```
3. Setup your API token request with the returned one

## Create new User account
1. Create new User account for your test by sending a `POST` request to `https://<domain>/account` with correct JSON body as following sample
```json
{
    "email": "paul.tran.user@gmail.com",
    "password": "Abc@123456",
    "status": "Activated",
    "role": "User",

    "name": "Paul Tran User",
    "contact": "12355667899"
}
```

## Create new Admin account
1. Similar to the previous step, you can create new Admin account for your test by  sending a `POST` request to `https://<domain>/account` with correct JSON body as following sample
```json
{
    "email": "paul.tran.admin@gmail.com",
    "password": "Abc@123456",
    "status": "Activated",
    "role": "Admin",

    "name": "Paul Tran Admin",
    "contact": "12355667899"
}
```



For local environment, the configuration will be in `local` directory

```
local
   logs
   .env
```

`.env` file

```env
PORT=18082
JWT_KEY="<Key>"

DB_URL="localhost"
DB_PORT=13306
USER_NAME="yeah_user"
PASSWORD="yeah_passowrd"
DATABASE="yeah_db"
```
