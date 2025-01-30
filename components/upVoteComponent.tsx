import { ChevronDown, ChevronUp, LoaderIcon } from "lucide-react";
import React from "react";
interface UpVoteProps {
  id: string;
  onVote: (id: string, increment: boolean) => void;
  value: number;
  loading: boolean;
  isCurrentUserVoted?: {
    isUpvote: boolean;
    userId: string;
  };
}
function UpVoteComponent({
  id,
  onVote,
  isCurrentUserVoted,
  value,
  loading,
}: UpVoteProps) {
  return (
    <div
      className="flex flex-col items-center rounded-full bg-white border border-border space-x-0 space-y-2 mr-3 sm:mr-4"
      style={{ padding: "6px" }}
    >
      <button
        onClick={() => onVote(id, true)}
        className={`rounded-full p-1 transition-all duration-200 ${
          isCurrentUserVoted && isCurrentUserVoted.isUpvote
            ? "bg-gray-100 text-blue-500"
            : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        }`}
        disabled={loading}
        aria-label="Upvote"
      >
        <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
      </button>
      {loading && (
        <LoaderIcon className="my-1 text-sm text-gray-500 h-4 w-4 animate-spin" />
      )}
      {!loading && (
        <span className="my-1 text-sm font-medium text-gray-700">{value}</span>
      )}

      <button
        //onClick={() => handleVote("down")}
        onClick={() => onVote(id, false)}
        disabled={loading}
        className={`rounded-full p-1 transition-all duration-200 ${
          isCurrentUserVoted && !isCurrentUserVoted.isUpvote
            ? "bg-gray-100 text-blue-500"
            : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        }`}
        aria-label="Downvote"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default UpVoteComponent;
