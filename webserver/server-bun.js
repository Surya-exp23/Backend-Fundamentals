import {serve} from 'bun'

serve({
    fetch(request){
        const url = new URL(request.url)
        if(url.pathname==='/'){
            return new Response("hello ice tea",{status: 200})
        }else if(url.pathname==='/tea-ice'){
            return new Response("thanks for ordering ice and tea", {status: 200})
        }else{
            return new Response("not valid route",{status: 404})
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})