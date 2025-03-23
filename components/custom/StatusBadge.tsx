import React from "react";

interface Props {
  status: boolean;
}

const StatusBadge = ({ status }: Props) => {
  return (
    <div className="inline-flex items-center rounded-sm border border-neutral-200 h-5 px-1.5 text-xs font-medium transition-colors">
      {status ? (
        <div className="flex items-center gap-2">
          <div className="bg-green-500 h-2 w-2 rounded-full"></div>
          <div className="hidden sm:block text-neutral-900">Publish</div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="bg-red-500 h-2 w-2 rounded-full"></div>
          <div className="hidden sm:block text-neutral-900">Private</div>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
