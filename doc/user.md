# User Api Spesification

## Url Endpoint

- /api/v1/signup
- /api/v1/signin
- /api/v1/user

### Signup / Register

Endpoint : /api/v1/signup

Method : POST

**Headers**

- Content-Type: application/json

**Body Request**

```
{
  email: string (require)
  username: string (require)
  password: string (require)
}
```

```
{
  email: 'example@gmail.com',
  username: 'example',
  password: 'example123'
}
```

**Response Failed**

Ketika body request kosong

- status code : 400

```
{
  status: 'fail',
  message: 'Gagal mendaftar. Data yang di masukkan tidak lengkap'
}
```

Ketika email atau username sudah digunakan

- status code : 409

```
{
  status: 'fail',
  message: 'Gagal mendaftar. Email atau Username sudah digunakan'
}
```

**Response Suceess**

- status code : 201

```
{
  status: 'success',
  message: 'Berhasil mendaftar'
}
```

### Signin / Login

Endpoint : /api/v1/signup

Method : POST

**Headers**

- Content-Type: application/json

**Body Request**

```
{
  email: string (require)
  password: string (require)
}
```

```
{
  email: 'example@gmail.com',
  password: 'example123'
}
```

**Response Failed**

Ketika body request kosong

- status code : 400

```
{
  status: 'fail',
  message: 'Gagal masuk. Data yang di masukkan tidak lengkap'
}
```

Ketika email atau password salah

- status code : 401

```
{
  status: 'fail',
  message: 'Gagal masuk. Email atau Password salah'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'Berhasil masuk'
  data: {
    accessToken: 'hbAUIHSHjd23244.858HDNJhdscd.jsdnfn464'
  }
}
```

### Get User

Endpoint : /api/v1/user

Method : GET

**Headers**

- Content-Type: application/json
- Authorization : Bearer {accessToken}

**Response Failed**

Ketika accessToken tidak ada

- status code : 401

```
{
  status: 'fail',
  message: 'Anda belum login. Silahkan login kembali'
}
```

Ketika accessToken tidak valid

- status code : 401

```
{
  status: 'fail',
  message: 'invalid signature'
}
```

Ketika user tidak ditemukan

- status code : 404

```
{
  status: 'fail',
  message: 'User tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  data: {
    user: {
      email: 'example@gmail.com',
      username: 'example'
    }
  }
}
```

### Delete user

Endpoint : /api/v1/user

Method : DELETE

**Headers**

- Content-Type: application/json
- Authorization : Bearer {accessToken}

**Response Failed**

Ketika accessToken tidak ada

- status code : 401

```
{
  status: 'fail',
  message: 'Anda belum login. Silahkan login kembali'
}
```

Ketika accessToken tidak valid

- status code : 401

```
{
  status: 'fail',
  message: 'invalid signature'
}
```

Ketika user tidak ditemukan

- status code : 404

```
{
  status: 'fail',
  message: 'User tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'User berhasil dihapus'
}
```

### Change User Password

Endpoint : /api/v1/user

Method : PATCH

**Headers**

- Content-Type: application/json
- Authorization : Bearer {accessToken}

**Request Body**

```
{
  oldPassword: string (require),
  newPassword: string (require)
}
```

```
{
  oldPassword: 'john123',
  newPassword: 'john234'
}
```

**Response Failed**

Ketika accessToken tidak ada

- status code : 401

```
{
  status: 'fail',
  message: 'Anda belum login. Silahkan login kembali'
}
```

Ketika accessToken tidak valid

- status code : 401

```
{
  status: 'fail',
  message: 'invalid signature'
}
```

Ketika body request kosong

- status code : 400

```
{
  status: 'fail',
  message: 'Gagal ubah password. Data yang dimasukkan tidak lengkap'
}
```

Ketika password lama tidak cocok

- status code : 400

```
{
  status: 'fail',
  message: 'Gagal ubah Password. Password lama tidak cocok'
}
```

Ketika user tidak ditemukan

- status code : 404

```
{
  status: 'fail',
  message: 'User tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'Password berhasil di ubah.'
}
```
