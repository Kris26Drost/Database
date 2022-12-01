import React, {useEffect} from 'react'

const MinTest = () => {



   useEffect(() => {
     console.log( 'loaded/mounted')
   
     return () => {
       console.log('unmounting')
     }
   }, [])
   
    

  return (
    <div>MinTest</div>
  )
}

export default MinTest