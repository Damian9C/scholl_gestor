import {db} from "./index";

export async function getAllStaff() {
    return await db.collection('staff').get();
}