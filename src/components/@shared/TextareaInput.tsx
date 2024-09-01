interface TextareaInputProps {
  placeholder?: string;
  className?: string;
}

/**
 * TextareaInput 컴포넌트는 리뷰를 등록하거나 수정할 때 사용되는 텍스트 영역
 *
 * // 기본 사용법
 * <TextareaInput />
 *
 * // 커스텀 사용법
 * <TextareaInput placeholder="여기에 리뷰를 작성하세요" className="mobile-size" />
 */
export default function TextareaInput({
  placeholder = "내용을 입력해 주세요",
  className = "",
}: TextareaInputProps) {
  return (
    <>
      <textarea
        placeholder={placeholder}
        className={`w-full rounded-[16px] border border-solid border-light-gray-300 px-[20px] py-[14px] text-md-14px-regular ${className}`}
      />
      <script>
        {`
        .placeholder::placeholder {
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
        }
      `}
      </script>
    </>
  );
}
