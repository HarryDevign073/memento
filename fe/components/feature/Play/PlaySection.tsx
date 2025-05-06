import React from "react";

const PlaySection = () => {
  return (
    <section className="flex flex-col w-[50%] h-fit bg-white rounded-lg shadow-lg p-6 gap-12">
      {/* Play Header */}
      <div>Question</div>
      <div className="flex flex-col item-center gap-3">
        <div className="flex items-center gap-5 p-4 bg-white border border-neutral-200 rounded-md hover-animation cursor-pointer">
          <div className="flex-center text-neutral-900 h-9 w-9 bg-white border rounded-md border-neutral-200 items-center">
            A
          </div>
          <div className="font-medium">Default</div>
        </div>
        <div className="flex items-center gap-5 p-4 bg-white border border-primary rounded-md hover-animation cursor-pointer">
          <div className="flex-center text-white h-9 w-9 bg-primary  rounded-md  items-center">
            B
          </div>
          <div className="font-medium">Selected Item</div>
        </div>
        <div className="flex items-center gap-5 p-4 bg-white border border-green-600 rounded-md">
          <div className="flex-center text-white h-9 w-9 bg-green-600  rounded-md items-center">
            C
          </div>
          <div className="font-medium">Correct Item</div>
        </div>
        <div className="flex items-center gap-5 p-4 bg-white border border-red-600 rounded-md">
          <div className="flex-center text-white h-9 w-9 bg-red-600 rounded-md items-center">
            D
          </div>
          <div className="font-medium">Wrong Item</div>
        </div>
      </div>
      {/* Play Footer */}
    </section>
  );
};

export default PlaySection;
