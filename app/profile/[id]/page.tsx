"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

interface Params {
  id: string
}

const UserProfile = ({ params }: {params: Params}) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return userName ? (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personal profile page. Explore ${userName}`}
      data={userPosts} handleEdit={undefined} handleDelete={undefined}    />
  ) : <p>Username does not exit</p>;
};

export default UserProfile;