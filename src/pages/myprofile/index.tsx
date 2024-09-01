import FlavorRangeInput from "@/components/@shared/FlavorRangeInput";
import PriceRangeInput from "@/components/@shared/PriceRangeInput";
import TextareaInput from "@/components/@shared/TextareaInput";

export default function MyProfilePage() {
  return (
    <div className="w-[500px] px-[50px] py-[50px]">
      <PriceRangeInput />
      <div className="py-[20px]" />
      <FlavorRangeInput min={0} max={10} />
      <div className="py-[20px]" />
      <TextareaInput />
    </div>
  );
}
