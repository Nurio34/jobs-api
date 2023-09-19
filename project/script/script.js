
const buttons = document.querySelectorAll("button")
const msgEl = document.querySelector(".msg")

let dataArr = []


buttons.forEach(btn=>btn.addEventListener("click",async(e)=>{
    
    switch (btn.className) {

        case `register`:

            res = await axios.post("/api/v1/auth/register",{
                name:"Nuri",
                email:"nuri1@gmail.com",
                password:"12345678"
            })

            data = res.data
            name = data.name
            token = data.token

                msgEl.innerHTML = `
                    <h1>Hello ${name}</h1>
                    <p>Succesfully Registered</p>
                    <p >Your Token created</p>
                `            

            localStorage.clear()
            localStorage.setItem("tokenCreatedByRegister",token)
            break;

        case `login`:
            
            res = await axios.post("/api/v1/auth/login",{
                email:"nuri@gmail.com",
                password:"12345678"
            })

            data = res.data
            name = data.name
            token = data.token
                console.log(token);
                msgEl.innerHTML = `
                    <h1>Hello ${name}</h1>
                    <p>Succesfully Loged In</p>
                `   

            localStorage.setItem("tokenCreatedByLogin",token)
            break;

        case `getAllJobs`:
        
            getAllJobs()

            break;

        case `createJob`:
        
            createJob()
            
            break;

        case `getJob`:
        
            getJob()

            break;

        case `updateJob`:
        


            break;

        case `deleteJob`:
        


            break;
            

        default:
            break;
    }
}))




function getAllJobs(){

    const token = localStorage.getItem("tokenCreatedByLogin")

    axios.get("/api/v1/jobs",{
        headers:{
            Authorization : `Bearer ${token}`,
        }
     })

     .then((res)=>dataArr = res.data)

     .then(()=>displayJobs())



}

function displayJobs() {

    const undupArr = []

        dataArr.forEach(item=>{
            if(!undupArr.includes(item.job)){
                const itemObj ={
                    jobId : item._id,
                    job : item.job
                }
                undupArr.push(itemObj)
            }
        })
            console.log(dataArr.length);

        msgEl.innerHTML = undupArr.map((item,i)=>{
        return `
                <p id="${item.jobId}">Job ${i+1} : ${item.job}</p>
            `
        }).join(" ")

            if(dataArr.length == 1) {
                msgEl.innerHTML = `
                <p id="${dataArr[0]._id}">Job: ${dataArr[0].job}</p>
            `
            }
}

function createJob() {

    const token = localStorage.getItem("tokenCreatedByLogin")

        axios.post("/api/v1/jobs",
            {
                job:"Web Stupşid"
            },
            {
                headers:{
                    Authorization : `Bearer ${token}`,
                }
        })

        .then(()=>getAllJobs())

}

function getJob() {
    
    const token = localStorage.getItem("tokenCreatedByLogin")
    const id = "6509b438eb8a74f184785123"

        axios.get(`/api/v1/jobs/${id}`,{
            headers:{
                Authorization : `Bearer ${token}`,
            }
        })
        .then((res)=>{
            dataArr = []
            dataArr.push(res.data)
            // console.log(dataArr)
        })
        .then(()=>displayJobs())
}