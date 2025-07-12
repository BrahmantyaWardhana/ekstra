'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// validation rules
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  handle: z.string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Cannot exceed 20 characters"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

// create type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function CreateCreatorPageForm() {
  // form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  // form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    // form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block pb-2">Your Name</label>
        <input
          {...register("name")}
          className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm pt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Handle Field */}
      <div>
        <label className="block pb-2">Unique Handle</label>
        <input
          {...register("handle")}
          className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="your-handle"
        />
        {errors.handle && (
          <p className="text-red-500 text-sm pt-1">{errors.handle.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block pb-2">Description</label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Tell us about yourself"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm pt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${
          isValid
            ? 'bg-white hover:bg-gray-200 text-black cursor-pointer'
            : 'bg-zinc-400 text-gray-800 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
}