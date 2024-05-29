import React, { useEffect, useState } from 'react'
import userImg from '../../components/Images/user.png'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CFormInput,
  CTabs,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
} from '@coreui/react'
import { MdDone } from 'react-icons/md'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import { MdDelete } from 'react-icons/md'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaListCheck } from 'react-icons/fa6'
import ViewModal from './ViewModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, loadTasks, updateTask } from '../../app/features/task/taskSlice'
import { updateUser } from '../../app/features/users/usersSlice'
import { setUserData } from '../../app/features/userData/userData'
import { loadTasksByActivityId } from '../../app/features/task/taskSlice'
ChartJS.register(ArcElement, Tooltip, Legend)

const TaskTable = ({
  allTasks,
  activities,
  users,
  handleDelete,
  handleTaskDone,
  handleViewTask,
}) => {
  const [programTasks, setProgramTasks] = useState([])

  const fetchProgramTasks = () => {
    activities.forEach((activity) => {
      const tasks = allTasks.filter((task) => task.activityId === activity)
      setProgramTasks([...programTasks, ...tasks])
    })
  }
  useEffect(() => {
    fetchProgramTasks()
  }, [])
  console.log('programTasks', programTasks)
  return (
    <CTable responsive>
      <CTableHead>
        <CTableRow>
          <CTableDataCell>Team Member</CTableDataCell>
          <CTableDataCell>Task</CTableDataCell>
          <CTableDataCell>Status</CTableDataCell>
          <CTableDataCell>Points</CTableDataCell>
          <CTableDataCell>Target Date</CTableDataCell>
          <CTableDataCell>Activity</CTableDataCell>
          <CTableDataCell>Actions</CTableDataCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {programTasks.map((task, index) => {
          const user = users.find((user) => user._id === task.taskOwner)
          console.log('user', user)
          return (
            <CTableRow key={index}>
              <CTableDataCell>
                <img
                  src={user?.image ? user.image : userImg}
                  alt="avatar 1"
                  style={{ width: '45px', height: 'auto' }}
                />
                <span className="ms-2">{user?.username}</span>
              </CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>{task.taskName}</CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>
                <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>
              </CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>{task.xpPoints}XP</CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>
                {new Date(task.endDate).toLocaleDateString()}
              </CTableDataCell>
              <CTableDataCell>activityName</CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>
                {task.status === 'completed' && task.xpPoints > 0 ? (
                  <MdDone
                    onClick={() => handleTaskDone(task)}
                    style={{
                      color: 'green',
                      fontSize: '25px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  />
                ) : null}

                {task.status !== 'valid' && (
                  <HiMagnifyingGlassCircle
                    onClick={() => handleViewTask(task)}
                    style={{
                      color: 'blue',
                      fontSize: '25px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  />
                )}
                <MdDelete
                  onClick={() => handleDelete(task._id)}
                  style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                />
              </CTableDataCell>
            </CTableRow>
          )
        })}
      </CTableBody>
    </CTable>
  )
}

const TaskValidation = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersSlice.users)
  console.log('users', users)
  const tasks = useSelector((state) => state.task.allTasks)
  const programs = useSelector((state) => state.programsSlice.programs)
  const filterTasks = tasks.filter((task) => {
    return task.status === 'completed' || task.status === 'valid' || task.status == 'cancelled'
  })
  console.log('filterTasks', filterTasks)
  const currentUser = useSelector((state) => state.userData.userData)
  console.log('tasks :', tasks)
  const handleViewTask = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleTaskDone = (task) => {
    const user = users.find((user) => user._id === task.taskOwner)
    console.log('user', user)
    dispatch(updateTask({ taskId: task._id, taskData: { ...task, status: 'valid' } }))
    dispatch(
      updateUser({ userId: task.taskOwner, userData: { exp: task.xpPoints + Number(user.exp) } }),
    )
    task.taskOwner === currentUser._id &&
      dispatch(setUserData({ ...currentUser, exp: task.xpPoints + Number(currentUser.exp) }))
  }
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
  }
  const getCompletedTasks = () => {
    let nb = 0
    filterTasks.map((task) => {
      if (task.status === 'completed') {
        nb++
      }
    })
    return nb
  }

  const getCanceledTasks = () => {
    let nb = 0
    filterTasks.map((task) => {
      if (task.status === 'cancelled') {
        nb++
      }
    })
    return nb
  }

  const getValidTasks = () => {
    let nb = 0
    filterTasks.map((task) => {
      if (task.status === 'valid') {
        nb++
      }
    })
    return nb
  }

  const chartData = {
    labels: ['valid', 'completed', 'cancelled'],
    datasets: [
      {
        label: 'Tasks',
        data: [getValidTasks(), getCompletedTasks(), getCanceledTasks()],
        backgroundColor: ['#28a745', 'blue', 'gray'],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const filteredTasks = filterTasks.filter((task) => {
    const searchTermLowerCase = searchTerm.toLowerCase()
    return (
      task.taskName.toLowerCase().includes(searchTermLowerCase) ||
      task.taskOwner.toLowerCase().includes(searchTermLowerCase) ||
      task.status.toLowerCase().includes(searchTermLowerCase)
    )
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {selectedTask && (
        <ViewModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
      <CCard>
        <CCardHeader
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            <FaListCheck style={{ marginRight: '10px' }} />
            Task List
          </h2>
          <CFormInput
            type="text"
            placeholder="Search Task"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: '10px', width: '300px' }}
          />
        </CCardHeader>
        <CCardBody style={{ maxHeight: '500px', overflow: 'auto' }}>
          <CTabs activeItemKey="all">
            <CTabList variant="tabs">
              <CTab itemKey="all">All</CTab>
              {programs.map((program) => (
                <CTab itemKey={program._id}>{program.programTitle}</CTab>
              ))}
            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="all">
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableDataCell>Team Member</CTableDataCell>
                      <CTableDataCell>Task</CTableDataCell>
                      <CTableDataCell>Status</CTableDataCell>
                      <CTableDataCell>Points</CTableDataCell>
                      <CTableDataCell>Target Date</CTableDataCell>
                      <CTableDataCell>Actions</CTableDataCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredTasks.map((task, index) => {
                      const user = users.find((user) => user._id === task.taskOwner)
                      console.log('user', user)
                      return (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <img
                              src={user?.image ? user.image : userImg}
                              alt="avatar 1"
                              style={{ width: '45px', height: 'auto' }}
                            />
                            <span className="ms-2">{user?.username}</span>
                          </CTableDataCell>
                          <CTableDataCell style={{ alignContent: 'center' }}>
                            {task.taskName}
                          </CTableDataCell>
                          <CTableDataCell style={{ alignContent: 'center' }}>
                            <span className={`badge ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </CTableDataCell>
                          <CTableDataCell style={{ alignContent: 'center' }}>
                            {task.xpPoints}XP
                          </CTableDataCell>
                          <CTableDataCell style={{ alignContent: 'center' }}>
                            {new Date(task.endDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell style={{ alignContent: 'center' }}>
                            {task.status === 'completed' && task.xpPoints > 0 ? (
                              <MdDone
                                onClick={() => handleTaskDone(task)}
                                style={{
                                  color: 'green',
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  marginRight: '10px',
                                }}
                              />
                            ) : null}

                            {task.status !== 'valid' && (
                              <HiMagnifyingGlassCircle
                                onClick={() => handleViewTask(task)}
                                style={{
                                  color: 'blue',
                                  fontSize: '25px',
                                  cursor: 'pointer',
                                  marginRight: '10px',
                                }}
                              />
                            )}
                            <MdDelete
                              onClick={() => handleDelete(task._id)}
                              style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </CTabPanel>
              {programs.map((program) => (
                <CTabPanel className="p-3" key={program._id} itemKey={program._id}>
                  <TaskTable
                    allTasks={filteredTasks}
                    activities={program.activities}
                    users={users}
                    handleDelete={handleDelete}
                    handleViewTask={handleViewTask}
                    handleTaskDone={handleTaskDone}
                  />
                </CTabPanel>
              ))}
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody style={{ maxHeight: '400px', padding: '10px' }}>
          <Doughnut style={{ margin: '0 auto' }} data={chartData} options={chartOptions} />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TaskValidation

const getStatusColor = (status) => {
  if (status === 'inProgress') {
    return 'bg-warning'
  } else if (status === 'expired') {
    return 'bg-danger'
  } else if (status === 'valid') {
    return 'bg-success'
  } else if (status === 'cancelled') {
    return 'bg-secondary'
  } else {
    return 'bg-info'
  }
}
