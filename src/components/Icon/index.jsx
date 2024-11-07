import spriteUrl from "@/Assets/sprite.svg";

// eslint-disable-next-line react/prop-types
 export const Icon = ({id,className}) => {
  return (
    <svg className={className}>
      <use xlinkHref={spriteUrl + "#" + id} />
    </svg>
  )
}


