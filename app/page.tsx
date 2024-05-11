import { ToggleTheme } from "@/components/ToggleTheme";
import ChangeTabs from "@/components/ChangeTabs";

export default function Home() {
  return (
    <main >
      <div className="flex justify-between m-5">
        <h1 className="text-red-600 text-2xl font-bold mt-1">Movie Memo</h1>
      <ToggleTheme/>
      </div>
      <ChangeTabs />
    </main>
  );
}
