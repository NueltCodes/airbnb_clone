import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProviders";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import UserUpdateModal from "./components/modals/UserUpdateModal";
import PerksModal from "./components/modals/PerksModal";
import CreateEvents from "./components/modals/CreateEvents";
import getFavoriteListings from "./actions/getFavoriteListings";
import EmptyState from "./components/EmptyState";
import getReservations from "./actions/getReservations";
// import PaymentModal from "./components/modals/PaymentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Reserve",
  description: "Global Reservation app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const favorites = await getFavoriteListings();
  const reservations = await getReservations({ authorId: currentUser?.id });

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <SearchModal />
          <RegisterModal />
          <RentModal />
          <CreateEvents />
          <UserUpdateModal currentUser={currentUser} />
          <PerksModal
            matchedPerks={[]}
            matchedAmenities={[]}
            matchedSafeties={[]}
          />
          <Navbar
            currentUser={currentUser}
            favorites={favorites}
            reservations={reservations}
          />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
