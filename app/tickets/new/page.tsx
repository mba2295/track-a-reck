"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";

interface NewIssueForm {
  title: string;
  description: string;
}

const NewTicketPage = () => {
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="max-w-xl space-y-4"
    >
      <TextField.Root>
        <TextField.Input size="3" placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      ></Controller>

      <Button>Submit New Ticket</Button>
    </form>
  );
};

export default NewTicketPage;
