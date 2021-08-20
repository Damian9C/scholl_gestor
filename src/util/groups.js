import {db} from "./index";

export async function getGroups() {
    let data = await db.collection('groups').get()
    let groups = []

    data.forEach((item) => {
        groups.push(item.data())
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