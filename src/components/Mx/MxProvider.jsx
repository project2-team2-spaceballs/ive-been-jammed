import React from 'react'

export const MxContext = React.createContext();
// const useStyles = makeStyles(()=>(
//     {
//         paper:{
//             backgroundColor:'#263238'
//         }
//     }
// ))

export default class MxProvider extends React.Component{
    state={ sensor:"All",
            MxTasks:[],
            formjson:{}
        }
    
    setSensor(newsensor){
        this.setState({sensor: newsensor})
    }
    
    async mxFetch(select) {
        var data;
        if(select==="All"){
            data= await fetch('http://localhost:8000/mx/all')
            data= await data.json()
        } else {
            data= await fetch(`http://localhost:8000/mx/sensor/${select}`)
        }
        return data
    }
    
    async mxRequest(formjson){
        await fetch('http://localhost:8000/mx/request', {
            method: 'POST',
            body:JSON.stringify(this.state.formjson),
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
    async mxSearch(searchtext){
        let data=await fetch(`http://localhost:8000/mx/search?searchstring=${searchtext}`)
    }
    // formEntryHandler(e){
    //     this.setState({[e.target.name]: e.target.value})
    //}
    render(){
        return(
            <MxContext.Provider value={{   state:   this.state,
                                                    setSensor: this.setSensor,
                                                    mxRequest: this.mxRequest,
                                                    mxSearch: this.mxSearch,
                                                    mxFetch: this.mxFetch,
//                                                    formEntryHandler:this.formEntryHandler()
                                        }}>
            {this.props.children}                                
            </MxContext.Provider>
        )
    }
}
