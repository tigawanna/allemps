


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




export interface PBChannels {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Item[]
}

export interface Item {
  collectionId: string
  collectionName: string
  color: string
  created: string
  description: string
  id: string
  name: string
  updated: string
}

