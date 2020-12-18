import React from 'react'
import MxProvider from './MxProvider'
import SensorSelect from './SensorSelect'

export default function Mx(){
    return(
        <MxProvider>
            <SensorSelect/>
        </MxProvider>
    )
}