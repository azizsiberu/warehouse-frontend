// path: src/views/ScheduleManagementView.js
import React, { useEffect } from "react";
import IndexComponent from "../components/ScheduleManagement";

const ScheduleManagementView = ({ setPageTitle }) => {
  useEffect(() => {
    const title = "Jadwal Pengiriman";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  return <IndexComponent />;
};

export default ScheduleManagementView;
