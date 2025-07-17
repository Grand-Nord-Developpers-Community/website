export default function LoadingComponent() {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center relative">
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="w-full flex justify-center items-center mr-20">
          <span className="text-center text-lg text-gray-400">Chargement</span>
        </div>
      </div>
    </div>
  );
}
