async function Api(){
    const url=fetch("https://pro-api.coingecko.com/api/v3/key");
    const resposnse=await url.json();
    console.log(resposnse);
}