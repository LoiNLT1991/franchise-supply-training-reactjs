import type { Role } from "@/models";

interface ContextSelectorProps {
  roles: Role[];
  onSelect: (franchise_id: string) => void;
}

export const ContextSelector = ({ roles, onSelect }: ContextSelectorProps) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-6">Select Context</h1>

      <div className="space-y-3">
        {roles.map((role, index) => (
          <button
            key={index}
            onClick={() => onSelect(role.franchise_id)}
            className="w-full border rounded px-4 py-3 text-left hover:bg-gray-50"
          >
            <div className="font-medium">{role.role}</div>

            <div className="text-xs text-gray-500">
              {role.scope}
              {role.franchise_name && ` - ${role.franchise_name}`}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};
