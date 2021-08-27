import {updateGroup} from "./groups";
import {getAllStaff, getTeacherById} from "../staff";

export async function addNewTeacherToGroup (item, teacher, matter, allTeachers, color) {
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

        //await updateGroup(item);

        let staff;
        let data = await getAllStaff();

        data.forEach(e => {
            if (e.id === teacherData.id) staff = e.data()
        });

        console.log(item)

        staff.lessons.push({
            group: item.data.technicalName,
            matter: matter,
            id: item.data.group,
            color: color,
        })

        console.log(staff)


    }catch (e) {
        alert(e)
    }
}