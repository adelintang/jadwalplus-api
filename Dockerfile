# Gunakan image Node.js dari Docker Hub
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package* ./

# Menambahkan environment
ENV MONGO_URL=mongodb+srv://mitubaby:mitubaby1253@schedule.vcwiwtu.mongodb.net/
ENV SECRET_ACCESS_TOKEN=844d695b36b60da2d61b1e983d4cb4f8444e6c93238b61624397c6f9b0e5b02f9c6f33f5fbfbf26fe028fd64037d2e41baa41618ee39ba87aad8387bc4ad963a44c30f3bc9526de9151cb88f07e8597ed9f8110e8318450cab71cad5a484c689453a02508bca70c424448b2cac5ea1dee86a1ec13c1c7642382e9daca97ddee2
ENV PORT=5000

# Install dependensi menggunakan npm
RUN npm install

# Salin seluruh proyek ke direktori kerja
COPY . .

# Expose container port
EXPOSE 5000

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "run", "dev"]
