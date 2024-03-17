import dynamic from "next/dynamic";
import TicketFormSkeleton from "../_components/TicketFormSkeleton";
const TicketForm = dynamic(
  () => import("@/app/tickets/_components/TicketForm"),
  {
    ssr: false,
    loading: () => <TicketFormSkeleton />,
  }
);
const NewTicketPage = () => {
  return <TicketForm></TicketForm>;
};

export default NewTicketPage;
