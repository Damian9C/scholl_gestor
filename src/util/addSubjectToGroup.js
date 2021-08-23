import {updateGroup} from "./groups";

export async function addNewTeacherToGroup (item, teacher, matter, allTeachers) {
    try {
        let teacherData;
        let matterExist;

        allTeachers.forEach( e => {
            if (e.id === teacher) teacherData = e;
        })

        item.data.students.forEach( student => {
            matterExist = true;

            student.lessons.forEach( e => {
                if (e.lesson === matter) matterExist = false
            })

            if (matterExist){
                student.lessons.push({
                    lesson: matter,
                    partial1: 0,
                    partial2: 0,
                    partial3: 0,
                })
            }
        })

        item.data.currentTeachers.push({
            teacher: teacherData.name,
            id : teacherData.id,
            matter: matter,
            date: new Date(),
        });

        await updateGroup(item);
    }catch (e) {
        alert(e)
    }
}