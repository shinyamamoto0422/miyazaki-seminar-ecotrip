import { IconProps } from "types/IconProps";

export const NearIon = ({ size = 24, color = "currentColor" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Z" />
    </svg>
  );
};
