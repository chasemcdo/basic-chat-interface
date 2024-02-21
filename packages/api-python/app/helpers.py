from datetime import datetime
import json

file_name = "./app/appointments.json"

def getAppointmentsData():
    with open(file_name, 'r') as json_file:
        my_list = json.load(json_file)
    return my_list

def storeAppointmentsData(data):
    # Jsonify the data list and store it in the appointments.json file
    with open(file_name, 'w') as json_file:
        json.dump(data, json_file)

def check_availability(month: int, day: int, hour: int, year: int = 2024):
    """If the user specifies that they want to book an appointment and has provided a date, check if the appointment is available.

    Args:
        month: Month of the appointment
        day: Day of the appointment
        hour: Hour of the appointment
        year: Year of the appointment
    """
    appointment_time = datetime(year, month, day, hour)
    # Check if the appointment is in the past
    if appointment_time < datetime.now():
        return "Please provide a date in the future"
    appointment_data = getAppointmentsData()
    # Check if the appointment exists in the appointments.json file or the thirty minutes following it
    if appointment_time.isoformat() in [appointment for appointment in appointment_data]:
        return "The appointment slot is not available please provide a new timeslot."
    else:
        appointment_data.append(appointment_time.isoformat())
        storeAppointmentsData(appointment_data) 
        return "The appointment slot is available and has been scheduled."
