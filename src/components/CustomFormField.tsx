/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";
import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disable?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    placeholder,
    fieldType,
    iconSrc,
    iconAlt,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    name,
    label,
    children,
    disable,
  } = props;
  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc!}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="US"
          placeholder={placeholder}
          international
          value={field.value as Value | undefined}
          onChange={field.onChange}
          className="input-phone"
        />
      );
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex round-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            width={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            {...field}
            placeholder={placeholder}
            className="shad-textArea border-0"
            disabled={disable}
          />
        </FormControl>
      );
    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
