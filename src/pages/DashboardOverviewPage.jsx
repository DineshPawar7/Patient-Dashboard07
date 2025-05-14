import React, { useState, useEffect } from "react";
import { mockDashboardSummary } from "../data/Data.js";
import {
  FiActivity,
  FiTruck,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import { format } from "date-fns";
import StatCard from "../components/StatCard";

const DashboardOverviewPage = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setSummaryData(mockDashboardSummary);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch summary data:", err);
        setError("Failed to load dashboard summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Loading dashboard overview...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 bg-red-50 p-4 rounded-md flex items-center justify-center">
        <FiAlertCircle className="mr-2 h-5 w-5" /> {error}
      </div>
    );
  }

  const {
    currentWeightWidget,
    nextShipmentWidget,
    progressSnapshotWidget,
  } = summaryData || {};

  const weightDiff =
    currentWeightWidget?.currentWeight - currentWeightWidget?.previousWeight;
  const weightChangeText =
    currentWeightWidget?.previousWeight != null
      ? `${weightDiff > 0 ? "+" : ""}${weightDiff.toFixed(1)} kg`
      : null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Current Weight"
          value={currentWeightWidget?.currentWeight}
          unit="kg"
          icon={<FiActivity size={24} />}
          change={weightChangeText}
          subValue={
            currentWeightWidget?.bmi
              ? `BMI: ${currentWeightWidget.bmi.toFixed(1)}`
              : null
          }
          bgColor="bg-[#DC8BE0]"
        />

        <StatCard
          title="Next Shipment"
          value={nextShipmentWidget?.medicationName}
          subValue={
            nextShipmentWidget
              ? `${nextShipmentWidget.dosage}, Status: ${
                  nextShipmentWidget.status
                }${
                  nextShipmentWidget.expectedDate
                    ? `, Due: ${format(
                        new Date(nextShipmentWidget.expectedDate),
                        "MMM dd, yyyy"
                      )}`
                    : ""
                }`
              : "No upcoming shipments"
          }
          icon={<FiTruck size={24} />}
          bgColor="bg-[#F79B72]"
        />

        <StatCard
          title="Progress Snapshot"
          value={progressSnapshotWidget?.message || "N/A"}
          icon={<FiTrendingUp size={24} />}
          bgColor="bg-[#FFE1E0]"
        />
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
