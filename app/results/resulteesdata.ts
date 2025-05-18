export interface Resultee {
  name: string;
  percentile: number;
  gotJob: boolean;
}

export const RESULTEES: Resultee[] = [
  { name: 'Aman Sharma', percentile: 99.9991, gotJob: true },
  { name: 'Priya Singh', percentile: 99.9987, gotJob: true },
  { name: 'Rohit Verma', percentile: 99.9981, gotJob: false },
  { name: 'Sneha Gupta', percentile: 99.9979, gotJob: false },
  { name: 'Vikas Yadav', percentile: 99.9975, gotJob: false },
  { name: 'Aniket Kumar', percentile: 99.9972, gotJob: false },
  { name: 'Simran Kaur', percentile: 99.9968, gotJob: false },
  { name: 'Rahul Dubey', percentile: 99.9965, gotJob: false },
  { name: 'Pooja Joshi', percentile: 99.9961, gotJob: false },
  { name: 'Suresh Patil', percentile: 99.9959, gotJob: false },
];

export const COMMENTS: string[] = [
  'Worked 27 hours in a 24 hour day. Still only got 99.997%.',
  'Practiced intense staring at trolleys for 3 months straight.',
  'Cleared the exam but failed the polythene distribution round.',
  'My mom still thinks I should have tried for UPSC.',
  'Lost my whistle in the final round. Heartbroken.',
  'Security guard exam tougher than JEE, NEET, and UPSC combined.',
  'I can now check bags with my eyes closed.',
  'Only 2 out of 10 lakh got the job. Feeling blessed and exhausted.',
  'Next year, I am aiming for the chair at the entrance.',
  'My percentile is higher than my phone battery ever was.'
]; 