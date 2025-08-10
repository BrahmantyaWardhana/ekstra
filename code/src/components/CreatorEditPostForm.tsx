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

interface Memberships {
  id: string;
  title: string;
}

interface CreatorEditPostFormProps {
  postInfo: PostInfo[]
  memberships: Memberships[];
}

export default function CreatorEditPostForm({
  postInfo,
  memberships,
}:CreatorEditPostFormProps) {
  return (
    <div>

    </div>
  );
}