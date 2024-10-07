const Success = ({ isOpen, title, description }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-['rgba(0, 0, 0, 0.5)'] bg-opacity-30 backdrop-blur-sm z-10 w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-2/4 mt-2">
        <div className="bg-[#473d3d] w-full px-5 py-10 rounded-lg flex flex-col justify-center items-center gap-3 text-center">
          <p className="text-black">{title}</p>
          <p className="text-black">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
