import {auth, db} from "./index";


export async function getStudents(id) {
    return await db.collection('groups').where('group','==', id).get();
}

export async function updatePass(newPass) {
    try {
        const user = auth.currentUser;
        await user.updatePassword(newPass);
    }catch (e) {
        alert(e);
    }
}

export function validateUser(position){
    return position !== 'admin';
}