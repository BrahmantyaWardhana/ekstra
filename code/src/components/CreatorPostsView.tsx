"use client";

import Link from "next/link";
import ContentRenderer from "./ContentRenderer";

type PostInfo = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string | Date; // safer to send string from server
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
  }[] | null; // be defensive
};

interface CreatorPostsViewProps {
  posts: PostInfo[] | null;
  viewerMembershipIds: string[]; // e.g., ["gold", "silver"]
  pageHandle: string;            // to link to membership tab
}

export default function CreatorPostsView({
  posts,
  viewerMembershipIds,
  pageHandle,
}: CreatorPostsViewProps) {
  const hasAccess = (post: PostInfo) => {
    const req = post.membershipContents ?? [];
    if (req.length === 0) return true; // free
    const required = new Set(req.map((m) => m.membershipId));
    return viewerMembershipIds.some((id) => required.has(id));
  };

  return (
    <div className="w-full p-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Posts</h2>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => {
          const req = post.membershipContents ?? [];
          const isFree = req.length === 0;
          const accessible = isFree ? true : hasAccess(post);
          const requiredTiers = isFree
            ? "Free to All"
            : req.map((m) => m.membership.title).join(", ");

          return (
            <div
              key={post.id}
              className="bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-700"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                  <span className="text-neutral-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Access badge */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    {requiredTiers}
                  </span>
                  {!accessible && !isFree && (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-900/40 text-yellow-200">
                      Locked
                    </span>
                  )}
                </div>

                {/* Gated content */}
                {accessible ? (
                  <>
                    {post.postContents?.length > 0 && (
                      <ContentRenderer
                        content={post.postContents.map((pc) => ({
                          key: pc.content.contentKey,
                          type: pc.content.type,
                          name: pc.content.fileName,
                          size: pc.content.size,
                        }))}
                      />
                    )}
                    {post.description && (
                      <p className="mt-2 text-neutral-300 text-sm">{post.description}</p>
                    )}
                  </>
                ) : (
                  <div className="mt-3 rounded-lg border border-neutral-700 bg-neutral-900/60 p-4">
                    <p className="text-sm text-neutral-300">
                      You don’t have access to this content. It requires{" "}
                      <span className="font-medium">{requiredTiers}</span>.
                    </p>
                    <Link
                      href={`/creatorpage/${pageHandle}/membership`}
                      className="mt-3 inline-block rounded-md border border-blue-600 px-3 py-1 text-sm text-blue-300 hover:bg-blue-600/10"
                    >
                      See membership options
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {posts?.length === 0 && (
        <div className="bg-neutral-800 rounded-lg p-8 text-center border border-neutral-700">
          <p className="text-neutral-400 mb-4">This creator hasn&apos;t created any posts yet</p>
        </div>
      )}
    </div>
  );
}
