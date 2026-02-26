async function connect(){
  var finalResponse
  try{
    const response = await fetch("http://localhost:5000/")
    const data = await response.json()
    finalResponse = data.status // {status : x}
  }catch(error){
    console.error(error)
  }

  if (finalResponse == "ok"){
    window.location.href="mainpage"
  }else{
    window.location.href="500"
  }
}