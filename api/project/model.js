// build your `Project` model here
const db = require('../../data/dbConfig')

const findById = async() => {
    const projectStatus = await db('projects')

    projectStatus.forEach(status => {
        if(status.project_completed === 0){
            status.project_completed = false
        }else {
            status.project_completed = true
        }
    })

return projectStatus
}

const create = async (status) => {
    const [id] = await db("projects").insert(status)
    return db("projects")
    .where("project_id", id)
    .first()
}

module.exports = {
    findById,
    create
}