"use server";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";
export type Link = {
  title: string;
  url: string;
};
export default async function addCustomLinks({
  link1,
  link2,
  link3,
  profileId,
}: {
  profileId: string;
  link1: Link;
  link2: Link;
  link3: Link;
}) {
  try {
    const session = await auth();
    if (!session) return;

    const updateData: Record<string, Link> = {};

    if (link1) updateData.link1 = link1;
    if (link2) updateData.link2 = link2;
    if (link3) updateData.link3 = link3;

    if (Object.keys(updateData).length === 0) {
      console.log("Nenhum link foi fornecido para atualização.");
      return;
    }
    await db.collection("profiles").doc(profileId).update(updateData);
  } catch (error) {
    console.error(error);
  }
}
