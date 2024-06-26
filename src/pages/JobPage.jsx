import React from 'react'
import { useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const JobPage = () => {
 const {id} = useParams();
 const [job, setJob] = useState(null)
 const [loading, setLoading] = useState(true)


 useEffect(() => {
    const fetchJob = async() => {
        try {
            const res = await fetch(`/api/jobs/${id}`)
            const data = await res.json()
            setJob(data);
            console.log(job.type)
        } catch (error) {
            console.log('Error fetching data', error)
        } finally {
            setLoading(false)
        }
    }
    fetchJob()
 },[])

  return loading ? <Spinner /> : <div>{job.title}</div>
}

const jobLoader = async ({params} => {
    const res = await fetch()
})

export default JobPage