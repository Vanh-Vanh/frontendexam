import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import FollowRight from "./FollowRight";
import MobileSidebar from "./MobileSidebar";
import MobileLogo from "./MobileLogo";

const Search: React.FC = () => {
  const steps = useMemo(() => [3, 6, 9, 12, 15, 50],[])
  const [index, setIndex] = useState<number>(steps.indexOf(15));

  const percent = useMemo(
    () => (index / (steps.length - 1)) * 100,
    [index, steps.length]
  )

  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState<string>("");

  const handleSearch = useCallback(() => {
    const limit = steps[index];
    const encodedKeyword = encodeURIComponent(keyword.trim());
    navigate(`/search/result?keyword=${encodedKeyword}&limit=${limit}`);
  }, [keyword, index, navigate, steps]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <MobileLogo />
      <Sidebar className="hidden md:block" />

      {/* Left side */}
      <div className="flex-1 px-4 py-16 md:px-20 flex flex-col overflow-y-auto pb-14">
        <div className="flex-1 space-y-10">

          <section>
            <p className="text-3xl mb-4">Search</p>
            <input
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
              className="w-full bg-black text-lg ring-4 ring-gray-500 text-white px-4 py-2 rounded outline-none focus:ring-4 focus:ring-orange-400"
            />
          </section>

          <div className="border-b border-gray-300 w-full"></div>

          <section>
            <p className="text-3xl mb-4"># Of results per page</p>
            <h2 className="text-3xl mb-4">{steps[index]} results</h2>

            <div className="relative w-full max-w-[725px]">
              <input
                type="range"
                min={0}
                max={steps.length - 1}
                value={index}
                step={1}
                onChange={(e) => setIndex(Number(e.target.value))}
                className="relative z-10 w-full appearance-none h-2 rounded-full outline-none
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-[#121212] 
                  [&::-webkit-slider-thumb]:border-4 
                  [&::-webkit-slider-thumb]:border-yellow-400 
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:appearance-none 
                  [&::-moz-range-thumb]:h-5 
                  [&::-moz-range-thumb]:w-5 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-[#121212] 
                  [&::-moz-range-thumb]:border-4 
                  [&::-moz-range-thumb]:border-yellow-400 
                  [&::-moz-range-thumb]:cursor-pointer
                "
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #facc15 ${percent}%, #6b7280 ${percent}%, #6b7280 100%)`,
                }}
              />

              <div className="pointer-events-none absolute left-0 top-[calc(100%+6px)] w-full h-5">
                {steps.map((s, i) => {
                  const stepPercent = (i / (steps.length - 1)) * 100;
                  const isActive = i === index;

                  let translateClass = "-translate-x-1/2";
                  if (i === 0) translateClass = "translate-x-0";
                  else if (i === steps.length - 1) translateClass = "-translate-x-full";

                  return (
                    <span
                      key={s}
                      className={`absolute text-xs leading-none transition-colors ${translateClass} ${
                        isActive ? "text-white font-semibold" : "text-gray-400"
                      }`}
                      style={{ left: `${stepPercent}%` }}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-auto space-y-4">
          <div className="border-b border-gray-300 w-full"></div>
          <button
            onClick={handleSearch}
            className="w-full md:w-40 uppercase hover:border hover:border-white hover:bg-black hover:text-white font-bold px-6 py-2 rounded bg-white text-black transition-all mt-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="hidden 2xl:block w-[400px] px-20 py-6">
        <FollowRight className="hidden md:block" />
      </div>

      <MobileSidebar />
    </div>
  );
};

export default Search;
