import React, { useEffect } from "react";

interface PriceRangeInputProps {
  priceGap?: number;
  minValue: number;
  maxValue: number;
  onPriceChange: (min: number, max: number) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const DEFAULT_PRICE_GAP = 30000;

/**
 * PriceRangeInput 컴포넌트는 가격 범위(최소, 최대)를 설정하는 슬라이더
 *
 * // (주의사항) 페이지 또는 모달에 사용할 때 width, height를 지정해준 div 태그로 감싸서 사용해주세요.
 *
 * // 사용법
 * <PriceRangeInput
 *    minPrice={10000}
 *    maxPrice={200000}
 *    priceGap={30000}
 *    onPriceChange={(min, max) => console.log(`최소: ${min}, 최대: ${max}`)}
 * />
 */
export default function PriceRangeInput({
  priceGap = DEFAULT_PRICE_GAP,
  minValue,
  maxValue,
  onPriceChange,
}: PriceRangeInputProps) {
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".slider .progress");

    if (progress) {
      progress.style.left = `${(minValue / MAX_PRICE) * 100}%`;
      progress.style.right = `${100 - (maxValue / MAX_PRICE) * 100}%`;
    }
  }, [minValue, maxValue]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(
      Math.min(Number(e.target.value), maxValue - priceGap),
      maxValue,
    );
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(
      minValue,
      Math.max(Number(e.target.value), minValue + priceGap),
    );
  };

  return (
    <>
      <div className="flex h-[31px] w-full flex-col gap-[5px] pt-[31px]">
        <div>
          <div className="slider relative h-[6px] rounded-[50px] bg-light-gray-100">
            <div className="progress absolute left-1/4 right-1/4 h-[6px] rounded-[50px] bg-light-purple-100" />
            <span className="thumb-label min-label text-lg-16px-medium text-light-purple-100">
              ₩ {minValue.toLocaleString()}
            </span>
            <span className="thumb-label max-label text-lg-16px-medium text-light-purple-100">
              ₩ {maxValue.toLocaleString()}
            </span>
          </div>
          <div className="range-input relative">
            <input
              type="range"
              className="range-min"
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={minValue}
              step={1000}
              onChange={handleMinChange}
            />
            <input
              type="range"
              className="range-max"
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={maxValue}
              step={1000}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .range-input input {
            position: absolute;
            top: -6px;
            height: 6px;
            width: 100%;
            background: none;
            pointer-events: none;
            -webkit-appearance: none;
          }

          input[type="range"]::-webkit-slider-thumb {
            height: 20px;
            width: 20px;
            border-radius: 9999px;
            border: 1px solid #cfdbea;
            pointer-events: auto;
            -webkit-appearance: none;
            background: #ffffff;
          }

          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 9999px;
            border: 1px solid #cfdbea;
            pointer-events: auto;
            -moz-appearance: none;
            background: #ffffff;
          }

          .thumb-label {
            position: absolute;
            top: -30px;
            transform: translateX(-50%);
            white-space: nowrap;
          }

          .min-label {
            transform: translateX(-20%);
            top: 12px;
            left: ${(minValue / MAX_PRICE) * 100}%;
          }

          .max-label {
            transform: translateX(-70%);
            left: ${(maxValue / MAX_PRICE) * 100}%;
          }
        `}
      </style>
    </>
  );
}
