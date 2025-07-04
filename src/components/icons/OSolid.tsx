type OSolidProps = {
  size?: string;
  color?: string;
};

const OSolid = ({ size = "64", color = "#F2B137" }: OSolidProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z"
        fill={color}
      />
    </svg>
  );
};

export default OSolid;
