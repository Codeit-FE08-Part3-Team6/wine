import Input from "@/components/@shared/Input";
import InputSelect from "@/components/@shared/InputSelect";
import { useState } from "react";

export default function SignInPage() {
  const [wineType, setWineType] = useState<"Red" | "White" | "Sparkling">(
    "Red",
  );
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  // return <div>로그인 페이지</div>;
  return (
    <>
      <Input placeholder="테스트" />
      <InputSelect
        placeholder={wineType}
        onClick={() => {
          setIsButtonsVisible(!isButtonsVisible);
        }}
      />
      {isButtonsVisible && (
        <>
          <button
            className="border border-solid p-2"
            onClick={() => setWineType("Red")}
          >
            Red
          </button>
          <button
            className="border border-solid p-2"
            onClick={() => setWineType("White")}
          >
            White
          </button>
          <button
            className="border border-solid p-2"
            onClick={() => setWineType("Sparkling")}
          >
            Sparkling
          </button>
        </>
      )}
    </>
  );
}
