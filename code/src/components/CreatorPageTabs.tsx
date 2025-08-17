"use client";

import { useRouter, useSearchParams } from "next/navigation";

/* --------- Types aligned to your query result --------- */

type Content = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  size: string;
  creatorPageId: string;
  type: string;        // e.g. "AUDIO" | "MP3" | "IMAGE" | ...
  contentKey: string;  // storage key
  fileName: string;
  usedIn: string | null;
};

type PostContent = {
  id: string;
  contentId: string;
  postId: string;
  content: Content;
};

// This is the JOIN that gates a post by membership tier
type PostMembershipLink = {
  id: string;
  postId: string;
  membershipId: string;
  membership: {
    id: string;
    title: string;
    description: string | null;
    price: string; // you can change to number if your schema is numeric
    createdAt: Date | string;
    updatedAt: Date | string | null;
    creatorPageId: string;
  };
};

type Post = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  description: string | null;
  creatorPageId: string;
  title: string;
  postContents: PostContent[];          // actual media/assets live here
  membershipContents: PostMembershipLink[]; // membership gating lives here
};

type Membership = Record<string, any>;

type CreatorShape = {
  id: string;
  name: string;
  description: string | null;
  pageHandle: string;
  profileImage: string;
  posts: Post[];
  memberships: Membership[];
};

/* --------- Component --------- */

export function CreatorPageTabs({
  creator,
  basePath,
}: {
  creator: CreatorShape;
  basePath: string; // e.g. /creatorpage/[handle]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") ?? "home") as
    | "home"
    | "membership"
    | "shop";

  const goto = (t: typeof tab) => {
    const p = new URLSearchParams(searchParams?.toString());
    if (t === "home") p.delete("tab");
    else p.set("tab", t);
    router.push(`${basePath}?${p.toString()}`);
  };

  const tabs: Array<{ key: typeof tab; label: string }> = [
    { key: "home", label: "Home" },
    { key: "membership", label: "Membership" },
    { key: "shop", label: "Shop" },
  ];

  return (
    <>
      {/* Tabs */}
      <nav className="flex gap-6 rounded-full bg-black/50 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
        {tabs.map((t) => {
          const active =
            t.key === tab || (t.key === "home" && !searchParams.get("tab"));
          return (
            <button
              key={t.key}
              onClick={() => goto(t.key)}
              className={[
                "rounded-full px-3 py-1 text-sm transition",
                active
                  ? "bg-white text-black"
                  : "text-neutral-300 hover:text-white hover:bg-white/10",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <section className="mx-auto mt-8 max-w-4xl px-4">
        {tab === "home" && <HomeTab creator={creator} />}
        {tab === "membership" && (
          <MembershipTab memberships={creator.memberships} />
        )}
        {tab === "shop" && <ShopTab />}
      </section>
    </>
  );
}

/* -------------------- Tabs -------------------- */

function HomeTab({ creator }: { creator: CreatorShape }) {
  const posts = creator.posts ?? [];
  return (
    <div>
      {creator.description && (
        <p className="mb-6 leading-relaxed text-neutral-300">
          {creator.description}
        </p>
      )}

      <h2 className="mb-4 text-2xl font-semibold">Posts</h2>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center">
          <p className="text-neutral-300">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function MembershipTab({ memberships }: { memberships: Membership[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Membership</h2>
      <p className="text-neutral-300">
        Support this creator to unlock members-only posts and perks.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {memberships?.length ? (
          memberships.map((m, i) => (
            <TierCard
              key={String(m?.id ?? i)}
              title={m?.title ?? m?.name ?? "Supporter"}
              blurb={m?.description ?? "Members-only content and perks."}
              ctaLabel={
                m?.price ? `Join – ${formatPrice(m.price)}` : "Join"
              }
            />
          ))
        ) : (
          <>
            <TierCard title="Starter" blurb="Access to members-only posts." />
            <TierCard title="Pro" blurb="Starter + monthly Q&A." />
          </>
        )}
      </div>
    </div>
  );
}

function ShopTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shop</h2>
      <p className="text-neutral-300">Digital downloads and merch (coming soon).</p>
    </div>
  );
}

/* -------------------- Pieces -------------------- */

function TierCard({
  title,
  blurb,
  ctaLabel = "Join",
}: {
  title: string;
  blurb: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{blurb}</p>
      <button className="mt-4 rounded-xl bg-white px-4 py-2 text-black">
        {ctaLabel}
      </button>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  // Assets always come from postContents
  const assets = post.postContents ?? [];
  // Gate is determined by membershipContents
  const isMembersOnly = (post.membershipContents?.length ?? 0) > 0;

  const created =
    typeof post.createdAt === "string"
      ? new Date(post.createdAt)
      : post.createdAt;

  return (
    <article className="rounded-2xl border border-white/10 bg-neutral-900">
      <header className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <div className="mt-2">
            <VisibilityBadge isMembersOnly={isMembersOnly} />
          </div>
        </div>
        <time className="shrink-0 text-sm text-neutral-400">
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }).format(created)}
        </time>
      </header>

      <div className="px-5 pb-5">
        <div className="space-y-4">
          {assets.map((pc) => (
            <Asset key={pc.id} content={pc.content} />
          ))}
        </div>

        {post.description && (
          <p className="mt-4 text-neutral-300">{post.description}</p>
        )}
      </div>
    </article>
  );
}

function Asset({ content }: { content: Content }) {
  const kind = normalizeKind(content.type);
  const url = resolveContentUrl(content.contentKey);

  if (kind === "audio") {
    return (
      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
        <audio controls preload="none" className="w-full">
          <source src={url} />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  if (kind === "video") {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <video controls preload="none" className="w-full">
          <source src={url} />
          Your browser does not support the video element.
        </video>
      </div>
    );
  }

  if (kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={content.fileName || "image"}
        className="w-full rounded-xl border border-white/10"
      />
    );
  }

  if (kind === "text") {
    return (
      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
        <p className="text-sm text-neutral-200">{content.fileName}</p>
      </div>
    );
  }

  return (
    <a
      href={url}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm hover:bg-white/10"
      target="_blank"
      rel="noreferrer"
    >
      Download {content.fileName}
    </a>
  );
}

function VisibilityBadge({ isMembersOnly }: { isMembersOnly: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1",
        isMembersOnly
          ? "bg-amber-600/20 text-amber-200 ring-amber-400/30"
          : "bg-blue-600/20 text-blue-200 ring-blue-400/30",
      ].join(" ")}
    >
      {isMembersOnly ? "Members Only" : "Free to All"}
    </span>
  );
}

/* -------------------- Helpers -------------------- */

function normalizeKind(t: string): "audio" | "video" | "image" | "text" | "file" {
  const s = (t || "").toLowerCase();
  if (s.includes("audio") || s === "mp3" || s === "wav") return "audio";
  if (s.includes("video") || s === "mp4" || s === "webm") return "video";
  if (s.includes("image") || ["png", "jpg", "jpeg", "gif", "webp"].includes(s)) return "image";
  if (s.includes("text") || s === "txt" || s === "md") return "text";
  return "file";
}

// Replace with your real CDN/signed URL logic
function resolveContentUrl(contentKey: string) {
  return `/api/content/${encodeURIComponent(contentKey)}`;
}

function formatPrice(value: any) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
