interface ContentRendererProps {
  content: {
    key: string;
    name: string;
    size: string;
    type: string;
  }[];
}

const getTypeCategory = (mime: string): 'image' | 'video' | 'audio' | 'file' => {
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return 'file';
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  const appId = process.env.UPLOADTHING_APP_ID

  return (
    <div className="grid gap-4">
      {content.map(({ key, type, name, size }, index) => {
        const displayType = getTypeCategory(type);
        const fileUrl = `https://${appId}.ufs.sh/f/${key}`;

        switch (displayType) {
          case 'image':
            return <img key={index} src={fileUrl} alt={`Image ${index}`} className="max-w-full rounded" />;

          case 'video':
            return (
              <video key={index} controls className="w-full max-h-96 rounded">
                <source src={fileUrl} type={type} />
                Your browser does not support the video tag.
              </video>
            );

          case 'audio':
            return (
              <audio key={index} controls className="w-full">
                <source src={fileUrl} type={type} />
                Your browser does not support the audio element.
              </audio>
            );

          case 'file':
          default:
            return (
              <div key={index} className="p-3 bg-gray-700 rounded-lg mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-100"
                    >
                      {name}
                    </a>
                    <p className="text-xs text-gray-400">
                      {size} • {type}
                    </p>
                  </div>
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
