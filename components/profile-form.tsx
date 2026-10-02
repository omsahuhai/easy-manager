"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Check, Copy, Loader2, Mail, Phone, ShieldAlert, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateProfileAction, deleteAccountAction } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function ProfileForm({ userId, email, emailConfirmed, fullName: initialFullName, phone: initialPhone, avatarUrl: initialAvatarUrl, avatarPath: initialAvatarPath }: {
  userId: string; email: string; emailConfirmed: boolean; fullName: string; phone: string; avatarUrl: string | null; avatarPath: string | null;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [currentEmail] = useState(email);
  const [newEmail, setNewEmail] = useState(email);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarPath, setAvatarPath] = useState(initialAvatarPath);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const initials = (fullName || currentEmail.split("@")[0] || "U").split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setMessage(null); setError(null);
    const result = await updateProfileAction({ fullName, phone, avatarUrl, avatarPath });
    if (!result.success) setError(result.error ?? "Unable to save your profile.");
    else { setMessage("Profile saved."); router.refresh(); }
    setSaving(false);
  };

  const handleAvatar = async (file: File) => {
    setMessage(null); setError(null);
    if (!ALLOWED_AVATAR_TYPES.has(file.type)) { setError("Use a JPG, PNG, or WebP image."); return; }
    if (file.size > MAX_AVATAR_SIZE) { setError("Profile images must be 2 MB or smaller."); return; }
    setUploadingAvatar(true);
    try {
      const supabase = createClient();
      const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
      const path = userId + "/" + crypto.randomUUID() + "." + extension;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { cacheControl: "3600", contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const result = await updateProfileAction({ fullName, phone, avatarUrl: data.publicUrl, avatarPath: path });
      if (!result.success) { await supabase.storage.from("avatars").remove([path]); throw new Error(result.error ?? "Unable to save the profile image."); }
      if (avatarPath && avatarPath !== path) await supabase.storage.from("avatars").remove([avatarPath]);
      setAvatarUrl(data.publicUrl); setAvatarPath(path); setMessage("Profile image updated."); router.refresh();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload the profile image.");
    } finally { setUploadingAvatar(false); }
  };

  const requestEmailChange = async (event: React.FormEvent) => {
    event.preventDefault(); setMessage(null); setError(null);
    const nextEmail = newEmail.trim().toLowerCase();
    if (!nextEmail || nextEmail === currentEmail.toLowerCase()) { setMessage("Your email address is already up to date."); return; }
    setEmailLoading(true);
    try {
      const supabase = createClient();
      const { error: emailError } = await supabase.auth.updateUser({ email: nextEmail });
      if (emailError) throw emailError;
      setMessage("Confirmation links have been sent. Your new email will take effect after the required confirmation.");
    } catch (emailError) {
      setError(emailError instanceof Error ? emailError.message : "Unable to start the email change.");
    } finally { setEmailLoading(false); }
  };

  const copyAccountId = async () => {
    await navigator.clipboard.writeText(userId); setCopied(true); window.setTimeout(() => setCopied(false), 1500);
  };

  const deleteAccount = async () => {
    setDeleting(true); setError(null);
    const result = await deleteAccountAction();
    if (!result.success) { setError(result.error ?? "Unable to delete your account."); setDeleting(false); return; }
    const supabase = createClient(); await supabase.auth.signOut(); window.location.href = "/auth/login?deleted=1";
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal information</CardTitle><CardDescription>Keep the identity used across Easy Manager up to date.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={saveProfile} className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-2xl font-semibold">
                    {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : initials}
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingAvatar} className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-center bg-black/55 text-white hover:bg-black/70 disabled:opacity-60" aria-label="Change profile image">
                      {uploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                    </button>
                  </div>
                  <div><h2 className="font-semibold">Profile image</h2><p className="mt-1 text-sm text-muted-foreground">JPG, PNG, or WebP. Maximum 2 MB.</p><Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => fileInputRef.current?.click()} disabled={uploadingAvatar}>{uploadingAvatar ? "Uploading..." : "Change image"}</Button><input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleAvatar(file); event.currentTarget.value = ""; }} /></div>
                </div>
                <div className="grid gap-2"><Label htmlFor="full-name">Full name</Label><Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" maxLength={100} /></div>
                <div className="grid gap-2"><Label htmlFor="phone">Phone number</Label><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" maxLength={30} /><p className="text-xs text-muted-foreground">Optional contact number for your account.</p></div>
                {message && <p className="flex items-center gap-2 text-sm text-emerald-600"><Check className="h-4 w-4" />{message}</p>}
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={saving || uploadingAvatar}>{saving ? "Saving..." : "Save profile"}</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Email address</CardTitle><CardDescription>Your email is managed by Supabase Auth. Changing it requires email confirmation.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={requestEmailChange} className="space-y-4">
                <div className="grid gap-2"><Label htmlFor="current-email">Current email</Label><div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input id="current-email" value={currentEmail} disabled className="pl-9" /></div></div>
                <div className="grid gap-2"><Label htmlFor="new-email">New email address</Label><Input id="new-email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="you@example.com" required /></div>
                {!emailConfirmed && <p className="text-xs text-amber-700 dark:text-amber-300">Your current email is not confirmed yet.</p>}
                <Button type="submit" variant="outline" disabled={emailLoading}>{emailLoading ? "Sending..." : "Change email"}</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Account</CardTitle><CardDescription>Useful account details for support and security.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Account ID</p><div className="mt-2 flex items-center gap-2"><code className="min-w-0 flex-1 truncate rounded bg-muted px-2 py-1.5 text-xs">{userId}</code><Button type="button" variant="outline" size="icon" aria-label="Copy account ID" onClick={() => void copyAccountId()}>{copied ? <Check /> : <Copy />}</Button></div></div>
              <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</p><p className="mt-1 flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{phone || "Not added"}</p></div>
              <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Security</p><p className="mt-1 text-sm text-muted-foreground">Manage your password from the profile menu.</p></div>
            </CardContent>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><ShieldAlert className="h-5 w-5" />Danger zone</CardTitle><CardDescription>Permanently delete your Easy Manager account and its business data.</CardDescription></CardHeader>
            <CardContent><Button type="button" variant="destructive" className="w-full" onClick={() => setDeleteOpen(true)}><Trash2 />Delete account</Button></CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete your account?</DialogTitle><DialogDescription>This permanently removes your Auth account, profile, businesses, readings, fuel rates, expenses, and stored profile image. This action cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter><Button type="button" variant="outline" onClick={() => setDeleteOpen(false)} disabled={deleting}>Cancel</Button><Button type="button" variant="destructive" onClick={() => void deleteAccount()} disabled={deleting}>{deleting ? <><Loader2 className="animate-spin" />Deleting...</> : <><Trash2 />Delete permanently</>}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
