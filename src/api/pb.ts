export const getRecords=async(url:string)=>{
try{
let headersList = {
  Accept: "*/*",
  //   "User-Agent":
  //     "Thunder Client (https://www.thunderclient.com)",
};

let response = await fetch(url, {
  method: "GET",
  headers: headersList,
});

return await response.json();
}
catch(e){
throw e
}

}





export const createRecords=async(data:FormData,url:string)=>{
try {
let headersList = {
  Accept: "*/*",
//   "User-Agent":
//     "Thunder Client (https://www.thunderclient.com)",
  // "Content-Type": "application/json",
};

// let bodyContent = JSON.stringify({
//   name: "test ground",
//   " description": "testing channel ",
//   color: "#33764",
// });

let response = await fetch(
  url,
  {
    method: "POST",
    body: data,
    headers: headersList,
  }
);

return await response.json();
} catch (e) {
  throw e;
}

}
