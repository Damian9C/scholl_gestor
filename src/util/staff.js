import {auth, db} from "./index";

export async function getAllStaff() {
    return await db.collection('staff').get();
}

export async function newStaff(member){
    auth.createUserWithEmailAndPassword(member.email, member.password)
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
