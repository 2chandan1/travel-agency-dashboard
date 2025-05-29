import { useNavigate, type LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import { InfoPill, TripCard } from "components";
import {
  ButtonComponent,
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import type { Route } from "./+types/travelDetail";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "~/constants/world_map";
import { useState } from "react";
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { travelId } = params;
  if (!travelId) throw new Error("Trip ID is required");
  const [trip, trips] = await Promise.all([
    getTripById(travelId),
    getAllTrips(4, 0),
  ]);

  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrl }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrl ?? [],
    })),
  };
};
const TravelDetail = ({ loaderData }: Route.ComponentProps) => {
    const navigate=useNavigate();
    const [loading, setLoading]=useState(false)
  const imageUrls = loaderData?.trip?.imageUrl || [];
  const tripDtata = parseTripData(loaderData?.trip?.tripDetail);
  const allTrips = loaderData.allTrips as Trip[] | [];
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripDtata || {};
  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
    // {text:travelStyle, bg:'!bg-pink-50 '},
  ];
  const visitTimeAndWeatherInfo = [
    { title: "Best Time to visit : ", items: bestTimeToVisit },
    { title: "Weather:", items: weatherInfo },
  ];
  //   const countries = loaderData as Country[];
  const mapData = [
    {
      country: tripDtata?.country,
      color: "#EA382E",
    },
  ];
  return (
    <>
      {/* <div className="flex flex-row wrapper"> */}

      <main className="travel-detail wrapper  top-1/6">
        <section className="container wrapper-md">
       
         <ButtonComponent type="submit" className="!h-10 !w-25 !flex !items-center !gap-3" onClick={()=>navigate(-1)}>
            <img src="/assets/icons/arrow-left.svg" />
            <span className="p-16-normal ">Go Back</span>
          </ButtonComponent>
        
          <header>
            <h1 className="p-40-semibold">{name}</h1>

            <div className="flex items-center gap-5">
              <InfoPill
                text={`${duration} day plan`}
                image="/assets/icons/calendar.svg"
              />
              <InfoPill
                text={
                  itinerary
                    ?.slice(0, 4)
                    .map((item) => item.location)
                    .join(", ") || ""
                }
                image="/assets/icons/location-mark.svg"
              />
            </div>
          </header>
          <section className="gallery">
            {imageUrls.map((url: string, i: number) => (
              <img
                src={url}
                alt="image"
                key={i}
                className={cn(
                  "w-full rounded-xl object-cover",
                  i === 0
                    ? "md:col-span-2 md:row-span-2 h-[330px]"
                    : "md:row-span-1 h-[150px]"
                )}
              />
            ))}
          </section>
          <section className="flex gap-3 md:gap-5 items-center flex-wrap">
            <ChipListComponent id="travel-chips">
              <ChipsDirective>
                {pillItems.map((pill, i) => (
                  <ChipDirective
                    key={i}
                    text={getFirstWord(pill.text)}
                    cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                  />
                ))}
              </ChipsDirective>
            </ChipListComponent>

            <ul className="flex gap-1 items-center">
              {Array(5)
                .fill("null")
                .map((_, index) => (
                  <li key={index}>
                    <img
                      src="/assets/icons/star.svg"
                      alt="star"
                      className="size-[18px]"
                    />
                  </li>
                ))}
              <li className="ml-1">
                <ChipListComponent>
                  <ChipsDirective>
                    <ChipDirective
                      text="4.9/5"
                      cssClass="!bg-yellow-50 !text-yellow-700"
                    />
                  </ChipsDirective>
                </ChipListComponent>
              </li>
            </ul>
          </section>
          <section className="title">
            <article>
              <h3>
                {duration}-Day {country} {travelStyle} Trip
              </h3>
              <p>
                {budget} , {groupType} and {interests}{" "}
              </p>
            </article>
            <h2>{estimatedPrice}</h2>
          </section>
          <p className="text-sm md:text-lg font-normal text-dark-400">
            {" "}
            {description}{" "}
          </p>
          <ul className="itinerary">
            {itinerary?.map((dayPlan: DayPlan, index: number) => (
              <li key={index}>
                <h3>
                  Day {dayPlan.day}: {dayPlan.location}{" "}
                </h3>
                <ul>
                  {dayPlan.activities.map((activity, index: number) => (
                    <li key={index}>
                      <span className="flex-shring-0 p-18-semibold">
                        {" "}
                        {activity.time}{" "}
                      </span>
                      <span className="flex-grow">
                        {" "}
                        {activity.description}{" "}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {visitTimeAndWeatherInfo.map((section) => (
            <section key={section.title} className="visit">
              <div>
                <h3> {section.title} </h3>
                <ul>
                  {section.items?.map((item) => (
                    <li key={item}>
                      <p className="flex-grwo">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
         
      
        <div>
          <MapsComponent>
            <LayersDirective>
              <LayerDirective
                shapeData={world_map}
                dataSource={mapData}
                shapeDataPath="country"
                shapePropertyPath="name"
                shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
              />
            </LayersDirective>
          </MapsComponent>
        </div>
        <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full gap-6"
              disabled={loading}
            >
              <span className="p-16-semibold text-white">
                {loading ? "Proccessing...." : "Pay and join trip"}   
              </span>
              <span className="price-pill">{estimatedPrice}</span>
            </ButtonComponent>
            </section>
        <section className="flex flex-col gap-6">
          <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
          <div className="trip-grid">
            {allTrips.map(
              ({
                id,
                name,
                imageUrls,
                itinerary,
                interests,
                travelStyle,
                estimatedPrice,
              }) => (
                <TripCard
                  id={id}
                  key={id}
                  name={name}
                  location={itinerary?.[0].location ?? ""}
                  imageUrl={imageUrls[0]}
                  tags={[interests, travelStyle]}
                  price={estimatedPrice}
                />
              )
            )}
          </div>
        </section>
      </main>
      {/* </div> */}
    </>
  );
};

export default TravelDetail;
