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
import { createTicketSchema } from "@/app/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
type NewIssueForm = z.infer<typeof createTicketSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const NewTicketPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueForm>({
    resolver: zodResolver(createTicketSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const postNewData = useCallback(async (data: NewIssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/tickets", data);
      router.push("/tickets");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured. Please try again.");
    }
  }, []);
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
          await postNewData(data);
        })}
        className="max-w-xl space-y-4"
      >
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message} </ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Ticket {isSubmitting && <LoadingSpinner></LoadingSpinner>}
        </Button>
      </form>
    </div>
  );
};

export default NewTicketPage;
