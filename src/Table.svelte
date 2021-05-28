<script>
	async function getPeople() {
		const res = await fetch('https://www.mecallapi.com/api/users');
		const json = await res.json()
		if (res) {
			console.log(json);
			return json
		} else {
			throw new Error(text);
		}
	}
	let promise = getPeople();
</script>


{#await promise}
	<p>...waiting</p>
{:then people}
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
	  <tr>
		<th scope="row">{ person.id }</th>
		<td>{ person.fname } { person.lname }</td>
		<td>{ person.username }</td>
		<td>
		  <img src={person.avatar} alt="avatar" style="width: 30px">
		</td>
	  </tr>
	  {/each}
	</tbody>
  </table>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}