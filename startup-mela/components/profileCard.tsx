"use client";

import { useEffect, useState, cloneElement } from "react";
import { GraduationCap, MapPin, Hash, Phone } from "lucide-react";

interface UserProfile {
  uniqueUserCode: string;
  userDetails: {
    usn: string;
    name: string;
    collegeName: string;
    year: string;
    mobileNumber: string;
  } | null;
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/details");
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="w-[320px] h-[250px] bg-[#111] border border-white/10 rounded-xl p-4 shadow-lg mb-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-[#014E87] flex items-center justify-center text-white font-bold">
          {profile.userDetails?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white leading-tight">
            {profile.userDetails?.name}
          </h2>
          <p className="text-lg text-white font-mono mt-1">
            {profile.uniqueUserCode}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 ">
        <Detail icon={<Hash />} value={profile.userDetails?.usn} />
        <Detail icon={<MapPin />} value={profile.userDetails?.collegeName} />
        <Detail icon={<GraduationCap />} value={profile.userDetails?.year} />
        <Detail icon={<Phone />} value={profile.userDetails?.mobileNumber} />
      </div>
    </div>
  );
}

function Detail({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-2 font-medium text-white">
      <div className="text-[#014E87]">
        {cloneElement(icon as React.ReactElement)}
      </div>
      <span className="truncate">{value || "Not Set"}</span>
    </div>
  );
}