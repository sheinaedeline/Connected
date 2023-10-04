import { DateTime } from "luxon";

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

export const getCurrentTime = ():DateTime => {
    return DateTime.local();
}


export const valid_abn = (abn:string):boolean => {
    let regexp = new RegExp(/^(\d *?){11}$/);
    return regexp.test(abn);
}


export const valid_phone_number = (phone_number:string):boolean =>{
    let regexp = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    return regexp.test(phone_number)
}

export const sql_date_string_checker = (iso_string:string):Boolean => {
    var luxonDate = DateTime.fromSQL(iso_string,{
        zone:"utc"
    });

    return luxonDate.isValid;
}