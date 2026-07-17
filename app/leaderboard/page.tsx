import { createClient } from "@/lib/supabase/server";
import { LeaderboardClient } from "./LeaderboardClient";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: leaderboard } = await supabase
    .from("leaderboard")
    .select("*")
    .order("xp", { ascending: false })
    .limit(100);

  return <LeaderboardClient data={leaderboard || []} />;
}
