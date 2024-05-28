import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import formatDate from '../../components/CustomFunctions'
import { useDispatch } from 'react-redux'
import { loadTasks, updateTask } from '../../app/features/task/taskSlice'
function ViewModal({ showModal, setShowModal, selectedTask,setSelectedTask}) {
  console.log("selectedTask :",selectedTask)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const {name,value} = e.target
    const updatedTask = {...selectedTask,[name]:value}
    setSelectedTask(updatedTask)
  }
  const handleSubmit = () =>{
    const {_id, ...taskData} = selectedTask;
    console.log("taskID",_id)
   dispatch(updateTask({taskId:_id,taskData}))
   setShowModal(false)
  }
  return (
    <CModal
      visible={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">View Task</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }} className="modal-body">
        <div className="mb-3">
          <CFormInput
            type="text"
            id="taskTitle"
            name='taskName'
            placeholder="Task Title"
            aria-describedby="taskTitleHelpInline"
            value={selectedTask.taskName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">

          <CFormSelect value={selectedTask.status} id="taskStatus" name="status" onChange={handleChange}>
             <option value={"inProgress"}>inProgress</option>
             <option value={"completed"}>completed</option>
             <option value={"cancelled"}>cancelled</option>
             <option value={"valid"}>valid</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormInput
            value={formatDate(new Date(selectedTask.targetDate))}
            type="date"
            name='targetDate'
            id="taskDate"
            placeholder="Task Date"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormInput
            value={selectedTask.xpPoints}
            type="number"
            name='xpPoints'
            id="xpPoints"
            placeholder="xpPoints"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <h5>Task Evidence</h5>
          {selectedTask.deliverables && selectedTask.deliverables.length > 0 ? (
            <ul>
              {selectedTask.deliverables.map((attachment, index) => (
                <li key={index}>
                  <a href={attachment.fileUrl} target="_blank" rel="noopener noreferrer">
                    {attachment.fileName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No attachments found.</p>
          )}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => setShowModal(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>Edit</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewModal
