import { useNavigate } from "react-router-dom" 
import Sidebar from "./Sidebar" 

const tagList = [
  { name: "Cool", count: 350 },
  { name: "Beautiful", count: 210 },
  { name: "Easy", count: 190 },
  { name: "Summary", count: 105 },
  { name: "Hot", count: 80 },
  { name: "Passage Specific", count: 50 },
  { name: "Very longggg", count: 50 },
  { name: "Tag", count: 50 },
  { name: "Tag", count: 50 },
  { name: "Tag", count: 50 },
  { name: "Tag", count: 50 },
  { name: "Tag", count: 50 },
] 

const Tags = () => {
  const navigate = useNavigate() 

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black text-white overflow-hidden">
      <Sidebar className="hidden md:block"/>
      <div className="flex-1 px-4 py-6 md:px-10 space-y-10 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white cursor-pointer hover:text-gray-400"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">Home Page</h2>
        </div>
        <h1 className="text-2xl font-bold mb-6">Tags</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {tagList.map((tag, idx) => (
            <div
              key={idx}
              
              className="rounded-md p-4 cursor-pointer "
            >           
              <div className="h-32 relative bg-zinc-800 rounded-md mb-2">
                <div className="absolute bottom-2 left-2 border-3 border-white px-4 py-1 rounded text-sm font-semibold text-white truncate max-w-[90%] text-center">
                  {tag.name}
                </div>
              </div>
              <h6 className="text-sm text-white text-start">{tag.name}</h6>
              <p className="text-sm text-gray-400 text-start">
                {tag.count} {tag.count === 1 ? "Result" : "Results"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) 
} 

export default Tags 
