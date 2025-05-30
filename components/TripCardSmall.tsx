
const TripCardSmall = ({ trip }) => {
    // You can now safely access trip.name, trip.imageUrls, etc.
   
    
    return (
      <div className="relative">
        <img
          src={trip?.imageUrls[0]}
          alt={trip.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-red-500">
          3.5
        </div>
        <div className="absolute bottom-2 left-2 text-white">
        <h2 className="text-2xl font-bold">{trip.country} Tour</h2>
          <p className="text-xs">196 Activities</p>
        </div>
      </div>
    );
  };

export default TripCardSmall