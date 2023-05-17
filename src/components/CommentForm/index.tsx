import Button from "../Button";
import { ReactEventHandler } from "react";

interface Props {
  onChange: ReactEventHandler;
  onClick: ReactEventHandler;
}

const CommentForm = ({ onChange, onClick }: Props) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setComment({ [name]: value });
  // };

  return (
    <div>
      <textarea
        className=""
        name="text"
        onChange={onChange}
        rows={4}
      ></textarea>
      <Button className="rounded-lg border" onClick={onClick}>
        Add Comment
      </Button>
    </div>
  );
};

export default CommentForm;
