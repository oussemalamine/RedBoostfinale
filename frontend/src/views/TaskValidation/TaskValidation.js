// TaskValidation.js

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
} from '@coreui/react'
import { MdDone } from 'react-icons/md'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import { MdDelete } from 'react-icons/md'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaListCheck } from 'react-icons/fa6'
import ViewModal from './ViewModal'
import {useDispatch, useSelector} from 'react-redux'
import { deleteTask, loadTasks, updateTask } from '../../app/features/task/taskSlice'
import { updateUser } from '../../app/features/users/usersSlice'
import { setUserData } from '../../app/features/userData/userData'
ChartJS.register(ArcElement, Tooltip, Legend)
const TaskValidation = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(loadTasks())
     console.log("render")
  },[])
  const users = useSelector((state)=>state.usersSlice.users)
  console.log("users",users)
  const tasks = useSelector((state)=>state.task.allTasks)
  const currentUser = useSelector((state)=>state.userData.userData)
  console.log("tasks :",tasks)
  const handleViewTask = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleTaskDone = (task) => { 
    const user = users.find((user) => user._id === task.taskOwner)
    console.log("user",user)
   dispatch(updateTask({taskId:task._id,taskData:{...task,status:"valid"}}))
   dispatch(updateUser({userId:task.taskOwner,userData:{exp:task.xpPoints+Number(user.exp)}}))
   task.taskOwner === currentUser._id && dispatch(setUserData({...currentUser,exp:task.xpPoints+Number(currentUser.exp)}))
  }
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
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
  const getPendingTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'inProgress') {
        nb++
      }
    })
    return nb
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
  const getCanceledTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'cancelled') {
        nb++
      }
    })
    return nb
  }
  const getExpiredTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'expired') {
        nb++
      }
    })
    return nb
  }

  const chartData = {
    labels: ['valid', 'inProgress', 'completed', 'cancelled', 'expired'],
    datasets: [
      {
        label: 'Tasks',
        data: [getValidTasks(), getPendingTasks(), getCompletedTasks(),getCanceledTasks(),getExpiredTasks()], // Example data: 2 done, 8 pending
        backgroundColor: ['#28a745', '#FFEA61', 'blue','gray','tomato'], // Colors for done and pending tasks
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

  const getBadgeColor = (priority) => {
    if (priority === 'High') {
      return 'bg-danger'
    } else if (priority === 'Medium') {
      return 'bg-warning'
    } else {
      return 'bg-success'
    }
  }
  const getStatusColor = (status) => {
    if (status === 'inProgress') {
      return 'bg-warning'
    } else if (status === 'expired') {
      return 'bg-danger'
    } else if(status === 'valid'){
      return 'bg-success'
    }else if (status === 'cancelled'){
      return 'bg-secondary'
    }else{
      return 'bg-info'
    }
  }
  const filteredTasks = tasks.filter((task) => {
    const searchTermLowerCase = searchTerm.toLowerCase()
    return (
      task.taskName.toLowerCase().includes(searchTermLowerCase) ||
      task.taskOwner.toLowerCase().includes(searchTermLowerCase) ||
      task.status.toLowerCase().includes(searchTermLowerCase) ||
      task.xpPoints.toString().includes(searchTermLowerCase) || // Convert xpPoints to string for search
      task.targetDate.includes(searchTermLowerCase)
    )
  })
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {selectedTask && (
        <ViewModal showModal={showModal} setShowModal={setShowModal} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
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
          <CTable responsive>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Team Member</CTableDataCell>
                <CTableDataCell>Task</CTableDataCell>
                <CTableDataCell>Status</CTableDataCell>
                <CTableDataCell>Points</CTableDataCell>
                <CTableDataCell>releaseDate</CTableDataCell>
                <CTableDataCell>Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredTasks.map((task, index) =>{
                  const user = users.find((user) => user._id === task.taskOwner)
                  console.log("user",user)
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
                    <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>
                  </CTableDataCell>
                  <CTableDataCell style={{ alignContent: 'center' }}>
                    {task.xpPoints}XP
                  </CTableDataCell>
                  <CTableDataCell style={{ alignContent: 'center' }}>
                    {new Date(task.targetDate).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell style={{ alignContent: 'center' }}>
                    {task.status !== 'Complete' ? (
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

                    <HiMagnifyingGlassCircle
                      onClick={() => handleViewTask(task)}
                      style={{
                        color: 'blue',
                        fontSize: '25px',
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    />
                    <MdDelete
                      onClick={() => handleDelete(task._id)}
                      style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                    />
                  </CTableDataCell>
                </CTableRow>
              )})}
            </CTableBody>
          </CTable>
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
