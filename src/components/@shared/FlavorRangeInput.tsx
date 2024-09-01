interface FlavorRangeInputProps {
  min: number;
  max: number;
}

/**
 * FlavorRangeInput 컴포넌트는 주어진 최소, 최대 값 사이에서 선택할 수 있는 슬라이더
 *
 * // 사용법
 * <FlavorRangeInput min={0} max={10} />
 */
export default function FlavorRangeInput({
  min,
  max,
  ...props
}: FlavorRangeInputProps) {
  return (
    <>
      <div className="slider" />
      <div className="range-input">
        <input type="range" min={min} max={max} {...props} />
      </div>
      <style jsx>
        {`
          .slider {
            height: 6px;
            border-radius: 50px;
            background: #f2f4f8;
            border: 1px solid #cfdbea;
          }

          .range-input {
            position: relative;
          }

          .range-input input {
            position: absolute;
            top: -6px;
            height: 6px;
            width: 100%;
            background: none;
            -webkit-appearance: none;
          }

          input[type="range"]::-webkit-slider-thumb {
            height: 16px;
            width: 16px;
            border-radius: 9999px;
            pointer-events: auto;
            -webkit-appearance: none;
            background: #6a42db;
          }
        `}
      </style>
    </>
  );
}
