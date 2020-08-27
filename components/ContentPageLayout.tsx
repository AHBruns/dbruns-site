import React from "react";

function ContentPageLayout({ children }: { children?: any }) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl p-4 mx-auto space-y-4">
      {children}
    </div>
  );
}

export default ContentPageLayout;
