import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import type { Route } from "./+types/travel-page";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import { TripCard,TripGrid } from "components";

import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { useState } from "react";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // console.log("params", params);
  const limit = 8;
  const url = new URL(request.url);
  const [trips] = await Promise.all([getAllTrips(10, 0)]);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;
  const { allTrips, total } = await getAllTrips(limit, offset);
  return {
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrl }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrl ?? [],
    })),
    total,
  };
};
const TeavelPage = ({ loaderData }: Route.ComponentProps) => {
  console.log("loaderData", loaderData);
  const allTrips = loaderData.allTrips as Trip[] | [];
  // console.log("imageurl",imageUrls);
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page" || "1"));
  const [currentPage, setCurrentPage] = useState(initialPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };
  return (
    <>
      <main className="w-full">
        <section className="travel-hero w-full">
          <div>
            <section className="wrapper">
              <article>
                <h2 className="text-2xl h3 p-72-bold">
                  {" "}
                  Plan Your Trip with Ease
                </h2>
                <p className="text-l">
                  Customize your travel itinerary in minutes—pick your
                  destination, set your preferences, and explore with
                  confidence.
                </p>
              </article>
              <ButtonComponent
                type="submit"
                className="button-class !h-12 !w-50"
              >
                <span className="p-16-semibold text-white">Get Started</span>
              </ButtonComponent>
            </section>
          </div>
        </section>
        <section className="gallery wrapper mt-14">
          <h2 className="p-24-semibold text-dark-100">
            Featured Travel Destinations
          </h2>
          <p className="text-base text-gray-700">
            Check out some of the best places you can visit around the world.
          </p>
          <TripGrid allTrips={allTrips} />
        </section>

        <section className="flex flex-col  wrapper mt-14">
          <h2 className="p-24-semibold text-dark-100">Handpicked Trips</h2>
          <p className="text-base">
            Browse well-planned trips designed for different travel styles and
            interests
          </p>
          <div className="trip-grid mt-6">
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
          <PagerComponent
            totalRecordsCount={loaderData.total}
            pageSize={4}
            currentPage={currentPage}
            click={(args) => handlePageChange(args.currentPage)}
            cssClass="!mb-4"
          />
        </section>
      </main>
    </>
  );
};

export default TeavelPage;
