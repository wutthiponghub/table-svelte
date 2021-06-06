<script>
  import {
    getPeople,
    createPerson,
    getPerson,
    updatePerson,
    deletePerson,
  } from "../services/People";
  import { onMount } from "svelte";

  let people = [];
  let person = {};
  let loading = false;
  let modalView = false;

  function readAll() {
    getPeople()
      .then((result) => {
        people = result;
        loading = false;
        console.log(people);
        document.getElementById("closeButton").click();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function create(person) {
    person.avatar = "https://www.mecallapi.com/users/cat.png";
    const data = person;
    createPerson(data).then(
      (result) => {
        readAll();
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function readOne(id) {
    modalView = true;
    getPerson(id)
      .then((result) => {
        person = result.user;
        console.log(person);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function update(person) {
    const data = person;
    updatePerson(data)
      .then((result) => {
        readAll();
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deletef(id) {
    const data = id;
    deletePerson(data)
      .then((result) => {
        readAll();
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function clearForm() {
    person = {};
  }

  onMount(() => {
    loading = true;
    readAll();
  });
</script>

{#if !loading}
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Avatar</th>
      </tr>
    </thead>
    <tbody>
      {#each people as person}
        <tr
          on:click={readOne(person.id)}
          style="cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#ModalForm"
        >
          <th scope="row">{person.id}</th>
          <td>{person.fname} {person.lname}</td>
          <td>{person.username}</td>
          <td>
            <img src={person.avatar} alt="avatar" style="width: 30px" />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="text-center">
    <button
      on:click={() => {
        clearForm();
        modalView = false;
      }}
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#ModalForm"
    >
      Show Form
    </button>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="ModalForm"
    tabindex="-1"
    aria-labelledby="ModalFormLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalFormLabel">
            {#if !modalView}
              Create
            {:else}
              View
            {/if}
          </h5>
          <button
            id="closeButton"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body text-center">
          {#if modalView}
            <img src={person.avatar} alt="avatar" style="width: 50px" />
          {/if}
          <form on:submit|preventDefault={create(person)}>
            <div class="form-group">
              <label for="fname">First name</label>
              <input
                type="text"
                class="form-control"
                id="fname"
                name="fname"
                bind:value={person.fname}
                required
              />
            </div>
            <div class="form-group">
              <label for="lname">Last name</label>
              <input
                type="text"
                class="form-control"
                id="lname"
                name="lname"
                bind:value={person.lname}
                required
              />
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                bind:value={person.username}
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                bind:value={person.email}
                required
              />
            </div>
            <br />
            {#if !modalView}
              <button type="submit" class="btn btn-primary">Create</button>
            {/if}
          </form>
        </div>
        {#if modalView}
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              on:click={update(person)}
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-primary"
              on:click={deletef(person.id)}
            >
              Delete
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <p>...Loading</p>
{/if}
