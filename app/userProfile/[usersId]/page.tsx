import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IListingsParams } from "../../actions/getListings";
import ProfileInfo from "./ProfileInfo";
import getAllReviews from "../../actions/getAllReviews";
import getAllEvents from "../../actions/getAllEvents";
import UserProfileData from "./UserProfileData";
import Container from "../../components/Container";
import getUserListings from "@/app/actions/getUserListings";

interface IParams {
  searchParams: IListingsParams;
}

const UserProfile = async ({ searchParams }: IParams) => {
  const listings = await getUserListings(searchParams);
  const listingsLength = listings.length;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState login title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  try {
    const [reviews, events] = await Promise.all([
      getAllReviews(searchParams),
      getAllEvents(searchParams),
    ]);

    if (listings?.length === 0) {
      listings.map((listing) => {
        return (
          <div key={listing.id}>
            {listing?.userId === searchParams ? (
              <ClientOnly>
                <EmptyState
                  title="No properties found"
                  subtitle="Looks like you have no listing.Become a host by reserving your home."
                />
              </ClientOnly>
            ) : (
              <ClientOnly>
                <EmptyState
                  title="No properties found"
                  subtitle="Looks like this host is yet to have a listing or hasn't kept is home on reservation."
                />
              </ClientOnly>
            )}
          </div>
        );
      });
    }

    return (
      <ClientOnly>
        <Container>
          {/* {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              // userListings={userListings}
            />
          ))} */}
          <div className="w-full 800px:flex py-10 justify-between">
            <div className="800px:w-[25%] w-full bg-[#fff] rounded-[4px] shadow-md 800px:overflow-y-scroll scrollbar-hide 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
              {listings.map((listing) => (
                <ProfileInfo
                  key={listing.id}
                  user={listing.user}
                  listingsLength={listingsLength}
                  reviews={reviews}
                />
              ))}
            </div>
            <div className="800px:w-[72%] mt-10 800px:mt-['unset'] rounded-[4px] shadow-md p-2">
              <UserProfileData
                currentUser={currentUser}
                reviews={reviews}
                events={events}
                listings={listings}
              />
            </div>
          </div>
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Handle the error state here
  }
};

export default UserProfile;
