import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import axiosInstance from '../../axiosInstance.js'
function AddActivity({ open, setOpen, handleAddActivity, program }) {
  const [allDay, setAllDay] = useState(false) // State to track "All Day Activity" checkbox
  const [activity, setActivity] = useState({})
  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    console.log(name, value)
    console.log(activity.startDate)
    if (name == 'endDate' && activity.startDate && value < activity.startDate) {
      alert('End Date cannot be before Start Date')
      return
    } else if (name == 'startDate' && activity.endDate && value > activity.endDate) {
      alert('Start Date cannot be after End Date')
      return
    } else if (name == 'startTime' && value < program.startTime) {
      alert('Start Time cannot be before Program Start Time')
      return
    } else if (name == 'endTime' && value > program.endTime) {
      alert('End Time cannot be after Program End Time')
      return
    }
    setActivity((prevAct) => ({
      color: '#93bb9f',
      ...prevAct,
      [name]: value,
    }))
  }
  console.log(activity)

  return (
    <>
      <CModal
        visible={open}
        onClose={() => setOpen(false)}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader onClose={() => setOpen(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add an Activity</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Activity Name"
            text="Must be 6-20 characters long."
            aria-describedby="exampleFormControlInputHelpInline"
            onChange={handleChange}
          />
          <CFormTextarea
            id="description"
            name="description"
            placeholder="Description"
            rows={3}
            text="Must be 8-20 words long."
            onChange={handleChange}
          ></CFormTextarea>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label htmlFor="allDay" className="form-check-label">
                All Day Activity:
              </label>
              <input
                type="checkbox"
                id="allDay"
                className="form-check-input"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <CFormInput
                name="color"
                type="color"
                id="exampleColorInput"
                label="Color :"
                title="Choose your color"
                onChange={handleChange}
              />
            </div>
          </div>

          {allDay ? (
            <>
              <CFormInput
                label="Start Day:"
                type="date"
                id="startDay"
                name="startDate"
                placeholder="Start Day"
                onChange={handleChange}
              />
              <CFormInput
                label="End Day:"
                type="date"
                name="endDate"
                id="endDay"
                placeholder="End Day"
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <CFormInput
                label="Start Date"
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Start Date"
                onChange={handleChange}
              />
              <CFormInput
                label="End Date"
                type="date"
                id="endDate"
                name="endDate"
                placeholder="End Date"
                onChange={handleChange}
              />
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setOpen(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleAddActivity(activity)}>
            Add
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddActivity
