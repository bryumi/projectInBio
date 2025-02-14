import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import Button from "../../ui/Button";
import EditSocialLinks from "./edit-social-links";
import { ProfileData } from "@/app/server/get-profile-data";
import Link from "next/link";
import AddCustomLink from "./add-custom-link";
import { formatUrl } from "@/app/lib/utils";
import { getDownloadURLFromPath } from "@/app/lib/firebase";
import EditUserCard from "./edit-user-card";
export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
}) {
  const icons = [Github, Instagram, Linkedin, Twitter, Plus];
  return (
    <div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-white border-opacity-10 bg-[#121212] p-5 text-white">
      <div className="size-48">
        <img
          src={
            (await getDownloadURLFromPath(profileData?.imagePath)) || "/me.webp"
          }
          alt="André Dev"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-3xl font-bold">
            {profileData?.name || "Profile image"}
          </h3>
          {isOwner && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">{profileData?.description || "Eu faço produtos para a Internet"}</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link href={profileData.socialMedias?.github} target="_blank" className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link href={profileData.socialMedias?.linkedin} target="_blank" className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link href={profileData.socialMedias?.instagram} target="_blank" className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link href={profileData.socialMedias?.twitter} target="_blank" className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Twitter />
            </Link>
          )}
            {!profileData &&
              icons.map((Icon, index) => (
                <button
                  key={index}
                  className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
                >
                  <Icon />
                </button>
              ))}
          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
        <div className="flex min-h-[172px] w-full flex-col gap-3">
          <div className="flex w-full flex-col items-center gap-3">
            {profileData?.link1 && (
              <Link
                href={formatUrl(profileData?.link1?.url)}
                target="_blank"
                className="w-full"
              >
                <Button className="w-full">{profileData?.link1?.title}</Button>
              </Link>
            )}
            {profileData?.link2 && (
              <Link
                href={formatUrl(profileData?.link2?.url)}
                target="_blank"
                className="w-full"
              >
                <Button className="w-full">{profileData?.link2?.title}</Button>
              </Link>
            )}
            {profileData?.link3 && (
              <Link
                href={formatUrl(profileData?.link3?.url)}
                target="_blank"
                className="w-full"
              >
                <Button className="w-full">{profileData?.link3?.title}</Button>
              </Link>
            )}
          </div>
        </div>
        {!profileData && (
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Plus />
            </button>
          </div>
          )}
        {isOwner && <AddCustomLink />}
      </div>
    </div>
  );
}
