import {
  CCard,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import { FaCircle, FaCirclePlus } from 'react-icons/fa6'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'
import EditTask from './EditTask'
import TaskView from './TaskView'
import AddTask from './AddTask'
import { createTask } from '../../app/features/task/taskSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
function Activity({ activity, tasks }) {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedtask] = useState(null)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem)
  const dispatch = useDispatch()
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(tasks.length / itemsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleAddTask = (Data) => {
    const taskData = {
      ...Data,
      xpPoints: 0,
      resources: [],
      deliverables: [],
      kpis: [],
      status: 'inProgress',
      activityId: activity._id,
    }
    console.log(taskData)
    dispatch(createTask(taskData))
    setAddModalVisible(false)
  }
  const getValidTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'valid') {
        nb++
      }
    })
    return nb
  }
  const getProgressTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'inProgress') {
        nb++
      }
    })
    return nb
  }
  const getCompletedTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'completed') {
        nb++
      }
    })
    return nb
  }
  const handleModalVisibility = (task) => {
    setSelectedtask(task)
    setVisible(true)
  }
  const handleViewTask = (task) => {
    const currentPath = window.location.pathname
    navigate(`${currentPath}/${task.taskName}`)
  }

  return (
    <>
      {addModalVisible && (
        <AddTask
          setOpen={setAddModalVisible}
          open={addModalVisible}
          handleAddTask={handleAddTask}
        />
      )}
      <CContainer style={{ padding: '20px' }} className="mt-4">
        {selectedTask && (
          <EditTask
            visible={visible}
            setVisible={setVisible}
            selectedTask={selectedTask}
            setSelectedtask={setSelectedtask}
          />
        )}
        {selectedTask && <TaskView open={open} setOpen={setOpen} selectedTask={selectedTask} />}

        <CRow className="mb-3">
          <CCol xs={12} md={4}>
            <CCard className="mb-3" style={{ height: '400px' }}>
              <CCardHeader
                style={{
                  display: 'flex',
                  backgroundColor: '#1ca1c1',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                className="text-light"
              >
                In Progress <FaCirclePlus onClick={() => setAddModalVisible(true)} />
              </CCardHeader>
              <CCardBody style={{ overflow: 'auto' }}>
                {tasks.map((task, index) => {
                  if (task.status === 'inProgress') {
                    return (
                      <div key={task._id} className="container">
                        <div
                          onClick={() => handleModalVisibility(task)}
                          key={index}
                          className="card border border-danger shadow mb-3"
                          style={{ maxWidth: '400px' }}
                        >
                          <div className="card-header">
                            <strong>Task-{index}</strong>
                          </div>
                          <div className="card-body">
                            <strong className="text-danger">{task.taskName}</strong>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div className="text-muted">
                                <CIcon icon={cilCalendar} className="mr-1" />
                                {task.targetDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={12} md={4}>
            <CCard className=" mb-3" style={{ height: '400px' }}>
              <CCardHeader
                className="text-light"
                style={{
                  backgroundColor: '#1ca1c1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                Completed
              </CCardHeader>
              <CCardBody style={{ overflow: 'auto' }}>
                {tasks.map((task, index) => {
                  if (task.status === 'completed') {
                    return (
                      <div className="container">
                        <div
                          onClick={() => handleModalVisibility(task)}
                          key={index}
                          className="card border border-warning shadow mb-3"
                          style={{ maxWidth: '400px' }}
                        >
                          <div className="card-header">
                            <strong>{task.taskName}</strong>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div className="text-muted">
                                <CIcon icon={cilCalendar} className="mr-1" />
                                {task.targetDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={12} md={4}>
            <CCard className="mb-3" style={{ height: '400px' }}>
              <CCardHeader
                className="text-light"
                style={{
                  backgroundColor: '#1ca1c1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                Valid
              </CCardHeader>
              <CCardBody style={{ overflow: 'auto' }}>
                {tasks.map((task, index) => {
                  if (task.status === 'valid') {
                    return (
                      <div className="container">
                        <div
                          onClick={() => handleModalVisibility(task)}
                          key={index}
                          className="card border border-success shadow mb-3"
                          style={{ maxWidth: '400px' }}
                        >
                          <div className="card-header">
                            <strong>{task.taskName}</strong>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div className="text-muted">
                                <CIcon icon={cilCalendar} className="mr-1" />
                                {task.targetDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Recent Tasks</CCardHeader>
              <CCardBody>
                <CTable striped responsive className="text-center">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Target Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Task Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">View</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTasks.map((task, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{task.targetDate}</CTableDataCell>
                        <CTableDataCell>{task.taskName}</CTableDataCell>
                        <CTableDataCell>
                          {task.status === 'inProgress' ? (
                            <span className="badge text-bg-danger">{task.status}</span>
                          ) : task.status === 'completed' ? (
                            <span className="badge text-bg-warning">{task.status}</span>
                          ) : task.status === 'valid' ? (
                            <span className="badge text-bg-success">{task.status}</span>
                          ) : null}
                        </CTableDataCell>
                        <CTableDataCell>
                          <HiMagnifyingGlassCircle
                            role="button"
                            style={{ fontSize: '25px', color: '#4CAF50' }}
                            onClick={() => handleViewTask(task)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CPagination pages={totalPages} align="center">
                  <CPaginationItem
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                    aria-label="Previous"
                  >
                    Previous
                  </CPaginationItem>
                  <CPaginationItem
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                    aria-label="Next"
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Task Progress</CCardHeader>
              <CCardBody>
                <CChart
                  type="bar"
                  data={{
                    labels: ['Total Tasks', 'In Progress', 'Completed', 'Valid'],
                    datasets: [
                      {
                        label: 'Task Progress',
                        backgroundColor: ['#1ca1c1', '#8664c6', '#fcbf1e', '#5ac18e'],
                        data: [
                          tasks.length,

                          getProgressTasks(),
                          getCompletedTasks(),
                          getValidTasks(),
                        ],
                      },
                    ],
                  }}
                  labels="Stauts"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#adb7c5',
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                      y: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Activity
