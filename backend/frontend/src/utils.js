export const API_HOST = "http://localhost:8080";  // http://localhost:8080 | https://mutti.eu.pythonanywhere.com

const TOKEN_HEADERS = {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA1NDg3NjgsImlhdCI6MTcxMDE4MDc2OCwiZGF0YSI6eyJ1c2VySWQiOiI2NWVmNDRjODNiNDIzN2RmMjQ4NjM3MDYiLCJlbWFpbCI6ImdhYnJpZWxlLmFyY3VyaUBpdGlzcGFsZW9jYXBhLml0IiwicGVybWlzc2lvbkxldmVsIjoxOH19.3k-n_jA559Xsbp5gDjXzw87MP6U07srQLAyt8y-v-7M'
  }
};

export async function fetchUserInfo() {
  const res = await fetch(
    `${API_HOST}/user-info`,
    { credentials: "include" }
  );
  if (!res.ok) {
    return null;
  }
  const userInfo = await res.json();
  if (
    userInfo.email === "gabriele.arcuri@itispaleocapa.it" ||
    userInfo.email === "muttoni.samuele.studente@itispaleocapa.it"
  ) {
    userInfo.isPaleocapa = true;
    userInfo.type = "rspp";
    return userInfo;
  }
  userInfo.isPaleocapa = userInfo.email.endsWith("itispaleocapa.it");
  userInfo.type = userInfo.email.startsWith("rspp")
    ? "rspp"
    : (userInfo.email.match(/(?<=.*\..*\.).*(?=@)/) || [])[0] === "studente"
      ? "student"
      : "other";
  return userInfo;
}

export function filterClassroomsByBuilding(classrooms, building) {
  return classrooms.filter(
    (c) => c.Building === building
  );
}

export function filterClassroomsByFloor(classrooms, floor) {
  return classrooms.filter(
    (c) => c.Floor === floor
  );
}

export function filterClassroomsByGatheringPoint(classrooms, gatheringPoint) {
  return classrooms.filter(
    (c) => c.GatheringPoint === gatheringPoint
  );
}

export function compareClassroomsFactory(sortGatheringPoints = false) {
  function compareClassrooms(a, b) {
    function calcWeight(classroom) {
      const { Name: name, GatheringPoint: gatheringPoint } = classroom;
      const gpValue = ((sortGatheringPoints && parseInt(gatheringPoint)) || 0) * 1000;
      const digits = [];
      for (const c of name) {
        const n = parseInt(c);
        if (!isNaN(n)) {
          digits.push(n);
        }
      }
      if (digits.length === 3) {
        return gpValue + digits[0] * 100 + digits[1] * 10 + digits[2];
      }
      if (digits.length == 2) {
        return gpValue + digits[0] * 100 + digits[1];
      }
      return gpValue + 999;
    }
    return calcWeight(a) - calcWeight(b);
  }
  return compareClassrooms;
}

function getWeekDayClassHour() {
  return [1, 1];
  const now = new Date();
  return [now.getDay(), now.getHours() - 7];
}

async function rawApiFetch(url, attr) {
  const res = await fetch(url, TOKEN_HEADERS);
  if (!res.ok) {
    return null;
  }
  return (await res.json())[attr];
}

export async function fetchClass(classroom) {
  const [weekDay, classHour] = getWeekDayClassHour();
  return await rawApiFetch(
    `https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${weekDay}/${classHour}/${classroom}`,
    "classe"
  );
}

export async function fetchNumOfStudents(studClass) {
  return await rawApiFetch(
    `https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/classe/${studClass}`,
    "studenti"
  );
}

export async function fetchClassroom(email) {
  const [weekDay, classHour] = getWeekDayClassHour();
  return await rawApiFetch(
    `https://sipal.itispaleocapa.it/api/proxySipal/v1/studenti/aula/${weekDay}/${classHour}/${email}`,
    "aula"
  );
}
