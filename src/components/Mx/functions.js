export default function setSensor(newsensor){
    this.setState({sensor: newsensor})
}

export default async function mxFetch(select) {
    var data;
    if(select==="All"){
        data= await fetch('http://localhost:8000/mx/all')
        data= await data.json()
    } else {
        data= await fetch(`http://localhost:8000/mx/sensor/${select}`)
    }
    return data
}

export default async function mxRequest(formjson){
    await fetch('http://localhost:8000/mx/request', {
        method: 'POST',
        body:JSON.stringify(formjson),
        headers: { 'Content-Type': 'application/json' }
    })
}

export default async function mxSearch(searchtext){
    await fetch(`http://localhost:8000/mx/search?searchstring=${searchtext}`, {
        method: 'POST',
        body:JSON.stringify(formjson),
        headers: { 'Content-Type': 'application/json' }
    })
}

export default function formEntryHandler(e){
    this.setState({[e.target.name]: e.target.value})
}


