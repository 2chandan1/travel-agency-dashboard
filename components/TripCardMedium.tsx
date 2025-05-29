const TripCardMedium = ({ trip }) => {
  return (
    <div className="relative h-60 rounded-xl overflow-hidden shadow-md">
      <img src={trip.imageUrls[0]} className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 text-white">
        <h2 className="text-2xl font-bold">{trip.country} Tour</h2>
        <p>{trip.activities} Activities</p>
      </div>
      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-red-500">
          4.5
        </div>
    </div>
  );
};
export default TripCardMedium;
