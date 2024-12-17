"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import FormSubmitButton from "../FormSubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { FormFieldTypes } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "@radix-ui/react-label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    try {
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <section className="space-y-4 mb-12">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="icon"
          />

          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="icon"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="phone"
              label="Phone number"
              placeholder="+12133734253"
            />
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.DATE_PICKER}
              name="birthDate"
              label="Date of birth"
              placeholder="Select your birth date"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SKELETON}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-2 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          htmlFor={option}
                          className="cursor-pointer md:text-sm"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="address"
              label="Address"
              placeholder="ex: 14 street, New York, NY - 5101"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="+12133734253"
            />
          </div>
        </section>

        <section className="space-y-6 my-12">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
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
              fieldType={FormFieldTypes.INPUT}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="ex: BlueCross"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ex: ABC1234567"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="allergies"
              label="Allegies(if any)"
              placeholder="ex: Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="currentMedication"
              label="Current medication"
              placeholder="ex: lbuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="familyMedicalHistory"
              label="Family Medical History(if relevant)"
              placeholder="ex: Mother had breast cancer"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="ex: Asthma diagnosis in childhood"
            />
          </div>
        </section>
        <section className="space-y-6 my-12">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, idx) => (
              <SelectItem key={idx} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="ex: 123123123"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SKELETON}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6 my-12">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.CHECKBOX}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy."
          />
        </section>
        <FormSubmitButton isLoading={isLoading}>Get Started</FormSubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
