import { Typography } from "@material-tailwind/react";

function DetailItem({ title, item, containerStyle }) {
  return (
    <div className={`flex flex-col flex-1 mb-5 ${containerStyle}`}>
      <Typography
        color="black"
        variant="paragraph"
        className="text-left w-full"
      >
        <span className="uppercase font-bold text-sm detail-title">
          {title}
        </span>
      </Typography>
      <Typography
        color="black"
        variant="paragraph"
        className="text-left text-xl w-full"
      >
        <span>{item}</span>
      </Typography>
    </div>
  );
}

export default DetailItem;
