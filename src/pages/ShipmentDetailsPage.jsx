import React, { useState, useEffect } from 'react';
import { mockShipments } from '../data/Data';
import { FiTruck, FiCheckCircle, FiClock, FiPackage, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';

const ShipmentCard = ({ shipment }) => {
  let statusIcon, statusColor;
  switch (shipment.status) {
    case 'Delivered':
      statusIcon = <FiCheckCircle className="text-green-500" />;
      statusColor = 'text-green-600';
      break;
    case 'Shipped':
      statusIcon = <FiTruck className="text-blue-500" />;
      statusColor = 'text-blue-600';
      break;
    case 'Processing':
      statusIcon = <FiClock className="text-yellow-500" />;
      statusColor = 'text-yellow-600';
      break;
    default:
      statusIcon = <FiPackage className="text-gray-500" />;
      statusColor = 'text-gray-600';
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-acme-primary">
          {shipment.medicationName} - {shipment.dosage}
        </h3>
        <div className={`flex items-center text-sm font-medium ${statusColor}`}>
          {statusIcon}
          <span className="ml-2">{shipment.status}</span>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        {shipment.expectedDeliveryDate && (
          <p>
            <strong>Expected:</strong> {format(new Date(shipment.expectedDeliveryDate), 'MMMM dd, yyyy')}
          </p>
        )}
        {shipment.shippedDate && (
          <p>
            <strong>Shipped:</strong> {format(new Date(shipment.shippedDate), 'MMMM dd, yyyy')}
          </p>
        )}
        {shipment.deliveredDate && (
          <p>
            <strong>Delivered:</strong> {format(new Date(shipment.deliveredDate), 'MMMM dd, yyyy')}
          </p>
        )}
        {shipment.trackingNumber ? (
          <p>
            <strong>Tracking:</strong>{' '}
            <a href="#" className="text-blue-500 hover:underline">
              {shipment.trackingNumber} ({shipment.carrier || 'N/A'})
            </a>
          </p>
        ) : shipment.status !== 'Processing' ? (
          <p><strong>Tracking:</strong> Not available</p>
        ) : null}
      </div>
    </div>
  );
};

const ShipmentDetailsPage = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const sorted = mockShipments.sort((a, b) => {
          const dateA = new Date(a.expectedDeliveryDate || a.shippedDate || a.createdAt);
          const dateB = new Date(b.expectedDeliveryDate || b.shippedDate || b.createdAt);
          return dateB - dateA;
        });
        setShipments(sorted);
        setError(null);
      } catch (err) {
        console.error("Failed to load shipment data:", err);
        setError("Failed to load shipment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const filteredShipments = shipments.filter((shipment) => {
    if (filter === 'upcoming') return ['Processing', 'Shipped'].includes(shipment.status);
    if (filter === 'past') return ['Delivered', 'Cancelled', 'Delayed'].includes(shipment.status);
    return true;
  });

  if (loading) {
    return <div className="text-center py-10">Loading shipment details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 bg-red-50 p-4 rounded-md flex items-center justify-center">
        <FiAlertCircle className="mr-2 h-5 w-5" /> {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medication & Shipments</h1>

      <div className="mb-6">
        <div className="flex space-x-2 border-b">
          {['all', 'upcoming', 'past'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`py-2 px-4 font-medium text-sm ${
                filter === type
                  ? 'border-b-2 border-acme-primary text-acme-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Shipments
            </button>
          ))}
        </div>
      </div>

      {filteredShipments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <FiPackage size={48} className="mx-auto mb-4" />
          No {filter !== 'all' ? filter : ''} shipments found.
        </div>
      )}
    </div>
  );
};

export default ShipmentDetailsPage;
