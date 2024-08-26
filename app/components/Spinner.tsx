import { ImSpinner2 } from "react-icons/im";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full border-t-2 border-b-2 border-fuchsia-900">
        <ImSpinner2 className="animate-spin" size={24} />
      </div>
    </div>
  );
};
