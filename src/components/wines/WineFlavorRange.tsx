import FlavorRangeInput from "@/components/@shared/FlavorRangeInput";

interface WineFlavorRangeProps {
  flavor: string;
  typeOne: string;
  typeTwo: string;
  onChange: (value: number) => void;
}

export default function WineFlavorRange({
  flavor,
  typeOne,
  typeTwo,
  onChange,
}: WineFlavorRangeProps) {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <p className="min-w-14 rounded-[6px] bg-light-gray-100 px-2 py-[2px] text-center text-md-14px-semibold text-light-gray-500">
        {flavor}
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="min-w-[70px] text-lg-16px-medium text-light-gray-800">
          {typeOne}
        </p>
        <div className="w-full">
          <FlavorRangeInput min={0} max={10} onChange={onChange} />
        </div>
        <p className="min-w-[56px] text-right text-lg-16px-medium text-light-gray-800">
          {typeTwo}
        </p>
      </div>
    </div>
  );
}
