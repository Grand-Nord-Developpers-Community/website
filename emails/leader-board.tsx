import { Section, Text } from "@react-email/components";
import * as React from "react";
import LayoutEmail from "./base-layout";

export interface LeaderBoardProps {
  name: string;
  xp: number;
  username: string;
  rank: number;
  tops: { name: string; xp: number }[];
}

export default function LeaderBoard({
  name,
  rank,
  xp,
  username,
  tops,
}: LeaderBoardProps) {
  return (
    <LayoutEmail title={`Leaderboard Hebdomadaire🏆`}>
      <Section className="text-[#3c4149]">
        <Text>
          Great job <b>{name}</b>, this week!
        </Text>
        <Text>
          You are ranked <b>#{rank}</b> with <b>{xp}</b> XP.
        </Text>
        <Text>Keep pushing to climb higher 🚀</Text>
      </Section>
    </LayoutEmail>
  );
}
