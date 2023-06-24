// "use client";

// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { useMemo, useCallback, useState } from "react";

// // import usepaymentModal from "@/app/hooks/usepaymentModal";

// import Modal from "./Modal";
// import Counter from "../inputs/Counter";
// import CategoryInput from "../inputs/CategoryInput";
// import CountrySelect from "../inputs/CountrySelect";
// import { categories } from "../navbar/Categories";
// import ImageUpload from "../inputs/ImageUpload";
// import Input from "../inputs/Input";
// import Heading from "../Heading";
// import { amenities, perks, safetyGuide } from "./inputs";
// import TimeInput from "../inputs/TimeInput";
// import usePaymentModalModal from "@/app/hooks/usePaymentModal";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";
// import styles from "@/styles/styles";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { SafeUser } from "@/app/types";
// import { loadStripe } from "@stripe/stripe-js";
// import Button from "../Button";
// import useLoginModal from "@/app/hooks/useLoginModal";
// import { Range } from "react-date-range";

// const initialDateRange = {
//   startDate: new Date(),
//   endDate: new Date(),
//   key: "selection",
// };

// interface currentUserProps {
//   totalPrice: number;
//   disabled?: boolean;
//   currentUser?: SafeUser | null;
//   // onSubmit: () => void;
//   startDate: Date | undefined;
//   endDate: Date | undefined;
//   listingId: string;
//   setDateRange: (value: Range) => void;
// }

// const PaymentModal: React.FC<currentUserProps> = ({
//   totalPrice,
//   // onSubmit,
//   disabled,
//   currentUser,
//   startDate,
//   endDate,
//   listingId,
//   setDateRange,
// }) => {
//   const router = useRouter();
//   const paymentModal = usePaymentModalModal();
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState(currentUser?.name || "");
//   const stripe = useStripe();
//   const elements = useElements();

//   const paymentData = {
//     amount: Math.round(totalPrice * 100),
//   };

//   const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     disabled;
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post("/api/payment", {
//         paymentData,
//         config,
//       });

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;
//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//         disabled;
//         return;
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           // order.paymentInfo = {
//           //   id: result.paymentIntent.id,
//           //   status: result.paymentIntent.status,
//           //   type: "Credit Card",
//           // };

//           await axios
//             .post("/api/reservations", {
//               totalPrice,
//               startDate,
//               endDate,
//               listingId,
//               name,
//             })
//             .then(() => {
//               toast.success("Listing reserved!");
//               setDateRange(initialDateRange);
//               router.refresh();
//               router.push("/trips");
//             });
//         }
//         disabled;
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   let bodyContent = (
//     <Elements stripe={stripePromise}>
//       {/* <CardNumberElement />
//       <CardExpiryElement />
//       <CardCvcElement /> */}
//       <div>
//         {/* <form className="w-full" onSubmit={paymentHandler}> */}
//         <div className="flex w-full pb-5 mb-2 border-b">
//           <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
//             <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//           </div>
//           <h4 className="text-[18px] pl-2 font-semibold text-[#000000b1]">
//             Pay with Debit/credit card
//           </h4>
//         </div>

//         <h4 className="text-[18px] fon pl-2 py-4 border-b font-semibold text-[#000000b1]">
//           Total Price <span className="pl-8">${totalPrice}</span>
//         </h4>

//         <div className="w-full flex flex-col pt-2 sm:flex-row gap-3 border-b">
//           <form className="w-full" onSubmit={paymentHandler}>
//             {/* <form className="w-full" onSubmit={() => {}}> */}
//             <div className="w-full flex gap-2 flex-col pb-2">
//               <div className="w-[100%] mb-2">
//                 <label className="block pb-1">Card Name</label>
//                 {/* <Input
//               subtitle
//               id="name"
//               label="Card name"
//               disabled={isLoading}
//               register={register}
//               errors={errors}
//               required
//               placeholder={currentUser ? currentUser.name : "lmdslvmlml"}
//             /> */}
//                 <input
//                   required
//                   className={`${styles.input} !w-[95%] text-[#444]`}
//                   value={name}
//                   onChange={(e) => setName?.(name, e.target.value)}
//                 />
//               </div>
//               <div className="w-[100%] mb-2">
//                 <label className="block pb-1">Exp Date</label>
//                 <CardExpiryElement
//                   className={`${styles.input}`}
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "19px",
//                         lineHeight: 1.5,
//                         color: "#444",
//                       },
//                       empty: {
//                         color: "#3a120a",
//                         backgroundColor: "transparent",
//                         "::placeholder": {
//                           color: "#444",
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="w-full flex gap-2 flex-col pb-2">
//               <div className="w-[100%] mb-2">
//                 <label className="block pb-1">Card Number</label>
//                 <CardNumberElement
//                   className={`${styles.input} !h-[35px] !w-[95%]`}
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "19px",
//                         lineHeight: 1.5,
//                         color: "#444",
//                       },
//                       empty: {
//                         color: "#3a120a",
//                         backgroundColor: "transparent",
//                         "::placeholder": {
//                           color: "#444",
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//               <div className="w-[100%] mb-2">
//                 <label className="block pb-1">CVV</label>
//                 <CardCvcElement
//                   className={`${styles.input} !h-[35px]`}
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "19px",
//                         lineHeight: 1.5,
//                         color: "#444",
//                       },
//                       empty: {
//                         color: "#3a120a",
//                         backgroundColor: "transparent",
//                         "::placeholder": {
//                           color: "#444",
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//             <input
//               type="submit"
//               value="Submit"
//               // disabled={disabled}
//               className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-semibold`}
//             />
//           </form>
//         </div>
//       </div>
//     </Elements>
//   );
//   return (
//     <Modal
//       open={true}
//       onClose={paymentModal.onClose}
//       // onSubmit={paymentHandler}
//       title="Payment Modal"
//       body={bodyContent}
//       actionLabel="Submit"
//       disabled={disabled}
//     >
//       {/* {bodyContent}{" "} */}
//     </Modal>
//   );
// };

// export default PaymentModal;
