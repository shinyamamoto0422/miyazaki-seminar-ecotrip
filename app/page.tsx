import { EcoTripIcon } from "@/components/shared/icons/icon";
import Image from "next/image";

const Point = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-gray-50 bg-opacity-85 p-5">
      <div className="flex justify-between">
        <p className="font-mono font-bold text-gray-400">2021/10/10</p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-lg font-bold">+5ポイント</p>
          <Image src="/earth.png" alt="star" width={24} height={24} />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex items-center gap-1">
          <Image src="/bottle.png" alt="ボトル" width={40} height={40} />
          <p className="font-mono text-xl font-bold">2</p>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/cloud.png" alt="co2" width={48} height={40} />
          <p className="font-mono text-xl font-bold">147g</p>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col">
          <p className="font-mono text-xl font-bold">18.54</p>
          <p className="font-mono text-lg text-gray-400">km</p>
        </div>
        <div className="flex flex-col">
          <p className="font-mono text-xl font-bold">37’27”</p>
          <p className="font-mono text-lg text-gray-400">時間</p>
        </div>
      </div>
    </div>
  );
};

export default async function Home() {
  return (
    <div className="z-10 flex w-full max-w-xl flex-col gap-10 pt-10">
      <div>
        <EcoTripIcon className="mx-auto scale-150" />
        <p className="animate-fade-up text-center font-mono text-xl font-bold text-gray-800">
          サイクリングで旅をエコに
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-md border-4 border-gray-800 bg-white bg-opacity-85 p-5">
        <div className="flex items-end gap-1">
          <p className="font-mono text-6xl font-bold">288</p>
          <p className="font-mono text-3xl text-gray-400">ポイント</p>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col">
            <p className="font-mono text-4xl font-bold">322.4</p>
            <p className="font-mono text-2xl text-gray-400">KM</p>
          </div>
          <div className="flex flex-col">
            <p className="font-mono text-4xl font-bold">4:12:03</p>
            <p className="font-mono text-2xl text-gray-400">時間</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">
          最近のサステナ貢献
        </h1>
        <div className="flex flex-col gap-5">
          <Point />
          <Point />
          <Point />
          <Point />
        </div>
      </div>
    </div>
  );
}
