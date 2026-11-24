import { homeBlocks } from "@/content/pages/home";
import { Blocks } from "@/components/sections/Blocks";
import { BookingDialog } from "@/components/forms/BookingDialog";
import { GhlScript } from "@/components/integrations/GhlEmbed";

/**
 * The home page: every section, in order, ending with the booking band
 * (#book). The booking sheet lives here too (it holds a third Website Form),
 * and GHL's embed script loads once for all three embeds.
 */
export default function HomePage() {
  return (
    <>
      <Blocks blocks={homeBlocks} />
      <BookingDialog />
      <GhlScript />
    </>
  );
}
