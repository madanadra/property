import { readProfile } from "@/fetch";
import { Suspense } from "react";
import Load from "./load";
import Link from "next/link";

export default async function ProfilePhoto() {
    const profile = await readProfile()

    return (
        <Suspense fallback={<Load size='base' />}>
            <Link href='/profile'>
                <img src={profile.data && profile.data.image ? 'https://indprop.dgrande.com/profile_photos/' + profile.data.image : '/user.jpg'} alt="Profile photo"
                className="w-7 aspect-square rounded-full shadow cursor-pointer" />
            </Link>
        </Suspense>
    )
}