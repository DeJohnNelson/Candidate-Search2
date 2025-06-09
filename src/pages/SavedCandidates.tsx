import { useEffect, useState } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';
import { searchGithubUser } from '../api/API';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchSavedCandidates = async () => {
      const allKeys = Object.keys(localStorage);
      const savedUsernames: string[] = [];

      // Manually check keys that start with 'candidate_'
      for (let i = 0; i < allKeys.length; i++) {
        const key = allKeys[i];
        if (key.length >= 10 && key.substring(0, 10) === 'candidate_') {
          savedUsernames.push(key.substring(10));
        }
      }

      const candidateData: Candidate[] = [];

      // Fetch data for each username
      for (let i = 0; i < savedUsernames.length; i++) {
        const data = await searchGithubUser(savedUsernames[i]);
        // Check if data has login property manually
        if (data && typeof data.login === 'string') {
          candidateData.push(data);
        }
      }

      setCandidates(candidateData);
    };

    fetchSavedCandidates();
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.name}>
            <h2>{candidate.name}</h2>
            <p>Email: {candidate.email || 'N/A'}</p>
            <p>Bio: {candidate.bio || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedCandidates;
