import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import FollowRight from "./FollowRight"

type User = {
  id: number
  name: string
  username: string
  imageUrl: string
}

const SearchResult: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const keyword = searchParams.get("keyword")?.toLowerCase() || ""
  const limit = parseInt(searchParams.get("limit") || "6", 10)

  const [users, setUsers] = useState<User[]>([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [infiniteEnabled, setInfiniteEnabled] = useState(false) 

  useEffect(() => {
    setLoading(true)
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setVisibleCount(Math.min(6, limit))
  }, [keyword, limit])

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.username.toLowerCase().includes(keyword)
      ),
    [users, keyword]
  )

  const limitedUsers = useMemo(
    () => filteredUsers.slice(0, limit),
    [filteredUsers, limit]
  )

  const showMore = useCallback((): void => {
    if (isFetching) return
    if (visibleCount >= limitedUsers.length) return

    setIsFetching(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, limitedUsers.length))
      setIsFetching(false)
      setInfiniteEnabled(true) 
    }, 500)
  }, [isFetching, visibleCount, limitedUsers.length])

  useEffect(() => {
  if (!infiniteEnabled) return
  const target = loadMoreRef.current

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetching) {
      showMore()
    }
  })

  if (target) observer.observe(target)

  return () => {
    if (target) observer.unobserve(target)
  }
}, [infiniteEnabled, isFetching, showMore])

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black text-white overflow-hidden">
      <Sidebar className="hidden md:block" />

      <div className="flex-1 px-4 py-16 md:px-20 flex flex-col overflow-y-auto pb-14 scrollbar-hide">
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-white cursor-pointer hover:text-gray-400"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">Home Page</h2>
        </div>

        <h1 className="text-2xl font-bold mb-6">Results</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : limitedUsers.length === 0 ? (
          <p className="text-gray-400">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {limitedUsers.slice(0, visibleCount).map((user) => (
              <div key={user.id} className="flex flex-col p-4 items-center text-center">
                <div className="w-full h-32 bg-black flex items-center justify-center rounded">
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="font-bold mt-2">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
            ))}
          </div>
        )}

        {!infiniteEnabled && limitedUsers.length > visibleCount && (
          <div className="mt-6 text-start">
            <button
              onClick={showMore}
              disabled={isFetching}
              className="w-1/2 max-w-xs bg-amber-50 hover:bg-gray-600 hover:text-black text-black font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isFetching ? "Loading..." : "More"}
            </button>
          </div>
        )}

        {infiniteEnabled && <div ref={loadMoreRef} className="h-4"></div>}
      </div>

      <div className="hidden 2xl:block w-[400px] px-4 py-6">
        <FollowRight className="hidden md:block" />
      </div>
    </div>
  )
}

export default SearchResult
