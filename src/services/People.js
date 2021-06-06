const API = "https://www.mecallapi.com/api/users";
export function getPeople() {
  return fetch(API).then((res) => res.json());
}

export function createPerson(person) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  };
  return fetch(API + "/create", requestOptions).then((res) => res.json());
}

export function getPerson(id) {
  return fetch(API + "/" + id).then((res) => res.json());
}

export function updatePerson(person) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  };
  return fetch(API + "/update", requestOptions).then((res) => res.json());
}

export function deletePerson(ids) {
  let tmp = {
    id: ids,
  };
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmp),
  };
  return fetch(API + "/delete", requestOptions).then((res) => res.json());
}