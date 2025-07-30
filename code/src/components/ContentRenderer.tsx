'use client';

import { useState, useEffect } from "react";
import { contentUrl } from "~/server/actions";

interface ContentItem {
  key: string;
  name: string;
  size: string;
  type: string;
}

interface ContentRendererProps {
  content: ContentItem[];
}

const getTypeCategory = (mime: string): 'image' | 'video' | 'audio' | 'file' => {
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return 'file';
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      const newUrls: Record<string, string> = {};
      for (const item of content) {
        try {
          newUrls[item.key] = await contentUrl(item.key);
        } catch (error) {
          console.error(`Failed to fetch URL for key ${item.key}:`, error);
          newUrls[item.key] = "#"; // Fallback
        }
      }
      setUrls(newUrls);
      setReady(true);
    };

    fetchUrls();
  }, [content]);

  if (!ready) {
    return <div className="text-gray-400 text-sm">Loading content...</div>;
  }

  return (
    <div className="grid gap-4">
      {content.map(({ key, type, name, size }) => {
        const fileUrl = urls[key];
        const displayType = getTypeCategory(type);

        if (!fileUrl || fileUrl === "#") {
          return (
            <div key={key} className="text-sm text-gray-400 italic">
              Failed to load: {name}
            </div>
          );
        }

        switch (displayType) {
          case 'image':
            return <img key={key} src={fileUrl} alt={name} className="max-w-full rounded" />;

          case 'video':
            return (
              <video key={key} controls className="w-full max-h-96 rounded">
                <source src={fileUrl} />
                Your browser does not support the video tag.
              </video>
            );

          case 'audio':
            return (
              <audio key={key} controls className="w-full">
                <source src={fileUrl} />
                Your browser does not support the audio element.
              </audio>
            );

          case 'file':
          default:
            return (
              <div key={key} className="p-3 bg-gray-700 rounded-lg mb-2">
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
