import { useEffect, useState } from "react";
import { imageType } from "@utils/types";
import { useTranslations } from "next-intl";

interface SelectTypeProps {
  type: imageType | null;
  setType: (type: imageType) => void;
}

const SelectType = ({ type, setType }: SelectTypeProps) => {
  const t = useTranslations("Common");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [type]);
  return (
    <div className="relative flex flex-row items-center justify-center gap-2 w-full md:w-auto">
      {isDropdownOpen && <SelectTypeSheet type={type} setType={setType} />}
      <button
        className="whitespace-nowrap inline-flex items-center justify-center md:rounded-full rounded-xl px-4 py-2 h-[48px] min-w-[120px] w-full md:w-auto bg-fuchsia-900 text-fuchsia-500"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        type="button"
        aria-label={t("selecttype")}
      >
        {type ? `${t("to")} .${type}` : t("selecttype")}
      </button>
    </div>
  );
};

const SelectTypeSheet = ({ type, setType }: SelectTypeProps) => {
  const t = useTranslations("Common");
  return (
    <div className="absolute bottom-full mb-2  min-w-48 bg-fuchsia-900/50 backdrop-blur-md text-fuchsia-300  shadow-lg rounded-md overflow-hidden">
      {["png", "jpg", "jpeg", "webp", "gif"].map((imageType) => (
        <button
          aria-label={t("settype", { type: imageType })}
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
