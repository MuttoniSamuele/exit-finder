export const IS_RSPP = true;

export const API_HOST = "http://mutti.eu.pythonanywhere.com";

export async function fetchUserInfo() {
  const res = await fetch(
    `${API_HOST}/user-info`,
    { credentials: "include" }
  );
  if (!res.ok) {
    return null;
  }
  const userInfo = await res.json();
  userInfo.isPaleocapa = userInfo.email.endsWith("itispaleocapa.it");
  userInfo.type = userInfo.email.startsWith("rspp")
    ? "rspp"
    : (userInfo.email.match(/(?<=.*\..*\.).*(?=@)/) || [])[0] === "studente"
      ? "student"
      : "other";
  return userInfo;
}

export async function fetchClassrooms() {
  const res = await fetch("/static/classrooms.json");
  return res.ok ? await res.json() : [];
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
