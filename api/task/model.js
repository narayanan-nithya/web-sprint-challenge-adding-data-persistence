// build your `Task` model here
const db = require('../../data/dbConfig')

const findById = async() => {
    const tasks = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select('t.*', 'p.project_name', 'p.project_description')
    const newTaskInfo = []

    for (let i =0; i < tasks.length; i++){
        const newTask = {
            task_id: tasks[i].task_id,
            task_description: tasks[i].task_description,
            task_notes: tasks[i].task_notes,
            task_completed: tasks[i].task_completed === 0 ? false :true,
            project_name: tasks[i].project_name,
            project_description: tasks[i].project_description
        }
        newTaskInfo.push(newTask);
    }
    return newTaskInfo
}
const create = async (status) => {
    const [id] = await db("tasks").insert(status)
    const task = await db("tasks").where('task_id', id).first()
    if(task.task_completed === 0){
        task.task_completed = false
    }else {
        task.task_completed - true
    }
    return task
}

module.exports = {
    findById,
    create
}

