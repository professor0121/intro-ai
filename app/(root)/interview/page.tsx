"use client "
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
  const profileURL="https://placehold.co/400x400";
  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;