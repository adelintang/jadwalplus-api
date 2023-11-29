# Schedules Api Spesification

## Endpoint

- /api/v1/schedules

**Schema Schedule**

```
{
  id: string,
  schedule: string,
  dateTime: string,
  finished: boolean,
  createdAt: string,
  userId: string
}
```

### Get All Schedules

Endpoint : /api/v1/schedules

Method : GET

**query params**

- schedule (optional)

**Headers**

- Content-Type: application/json
- Authorization: Bearer {accesToken}

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

**Response Success**

Ketika ada query params

- status code : 200

```
{
  status: 'success',
  data: {
    schedules: [
      {
        id: 'bsdhbcj566363',
        schedule: 'nobar bola',
        dateTime: '2023-11-14T14:00:10.690Z',
        finished: false,
        createdAt: '2023-11-14T14:00:10.690Z'
      },
       {
        id: 'bsdhbcj566363',
        schedule: 'nobar volly',
        dateTime: '2023-11-14T14:00:10.690Z',
        finished: false,
        createdAt: '2023-11-14T14:00:10.690Z'
      }  
    ]
  }
}
```

Ketika query params kosong

- status code : 200

```
{
  status: 'success',
  data: {
    schedules: [
      {
        id: 'bsdhbcj566363',
        schedule: 'Rapat BEM',
        dateTime: '2023-11-14T14:00:10.690Z',
        finished: false,
        createdAt: '2023-11-14T14:00:10.690Z'
      },
      {
        id: 'bsdhbcj56636suihfus',
        schedule: 'Mengerjakan tugas kalkulus',
        dateTime: '2023-11-14T14:00:10.690Z',
        finished: false,
        createdAt: '2023-11-14T14:00:10.690Z'
      }
    ]
  }
}
```

### Get Schedule

Endpoint : /api/v1/schedules/:id

Method : GET

**Headers**

- Content-Type : application/json
- Authorization: Bearer {accessToken}

**Request Params**

- id

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

Ketika schedule tidak di temukan

- status code : 404

```
{
  status: 'fail',
  message: 'Schedule tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  data: {
    schedule: {
      id: 'bsdhbcj566363',
      schedule: 'Rapat BEM',
      dateTime: '2023-11-14T14:00:10.690Z',
      finished: false,
      createdAt: '2023-11-14T14:00:10.690Z'
    }
  }
}
```

### Add Schedule

Endpoint : /api/v1/schedules

Method : POST

**Headers**

- Content-Type : application/json
- Authorization: Bearer {accessToken}

**Request Body**

```
{
  schedule: string (string),
  dateTime: string (string)
}
```


```
{
  schedule: 'Rapat BEM',
  dateTime: '2023-11-14T14:00:10.690Z'
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
  message: 'Gagal menambahkan schedule. Data yang dimasukkan tidak lengkap'
}
```

**Response Success**

- status code : 201

```
{
  status: 'success',
  message: 'Schedule berhasil ditambahkan'
  data: {
    schedule: {
      id: 'bsdhbcj566363',
      schedule: 'Rapat BEM',
      dateTime: '2023-11-14T14:00:10.690Z',
      finished: false,
      createdAt: '2023-11-14T14:00:10.690Z'
    }
  }
}
```

### Delete Schedule

Endpoint : /api/v1/schedules/:id

Method : DELETE

**Headers**

- Content-Type : application/json
- Authorization: Bearer {accessToken}

**Request Params**

- id

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

Ketika schedule tidak ada

- status code : 404

```
{
  status: 'fail',
  message: 'Schedule tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'Schedule berhasil dihapus'
  data: {
    id: 'hjdgs67339327983'
  }
}
```

### Finished Schedule

Endpoint : /api/v1/schedules/:id

Method : PATCH

**Headers**

- Content-Type : application/json
- Authorization: Bearer {accessToken}

**Request Params**

- id

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

Ketika schedule tidak ada

- status code : 404

```
{
  status: 'fail',
  message: 'Schedule tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  data: {
    id: 'jhsdhj6328747fhhf'
  }
}
```

### Update Schedule

Endpoint : /api/v1/schedules/:id

Method : PUT

**Headers**

- Content-Type : application/json
- Authorization: Bearer {accessToken}

**Request Params**

- id

**Request Body**

```
{
  schedule: string (require),
  dateTime: string (require)
}
```

```
{
  schedule: 'Rapat BEM',
  dateTime: '2023-11-14T14:00:10.690Z'
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
  message: 'Gagal Update Schedule. Data yang dimasukkan tidak lengkap'
}
```

Ketika schedule tidak ada

- status code : 404

```
{
  status: 'fail',
  message: 'Schedule tidak ditemukan'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'Schedule berhasil diperbarui',
  data: {
    schedule: {
      id: 'bsdhbcj566363',
      schedule: 'Rapat BEM',
      dateTime: '2023-11-14T14:00:10.690Z',
      finished: false,
      createdAt: '2023-11-14T14:00:10.690Z'
    }
  }
}
```
