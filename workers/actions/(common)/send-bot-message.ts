export interface Props {
  msg: string;
  tagAll?: boolean;
  targetAdmin?: boolean;
  option?: {
    leaderboard: boolean;
    profil: string;
  };
}

export async function sendBotMsg({
  msg,
  tagAll = false,
  targetAdmin = false,
  option,
}: Props) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BOT_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: msg,
      tagAll,
      targetAdmin,
      option,
    }),
  });
  return result;
}
