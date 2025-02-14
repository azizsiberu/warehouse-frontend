//path: src/views/ScheduleDetailView.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams hook
import { fetchScheduleById } from "../redux/reducers/scheduleReducer";
import ScheduleDetailIndex from "../components/ScheduleManagement/Details";
import Loading from "../components/Loading";

const ScheduleDetailView = ({ setPageTitle }) => {
  const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
  const dispatch = useDispatch();
  const { currentSchedule, loading, error } = useSelector(
    (state) => state.schedules
  );

  useEffect(() => {
    const title = "Pembuatan Jadwal";
    setPageTitle(title);
    document.title = title;

    dispatch(fetchScheduleById(id));
  }, [dispatch, id, setPageTitle]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return <ScheduleDetailIndex schedule={currentSchedule} />;
};

export default ScheduleDetailView;
