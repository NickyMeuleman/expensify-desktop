import { trpc } from "../utils/trpc";
import { useNavigate, Link } from "react-router-dom";

const AddPageContent: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center bg-slate-200 p-4">
      <div className="flex w-full lg:w-11/12 xl:w-3/4">ADD PAGE</div>
    </div>
  );
};

const AddPage = () => {
  return (
    <>
      <AddPageContent />;
    </>
  );
};

export default AddPage;
