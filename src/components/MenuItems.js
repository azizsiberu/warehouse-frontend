// path: /src/components/MenuItems.js
import {
  MdInsights,
  MdOutlineFireTruck,
  MdOutlineWarehouse,
  MdMoveUp,
  MdAppsOutage,
  MdRestore,
  MdOutlineSupportAgent,
} from "react-icons/md";

const menuItems = [
  { icon: MdInsights, label: "Dashboard", route: "/dashboard" }, // Ringkasan Kinerja, Grafik dan Laporan
  {
    icon: MdMoveUp,
    label: "Manajemen Produk",
    route: "/product-management",
  }, // Daftar Produk, Tambah/Edit Produk, Kategori Produk
  {
    icon: MdOutlineWarehouse,
    label: "Penerimaan Barang",
    route: "/receiving",
  }, // Penerimaan Baru, Riwayat Penerimaan
  { icon: MdOutlineFireTruck, label: "Pengiriman Barang", route: "/outgoing" }, // Pengiriman Baru, Riwayat Pengiriman
  {
    icon: MdAppsOutage,
    label: "Manajemen Stok",
    route: "/inventory-management",
  }, // Cek Stok, Pemindahan Stok, Peringatan Stok Rendah
  { icon: MdInsights, label: "Laporan dan Analisis", route: "/reports" }, // Laporan Bulanan, Laporan Kustom
  {
    icon: MdOutlineSupportAgent,
    label: "Bantuan dan Dukungan",
    route: "/support",
  }, // Panduan Penggunaan, Kontak Dukungan
  { icon: MdRestore, label: "Log Aktivitas", route: "/activity-log" }, // Riwayat Aktivitas
];

export default menuItems;
