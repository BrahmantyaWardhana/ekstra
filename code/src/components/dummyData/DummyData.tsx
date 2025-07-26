interface ContentInfo {
  key: string;
  type: string;
}

interface MembershipInfo {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface PostInfo {
  id: string;
  title: string;
  content: ContentInfo[];
  description: string;
  membership: MembershipInfo[];
  createdAt: string;
}

const samplePosts: PostInfo[] = [
  {
    id: "post-001",
    title: "Guitar Lesson - Chords Practice",
    description: "In this lesson, we go over common chord transitions for beginners.",
    createdAt: "2025-07-24",
    membership: [
      {
        id: "free-tier",
        title: "Free",
        description: "Access to basic content",
        price: "0",
      },
      {
        id: "premium-tier",
        title: "Premium",
        description: "Full access to all content",
        price: "10",
      },
    ],
    content: [
      {
        key: "sample-image.jpg",
        type: "image/jpeg",
      },
      {
        key: "sample-audio.mp3",
        type: "audio/mpeg",
      },
    ],
  },
  {
    id: "post-002",
    title: "Practice Routine PDF",
    description: "A downloadable weekly practice routine.",
    createdAt: "2025-07-20",
    membership: [
      {
        id: "premium-tier",
        title: "Premium",
        description: "Full access to all content",
        price: "10",
      },
    ],
    content: [
      {
        key: "practice-guide.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "post-003",
    title: "Finger Exercises Video",
    description: "Watch this short video to improve your finger strength.",
    createdAt: "2025-07-18",
    membership: [
      {
        id: "free-tier",
        title: "Free",
        description: "Access to basic content",
        price: "0",
      },
    ],
    content: [
      {
        key: "exercise-video.mp4",
        type: "video/mp4",
      },
    ],
  },
];

export default samplePosts;
