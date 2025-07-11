import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsernameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Pseudo</Label>
      <div className="flex rounded-md shadow-xs">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          gndc.cm/user/
        </span>
        <Input
          id={id}
          className="-ms-px rounded-s-none shadow-none"
          placeholder="votre-pseudo"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
