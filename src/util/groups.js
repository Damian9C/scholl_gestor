import {db} from "./index";

export async function getGroups() {
    let data = await db.collection('groups').get()
    let groups = []

    data.forEach((item) => {
        groups.push({
            data: item.data(),
            id: item.id,
        })
    })

    return groups
}

export async function addGroup(grade, group) {
    let data = {
        currentTeachers: [],
        students: [],
        group: `${grade}${group}`,
        technicalName: `${grade}.-${group}`,
    }

    await db.collection('groups').add(data)
}

export function validateGroup( groups, newGroup ){
    let validate= false;

    groups.forEach(item => {
        if (item.group === newGroup){
            validate = true
        }
    });

    return validate;
}

export async function dropGroup(item) {
    try {
        await db.collection('groups').doc(item).delete()
    }catch (e) {
        alert(e)
    }
}

export async function updateGroup(item) {
    try {
        await db.collection('groups').doc(item.id).update(item.data)
    }catch (e) {
        alert(e)
    }
}