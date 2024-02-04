import axios from "axios";

export async function get_contract_hash(){
    let result = String((await axios.get("https://apiv2dev.droplinked.com/storage/contract_hash")).data.value);
    return result;
}
