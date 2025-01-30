// path: src/views/ScheduleManagementView.js
import React, { useEffect } from "react";
import IndexComponent from "../components/ScheduleManagement"; // Pastikan ini adalah komponen yang benar

const ScheduleManagementView = ({ setPageTitle }) => {
  useEffect(() => {
    const title = "Jadwal Pengiriman";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]); // Tambahkan array dependensi untuk useEffect

  return <IndexComponent />;
};

export default ScheduleManagementView;
