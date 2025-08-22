'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { linkPostContent, linkPostToMembership, submitContentData, submitPostData, uploadFileToUt } from '~/server/actions';
import { useRouter } from 'next/navigation';

interface Memberships {
  id: string;
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  membershipIds: z.array(z.string()).min(1, "Please select at least one availability option"),
})
type FormValues = z.infer<typeof formSchema>;

export default function CreatePostForm({ memberships }: { memberships: Memberships[] }) {
  const labelStyle = 'block pb-2';
  const inputStyle = 'w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white';
  const errorStyle = 'mt-1 text-sm text-red-500';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { membershipIds: ['free'] }
  });

  const handleFreeToAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setValue('membershipIds', ['free']);
    else setValue('membershipIds', []);
  };

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const isButtonDisabled = isSubmitting || isProcessing;

  // NEW: ref to get files for server action
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    try {
      // 1) Create post
      const postId = await submitPostData(data.title, data.description);
      if (!postId) throw new Error("Post creation failed");

      // 2) Upload selected files (if any) via server action
      const inputFiles = Array.from(fileInputRef.current?.files ?? []);
      if (inputFiles.length > 0) {
        const fd = new FormData();
        inputFiles.forEach(f => fd.append("files", f));
        const uploaded = await uploadFileToUt(fd);

        // 3) Write uploaded content metadata to DB
        if (uploaded.length > 0) {
          const contentData = uploaded.map(f => ({
            key: f.data?.key!,
            type: f.data?.type!,
            name: f.data?.name!,
            size: String(f.data?.size),
            usedIn: 'post',
          }));
          const contentId = await submitContentData(contentData);
          if (!contentId) throw new Error("Content creation failed");

          // 4) Link content to post
          await linkPostContent(postId, contentId);
        }
      }

      // 5) Link post to memberships if restricted
      if (!data.membershipIds.includes('free')) {
        for (const membershipId of data.membershipIds) {
          await linkPostToMembership({ postId, membershipId });
        }
      }

      // 6) Done → redirect
      router.push('/creator/dashboard');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full p-4 bg-neutral-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Post Details</h2>

      {/* NOTE: We keep a normal onSubmit; we call the server action manually */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Availability */}
        <div>
          <label className="block pb-2">Availability</label>

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="membership-free"
              value="free"
              checked={watch("membershipIds")?.includes('free')}
              onChange={handleFreeToAllChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="membership-free" className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer">
              Free to All
            </label>
          </div>

          {memberships.length > 0 && (
            <>
              <label className="block pb-2 text-sm text-gray-400">Or restrict to specific memberships:</label>
              <div className="space-y-2 pl-4 border-l-2 border-gray-700">
                {memberships.map((m) => (
                  <div key={m.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`membership-${m.id}`}
                      value={m.id}
                      {...register("membershipIds")}
                      disabled={watch("membershipIds")?.includes('free')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <label htmlFor={`membership-${m.id}`} className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer">
                      {m.title}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          {errors.membershipIds && <p className={errorStyle}>{errors.membershipIds.message}</p>}
          <p className="text-sm text-gray-400 mt-1">
            {watch("membershipIds")?.includes('free') ? "This post will be available to everyone" : "Select specific memberships for this post"}
          </p>
        </div>

        {/* Title */}
        <div>
          <label className={labelStyle}>Title</label>
          <input {...register("title")} className={inputStyle} placeholder="Video title" />
          {errors.title && <p className={errorStyle}>{errors.title.message}</p>}
        </div>

        {/* Content (files) */}
        <div>
          <label htmlFor="files" className={labelStyle}>
            Content
          </label>

          <div
            className={`flex flex-col items-start gap-3 rounded-lg border-2 border-gray-400 p-4 transition 
              ${isButtonDisabled ? "pointer-events-none opacity-50" : "hover:border-white"}`}
          >
            <input
              id="files"
              ref={fileInputRef}
              name="files"
              type="file"
              className="cursor-pointer block w-full text-sm text-gray-300 
                        file:mr-4 file:rounded-md file:border-0 
                        file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black 
                        hover:file:bg-gray-200"
            />

            <p className="text-xs text-gray-400">
              You can only select a single file. Supported formats: PDF, JPG, PNG, MP4.
            </p>
          </div>
        </div>


        {/* Description */}
        <div>
          <label className="block pb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400"
            rows={5}
          />
          {errors.description && <p className={errorStyle}>{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`mt-6 w-full py-2 px-4 text-black rounded-lg flex items-center justify-center transition-colors ${
            isButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-200 cursor-pointer'
          }`}
        >
          {isSubmitting || isProcessing ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
