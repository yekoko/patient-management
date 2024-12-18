"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAppointmentSchema } from "@/lib/validation";
import { z } from "zod";
import { Appointment } from "@/types/appwrite.types";
import { FormFieldTypes } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FormSubmitButton from "../FormSubmitButton";

const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema("");
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async ({}: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    try {
      //   if (user) {
      //     router.push(`/patients/${userId}/register`);
      //   }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hey there 👋, ....</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.SELECT}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Select a doctor"
        >
          {Doctors.map((doctor, idx) => (
            <SelectItem key={doctor.name + idx} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  alt="doctor"
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-4 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.TEXTAREA}
            name="reason"
            label="Reason for appointment"
            placeholder="ex: Annual monthly check-up"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.TEXTAREA}
            name="note"
            label="Additional comments/notes"
            placeholder="ex: Prefer afternoon appointments, if possible"
          />
        </div>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.DATE_PICKER}
          name="schedule"
          label="Expected appointment date"
          placeholder="Select your appointment date"
        />

        <FormSubmitButton isLoading={isLoading}>
          Submit and continue
        </FormSubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
