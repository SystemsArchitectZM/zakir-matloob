import { ContactPanel } from "@/components/sections/contact-panel";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <ContactPanel page priority />
    </main>
  );
}
