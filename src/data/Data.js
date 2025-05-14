export const mockWeightData = [
  {
    id: 1,
    date: '2025-03-01',
    weightKg: 78,
  },
  {
    id: 2,
    date: '2025-03-15',
    weightKg: 76.5,
  },
  {
    id: 3,
    date: '2025-04-01',
    weightKg: 75.2,
  },
  {
    id: 4,
    date: '2025-04-15',
    weightKg: 74.8,
  },
  {
    id: 5,
    date: '2025-05-01',
    weightKg: 73.9,
  },
];


export const mockDashboardSummary = {
  currentWeightWidget: {
    currentWeight: 73.9,
    previousWeight: 75.2,
    bmi: 24.1,
  },
  nextShipmentWidget: {
    medicationName: "Ozempic",
    dosage: "1mg",
    status: "Scheduled",
    expectedDate: "2025-05-25",
  },
  progressSnapshotWidget: {
    message: "You're making steady progress! Keep going 💪",
  },
};





// src/data/shipmentData.js
export const mockShipments = [
  {
    id: 1,
    medicationName: "Ozempic",
    dosage: "1mg",
    status: "Delivered",
    expectedDeliveryDate: "2025-04-20",
    shippedDate: "2025-04-15",
    deliveredDate: "2025-04-20",
    trackingNumber: "TRK123456789",
    carrier: "DHL",
    createdAt: "2025-04-10",
  },
  {
    id: 2,
    medicationName: "Metformin",
    dosage: "500mg",
    status: "Shipped",
    expectedDeliveryDate: "2025-05-20",
    shippedDate: "2025-05-14",
    trackingNumber: "TRK987654321",
    carrier: "FedEx",
    createdAt: "2025-05-12",
  },
  {
    id: 3,
    medicationName: "Trulicity",
    dosage: "0.75mg",
    status: "Processing",
    expectedDeliveryDate: "2025-05-28",
    createdAt: "2025-05-10",
  },
];
