# Gunakan image Node.js dari Docker Hub
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package* ./

# Install dependensi menggunakan npm
RUN npm install

# Salin seluruh proyek ke direktori kerja
COPY . .

# Expose container port
EXPOSE 5000

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "run", "dev"]
