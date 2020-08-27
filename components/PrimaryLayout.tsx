import React from "react";

function PrimaryLayout({ header, body }: { header: any; body: any }) {
  return (
    <div className="flex flex-col max-w-full min-h-screen">
      <div className="sticky inset-x-0 top-0 z-50">{header}</div>
      {body}
    </div>
  );
}

export default PrimaryLayout;
