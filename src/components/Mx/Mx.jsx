import React from 'react'
import MxProvider from './MxProvider'
import MxTasks from './MxTasks'
import SensorSelect from './SensorSelect'
import SubmitRequest from './SubmitRequest'

export default function Mx(){
    return(
        <MxProvider>
            <SensorSelect/>
            <MxTasks/>
            <SubmitRequest/>
        </MxProvider>
    )
}