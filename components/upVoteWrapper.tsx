"use client";
import { upVotePost } from "@/actions/vote.actions";
import { useAlertStore } from "@/components/stores/useAlert";
import UpVoteComponent from "@/components/upVoteComponent";
import { SessionUser } from "@/lib/db/schema";
import React from "react";
type Props = {
  value: number;
  id: string;
  user: SessionUser | null;
  voteList: { userId: string; isUpvote: boolean }[];
};

function UpVoteWrapper({ value, id, user, voteList }: Props) {
  //const [value, setValue] = React.useState(initalValue);
  const [loading, setLoading] = React.useState(false);
  const isCurrentUserVoted = voteList.find((vote) => vote.userId === user?.id);
  const [userUpVoted, setUserUpVoted] = React.useState<
    { userId: string; isUpvote: boolean } | undefined
  >(isCurrentUserVoted);
  const { openAlert } = useAlertStore();
  const [vote, setVote] = React.useState<0 | 1 | -1>(
    isCurrentUserVoted?.isUpvote
      ? 1
      : isCurrentUserVoted?.isUpvote === false
        ? -1
        : 0
  ); // Default: 0 (no vote)

  const handleUpVote = () => {
    setVote((prev) => (prev === 1 ? 0 : 1)); // If already upvoted, reset to 0; otherwise, upvote (+1)
  };

  const handleDownVote = () => {
    setVote((prev) => (prev === -1 ? 0 : -1)); // If already downvoted, reset to 0; otherwise, downvote (-1)
  };

  // useEffect(() => {
  //   setValue((v) => v + vote===0?:vote);
  //   switch (vote) {
  //     case 0:
  //       setUserUpVoted(undefined);
  //     case 1:
  //       setUserUpVoted({ userId: user?.id || "", isUpvote: true });
  //       break;
  //     case -1:
  //       setUserUpVoted({ userId: user?.id || "", isUpvote: false });
  //       break;
  //   }
  // }, [vote]);

  const onVote = async (id: string, isUpVoted: boolean) => {
    setLoading(true);

    if (!user) {
      openAlert();
      setLoading(false);
      return false;
    }

    try {
      const res = await upVotePost({
        postId: id,
        commentId: null,
        isUpvote: isUpVoted,
        userId: user.id,
      });

      if (res.error) {
        console.log(res.error);
        return false;
      }

      setUserUpVoted((prevVote) => {
        if (!prevVote) {
          // ✅ First-time voting (+1 or -1)
          //setValue((value) => value + (isUpVoted ? 1 : -1));
          return { userId: user.id, isUpvote: isUpVoted };
        } else if (prevVote.isUpvote === isUpVoted) {
          // ✅ Removing vote (toggle off)
          //setValue(initalValue - vote);
          return undefined;
        } else {
          // ✅ Switching vote (upvote → downvote or vice versa)
          //setValue((value) => value + (isUpVoted ? 1 : -1));
          return { userId: user.id, isUpvote: isUpVoted };
        }
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UpVoteComponent
        id={id}
        onVote={onVote}
        value={value}
        loading={loading}
        isCurrentUserVoted={userUpVoted}
      />
    </>
  );
}

export default UpVoteWrapper;
