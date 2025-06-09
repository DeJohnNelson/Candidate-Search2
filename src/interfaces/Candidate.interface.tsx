// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  email: string;
  name: string;
  location: string | null;
  company: string | null;
  bio: string | null;
}

export type  {Candidate} ;