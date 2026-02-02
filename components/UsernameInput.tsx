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
      <div className="flex items-center rounded-md shadow-xs">
        <div className="block w-[15%] h-full break-keep items-center px-3 py-2.5 rounded-l-md  bg-muted text-muted-foreground text-sm">
          {"gndc.tech/user/"}
        </div>
        <Input
          id={id}
          className="grow -ms-px rounded-s-none shadow-none"
          placeholder="votre-pseudo"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
