import {updateGroup} from "./groups";
import {getAllStaff, getTeacher, updateSelectedUser} from "../staff";

export async function addNewTeacherToGroup (item, teacher, matter, allTeachers, color) {
    const colorCards = {
            Azul: '#4287f5',
            Verde: '#13ba00',
            Naranja: '#ed8600',
            Morado: '#a000fc',
            Rosa: '#ed0077',
        }

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


            }else alert('La materia ya existe')
        })

        item.data.currentTeachers.push({
            teacher: teacherData.name,
            id : teacherData.id,
            matter: matter,
            date: new Date(),
        });

        let staff;
        let data = await getAllStaff();

        data.forEach(e => {
            if (e.id === teacherData.id) staff = {
                data: e.data(),
                id: e.id,
            }
        });

        console.log(item)

        staff.data.lessons.push({
            group: item.data.technicalName,
            matter: matter,
            id: item.data.group,
            color: colorCards[color],
        })

        await updateGroup(item);
        await updateSelectedUser(staff);
    }catch (e) {
        alert(e)
    }
}

export async function modifySubjectToGroup(group, oldTeacher, newTeacher, matter, newMatter) {
    try {
        let staff = await getAllStaff();
        let dataOldTeacher;
        let dataNewTeacher;

        staff.forEach(item => {
            if (item.id === oldTeacher) dataOldTeacher = item.data();
            if (item.id === newTeacher) dataNewTeacher = item.data();
        })

        group.data.currentTeachers.forEach(item => {
            if (oldTeacher === item.id && item.matter === matter){
                item.teacher = dataNewTeacher.name;
                item.matter = newMatter;
                item.id = newTeacher
            }
        });

        await updateGroup(group);
    }catch (e) {
        alert(e)
    }
}
