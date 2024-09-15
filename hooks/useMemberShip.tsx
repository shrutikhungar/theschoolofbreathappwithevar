import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTags } from '../services/tags.service';
import { fullAccessTags, limitedAccessTags } from '../data/accessRules';
import { User } from '../context/AuthContext';


export const userMembershipStatus = ({ user }:{user:User | null}) => {
  const { data: userTags, isLoading, error } = useQuery<string[], Error>({
    queryKey: ['userTags', user?.email],
    queryFn: () => fetchUserTags(user?.email ?? ''),
  });

  const userHasFullAccess = userTags?.some(tag => fullAccessTags.includes(tag));
  const userHasLimitedAccess = userTags?.some(tag => limitedAccessTags.includes(tag));
  if(isLoading){
    return 
  }
  let membershipStatus = 'No Membership';
  if (userHasFullAccess) {
    membershipStatus = 'Premium Membership';
  } else if (userHasLimitedAccess) {
    membershipStatus = 'Limited Access Membership';
  }

  return {
    membershipStatus,
    isLoading,
    error
  }
};




