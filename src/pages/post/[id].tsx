import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CommentForm from "~/components/CommentForm";
import EditPost from "~/components/EditPost";

const SinglePost = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data: comments, refetch: refetchComments } =
    api.comments.getAllComments.useQuery(
      { id: router.query.id as string },
      {
        enabled: sessionData?.user !== undefined,
      }
    );
  const post = api.posts.getSinglePost.useQuery({
    id: router.query.id as string,
  });

  return (
    <>
      <div>{post.data?.title}</div>
      <EditPost />
      {comments &&
        comments.map((comment) => {
          return <div key={comment.id}>{comment.text}</div>;
        })}
    </>
  );
};

export default SinglePost;
