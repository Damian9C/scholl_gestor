import {db} from "./index";

export async function getStudents(id) {
    return await db.collection('groups').where('group','==', id).get();
}