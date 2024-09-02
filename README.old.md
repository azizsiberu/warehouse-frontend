# warehouse-frontend

Berikut adalah dokumentasi lengkap untuk bagian frontend dari aplikasi gudang yang menggunakan ReactJS 18, Material UI v6, dan Redux. Dokumentasi ini mencakup penjelasan struktur proyek, setup, komponen utama, state management, dan cara deployment.

---

# **Dokumentasi Frontend Aplikasi Gudang**

## **1. Deskripsi Proyek**

Frontend dari aplikasi gudang ini dibangun menggunakan ReactJS 18 untuk antarmuka pengguna, Material UI v6 untuk komponen antarmuka modern dan responsif, serta Redux untuk manajemen state global. Aplikasi ini berfungsi untuk mengelola penerimaan, pengiriman, pemindahan barang, serta penjadwalan dan pelacakan stok secara efektif.

## **2. Struktur Direktori**

```plaintext
frontend/
├── public/
│   └── index.html        # File HTML utama
├── src/
│   ├── assets/           # Folder untuk aset seperti gambar, ikon, dll.
│   ├── components/       # Komponen reusable
│   │   ├── Navbar.js     # Komponen navigasi
│   │   ├── Sidebar.js    # Komponen sidebar
│   │   ├── Footer.js     # Komponen footer
│   ├── pages/            # Halaman aplikasi
│   │   ├── Dashboard.js  # Halaman dashboard utama
│   │   ├── Receiving.js  # Halaman penerimaan barang
│   │   ├── Transfer.js   # Halaman pemindahan barang
│   │   ├── Shipping.js   # Halaman pengiriman barang
│   │   ├── Products.js   # Halaman manajemen produk
│   │   ├── Schedule.js   # Halaman penjadwalan pengiriman
│   ├── redux/            # State management dengan Redux
│   │   ├── store.js      # Setup Redux store
│   │   ├── reducers/     # Folder untuk reducers
│   │   │   ├── productsReducer.js   # Reducer untuk produk
│   │   │   ├── scheduleReducer.js   # Reducer untuk jadwal
│   │   │   ├── receivingReducer.js  # Reducer untuk penerimaan
│   │   ├── actions/      # Folder untuk action creators
│   │   ├── slices/       # Folder untuk slices (dari Redux Toolkit)
│   ├── services/         # API services untuk komunikasi dengan backend
│   │   ├── api.js        # File utama untuk konfigurasi API
│   ├── App.js            # Komponen utama aplikasi
│   ├── index.js          # Entry point React
│   ├── App.css           # Style global
├── package.json          # Dependencies dan scripts
├── README.md             # Dokumentasi proyek
└── .gitignore            # File untuk mengabaikan file tertentu saat commit
```

## **3. Setup Proyek**

### **3.1. Prasyarat**
Pastikan Anda telah menginstal Node.js dan npm di sistem Anda.

### **3.2. Instalasi**
1. **Clone repository frontend:**
   ```bash
   git clone https://github.com/username/warehouse-frontend.git
   cd warehouse-frontend
   ```

2. **Instal dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi secara lokal:**
   ```bash
   npm start
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

### **3.3. Konfigurasi Environment**
Jika Anda membutuhkan konfigurasi environment untuk API, buat file `.env` di root direktori dan tambahkan variabel environment yang diperlukan, seperti:

```plaintext
REACT_APP_API_URL=http://localhost:5000/api
```

## **4. Komponen Utama**

### **4.1. Navbar**
`Navbar.js` adalah komponen navigasi utama yang menampilkan menu untuk mengakses halaman-halaman penting seperti Dashboard, Penerimaan, Pemindahan, Pengiriman, Produk, dan Penjadwalan.

### **4.2. Sidebar**
`Sidebar.js` adalah komponen yang digunakan untuk navigasi tambahan di sisi kiri layar, memungkinkan pengguna berpindah antar fitur dengan mudah.

### **4.3. Dashboard**
`Dashboard.js` adalah halaman utama yang menampilkan ringkasan dari seluruh aktivitas gudang, termasuk status stok, pengiriman yang akan datang, dan statistik penting lainnya.

### **4.4. Receiving**
`Receiving.js` adalah halaman untuk mengelola penerimaan barang di gudang. Pengguna dapat mencatat barang masuk, melakukan pengecekan kelengkapan, dan mengatur status penerimaan.

### **4.5. Transfer**
`Transfer.js` adalah halaman yang digunakan untuk mengelola pemindahan barang antar lokasi gudang atau showroom. Pengguna dapat membuat permintaan pemindahan dan melacak statusnya.

### **4.6. Shipping**
`Shipping.js` adalah halaman untuk mengelola pengiriman barang ke customer. Termasuk proses verifikasi dengan tim sales, pencetakan packing list, dan pengurangan stok.

### **4.7. Products**
`Products.js` adalah halaman untuk manajemen produk. Pengguna dapat menambahkan, mengedit, menghapus, dan melihat data produk secara rinci.

### **4.8. Schedule**
`Schedule.js` adalah halaman untuk manajemen jadwal pengiriman. Pengguna dapat membuat, mengedit, dan melacak jadwal pengiriman barang.

## **5. State Management dengan Redux**

### **5.1. Store**
`store.js` mengatur store utama untuk aplikasi dan mengkombinasikan semua reducers yang ada.

### **5.2. Reducers**
- **`productsReducer.js`:** Mengelola state untuk data produk.
- **`scheduleReducer.js`:** Mengelola state untuk jadwal pengiriman.
- **`receivingReducer.js`:** Mengelola state untuk penerimaan barang.

### **5.3. Actions dan Slices**
- **Actions:** Berada di folder `actions`, digunakan untuk mendefinisikan action creators yang berinteraksi dengan API dan memodifikasi state melalui reducers.
- **Slices:** Menggunakan Redux Toolkit, slices menggabungkan reducer dan actions dalam satu file untuk kemudahan manajemen.

Contoh `productsSlice.js`:
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
```

