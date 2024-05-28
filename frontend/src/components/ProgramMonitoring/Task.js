import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react'

import { updateTask } from '../../app/features/task/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
const Task = ({ task }) => {
  const dispatch = useDispatch()
  const [newKpiLabel, setNewKpiLabel] = useState('')
  const [newKpiValue, setNewKpiValue] = useState('')
  const [newDeliverableName, setNewDeliverableName] = useState('')
  const [newRapportTitle, setNewRapportTitle] = useState('')
  const [newRapportText, setNewRapportText] = useState('')
  const [newComment, setNewComment] = useState('')
  const [resourceFile, setResourceFile] = useState(null)
  const [resourceFileName, setResourceFileName] = useState('')
  const [deliverableFile, setDeliverableFile] = useState(null)

  const handleToggleTaskStatus = () => {
    if (task.status === 'inProgress' && task.deliverables.length === 0) {
      alert('Please add a deliverable before changing the status')
      return
    }
    const updatedTask = {
      ...task,
      status: task.status === 'completed' ? 'inProgress' : 'completed',
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
  }

  const handleAddKpi = () => {
    const updatedTask = {
      ...task,
      kpis: [...task.kpis, { label: newKpiLabel, count: newKpiValue }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
  }

  const handleAddDeliverable = () => {
    const updatedTask = {
      ...task,
      deliverables: [
        ...task.deliverables,
        {
          fileName: newDeliverableName ? newDeliverableName : deliverableFile.name,
          fileUrl: deliverableFile,
        },
      ],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
  }

  const handleAddRapport = () => {
    const updatedTask = {
      ...task,
      reports: [...task.reports, { label: newRapportTitle, count: newRapportText }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
  }

  const handleAddComment = () => {
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: {
          ...task,
          comments: [...task.comments, { text: newComment }],
        },
      }),
    )
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Task Details</CCardHeader>
            <CCardBody>
              <div>
                <p>
                  <strong>Task Name:</strong> {task.taskName}
                </p>
                <p>
                  <strong>Task Owner:</strong> {task.taskOwner}
                </p>
                <p>
                  <strong>Target Date:</strong> {task.targetDate}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <CFormCheck
                  id="flexCheckChecked"
                  label="I have Completed The Task"
                  checked={task.status === 'completed' ? true : false}
                  onChange={handleToggleTaskStatus}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>Resources</CCardHeader>
            <CCardBody>
              <div>
                <h5>{task.taskName} Resources:</h5>
                <CListGroup>
                  {task.resources.map((resource, index) => (
                    <CListGroupItem key={index}>
                      <CButton href={resource.url} download color="link">
                        {resource.fileName}
                      </CButton>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mt-3 mb-3">
        <CCardHeader>Sections</CCardHeader>
        <CCardBody>
          <CCard className="mt-3 mb-3">
            <CCardHeader>KPIs</CCardHeader>
            <CCardBody>
              <CListGroup>
                {task.kpis.map((kpi, index) => (
                  <CListGroupItem key={index}>
                    <strong>{kpi.label}:</strong> {kpi.count}
                  </CListGroupItem>
                ))}
                <CListGroupItem>
                  <label htmlFor="newKpiLabel">Label:</label>
                  <CFormInput
                    id="newKpiLabel"
                    placeholder="KPI Label"
                    value={newKpiLabel}
                    onChange={(e) => setNewKpiLabel(e.target.value)}
                    className="mt-3 mb-3"
                  />
                  <label htmlFor="newKpiValue">Value:</label>
                  <CFormInput
                    id="newKpiValue"
                    placeholder="KPI Value"
                    value={newKpiValue}
                    onChange={(e) => setNewKpiValue(e.target.value)}
                    className="mt-3 mb-3"
                  />
                  <CButton color="primary" onClick={() => handleAddKpi()} className="mt-3 mb-3">
                    Add KPI
                  </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader>Documents</CCardHeader>
            <CCardBody>
              <CListGroup>
                {task.deliverables.map((deliverable, index) => (
                  <CListGroupItem key={index}>
                    <CButton href={deliverable.url} download color="link">
                      {deliverable.fileName}
                    </CButton>
                  </CListGroupItem>
                ))}
                <CListGroupItem>
                  <label htmlFor="newDeliverableName">Name:</label>
                  <CFormInput
                    id="newDeliverableName"
                    placeholder="Deliverable Name"
                    value={newDeliverableName}
                    onChange={(e) => setNewDeliverableName(e.target.value)}
                  />
                  <label htmlFor="newDeliverableFile" className="mt-3 mb-3">
                    Upload File:
                  </label>
                  <input
                    id="newDeliverableFile"
                    type="file"
                    onChange={(e) => setDeliverableFile(e.target.files[0])}
                  />
                  <CButton color="primary" onClick={() => handleAddDeliverable()}>
                    Add Deliverable
                  </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader>Reporting Section</CCardHeader>
            <CListGroup>
              {task.reports.map((report, index) => (
                <CListGroupItem key={index}>
                  <div>{report.label}</div>
                  <div>{report.count}</div>
                </CListGroupItem>
              ))}
            </CListGroup>

            <CCardBody>
              <CFormInput
                placeholder="Title"
                value={newRapportTitle}
                onChange={(e) => setNewRapportTitle(e.target.value)}
                className="mb-3"
              />
              <CFormTextarea
                id="newRapportText"
                placeholder="Text"
                value={newRapportText}
                onChange={(e) => setNewRapportText(e.target.value)}
                className="mt-3 mb-3"
              />
              <CButton color="primary" onClick={() => handleAddRapport()} className="mt-3 mb-3">
                Add Reporting Section
              </CButton>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader>Comment Section</CCardHeader>
            <CCardBody>
              <CFormInput
                placeholder="Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <CButton color="primary" onClick={() => handleAddComment()} className="mt-3 mb-3">
                Add Comment
              </CButton>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Task
