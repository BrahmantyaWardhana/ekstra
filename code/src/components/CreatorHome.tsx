"use client"

import { useRouter } from 'next/navigation';
import ContentRenderer from "./ContentRenderer";

type PostInfo = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  postContents: {
    contentId: string;
    content: {
      contentKey: string;
      fileName: string;
      size: string;
      type: string;
    };
  }[];
  membershipContents: {
    membershipId: string;
    membership: {
      id: string;
      title: string;
      description: string | null;
      price: string;
    };
  }[];
};

interface CreatorHomeProps {
  posts: PostInfo[] | null;
}

export default function CreatorHome({ posts }: CreatorHomeProps) {
  const router = useRouter();

  const handleEditPost = (postId: string) => {
    router.push(`/creator/dashboard/editpost/${postId}`);
  };

  return (
    <div className="w-full p-4">
      {/* Header with title and add button */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Your Posts</h2>
        
        <button 
          className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          onClick={() => router.push('/creator/dashboard/createpost')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Post
        </button>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <div 
            key={post.id}
            className="bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-700"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <span className="text-neutral-400 text-sm">{post.createdAt.toLocaleDateString()}</span>
              </div>

              {/* Membership access badge - only shown once at the top */}
              <div className="mb-2">
                {post.membershipContents.length === 0 ? (
                  <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    Free to All
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    {post.membershipContents.map(m => m.membership.title).join(", ")}
                  </span>
                )}
              </div>

              {/* Post content */}
              {post.postContents && post.postContents.length > 0 && (
                <ContentRenderer content={post.postContents.map((pc) => ({
                  key: pc.content.contentKey,
                  type: pc.content.type,
                  name: pc.content.fileName,
                  size: pc.content.size
                }))} />
              )}
              
              {post.description && (
                <p className="mt-2 text-neutral-300 text-sm">{post.description}</p>
              )}
              
              <div className="mt-4 flex justify-end">
                <button 
                  className="px-3 py-1 text-sm bg-white text-black rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                  onClick={() => handleEditPost(post.id)}  
                >
                  Edit Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (when no posts) */}
      {posts?.length === 0 && (
        <div className="bg-neutral-800 rounded-lg p-8 text-center border border-neutral-700">
          <p className="text-neutral-400 mb-4">You haven't created any posts yet</p>
        </div>
      )}
    </div>
  );
}