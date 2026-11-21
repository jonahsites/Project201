# Firestore Security Specification (`/console` CMS)

## 1. Data Invariants
1. **Admin-Only Mutations**: Only verified admins (`request.auth.token.email_verified == true` AND either listed in `/admins/{uid}` or matching the bootstrapped owner email `jadovdav@gmail.com`) may create, update, or delete documents in `site_settings`, `custom_pages`, `media_assets`, or `admins`.
2. **Public Website Read Isolation**:
   - `site_settings/{settingId}`: Public `get` is permitted only for `settingId == 'published'` (no blanket `list` for non-admins).
   - `custom_pages/{pageId}`: Public `get` and `list` are permitted only when `resource.data.published == true`. Draft/unpublished pages are readable only by admins.
   - `media_assets/{assetId}`: Public `get` and `list` are permitted only when `resource.data.isPublic == true`.
   - `admins/{adminUid}`: Strictly private to admins (`isAdmin()` or own `adminUid == request.auth.uid`); never publicly readable.
3. **Immutable Ownership & Temporal Integrity**:
   - `createdAt` and `ownerId`/`uploadedBy`/`addedBy` are immutable after creation.
   - `createdAt` and `updatedAt` must equal `request.time`.
4. **Strict Payload Boundaries**:
   - All string fields enforce `.size()` bounds; `dataUrl` in `media_assets` is capped at 800,000 chars (`< 1MB` Firestore doc limit).
   - `pagesOrder`, `hiddenPages`, and `cards` lists enforce max length and element type checks.

## 2. Dirty Dozen Attack Payloads (All Must Return `PERMISSION_DENIED`)
1. **Unauthenticated Write to `site_settings/published`**: Anonymous client attempts `setDoc(doc(db, 'site_settings', 'published'), ...)`.
2. **Non-Admin Authenticated Write to `site_settings/published`**: Signed-in standard user attempts `updateDoc` on `site_settings/published`.
3. **Unverified Admin Email Spoof**: User with `email == 'jadovdav@gmail.com'` and `email_verified == false` attempts to write `custom_pages/test`.
4. **Shadow Field Injection on `site_settings/published`**: Admin attempts to inject an extra key `shadowAdmin: true` not in `hasOnly(...)`.
5. **ID Poisoning on `custom_pages`**: Admin attempts to create `/custom_pages/../../evil` or 200-char ID failing `isValidId()`.
6. **Public Read of Unpublished Custom Page**: Unauthenticated visitor attempts `getDoc` on a `custom_pages` doc where `published == false`.
7. **Public List Scraping of `custom_pages` Without Filter**: Visitor attempts `getDocs(collection(db, 'custom_pages'))` without `where('published', '==', true)`.
8. **Privilege Escalation on `admins`**: Non-admin authenticated user tries to create `/admins/<their_uid>` to grant themselves admin role.
9. **Timestamp Spoofing**: Admin sends `updatedAt: new Date('2030-01-01')` instead of `serverTimestamp()` (`request.time`).
10. **Immortal Field Tampering**: Admin attempts to modify `createdAt` or `ownerId` during a `custom_pages` update.
11. **Oversized Media Asset Payload**: Admin attempts to upload `dataUrl` > 800,000 characters (`Denial of Wallet` / 1MB overflow guard).
12. **PII / Admin List Exposure**: Unauthenticated user attempts `getDocs(collection(db, 'admins'))`.
