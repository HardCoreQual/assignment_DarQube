import * as React from "react"

export const EmptyBookmark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={13}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.764 2.475v7.321l2.95-1.236.769-.322.77.32 3.017 1.25V2.476H2.764Zm-2-2H12.27v12.328l-5.783-2.398-5.723 2.398V.475Z"
      fill="#fff"
    />
  </svg>
)
