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
  await fetch(`${process.env.NEXT_PUBLIC_BOT_URL}`, {
    method: "POST",
    body: JSON.stringify({
      message: msg,
      tagAll,
      targetAdmin,
      option,
    }),
  });
}
