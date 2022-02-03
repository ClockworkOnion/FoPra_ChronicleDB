import datetime, json, pytz
from dateutil import parser


from usermanagement import JSONread

TESTSTRING2 = '{"requestType":"Stream Info","startDate":"2022-02-01T17:26:43.192Z","interval":{"value":60,"text":"60s"},"config":{"data":{"streamId":0,"disableCreateJob":true},"maxHeight":"900px"}}'
TESTSTRING = '{"requestType":"Stream Info","startDate":"2022-02-02T11:56:22.359Z","nextRun":"2022-02-03T11:56:22.359Z","interval":{"value":86400,"text":"1 Day"},"config":{"data":{"streamId":0,"disableCreateJob":true},"maxHeight":"900px"}}'
USERFILE = "users.dat"


def appendToLog(user_id, data):
    with open((str(user_id)+".log"), "a") as outfile:
        outfile.write("\n**** Entry created: " + str(datetime.datetime.now()) + " ***\n" )
        outfile.write(data)

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
            next_run_date = parser.parse(job["nextRun"])
            next_run_date = next_run_date + datetime.timedelta(seconds=seconds_to_add)
            # job["nextRun"] = str(next_run_date)
            job["nextRun"] = next_run_date.strftime('%Y-%m-%dT%H:%M:%S.000Z')
            print("Found job with nextRun " + str(job_data["nextRun"]) + ", added " + str(seconds_to_add) + " seconds. New nextRun: " + str(job["nextRun"]))
    writeUserFile(user_data)

def currentTimeLocalized():
    now = datetime.datetime.now()
    utc = pytz.UTC
    now = utc.localize(now)
    return now

def JobIsDue(job):
    dueDate = parser.parse(job["nextRun"])
    return dueDate < currentTimeLocalized()

def getAllDueJobs():
    job_list = []
    user_data = JSONread(USERFILE)
    for user in user_data["users"]:
        if "jobs" in user.keys():
            for job in user["jobs"]:
                if JobIsDue(job):
                    job_list.append(job)
    return job_list

def getUserDueJobs(user_id):
    job_list = []
    user_data = JSONread(USERFILE)
    u = getUserById(user_id)
    if "jobs" in u.keys():
        for job in u["jobs"]:
            if JobIsDue(job):
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

    test_job_data = json.loads(TESTSTRING)
    # clearUserJobs("hans")
    addScheduledJob("User", test_job_data)
    print("Due Jobs")
    print(getAllDueJobs())
    addToNextRunTimestamp("User", test_job_data, 883960)
    print("Now due Jobs")
    print(getAllDueJobs())
    