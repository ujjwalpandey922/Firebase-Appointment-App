import CustomTable from "@/components/CustomTable";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex space-y-4 p-4 flex-col items-center justify-between max-w-[80rem] mx-auto">
      <Header />
      
      <CustomTable />
    </main>
  );
}
