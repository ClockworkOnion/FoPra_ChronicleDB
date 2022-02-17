import datetime, json, pytz, os
from dateutil import parser
from sqlalchemy import JSON


from usermanagement import JSONread

TESTSTRING2 = '{"requestType":"Stream Info","startDate":"2022-02-01T17:26:43.192Z","interval":{"value":60,"text":"60s"},"config":{"data":{"streamId":0,"disableCreateJob":true},"maxHeight":"900px"}}'
TESTSTRING = '{"requestType":"Stream Info","startDate":"2022-02-02T11:56:22.359Z","nextRun":"2022-02-03T11:56:22.359Z","interval":{"value":86400,"text":"1 Day"},"config":{"data":{"streamId":0,"disableCreateJob":true},"maxHeight":"900px"}}'
USERFILE = "users.dat"

def get_user_log(user_id):
    contents = ""
    filename = str(user_id)+".log"
    if not os.path.isfile(filename):
        print("File " + filename + " didn't exist. Creating new logfile...")
        make_empty_log(filename)
    with open(filename, "r") as log:
        contents = contents + log.read()
    return contents

def appendToLog(user_id, new_data):
    filename = str(user_id)+".log"
    if not os.path.isfile(filename):
        print("File " + filename + " didn't exist. Creating new logfile...")
        make_empty_log(filename)
    
    with open(filename, "r+") as json_file:
        data = json.loads(json_file.read())
        print("DAta up to now:::")
        print(data["logs"])
        json_file.seek(0)
        data["logs"].append(new_data)
        json.dump(data, json_file)
        json_file.truncate()

def make_empty_log(filename):
    with open(filename, "w") as log:
        contents = {"logs" : []}
        json.dump(contents, log)
        log.flush()

def clearLog(user_id):
    with open((str(user_id)+".log"), "w") as outfile:
        outfile.write("Log for user: " + str(user_id)+ "\n")

def getUserById(user_id, user_data):
    for u in user_data["users"]:
        if (u["username"] == user_id):
            return u

def writeUserFile(data):
    with open("users.dat", "w") as outfile:
        json.dump(data, outfile)

def addScheduledJob(user_id, job_data):
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    print("\nAdding a new job to user " + str(user_id))
    if not "jobs" in u.keys():
        print("No jobs existing, creating empty job list")
        u["jobs"] = []
    u["jobs"].append(job_data)
    print("User data AFTER appending:")
    print(u)

    with open("users.dat", "w")as outfile:
        json.dump(user_data, outfile)

def clearUserJobs(user_id):
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    u["jobs"] = []
    writeUserFile(user_data)

def deleteJob(user_id, job_data):
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    jobs = u["jobs"]
    foundIndex = -1
    for index, job in enumerate(jobs):
        if job["startDate"] == job_data["startDate"]:
            print("\nFound job with startDate " + job_data["startDate"] + " at index " + str(index))
            foundIndex = index
    if foundIndex != -1:
        del jobs[foundIndex]
    print("Removed job:\t" + str(job_data) + "\nJobs left for user " + user_id + ":\t" + str(jobs))

def addToNextRunTimestamp(user_id, job_data, seconds_to_add):
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    jobs = u["jobs"]
    for job in jobs:
        if job["nextRun"] == job_data["nextRun"]:
            # next_run_date = parser.parse(job["nextRun"])
            next_run_date = currentTimeLocalized() + datetime.timedelta(seconds=seconds_to_add)
            # job["nextRun"] = str(next_run_date)
            # job["nextRun"] = next_run_date.strftime('%Y-%m-%dT%H:%M:%S.000Z')
            job["nextRun"] = JSON_date_from_datetime(next_run_date)
            print("Found job with nextRun " + str(job_data["nextRun"]) + ", added " + str(seconds_to_add) + " seconds. New nextRun: " + str(job["nextRun"]))
    writeUserFile(user_data)

def date_time_from_JSON_date(JSON_date):
    date = datetime.datetime(JSON_date["year"], JSON_date["month"], JSON_date["day"], JSON_date["hours"], JSON_date["minutes"], JSON_date["seconds"])
    date = pytz.UTC.localize(date)
    return date

def JSON_date_from_datetime(date : datetime.datetime):
    newdate = {}
    newdate["year"] = date.year
    newdate["month"] = date.month
    newdate["day"] = date.day
    newdate["hours"] = date.hour
    newdate["minutes"] = date.minute
    newdate["seconds"] = date.second
    return newdate
    
def interpret_time(time):
    timestamp = datetime.datetime()
    timestamp.hour = time["hour"]

    return timestamp

def JSON_from_datetime(timestamp):
    return ""

def currentTimeLocalized():
    now = datetime.datetime.now()
    utc = pytz.UTC
    now = utc.localize(now)
    return now

def JobIsDue(job):
    dueDate = job["nextRun"]
    date_now = currentTimeLocalized()
    due_datetime = datetime.datetime(dueDate["year"], dueDate["month"], dueDate["day"], dueDate["hours"], dueDate["minutes"], dueDate["seconds"])
    due_datetime = pytz.UTC.localize(due_datetime)
    print("[TIME NOW]: " + str(date_now) + " [NEXT RUN]: " + str(due_datetime) + " [IS DUE?]: " + str(date_now >= due_datetime))
    return date_now >= due_datetime

def getAllDueJobs():
    job_list = []
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if "jobs" in user.keys():
            for job in user["jobs"]:
                if JobIsDue(job):
                    job_list.append({"username" : user["username"], "job" : job})
    return job_list

def getUserDueJobs(user_id):
    job_list = []
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    if "jobs" in u.keys():
        for job in u["jobs"]:
            if JobIsDue(job):
                job_list.append(job)
    return job_list

def getAllUserJobs(user_id):
    job_list = []
    user_data = JSONread(USERFILE)
    u = getUserById(user_id, user_data)
    if "jobs" in u.keys():
        for job in u["jobs"]:
            job_list.append(job)
    return job_list
    
def dateTesting():
    now = datetime.datetime.now()
    print("Nows")
    print(now.day)
    print(now)
    one_week = datetime.timedelta(weeks=1)
    future = now + one_week
    print(future)
    print(test_job_data["startDate"])
    date = parser.parse(test_job_data["startDate"])
    now = datetime.datetime.now()
    print(date)
    utc = pytz.UTC
    now = utc.localize(now)
    print(date < now)
    print(date > now)
    print(JobIsDue(test_job_data))

    # Setting the next run to a future date
    nextRun = parser.parse(test_job_data["startDate"])
    nextRun = nextRun + datetime.timedelta(seconds=60)
    test_job_data["nextRun"] = str(nextRun)
    print(test_job_data)

def add_delete_testing():
    addScheduledJob("User", test_job_data)
    deleteJob("User", test_job_data)
    clearUserJobs("User")

if __name__ == "__main__":
    print("Running userlogs.py as main...")

    # test_job_data = json.loads(TESTSTRING)
    # clearUserJobs("hans")
    # addScheduledJob("User", test_job_data)
    # print("Due Jobs")
    # print(getAllDueJobs())
    # addToNextRunTimestamp("User", test_job_data, 883960)
    # print("Now due Jobs")
    # print(getAllDueJobs())
    print(get_user_log("Admin"))
    