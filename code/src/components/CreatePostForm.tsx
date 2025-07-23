'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Memberships {
  id: string;
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  membershipIds: z.array(z.string()).min(1, "Please select at least one availability option")
})

type FormValues = z.infer<typeof formSchema>;

const onSubmit = async (data: FormValues) => {
  // Handle form submission
}

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
    defaultValues: {
      membershipIds: ['free'] // Default to "Free to All" selected
    }
  });

  // Handle "Free to All" checkbox change
  const handleFreeToAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue('membershipIds', ['free']); // Select only "Free to All"
    } else {
      setValue('membershipIds', []); // Deselect all
    }
  };

  return(
    <div className="w-full p-4 bg-neutral-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Post Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Membership choice - Always show "Free to All" */}
        <div>
          <label className="block pb-2">
            Availability
          </label>
          
          {/* Free to All option (always shown) */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="membership-free"
              value="free"
              checked={watch("membershipIds")?.includes('free')}
              onChange={handleFreeToAllChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="membership-free"
              className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer"
            >
              Free to All
            </label>
          </div>

          {/* Other memberships (only shown if they exist) */}
          {memberships.length > 0 && (
            <>
              <label className="block pb-2 text-sm text-gray-400">
                Or restrict to specific memberships:
              </label>
              <div className="space-y-2 pl-4 border-l-2 border-gray-700">
                {memberships.map((membership) => (
                  <div key={membership.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`membership-${membership.id}`}
                      value={membership.id}
                      {...register("membershipIds")}
                      disabled={watch("membershipIds")?.includes('free')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <label
                      htmlFor={`membership-${membership.id}`}
                      className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer"
                    >
                      {membership.title}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="text-sm text-gray-400 mt-1">
            {watch("membershipIds")?.includes('free') 
              ? "This post will be available to everyone"
              : "Select specific memberships for this post"}
          </p>
        </div>

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

        {/* Content */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-4 py-2 cursor-pointer rounded ${
            isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}