import { homeBlocks } from "@/content/pages/home";
import { Blocks } from "@/components/sections/Blocks";

/** The only page: every section, in order, ending with the booking band (#book). */
export default function HomePage() {
  return <Blocks blocks={homeBlocks} />;
}
