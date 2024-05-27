const limit =  1;

 export const  to64encode = (value: object) => {
  let text = JSON.stringify(value)
  for (let i = 0; i < limit; i++) {
    text = btoa(text);
  }
  return text;
}

export const to64decode = (value: string) => {
  try{
    for (let i = 0; i < limit; i++) {
      value = atob(value);
    }
    return JSON.parse(value);
  }catch(error: any){
    console.log(error.message, value)
  }
}
