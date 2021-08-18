import {auth, db} from "./index";

export async function getAllStaff() {
    return await db.collection('staff').get();
}

export function newStaff(member, password){
    console.log(member)
    auth.createUserWithEmailAndPassword(member.email, password)
        .then((userCredentil) => {} )
        .catch(e => {
        console.log(e)
    })

    db.collection('staff')
        .add(member)
        .then(() => {} )
        .catch(() => {
        console.log('error')
    })
}
