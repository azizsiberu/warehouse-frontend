// path: /src/components/MenuItems.js
import React from "react";
import {
  FaWarehouse,
  FaShippingFast,
  FaChartLine,
  FaUsers,
  FaBell,
  FaClipboardList,
} from "react-icons/fa";
import { MdInventory, MdSettings, MdRestore, MdSchedule } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const menuItems = [
  { icon: FaChartLine, label: "Dashboard", route: "/dashboard" }, // Ringkasan Kinerja, Grafik dan Laporan
  {
    icon: MdInventory,
    label: "Manajemen Produk",
    route: "/product-management",
  }, // Daftar Produk, Tambah/Edit Produk, Kategori Produk
  { icon: FaWarehouse, label: "Penerimaan Barang", route: "/receiving" }, // Penerimaan Baru, Riwayat Penerimaan
  { icon: FaShippingFast, label: "Pengiriman Barang", route: "/shipping" }, // Pengiriman Baru, Riwayat Pengiriman
  {
    icon: MdInventory,
    label: "Manajemen Stok",
    route: "/inventory-management",
  }, // Cek Stok, Pemindahan Stok, Peringatan Stok Rendah
  { icon: FaChartLine, label: "Laporan dan Analisis", route: "/reports" }, // Laporan Bulanan, Laporan Kustom
  { icon: FaUsers, label: "Pengaturan Pengguna", route: "/user-settings" }, // Profil Pengguna, Manajemen Pengguna, Pengaturan Keamanan
  { icon: FaBell, label: "Notifikasi dan Peringatan", route: "/notifications" }, // Lihat Notifikasi, Pengaturan Notifikasi
  { icon: FaClipboardList, label: "Bantuan dan Dukungan", route: "/support" }, // Panduan Penggunaan, Kontak Dukungan
  { icon: MdRestore, label: "Log Aktivitas", route: "/activity-log" }, // Riwayat Aktivitas
];

export default menuItems;
