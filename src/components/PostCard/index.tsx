import type { Post, User } from "@prisma/client";
import Link from "next/link";

interface Props {
  // children: React.ReactNode;
  post: Post & {
    user: User;
  };
}

const PostCard = ({ post }: Props) => {
  // console.log(post.title);

  return (
    <>
      <div className="m-4 flex w-1/2 flex-col justify-center rounded-lg border border-black shadow-md shadow-blue-500">
        <div className="text-neutral-900-900 flex justify-between rounded-t-lg bg-gradient-to-br from-slate-700 via-blue-500 to-indigo-400 px-4 py-1 shadow-inner shadow-indigo-700">
          <Link href={`/post/${post.id}`}>
            <h2 className="bg-transparent">{post.title}</h2>
          </Link>
          <h2>{post.user.name}</h2>
        </div>
        <div className="rounded-b-lg bg-gradient-to-r from-neutral-200 via-slate-300 to-neutral-400 px-4 py-2">
          <p>{post.text}</p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
