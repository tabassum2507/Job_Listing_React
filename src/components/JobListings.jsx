import React, { useState, useEffect } from "react";
import jobs from '../jobs.json'
import JobListing from "./JobListing";
import Spinner from "./Spinner";
const JobListings = ({isHome = false}) => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false)

  const recentJobs = isHome ?  allJobs.slice(0,6) : allJobs.slice(0,3)

  useEffect(() => {
    // if (Array.isArray(jobs.jobs)) {
    //   setAllJobs(jobs.jobs);
    // } else {
    //   console.error('Jobs data is not an array:', jobs.jobs);
    // }

    const fetchJobs = async() => {
      try{
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setAllJobs(data)
      } catch (error) {
        console.log('error in fetching job data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, []);
 
  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Browse Jobs" : "Recent Jobs"}
          </h2>
          
            {loading ? <Spinner loading={loading}/> :
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             { recentJobs?.map((job) => ( 
              <JobListing key={job.id} job={job} />
              ) )}  
             </div>
}
         
        </div>
      </section>
    </div>
  );
};

export default JobListings;
