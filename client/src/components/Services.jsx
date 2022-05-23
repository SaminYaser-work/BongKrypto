import { BsShieldShaded } from "react-icons/bs";
import { BsSpeedometer } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const ServiceCard = ({ title, subTitle, icon }) => {
  return (
    <div className="shadow-md shadow-black flex flex-col justify-center items-start m-3 bg-slate-700 rounded-lg text-white px-10 py-5">
      <div className="flex justify-center items-center">
        <div className="mr-10 self-start mt-3">{icon}</div>
        <div>
          <h5 className="text-3xl md:text-5xl mb-2">{title}</h5>
          <h5 className="text-xl text-slate-300">{subTitle}</h5>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  return (
    <div className="flex w-full justify-center items-center -mt-20 -mb-20">
      <div className="flex max-w-screen-2xl justify-between items-center flex-col md:flex-row">
        <div className="flex flex-col items-center justify-between py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start mr-20">
            <h1 className="text-4xl md:ml-12 md:text-6xl">
              Services that We
              <br />
              Continue to improve
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          <ServiceCard
            title="Security"
            subTitle={
              "lorem ipsum dolor sit amet consectetur adipisicing elit "
            }
            icon={<BsShieldShaded fontSize={40} className="text-fuchsia-600" />}
          />
          <ServiceCard
            title={"Faster"}
            subTitle={"lorem ipsum dolor sit amet consectetur adipisicing elit"}
            icon={<BsSpeedometer fontSize={40} className="text-red-500" />}
          />
          <ServiceCard
            title={"Better"}
            subTitle={"lorem ipsum dolor sit amet consectetur adipisicing elit"}
            icon={<AiFillStar fontSize={40} className="text-yellow-400" />}
          />
        </div>
      </div>
    </div>
  );
}
