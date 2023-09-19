
const buttons = document.querySelectorAll("button")
const msgEl = document.querySelector(".msg")

let res,data,name,token

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
        
            token = localStorage.getItem("tokenCreatedByLogin")

            res = await axios.get("/api/v1/jobs",{
                headers:{
                    Authorization : `Bearer ${token}`,
                }
            })

            data = res.data
                console.log(data[0].job);

                msgEl.innerHTML = data.map((item,i)=>{
                   return `
                        <p>Job ${i} : ${item.job}</p>
                    `
                }).join(" ")

            break;

        case `createJob`:
        
            token = localStorage.getItem("tokenCreatedByLogin")

                res = await axios.post("/api/v1/jobs",
                {
                    job:"Receptionist"
                },
                {
                    headers:{
                        Authorization : `Bearer ${token}`,
                    }
                })
                    console.log(res);

            break;

        case `getJob`:
        


            break;

        case `updateJob`:
        


            break;

        case `deleteJob`:
        


            break;
            

        default:
            break;
    }
}))