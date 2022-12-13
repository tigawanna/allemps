import { client } from "../pb/config";

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


export const joinChannel = async (
  user_id: string,
  channel_id: string
) => {
  // or fetch only the first record that matches the specified filter
  const record = await client
    .collection("members")
    .getFirstListItem(
      `emp="${user_id}"&channel="${channel_id}"`,
      { expand: "" }
    );
};

export const getChannelsJoinStatus = async (
  user_id: string,
  channel_id: string
) => {
  // or fetch only the first record that matches the specified filter
  
  const url = `https://emps.tigawanna.tech/api/collections/members/records?filter=emp="${user_id}"&channel="${channel_id}"`

  const members_url = `https://emps.tigawanna.tech/api/collections/members/records?filter=emp="${user_id}"&channel="${channel_id}"`;
 
  try {
     const record = await getRecords(members_url);
     console.log("is part  === ", record.items);
     return record.items[0]

  } catch (e) {
    console.log("error ==== ", e);
    return null;
  }
};


export const getChannelUrl =(channel_id?:string)=>{
  if(channel_id){
   return `https://emps.tigawanna.tech/api/collections/channels/records?filter=id="${channel_id}"`;
  }
    return `https://emps.tigawanna.tech/api/collections/channels/records?filter=id="0ds0fovs0nsas0k"`;

}
