import React from "react";


export const PostTitle = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 {...props} className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mt-6 mb-8">{children}</h1>
}