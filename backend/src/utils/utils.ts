export const check_req_field = (req_field:any):Boolean => {
    if (req_field == null || req_field == ''){
        return false;
    }
    return true;
}

export const valid_email = (email:string):boolean => {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
}

export const valid_phone_number = (phone_number:string):boolean =>{
    let regexp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    return regexp.test(phone_number)
}