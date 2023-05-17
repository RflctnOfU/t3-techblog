import { api } from "~/utils/api";
import CommentForm from "../CommentForm";
import { useState } from "react";
import { useRouter } from "next/router";

const EditPost = () => {
  const router = useRouter();
  const { data: comments, refetch: refetchComments } =
    api.comments.getAllComments.useQuery(
      { id: router.query.id as string },
      { enabled: true }
    );
  const post = api.posts.getSinglePost.useQuery({
    id: router.query.id as string,
  });
  const newComment = api.comments.createComment.useMutation({
    onSuccess: () => void refetchComments(),
  });
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    console.log(e.target.value);

    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    newComment.mutate({ id: router.query.id as string, text: comment });
    setComment("");
  };

  return (
    <>
      <CommentForm onChange={handleChange} onClick={handleSubmit} />
    </>
  );
};

export default EditPost;
