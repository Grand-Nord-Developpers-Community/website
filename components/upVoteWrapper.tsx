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
  const { openAlert } = useAlertStore();

  // Find current user's vote from the list (initial state)
  const initialUserVote = voteList.find((vote) => vote.userId === user?.id);

  // Local state to track optimistic vote
  // null = no vote, true = upvoted, false = downvoted
  const [userUpVoted, setUserUpVoted] = React.useState<boolean | null>(
    initialUserVote ? initialUserVote.isUpvote : null
  );
  const [loading, setLoading] = React.useState(false);

  // Calculate optimistic displayed vote count:
  // total votes + (user vote delta compared to initial)
  const calculateDisplayValue = () => {
    if (!initialUserVote) {
      // User had no vote before
      if (userUpVoted === true) return value + 1;
      if (userUpVoted === false) return value - 1;
      return value;
    }

    // User had a previous vote
    if (userUpVoted === null) {
      // User removed their vote
      return initialUserVote.isUpvote ? value - 1 : value + 1;
    }

    if (userUpVoted === initialUserVote.isUpvote) {
      // Vote unchanged
      return value;
    }

    // User switched vote: remove previous vote and add opposite
    return userUpVoted ? value + 2 : value - 2;
  };


  // Handler for vote click
  const onVote = async (id: string, isUpVoted: boolean) => {
    if (!user) {
      openAlert();
      return false;
    }

    // Compute new optimistic vote state
    let newVoteState: boolean | null;
    if (userUpVoted === isUpVoted) {
      newVoteState = null; // toggle off if same vote clicked
    } else {
      newVoteState = isUpVoted;
    }

    // Optimistic UI update
    setUserUpVoted(newVoteState);
    setLoading(true);

    try {
      const res = await upVotePost({
        postId: id,
        commentId: null,
        isUpvote: newVoteState,
        userId: user.id,
      });

      if (res.error) {
        // Rollback if error
        setUserUpVoted(userUpVoted);
        console.error(res.error);
        return false;
      }
      return true;
    } catch (error) {
      // Rollback on exception
      setUserUpVoted(userUpVoted);
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <><UpVoteComponent
      id={id}
      onVote={onVote}
      value={calculateDisplayValue()}
      loading={loading}
      isCurrentUserVoted={
        userUpVoted === null
          ? undefined
          : { userId: user?.id || "", isUpvote: userUpVoted }
      }
    />{JSON.stringify(new Date())}</>
  );
}

export default UpVoteWrapper;
