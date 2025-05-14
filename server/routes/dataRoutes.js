import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const mockWeightEntries = [
  {
    id: "w1",
    userId: "user123",
    date: "2023-10-01T10:00:00Z",
    weightKg: 85,
    bmi: 27.76,
  },
  {
    id: "w2",
    userId: "user123",
    date: "2023-10-15T10:00:00Z",
    weightKg: 83.5,
    bmi: 27.28,
  },
  {
    id: "w3",
    userId: "user123",
    date: "2023-11-01T10:00:00Z",
    weightKg: 82,
    bmi: 26.79,
  },
  {
    id: "w4",
    userId: "user123",
    date: "2023-11-15T10:00:00Z",
    weightKg: 81.5,
    bmi: 26.63,
  },
  {
    id: "w5",
    userId: "user123",
    date: "2023-12-01T10:00:00Z",
    weightKg: 80,
    bmi: 26.12,
  },
];

const mockShipments = [
  {
    id: "s1",
    userId: "user123",
    medicationName: "GLP-1 Semaglutide",
    dosage: "0.25mg",
    status: "Delivered",
    expectedDeliveryDate: null,
    shippedDate: "2023-10-05",
    deliveredDate: "2023-10-08",
    trackingNumber: "TRACK123XYZ",
    carrier: "FedEx",
  },
  {
    id: "s2",
    userId: "user123",
    medicationName: "GLP-1 Semaglutide",
    dosage: "0.5mg",
    status: "Shipped",
    expectedDeliveryDate: "2023-11-10",
    shippedDate: "2023-11-07",
    deliveredDate: null,
    trackingNumber: "TRACK456ABC",
    carrier: "UPS",
  },
  {
    id: "s3",
    userId: "user123",
    medicationName: "GLP-1 Semaglutide",
    dosage: "1.0mg",
    status: "Processing",
    expectedDeliveryDate: "2023-12-15",
    shippedDate: null,
    deliveredDate: null,
    trackingNumber: null,
    carrier: null,
  },
];

router.get("/weight", protect, (req, res) => {
  const userWeightEntries = mockWeightEntries.filter(
    (entry) => entry.userId === req.user.id
  );
  res.json(userWeightEntries);
});

router.get("/shipments", protect, (req, res) => {
  const userShipments = mockShipments.filter(
    (shipment) => shipment.userId === req.user.id
  );
  res.json(userShipments);
});

router.get("/summary", protect, (req, res) => {
  const userWeightEntries = mockWeightEntries.filter(
    (entry) => entry.userId === req.user.id
  );
  const userShipments = mockShipments.filter(
    (shipment) => shipment.userId === req.user.id
  );

  let currentWeightData = null;
  if (userWeightEntries.length > 0) {
    const sortedWeights = [...userWeightEntries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    currentWeightData = {
      currentWeight: sortedWeights[0].weightKg,
      previousWeight:
        sortedWeights.length > 1 ? sortedWeights[1].weightKg : null,
      bmi: sortedWeights[0].bmi,
    };
  }

  let nextShipmentData = null;
  const upcomingShipments = userShipments
    .filter((s) => s.status === "Processing" || s.status === "Shipped")
    .sort(
      (a, b) =>
        new Date(a.expectedDeliveryDate || 0) -
        new Date(b.expectedDeliveryDate || 0)
    );

  if (upcomingShipments.length > 0) {
    nextShipmentData = {
      medicationName: upcomingShipments[0].medicationName,
      dosage: upcomingShipments[0].dosage,
      status: upcomingShipments[0].status,
      expectedDate: upcomingShipments[0].expectedDeliveryDate,
    };
  }

  const progressSnapshot = currentWeightData
    ? `Lost ${85 - currentWeightData.currentWeight} kg`
    : "No weight data yet";

  res.json({
    currentWeightWidget: currentWeightData,
    nextShipmentWidget: nextShipmentData,
    progressSnapshotWidget: {
      message: progressSnapshot,
    },
  });
});

export default router;
