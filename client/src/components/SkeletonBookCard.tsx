const SkeletonBookCard = () => {
  return (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg p-4">
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonBookCard;
