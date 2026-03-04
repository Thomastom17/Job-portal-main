import React, { useState } from 'react'
import './Opportunities.css'
import { OpportunitiesCard } from "./OpportunitiesCard";
import { useJobs } from '../JobContext';

export const Opportunities = () => {
  const { jobs } = useJobs(); 

  const [displayCount, setDisplayCount] = useState(8);

  const itemsToDisplay = jobs.slice(0, displayCount);

  return (
      <div className="Opportunities-job-list">
        {itemsToDisplay.map((job) => (
          <OpportunitiesCard key={job.id} job={job} />
        ))}
      </div>
  )
}
