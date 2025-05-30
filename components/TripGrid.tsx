import TripCardLarge from "./TripCardLarge";
import TripCardMedium from "./TripCardMedium";
import TripCardSmall from "./TripCardSmall";

export default function TripGrid({ allTrips }) {
  if (!allTrips ) {
    return <p className="text-red-500">Not enough trip data available.</p>;
  }
 
  

  return (
    <div className="grid gap-4 mt-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 row-span-1">
          <TripCardLarge trip={allTrips[0]} />
        </div>

        {/* 3 Small Cards in Right Column */}
        <div className="flex flex-col gap-4">
          <TripCardSmall trip={allTrips[1]} />
          <TripCardSmall trip={allTrips[2]} />
         
        </div>
      </div>

      {/* Bottom Row with 2 Medium Cards */}
      <div className="grid grid-cols-3 gap-4">
       <TripCardMedium trip={allTrips[3]} />
        <TripCardMedium trip={allTrips[4]} />
        <TripCardMedium trip={allTrips[5]} />
      </div>
    </div>
  );
}
