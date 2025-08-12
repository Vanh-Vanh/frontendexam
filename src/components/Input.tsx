import { useState } from "react"

const Input = () => {
    const steps = [3, 6, 9, 12, 15, 50];
    const [index, setIndex] = useState(steps.indexOf(15));
    const percent = (index / (steps.length - 1)) * 100;
    return(
        <div className="min-h-screen bg-black text-white px-8 py-10 space-y-10">
            <section>
                {/* button */}
                <h2 className="text-lg mb-4">Button</h2>
                <div className="flex gap-10">
                    {/* Normal */}
                    <div>
                        <p className="uppercase text-xs font-semibold mb-1">Normal</p>
                        <button className="bg-white text-black font-bold px-6 py-2 rounded w-40">BUTTON</button>
                    </div>
                    {/* Hover */}
                    <div>
                        <p className="uppercase text-xs font-semibold mb-1">Hover</p>
                        <button className="hover:border hover:border-white hover:bg-black hover:text-white font-bold px-6 py-2 rounded w-40 bg-white text-black transition-all">BUTTON</button>
                    </div>
                </div>
                {/* ourlined */}
                <div className="mt-6 flex items-center gap-4">
                    <div className="w-24">
                        <p className="text-white">Outlined</p>
                    </div>
                    {/* normal */}
                    <div className="text-center">
                        <p className="uppercase text-xs font-semibold mb-1">Normal</p>
                        <button className="border text-white rounded-full px-4 py-1 text-sm">Button</button>                        
                    </div>
                    {/* hover */}
                    <div className="text-center">
                        <p className="uppercase text-xs font-semibold mb-1">Hover</p>
                        <button className="border text-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black">Button</button>                                
                    </div>
                </div>
                {/* Container */}
                <div className="mt-6 flex items-center gap-4">
                    <div className="w-24">
                        <p className="text-white">Contained</p>
                    </div>
                    {/* normal */}
                    <div className="text-center">
                        <p className="uppercase text-xs font-semibold mb-1">Normal</p>
                        <button className="border text-black bg-white rounded-full px-4 py-1 text-sm">Button</button>                        
                    </div>
                    {/* hover */}
                    <div className="text-center">
                        <p className="uppercase text-xs font-semibold mb-1">Hover</p>
                        <button className="border text-black bg-white rounded-full px-4 py-1 text-sm hover:bg-black hover:text-white">Button</button>                                
                    </div>
                </div>        
            </section>

            {/* input */}
            <section>
                {/* normal */}
                <h2 className="text-lg mb-4">Input</h2>
                <div className="mb-4">
                    <p className="uppercase text-xs font-semibold mb-1">Normal</p>
                    <input
                        type="text"
                        placeholder="Keyword"
                        className="w-full bg-black border-2 border-gray-500 text-white px-4 py-2 rounded outline-none"
                    />
                </div>
                {/* focused */}
                <div className="mb-4">
                    <p className="uppercase text-xs font-semibold mb-1">Focused</p>
                    <input
                        type="text"
                        placeholder="Keyword"
                        className="w-full bg-black border-2 border-gray-500 text-white px-4 py-2 rounded outline-none focus:border-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </section>

            {/* slider */}
            <section>
          <p className="text-lg mb-4"># Of results per page</p>
          <h2 className="text-lg mb-4">{[3, 6, 9, 12, 15, 50][index]} results</h2>

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
    )
}
export default Input