'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least $1").max(1000, "Price cannot exceed $1000"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateMembershipForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: undefined,
      description: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Form submitted:', data);
    try {
      
      alert('Membership created successfully!');
    } catch (error) {
      console.error('Error creating membership:', error);
      alert('Failed to create membership');
    }
  };

  return (
    <div className="w-full p-4 bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Membership Name */}
        <div>
          <label className="block pb-2 text-sm font-medium text-gray-300">
            Membership Name
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="eg. Bronze Tier"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Monthly Cost */}
        <div>
          <label className="block pb-2 text-sm font-medium text-gray-300">
            Monthly Cost ($)
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="eg. 15"
            step="0.01"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Membership Description */}
        <div>
          <label className="block pb-2 text-sm font-medium text-gray-300">
            Membership Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="eg. Access to behind the scenes content"
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Membership'}
        </button>
      </form>
    </div>
  );
}