// @ts-nocheck

import { useRouter } from "next/navigation";

const Card = ({ siteName, image, id, tags }) => {
  const router = useRouter();

  tags = [...new Set(tags.map((tag) => tag[1]))];

  return (
    <div
      className="max-w-[400px] h-[400px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => {
        router.push(`/site/${id}`);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src={`/api${image ? image[0] : ""}`}
          alt=""
          className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] object-cover rounded-[30px]"
        />
        <p>{siteName}</p>
        <p className="flex flex-wrap">
          {tags.map((tag, index) => (
            <div className="badge bg-[#e0d4c4]" key={index}>
              {tag}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Card;
