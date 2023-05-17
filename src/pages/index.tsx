import { type NextPage } from "next";
import { useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import PostCard from "~/components/PostCard";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [post, setPost] = useState({ title: "", text: "" });
  const { data: sessionData } = useSession();
  const { data: posts, refetch: refetchPosts } = api.posts.getPosts.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const newPost = api.posts.createPost.useMutation({
    onSuccess: () => {
      void refetchPosts();
    },
  });
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newPost.mutate({
      title: post.title,
      text: post.text,
    });
    setPost({
      title: "",
      text: "",
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  return (
    <>
      {sessionData && (
        <form className="bg-gray-400" onSubmit={handlePostSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="text"
            placeholder="text"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {posts
        ? posts?.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        : "Hello World"}
    </>
  );
};

export default Home;
