"use server";

import { ID, Query } from "node-appwrite";
import {
  APPWRITE_APPOINTMENT_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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
    if (!updateAppointment) throw new Error("Appointment not found");

    revalidatePath("/admin");
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

export const getRecentAppointmentList = async () => {
  try {
    const appointmentList = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const count = (appointmentList.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointmentList.total,
      ...count,
      documents: appointmentList.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(`getting recent appointment list error ${error}`);
  }
};
