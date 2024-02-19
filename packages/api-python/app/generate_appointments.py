import datetime
import random
import json

def generate_appointments(start_date, days=7, appointments_per_day=3):
    appointments = []
    for day in range(days):
        date = start_date + datetime.timedelta(days=day)
        for _ in range(appointments_per_day):
            hour = random.randint(9, 16)
            minute = random.choice([0, 30])
            appointment_time = datetime.datetime(date.year, date.month, date.day, hour, minute)
            appointments.append(
                {
                    "appointment_date": appointment_time.isoformat() + "Z",
                    "duration": 30,
                    "title": "Checkup",
                    "patient_name": f"Patient {len(appointments) + 1}",
                }
            )

    file_path = "appointments.json"
    with open(file_path, 'r') as file:
        data = json.load(file)
    with open(file_path, "w") as file:
        json.dump(appointments, file, indent=4)

    appointments = data + appointments
    return appointments
