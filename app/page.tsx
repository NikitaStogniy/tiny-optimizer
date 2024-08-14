import Image from "next/image";
import SentForm from "./components/sentForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SentForm />
    </main>
  );
}
