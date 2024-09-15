// accessRules.ts

export const fullAccessTags = [
    'Enrolled_to_Membership',
    'Enrolled_Holistic Membership',
    'Enrolled_Swara Yoga Membership',
    'UPIPayerMonthly',
    'UPIPayerAnnual',
    'Order Bump - Monthly Holistic Membership',
  ];

  export const fullAccessMemberTags = [
    'Enrolled_to_Membership',
  'Enrolled_Holistic Membership',
  'Enrolled_Swara Yoga Membership',
  'UPIPayerMonthly',
  'UPIPayerAnnual',
  'Order Bump - Monthly Holistic Membership',
  'Enrolled_to_Sleep_Membership',
  ];
  export const limitedAccessTags = [
    'Purchased_9-Day Breathwork Course',
    'Purchased_9-Day Meditation Course'
  ];
  
  export const limitedAccessRules: Record<string, string[]> = {
    'Enrolled_to_Sleep_Membership': ['7'], // Access to Sleep Course only (ID: 7)
    'Purchased_9-Day Breathwork Course': ['4'], // Access to 9-Day-Breathwork course only (ID: 4)
    'Purchased_9-Day Meditation Course': ['5'], // Access to 9-Day-Meditation course only (ID: 5)
  };
  
  export const combinedAccessRules = [
    {
      tags: ['Enrolled_to_Sleep_Membership', 'Purchased_9-Day Breathwork Course'],
      courses: ['4', '7'], // Access to Sleep Course and 9-Day-Breathwork course
    },
    {
      tags: ['Purchased_9-Day Breathwork Course', 'Purchased_9-Day Meditation Course'],
      courses: ['4', '5',], // Access to 9-Day-Breathwork, 9-Day-Meditation, and Default (Free) Sleep Music feature
    },
  ];
  