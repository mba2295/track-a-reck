"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { z } from "zod";
import { ticketSchema } from "@/app/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner, ErrorMessage } from "@/app/components/Index";
import { Ticket } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type TicketModel = z.infer<typeof ticketSchema>;

const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketModel>({
    resolver: zodResolver(ticketSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const submitData = useCallback(
    async (data: TicketModel) => {
      try {
        setIsSubmitting(true);
        if (ticket) await axios.patch(`/api/tickets/${ticket?.id}`, data);
        else await axios.post("/api/tickets", data);
        router.push("/tickets");
        router.refresh();
      } catch (error) {
        setIsSubmitting(false);
        setError("An unexpected error occured. Please try again.");
      }
    },
    [ticket, router]
  );
  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <CiCircleAlert />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          await submitData(data);
        })}
        className="max-w-xl space-y-4"
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={ticket?.title}
            size="3"
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          defaultValue={ticket?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message} </ErrorMessage>

        <Button disabled={isSubmitting}>
          {ticket ? "Update Ticket" : "Submit New Ticket"}{" "}
          {isSubmitting && <LoadingSpinner></LoadingSpinner>}
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
