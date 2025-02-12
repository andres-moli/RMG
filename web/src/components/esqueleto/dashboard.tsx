import React from "react";

const SkeletonCard = () => (
  <div className="w-full bg-gray-200 animate-pulse rounded-lg h-24 flex items-center justify-between p-4">
    <div>
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 w-16 bg-gray-300 rounded"></div>
    </div>
    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
  </div>
);

const SkeletonChart = () => (
  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
);

const SkeletonDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonChart />
    </div>
  );
};

export default SkeletonDashboard;
