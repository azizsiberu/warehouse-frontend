// path: /src/components/MenuItems.js
import {
  MdInsights,
  MdOutlineFireTruck,
  MdOutlineWarehouse,
  MdMoveUp,
  MdAppsOutage,
  MdRestore,
  MdOutlineSupportAgent,
  MdCalendarMonth,
} from "react-icons/md";

const menuItems = [
  { icon: MdInsights, label: "Ringkasan", route: "/overview" }, // Ringkasan Kinerja, Grafik dan Laporan
  {
    icon: MdMoveUp,
    label: "Daftar Produk",
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
  {
    icon: MdCalendarMonth,
    label: "Jadwal Pengiriman",
    route: "/schedule",
  },
  // { icon: MdInsights, label: "Laporan dan Analisis", route: "/reports" }, // Laporan Bulanan, Laporan Kustom
  {
    icon: MdOutlineSupportAgent,
    label: "Operasional",
    route: "/operational",
  }, // Panduan Penggunaan, Kontak Dukungan
  // { icon: MdRestore, label: "Log Aktivitas", route: "/activity-log" }, // Riwayat Aktivitas
];

export default menuItems;
