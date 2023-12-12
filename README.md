## JadwalPlus API

Sebuah API yang melayani pengelolaan data penjadwalan secara online.

Dokumentasi API : [JadwalPlus API](https://api-jadwalplus-production.up.railway.app/docs)

### Fitur yang ditawarkan

* Registrasi
* Login
* Update Password
* Delete Akun
* Menambahkan Penjadwalan baru
* Ceklist penjadwalan yang terselesaikan
* Un ceklist penjadwalan dari yang sudah selesai
* Melihat penjadwalan yang belum di selesaikan ataupun sudah di selesaikan
* Melihat status penjadwalan sudah mencapai harinya atau belum
* Menghapus penjadwalan
* Update Penjadwalan
* Pencarian penjadwalan berdasarkan nama

### Teknologi yang dipakai

- express
- bcrypt
- jsonwebtoken
- body-parser
- cors
- dotenv
- mongoose
- joi
- morgan
- newman
- swagger-jsdoc
- swagger-ui-express
- docker
- eslint
- nodemon

### Cara menjalankan secara lokal

- Clone repository

  ```
  https://github.com/mengcapstone/jadwalplus-api.git
  ```
- Install Mongo DB

  [mongodb](https://www.mongodb.com/try/download/community)
- Masuk directory project, kemudian install dependencies.

  ```
  npm install
  ```
- Buat file .env di root directory dengan credential seperti file .env.example

  ```
  MONGO_URL='Your Mongo URL'
  SECRET_ACCESS_TOKEN='Your Secret Access Token'
  PORT='5000'
  ```
- Jalankan Project

  ```
  npm run dev
  ```

### Cara menjalankan menggunakan docker

- Pull image dari GHCR

  ```
  docker pull ghcr.io/mengcapstone/jadwalplus-api:latest
  ```

- Run image

  ```
  docker run -dp 5000:5000 -it ghcr.io/mengcapstone/jadwalplus-api:latest
  ```