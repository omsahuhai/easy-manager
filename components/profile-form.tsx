"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Check,
  Loader2,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateProfileAction, deleteAccountAction } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageCropperDialog } from "@/components/image-cropper-dialog";
import { getCroppedImg } from "@/lib/crop-image";
import type { Area } from "react-easy-crop";

// Max source file size allowed before crop (10 MB to accommodate smartphone photos)
const MAX_SOURCE_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function ProfileForm({
  userId,
  email,
  emailConfirmed,
  fullName: initialFullName,
  phone: initialPhone,
  avatarUrl: initialAvatarUrl,
  avatarPath: initialAvatarPath,
}: {
  userId: string;
  email: string;
  emailConfirmed: boolean;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
  avatarPath: string | null;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [currentEmail] = useState(email);
  const [newEmail, setNewEmail] = useState(email);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarPath, setAvatarPath] = useState(initialAvatarPath);

  // Action status states
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Account deletion states
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Cropper states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [pendingCropSrc, setPendingCropSrc] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pendingCropSrc) {
        URL.revokeObjectURL(pendingCropSrc);
      }
    };
  }, [pendingCropSrc]);

  const initials =
    (fullName || currentEmail.split("@")[0] || "U")
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const result = await updateProfileAction({
      fullName,
      phone,
      avatarUrl,
      avatarPath,
    });

    if (!result.success) {
      setError(result.error ?? "Unable to save your profile right now.");
    } else {
      setMessage("Profile saved successfully.");
      router.refresh();
    }
    setSaving(false);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    setMessage(null);
    setError(null);

    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_SOURCE_IMAGE_SIZE) {
      setError("Source image must be 10 MB or smaller.");
      return;
    }

    if (pendingCropSrc) {
      URL.revokeObjectURL(pendingCropSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setPendingCropSrc(objectUrl);
    setCropModalOpen(true);
  };

  const handleCloseCrop = () => {
    setCropModalOpen(false);
    if (pendingCropSrc) {
      URL.revokeObjectURL(pendingCropSrc);
      setPendingCropSrc(null);
    }
  };

  const handleConfirmCrop = async (pixelCrop: Area) => {
    if (!pendingCropSrc) return;

    setUploadingAvatar(true);
    setMessage(null);
    setError(null);

    try {
      const croppedBlob = await getCroppedImg(pendingCropSrc, pixelCrop, 512);

      const supabase = createClient();
      const path = `${userId}/${crypto.randomUUID()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, croppedBlob, {
          cacheControl: "3600",
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);

      const result = await updateProfileAction({
        fullName,
        phone,
        avatarUrl: data.publicUrl,
        avatarPath: path,
      });

      if (!result.success) {
        await supabase.storage.from("avatars").remove([path]);
        throw new Error(result.error ?? "Unable to save profile image.");
      }

      if (avatarPath && avatarPath !== path) {
        await supabase.storage.from("avatars").remove([avatarPath]);
      }

      setAvatarUrl(data.publicUrl);
      setAvatarPath(path);
      setMessage("Profile image updated.");
      handleCloseCrop();
      router.refresh();
    } catch (uploadError) {
      console.error("Avatar upload failed:", uploadError);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload the profile image."
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  const requestEmailChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setEmailMessage(null);
    setEmailError(null);
    const nextEmail = newEmail.trim().toLowerCase();

    if (!nextEmail || nextEmail === currentEmail.toLowerCase()) {
      setEmailMessage("Your email address is already up to date.");
      return;
    }

    setEmailLoading(true);
    try {
      const supabase = createClient();
      const { error: reqError } = await supabase.auth.updateUser({
        email: nextEmail,
      });
      if (reqError) throw reqError;
      setEmailMessage(
        "Confirmation links have been sent. Your new email will take effect after confirmation."
      );
    } catch (reqError) {
      setEmailError(
        reqError instanceof Error
          ? reqError.message
          : "Unable to start the email change."
      );
    } finally {
      setEmailLoading(false);
    }
  };

  const deleteAccount = async () => {
    setDeleting(true);
    setError(null);
    const result = await deleteAccountAction();
    if (!result.success) {
      setError(result.error ?? "Unable to delete your account.");
      setDeleting(false);
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/auth/login?deleted=1";
  };

  return (
    <>
      <div className="space-y-10">
        {/* SECTION 1: Personal Information */}
        <section className="space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-base font-semibold text-foreground">
              Personal Information
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Update your photo, name, and primary contact number.
            </p>
          </div>

          <form onSubmit={saveProfile} className="space-y-6">
            {/* Avatar block */}
            <div className="flex items-center gap-5">
              <div className="relative group flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xl font-semibold text-foreground shadow-sm">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
                  aria-label="Change profile image"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Camera className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm font-medium text-foreground">Profile image</p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or WebP · Square image (cropped to 1:1)
                </p>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="h-8 text-xs font-medium"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Change image"
                    )}
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={onSelectFile}
                />
              </div>
            </div>

            {/* Inputs */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="full-name" className="text-sm font-medium">
                  Full name
                </Label>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  maxLength={30}
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Contact number for your account.
                </p>
              </div>
            </div>

            {/* Inline message / Error / Save */}
            <div className="flex flex-col gap-3 pt-1">
              {message && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-500">
                  <Check className="h-4 w-4" />
                  {message}
                </p>
              )}
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <div>
                <Button type="submit" disabled={saving || uploadingAvatar}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save profile"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </section>

        {/* SECTION 2: Security */}
        <section className="space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-base font-semibold text-foreground">Security</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage the email, phone number and password associated with your account.
            </p>
          </div>

          <div className="divide-y divide-border/60">
            {/* Email Row */}
            <div className="py-4 first:pt-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-muted-foreground">{currentEmail}</span>
                    {!emailConfirmed && (
                      <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        Unconfirmed
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowEmailForm((prev) => !prev);
                      setEmailMessage(null);
                      setEmailError(null);
                    }}
                    className="h-8 text-xs font-medium"
                  >
                    {showEmailForm ? "Cancel" : "Change email"}
                  </Button>
                </div>
              </div>

              {/* Collapsible email change form */}
              {showEmailForm && (
                <form
                  onSubmit={requestEmailChange}
                  className="mt-4 pt-3 border-t border-border/40 space-y-3 max-w-md"
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="new-email"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      New email address
                    </Label>
                    <Input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="h-9"
                    />
                  </div>
                  {emailMessage && (
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500">
                      {emailMessage}
                    </p>
                  )}
                  {emailError && (
                    <p className="text-xs font-medium text-destructive">{emailError}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={emailLoading}
                      className="h-8 text-xs"
                    >
                      {emailLoading ? (
                        <>
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send confirmation"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Phone Row */}
            <div className="py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {phone ? phone : "Not added"}
                  </p>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const el = document.getElementById("phone");
                      el?.focus();
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="h-8 text-xs font-medium"
                  >
                    Change phone
                  </Button>
                </div>
              </div>
            </div>

            {/* Password Row */}
            <div className="py-4 last:pb-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Manage and change your sign-in password.
                  </p>
                </div>
                <div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-medium"
                  >
                    <Link href="/auth/update-password">Change password</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Delete Account (Subtle, unobtrusive at the very bottom) */}
        <section className="pt-6 border-t border-border/60">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:underline"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete account</span>
            </button>
          </div>
        </section>
      </div>

      {/* Image Crop Dialog */}
      <ImageCropperDialog
        open={cropModalOpen}
        imageSrc={pendingCropSrc}
        isUploading={uploadingAvatar}
        onClose={handleCloseCrop}
        onConfirmCrop={handleConfirmCrop}
      />

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This permanently removes your account, profile, businesses, readings,
              fuel rates, expenses, and stored profile image. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => void deleteAccount()}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete permanently"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