## **6. Layanan API**

### **6.1. Konfigurasi API**
`api.js` adalah file utama yang mengatur komunikasi dengan backend menggunakan Axios.

Contoh konfigurasi:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export default api;
```

### **6.2. Menggunakan API Services**
Setiap komponen atau aksi Redux yang perlu berinteraksi dengan backend menggunakan `api.js` untuk melakukan panggilan HTTP seperti `GET`, `POST`, `PUT`, dan `DELETE`.

## **7. Styling dengan Material UI**

### **7.1. Menggunakan Komponen Material UI**
Material UI v6 digunakan untuk membangun antarmuka pengguna yang modern. Semua komponen UI seperti `Button`, `Card`, `Table`, dll., diambil dari Material UI dan dapat disesuaikan sesuai kebutuhan.

Contoh penggunaan Material UI di `Receiving.js`:
```javascript
import React from 'react';
import { Button, TextField, Card, CardContent } from '@mui/material';

function Receiving() {
  return (
    <Card>
      <CardContent>
        <TextField label="Product Name" variant="outlined" fullWidth />
        <TextField label="Quantity" variant="outlined" fullWidth style={{ marginTop: 16 }} />
        <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default Receiving;
```

### **7.2. Global Styling**
`App.css` digunakan untuk mendefinisikan gaya global yang diterapkan ke seluruh aplikasi. Anda juga dapat menggunakan tema Material UI untuk mengatur tema aplikasi secara keseluruhan.

## **8. Deployment**

### **8.1. Build untuk Produksi**
Untuk membangun aplikasi frontend untuk produksi, gunakan perintah:
```bash
npm run build
```
Ini akan membuat versi produksi dari aplikasi di folder `build/`.

### **8.2. Deploy ke Hosting**
Anda dapat menggunakan layanan hosting seperti Vercel, Netlify, atau AWS S3 untuk mendistribusikan aplikasi frontend. Ikuti panduan spesifik dari layanan hosting yang Anda pilih untuk melakukan deploy.

Contoh

 deploy menggunakan Netlify:
1. Buat akun di Netlify dan hubungkan repository GitHub Anda.
2. Pilih branch yang ingin dideploy (`main` misalnya).
3. Set konfigurasi build:
   ```plaintext
   Build Command: npm run build
   Publish Directory: build/
   ```
4. Klik `Deploy` untuk memulai proses deploy.

## **9. Testing**

### **9.1. Unit Testing**
Gunakan Jest dan React Testing Library untuk unit testing komponen React.
```bash
npm run test
```

### **9.2. Integration Testing**
Anda dapat menulis tes integrasi yang lebih kompleks dengan menggabungkan beberapa komponen dan memastikan bahwa mereka bekerja bersama dengan baik.

## **10. Pengembangan Lanjutan**

### **10.1. Penambahan Fitur**
Anda dapat menambahkan fitur baru dengan menambahkan komponen baru di `src/components` atau `src/pages` dan mengelola state global menggunakan Redux.

### **10.2. Dokumentasi API**
Selalu pastikan bahwa Anda memperbarui dokumentasi API di backend, sehingga frontend dapat terus berkomunikasi dengan backend tanpa masalah.

