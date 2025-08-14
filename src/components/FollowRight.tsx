import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

type User = {
  name: string;
  username: string;
  avatar: string;
}

const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  name: "Fullname",
  username: "@username",
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
}));

export default function FollowRight({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [users, setUsers] = useState<typeof mockUsers>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );

  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const toggleFollow = useCallback((index: number) => {
    setFollowing((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  useEffect(() => {
    if (loading) return;
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        setIsFetching(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 6, users.length));
          setIsFetching(false);
        }, 500);
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [loading, isFetching, users.length]);

  const followedUsers = users.filter((_, idx) => following.includes(idx));

  return (
    <div
      className={clsx(
        "p-4 border-t md:border-none md:p-0 md:sticky md:top-10 md:w-[250px]",
        "bg-white md:bg-transparent",
        "fixed bottom-0 w-full md:static md:w-[250px]",
        className
      )}
      {...props}
    >
      {/* Tab */}
      <div className="flex space-x-10 border-b border-gray-600 mb-6">
        <button
          onClick={() => setActiveTab("followers")}
          className={`pb-2 ${
            activeTab === "followers"
              ? "text-white border-b-2 border-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`pb-2 ${
            activeTab === "following"
              ? "text-white border-b-2 border-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Following
        </button>
      </div>

      <div className="flex gap-10 overflow-x-hidden h-full">
        {/* Followers */}
        {activeTab === "followers" && (
          <div className="flex-1 space-y-4 overflow-y-auto pr-4 max-h-[calc(100vh-160px)] scrollbar-hide">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 animate-pulse"
                  >
                    <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-700 rounded w-24 mb-1"></div>
                      <div className="h-2 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                ))
              : users.slice(0, visibleCount).map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        className="w-10 h-10 object-cover rounded-lg ring ring-white"
                      />
                      <div>
                        <div className="text-white text-sm font-medium">
                          {user.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {user.username}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(idx)}
                      className={`text-xs px-3 py-0.5 rounded-full border transition-all ${
                        following.includes(idx)
                          ? "bg-white text-black"
                          : "text-white border-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {following.includes(idx) ? "Following" : "Follow"}
                    </button>
                  </div>
                ))}

            {visibleCount < users.length && (
              <div
                ref={loadMoreRef}
                className="text-center text-gray-400 text-sm py-2"
              >
                {isFetching ? "Loading..." : ""}
              </div>
            )}
          </div>
        )}

        {/* Following */}
        {activeTab === "following" && (
          <div className="flex-1 space-y-4 overflow-y-auto pr-4 max-h-[400px]">
            {followedUsers.length === 0 ? (
              <p className="text-gray-400 text-sm">
                You are not following anyone.
              </p>
            ) : (
              followedUsers.map((user, idx) => {
                const realIndex = users.indexOf(user);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        className="w-10 h-10 object-cover ring ring-white rounded-lg"
                      />
                      <div>
                        <div className="text-white text-sm font-medium">
                          {user.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {user.username}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(realIndex)}
                      className="text-xs px-3 py-0.5 rounded-full bg-white text-black border border-white"
                    >
                      Following
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
