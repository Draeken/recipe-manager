import { startAuthPopup } from '@recipes-manager/data-auth';
import { useAppSelector } from '@recipes-manager/data-store/hooks';
import { CmpAvatar, CmpButton } from '@recipes-manager/ui';
import React from 'react';

export const AppProfile = () => {
  const userPhotoUrl = useAppSelector((state) => state.user.photoURL);
  const userDisplayName = useAppSelector((state) => state.user.displayName);
  if (userPhotoUrl) {
    return <CmpAvatar src={userPhotoUrl} alt={userDisplayName} />;
  }
  return <CmpButton onClick={() => startAuthPopup()}>sign-in</CmpButton>;
};
