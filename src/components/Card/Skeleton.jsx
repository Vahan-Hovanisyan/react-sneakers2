import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f5f5f5"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="-115" rx="10" ry="10" width="610" height="0" /> 
    <rect x="30" y="30" rx="10" ry="10" width="150" height="90" /> 
    <rect x="30" y="133" rx="3" ry="3" width="150" height="15" /> 
    <rect x="30" y="155" rx="3" ry="3" width="90" height="15" /> 
    <rect x="30" y="183" rx="8" ry="8" width="80" height="25" /> 
    <rect x="149" y="183" rx="8" ry="8" width="32" height="32" />
  </ContentLoader>
)
