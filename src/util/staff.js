import {auth, db} from "./index";

export async function getAllStaff() {
    return await db.collection('staff').get();
}

export function newStaff(member, password){
    auth.createUserWithEmailAndPassword(member.email, password)
        .then((userCredential) => {} )
        .catch(e => {
        alert(e)
    })

    db.collection('staff')
        .add(member)
        .then(() => {} )
        .catch(() => {
        alert('error')
    })
}

export async function updateSelectedUser(user) {
    try {
        await db.collection('staff').doc(user.id).update(user.data)
    }catch (e) {
        alert(e);
    }
}

export async function deleteSelectedUser(id){
    try {
        await db.collection('staff').doc(id).delete()
    }catch (e) {
        alert(e);
    }
}

export async function sendMailRecovery(mail){
    try {
        await auth.sendPasswordResetEmail(mail)
    }catch (e) {
        alert(e);
    }
}

export async function getNameTeachers() {
    try {
        let data = await db.collection('staff').get();
        let teachersNames = [];

        data.forEach(item => {
            teachersNames.push({
                name: item.data().name,
                id: item.id,
            });
        });

        return teachersNames;
    }catch (e) {
        alert(e)
    }
}

export async function getTeacher(id){
    try {
        let data = await db.collection('staff').where("id", "==", id ).get()
        console.log(data)
    }catch (e) {
        alert(e)
    }
}
