'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

interface Memberships {
  id: string;
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  membershipIds: z.array(z.string()).optional()
})

type FormValues = z.infer<typeof formSchema>;

const onSubmit = async (data: FormValues) => {

}

export default function CreatePostForm({memberships} : {memberships: Memberships[]} ) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const labelStyle = 'block pb-2'
  const inputStyle = 'w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white'
  const errorStyle = 'mt-1 text-sm text-red-500'

  return(
    <div className="w-full p-4 bg-neutral-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Post Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Membership choice */}
        {memberships.length > 0 && (
          <div>
            <label className="block pb-2">
            Available for Memberships (Select multiple)
            </label>
            
            <select
              {...register("membershipIds")}
              multiple // This enables multi-select
              className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 h-auto min-h-[42px]"
              size={3} // Shows 3 options at once (scrollable)
            >
              {memberships.map((membership) => (
                <option 
                  key={membership.id} 
                  value={membership.id}
                  className="p-2 hover:bg-stone-700"
                >
                  {membership.title}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-400 mt-1">
              Hold Ctrl/Cmd to select multiple
            </p>
          </div>
        )}

        {/* Post Title */}
        <div>
          <label className={labelStyle}>
            Title
          </label>
          <input
            {...register("title")}
            className={inputStyle}
            placeholder="Video title"
          />
          {errors.title && (
            <p className={errorStyle}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block pb-2">Content</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400"
            rows={5}
          />
          {errors.description && (
            <p className={errorStyle}>{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button (always shown) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-4 py-2 rounded ${
            isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>

      </form>
    </div>
  )
}