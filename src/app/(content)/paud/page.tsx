import { Button } from "@/components/ui/button";

import PaudTable from "./_components/paud-table";

export default function PaudPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Data PAUD</h1>
        <Button style={{ backgroundColor: '#059669' }} className="text-white hover:opacity-90">
          Create PAUD
        </Button>
      </div>

      <PaudTable />

    </div>
  );
}
