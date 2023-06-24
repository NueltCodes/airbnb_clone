import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import ProfileInfo from "./ProfileInfo";
import getAllReviews from "../actions/getAllReviews";
import UserProfileData from "./userProfileData";

const Profile = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState login title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const review = getAllReviews({ userId: currentUser.id });

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you are yet to become a host by reserving your home."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="w-full 800px:flex py-10 justify-between">
        <div className="800px:w-[25%] w-full bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll scrollbar-hide 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          <ProfileInfo
            currentUser={currentUser}
            reviews={review}
            listings={listings}
          />
        </div>
        <div className="800px:w-[72%] mt-10 800px:mt-['unset'] rounded-[4px] shadow-md p-2">
          <UserProfileData
            currentUser={currentUser}
            reviews={review}
            listings={listings}
          />
        </div>
      </div>
    </ClientOnly>
  );
};

export default Profile;
