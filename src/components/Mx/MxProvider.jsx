import React from 'react'

export const MxContext = React.createContext({  setSensor:()=>{},
                                                mxRequest:()=>{},
                                                mxSearch: ()=>{},
                                                mxFetch: ()=>{}});
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
            data= await fetch('http://localhost:8080/mx/all')
            data= await data.json()
        } else {
            data= await fetch(`http://localhost:8080/mx/sensor/${select}`)
            data= await data.json()
        }
        this.setState({MxTasks: data})
    }
    
    async mxRequest(formjson){
        await fetch('http://localhost:8080/mx/request', {
            method: 'POST',
            body:JSON.stringify(this.state.formjson),
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
    async mxSearch(searchtext){
        let data=await fetch(`http://localhost:8080/mx/search?searchstring=${searchtext}`)
    }
    // formEntryHandler(e){
    //     this.setState({[e.target.name]: e.target.value})
    //}
    render(){
        return(
            <MxContext.Provider value={{   state:   this.state,
                                                    setSensor: this.setSensor.bind(this),
                                                    mxRequest: this.mxRequest.bind(this),
                                                    mxSearch: this.mxSearch.bind(this),
                                                    mxFetch: this.mxFetch.bind(this),
//                                                    formEntryHandler:this.formEntryHandler()
                                        }}>
            {this.props.children}                                
            </MxContext.Provider>
        )
    }
}
