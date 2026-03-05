import { changeFranchiseUseCase } from "@/features";
import type { BaseSelectItem } from "@/models";
import { useFranchiseStore, useLoadingStore } from "@/stores";
import { Check, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export default function FranchiseSelect() {
  const setLoading = useLoadingStore((s) => s.setLoading);

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const franchises = useFranchiseStore((s) => s.franchises);
  const selectedFranchiseId = useFranchiseStore((s) => s.selectedFranchiseId);

  const selected = franchises.find((f) => f.id === selectedFranchiseId);
  const filtered = franchises.filter((f) => f.name.toLowerCase().includes(keyword.toLowerCase()));

  const changeFranchise = (franchise: BaseSelectItem) => {
    setLoading(true);
    try {
      changeFranchiseUseCase(franchise.id);
      setOpen(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 font-medium w-[260px]"
      >
        <span className="whitespace-nowrap">Franchise</span>

        <span title={selected?.name} className="font-semibold text-white truncate flex-1 text-left">
          {selected?.name ?? "Select"}
        </span>

        <ChevronDown size={16} className="flex-shrink-0" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white shadow-xl z-50">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search size={16} className="text-gray-500" />

              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search franchise..."
                className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filtered.map((franchise) => {
              const isActive = franchise.id === selectedFranchiseId;

              return (
                <div
                  key={franchise.id}
                  onClick={() => changeFranchise(franchise)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition
                  ${isActive ? "bg-red-500 text-white" : "text-gray-700 hover:bg-red-50 hover:text-red-600"}`}
                >
                  <span>{franchise.name}</span>

                  {isActive && <Check size={16} />}
                </div>
              );
            })}

            {filtered.length === 0 && <div className="text-center text-gray-400 py-4 text-sm">No franchise found</div>}
          </div>
        </div>
      )}
    </div>
  );
}
