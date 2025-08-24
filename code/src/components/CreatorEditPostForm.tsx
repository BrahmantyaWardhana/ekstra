"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useMemo } from "react";
import { removeFileFromUt, updateFullPost, uploadFileToUt } from "~/server/actions";
import { useRouter } from "next/navigation";

type UploadedFile = {
  key: string;
  name: string;
  size: number;
  type: string;
};

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
  postInfo: PostInfo[];
  memberships: Memberships[];
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  membershipIds: z.array(z.string()).min(1, "Please select at least one availability option"),
});
type FormValues = z.infer<typeof formSchema>;

export default function CreatorEditPostForm({
  postInfo,
  memberships,
}: CreatorEditPostFormProps) {
  const postInfoFirst = postInfo[0]!;
  const router = useRouter();

  // Map existing DB files into local shape
  const initialFiles: UploadedFile[] = useMemo(
    () =>
      postInfoFirst.postContents.map((pc) => ({
        key: pc.content.contentKey,
        name: pc.content.fileName,
        size: Number(pc.content.size),
        type: pc.content.type,
      })),
    [postInfoFirst.postContents]
  );

  // Existing files linked to the post (UI state)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(initialFiles ?? []);

  // Newly selected local files (not uploaded yet)
  const [pendingLocalFiles, setPendingLocalFiles] = useState<File[]>([]);

  // Keys of existing files to delete from storage AFTER DB commit
  const [pendingDeleteKeys, setPendingDeleteKeys] = useState<string[]>([]);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: postInfoFirst.title,
      description: postInfoFirst.description ?? "",
      membershipIds: postInfoFirst.membershipContents.length
        ? postInfoFirst.membershipContents.map((m) => m.membershipId)
        : ["free"],
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const isButtonDisabled = isSubmitting || isProcessing;

  const selectedMemberships = watch("membershipIds") ?? [];
  const isFree = selectedMemberships.includes("free");

  // Styles
  const labelStyle =
    "block pb-2";
  const inputStyle =
    "w-full px-4 py-2 rounded-lg bg-stone-800 border-2 border-gray-400 focus:outline-none focus:ring-1 focus:ring-white";
  const errorStyle =
    "mt-1 text-sm text-red-500";

  // Toggle "Free to All"
  const handleFreeToAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue("membershipIds", ["free"], { shouldDirty: true, shouldValidate: true });
    } else {
      const next = selectedMemberships.filter((v) => v !== "free");
      setValue("membershipIds", next, { shouldDirty: true, shouldValidate: true });
    }
  };

  // Remove existing linked file (UI only, mark for deletion later)
  function handleRemoveExistingFile(key: string) {
    setUploadedFiles((prev) => prev.filter((f) => f.key !== key));
    setPendingDeleteKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }

  // Add local files to pending list
  function handleLocalFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setPendingLocalFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Remove a pending local (not yet uploaded) file
  function removeLocalFile(name: string, size: number) {
    setPendingLocalFiles((prev) => prev.filter((f) => !(f.name === name && f.size === size)));
  }

  // Utility: diff memberships
  function diffMemberships(initialMemberships: string[], currentMemberships: string[]) {
    const toAdd = currentMemberships.filter((id) => !initialMemberships.includes(id));
    const toRemove = initialMemberships.filter((id) => !currentMemberships.includes(id));
    return { toAdd, toRemove };
  }

  // Utility: diff files (existing only)
  function diffFiles(initial: UploadedFile[], current: UploadedFile[]) {
    const toAdd = current.filter((f) => !initial.some((i) => i.key === f.key));
    const toRemove = initial.filter((f) => !current.some((c) => c.key === f.key));
    return { toAdd, toRemove };
  }

  // Utility: diff post text
  function diffPostInfo(
    initial: { title: string; description: string | null },
    current: { title: string; description: string | null }
  ) {
    const normalize = (val: string | null) => (val ?? "").trim();
    return {
      titleChanged: normalize(initial.title) !== normalize(current.title),
      descriptionChanged: normalize(initial.description) !== normalize(current.description),
    };
  }

  const onSubmit = async (formValues: FormValues) => {
    setIsProcessing(true);
    try {
      // 1) Membership diffs
      const initialMemberships = postInfoFirst.membershipContents.length
        ? postInfoFirst.membershipContents.map((m) => m.membershipId)
        : ["free"];

      const { toAdd: membershipsToAdd, toRemove: membershipsToRemove } = diffMemberships(
        initialMemberships,
        formValues.membershipIds
      );

      // 2) Upload newly selected local files
      let newUploadedFiles: UploadedFile[] = [];
      if (pendingLocalFiles.length > 0) {
        const fd = new FormData();
        pendingLocalFiles.forEach((f) => fd.append("files", f));
        const uploaded = (await uploadFileToUt(fd)) ?? []; // server action should return array
        newUploadedFiles = uploaded.map((u: any) => ({
          key: u.data?.key!,
          name: u.data?.name!,
          size: Number(u.data?.size),
          type: u.data?.type || "application/octet-stream",
        }));
      }

      // 3) Files to add are only the newly uploaded ones
      const filesToAdd = newUploadedFiles;

      // 4) Existing files removed from UI
      const { toRemove: filesToRemove } = diffFiles(initialFiles, uploadedFiles);

      // 5) Text diffs
      const { titleChanged, descriptionChanged } = diffPostInfo(
        { title: postInfoFirst.title, description: postInfoFirst.description ?? "" },
        { title: formValues.title, description: formValues.description ?? "" }
      );

      // 6) Commit DB changes
      await updateFullPost(postInfoFirst.id, {
        ...(titleChanged ? { title: formValues.title } : {}),
        ...(descriptionChanged ? { description: formValues.description } : {}),
        removeAllMemberships: formValues.membershipIds.includes("free"),
        membershipsToAdd,
        membershipsToRemove,
        filesToAdd, // each item: { key, name, size, type }
        filesToRemove: filesToRemove.map((f) => f.key),
      });

      // 7) After DB commit, delete storage for existing files you removed
      // (use pendingDeleteKeys to avoid double-delete)
      for (const key of pendingDeleteKeys) {
        try {
          await removeFileFromUt(key);
        } catch {
          // swallow errors; not critical for UX
        }
      }

      router.push("/creator/dashboard");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    } finally {
      setIsProcessing(false);
    }
  };

  const hasAnyFile = (uploadedFiles.length + pendingLocalFiles.length) >= 1;

  return (
    <div className="w-full p-4 bg-neutral-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Post Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Availability */}
        <div>
          <label className="block pb-2">Availability</label>

          {/* Free to All */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="membership-free"
              value="free"
              checked={isFree}
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

          {/* Other memberships */}
          <div key={isFree ? "free" : "memberships"}>
            {memberships.length > 0 && (
              <>
                <label className="block pb-2 text-sm text-gray-400">
                  Or restrict to specific memberships:
                </label>
                <div className="space-y-2 pl-4 border-l-2 border-gray-700">
                  {memberships.map((m) => (
                    <div key={m.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`membership-${m.id}`}
                        value={m.id}
                        {...register("membershipIds", {
                          onChange: (e) => {
                            if (isFree && e.target.checked) {
                              const pruned = selectedMemberships.filter((v) => v !== "free");
                              setValue("membershipIds", [...pruned, m.id], {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }
                          },
                        })}
                        disabled={isFree}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <label
                        htmlFor={`membership-${m.id}`}
                        className="ml-2 text-sm font-medium text-gray-300 hover:text-white cursor-pointer"
                      >
                        {m.title}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {errors.membershipIds && <p className={errorStyle}>{errors.membershipIds.message}</p>}

          <p className="text-sm text-gray-400 mt-1">
            {isFree ? "This post will be available to everyone" : "Select specific memberships for this post"}
          </p>
        </div>

        {/* Title */}
        <div>
          <label className={labelStyle}>Title</label>
          <input {...register("title")} className={inputStyle} placeholder="Video title" />
          {errors.title && <p className={errorStyle}>{errors.title.message}</p>}
        </div>

        {/* Content (existing + new) */}
        <div>
          <label className="block pb-2">Content</label>

          {/* Already-linked files on this post */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 mb-3">
              {uploadedFiles.map((file) => (
                <div key={file.key} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-100">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {file.size} • {file.type}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingFile(file.key)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Newly selected (not yet uploaded) files */}
          {pendingLocalFiles.length > 0 && (
            <div className="space-y-2 mb-3">
              {pendingLocalFiles.map((f, idx) => (
                <div key={`${f.name}-${f.size}-${idx}`} className="p-3 bg-gray-700/70 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-100">{f.name}</p>
                      <p className="text-xs text-gray-400">
                        {f.size} • {f.type || "unknown"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLocalFile(f.name, f.size)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* File input (no UploadButton) */}
          <div
            className={`flex flex-col items-start gap-3 rounded-lg border-2 border-gray-400 p-4 transition ${
              isButtonDisabled ? "pointer-events-none opacity-50" : "hover:border-white"
            }`}
          >
            <input
              id="files"
              ref={fileInputRef}
              name="files"
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              onChange={handleLocalFilesChange}
              disabled={hasAnyFile || isButtonDisabled}
              className="cursor-pointer block w-full text-sm text-gray-300 
                         file:mr-4 file:rounded-md file:border-0 
                         file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black 
                         hover:file:bg-gray-200"
            />
            <p className="text-xs text-gray-400">
              {hasAnyFile
                ? "Only one file is allowed per post. Remove the current file to upload a new one."
                : "Select a file (PDF, image, or video)."}
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
            isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-200 cursor-pointer"
          }`}
        >
          {isSubmitting || isProcessing ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
