import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

function CandidateSearch() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

 
  useEffect(() => {
    searchGithub().then(function (data) {
      const names = data.map(function (user: any) {
        return user.login;
      });
      setUsernames(names);
    });
  }, []);

  function handleSelect(name: string) {
    const storageKey = 'candidate_' + name;
   
    if (localStorage.getItem(storageKey) !== null) {
    setCandidate(JSON.parse(localStorage.getItem(storageKey) as string));
    return;
  }

    searchGithubUser(name).then(function (data) {
      const result: Candidate = {
        email: data.email || '',
        name: data.name || data.login || '',
        location: data.location || null,
        company: data.company || null,
        bio: data.bio || null,
      };

      setCandidate(result);
      localStorage.setItem(storageKey, JSON.stringify(result));
    });
  }
 

  return (
    <div>
      <h1>Candidate Search</h1>

      <div>
        <h3>Select a candidate:</h3>
        <ul>
          {usernames.map(function (name) {
            return (
              <li key={name}>
                <button onClick={function () { handleSelect(name); }}>
                  {name}
                </button>
              </li>
            );
          })}
        </ul>

     
          {candidate && (
            <>
              <h2>{candidate.name}</h2>
              <p>Email: {candidate.email || 'N/A'}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <p>Bio: {candidate.bio || 'N/A'}</p>
            </>
          )}
        </div>
      </div> 
  );
}

export default CandidateSearch;