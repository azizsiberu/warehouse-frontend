// path: /src/views/DashboardView.js
import React, { useEffect } from "react";
import MainMenu from "../components/MainMenu"; // Import MainMenu

const DashboardView = ({ setPageTitle }) => {
  useEffect(() => {
    const title = "Main Menu";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  return (
    <div>
      <MainMenu />
    </div>
  );
};

export default DashboardView;
