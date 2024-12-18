/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";
import {
  APPWRITE_STORAGE_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PATIENT_COLLECTION_ID,
  APPWRITE_PROJECT_ID,
  databases,
  storage,
  users,
  ENDPOINT,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log(newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(`get user detail error ${error}`);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.error(`get patient error ${error}`);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const input = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(APPWRITE_STORAGE_ID!, ID.unique(), input);
    }
    const newPatient = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${APPWRITE_STORAGE_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.error(`patient register error ${error}`);
  }
};
