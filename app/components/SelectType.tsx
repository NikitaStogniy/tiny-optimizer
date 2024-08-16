import { useEffect, useState } from "react";
import { imageType } from "@utils/types";

interface SelectTypeProps {
  type: imageType | null;
  setType: (type: imageType) => void;
}

const SelectType = ({ type, setType }: SelectTypeProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [type]);
  return (
    <div className="relative flex flex-row items-center justify-center gap-2">
      {isDropdownOpen && <SelectTypeSheet type={type} setType={setType} />}
      <button
        className="whitespace-nowrap inline-flex items-center justify-center rounded-full px-4 py-2 h-[48px] w-[120px] bg-fuchsia-900 text-fuchsia-500"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        type="button"
      >
        {type ? `To .${type}` : "Select Type"}
      </button>
    </div>
  );
};

const SelectTypeSheet = ({ type, setType }: SelectTypeProps) => {
  return (
    <div className="absolute bottom-full mb-2 w-48 bg-fuchsia-900/50 backdrop-blur-md text-fuchsia-300  shadow-lg rounded-md overflow-hidden">
      {["png", "jpg", "jpeg", "webp", "gif"].map((imageType) => (
        <button
          type="button"
          key={imageType}
          className={`block w-full text-left px-4 py-2 hover:text-fuchsia-900 hover:bg-fuchsia-500 ${
            type === imageType
              ? "bg-fuchsia-800 text-fuchsia-500"
              : "text-fuchsia-300"
          }`}
          onClick={() => setType(imageType as imageType)}
        >
          .{imageType}
        </button>
      ))}
    </div>
  );
};

export default SelectType;
