"use server";

import { ID } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error(`create appointment error ${error}`);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updateAppointment) throw Error;

    return parseStringify(updateAppointment);
  } catch (error) {
    console.error(`update appointment error ${error}`);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error(`get appointment error ${error}`);
  }
};