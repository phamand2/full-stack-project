/* Start Function Definitions */

/**
 * Gets the HTML for a single role List Item and returns it
 * @param {object} roleData Object of role data. Expects the object to have an `id` property and a `role` property
 * @returns {string} The HTML string for that role list item
 */
function getRoleHtml(roleData) {
  const html = `
      <li class="role-item js-role-item" data-id="${roleData.id}">
        <div class="role-form">
        <p>Role: ${roleData.role}</p>
        <p>Name: ${roleData.name}</p>
        <p>Email: ${roleData.email}</p>
        <p>Phone: ${roleData.phone}</p>
        </div>
        </li>
        `;
        // <button class="role-button delete js-delete-button" data-id="${roleData.id}" type="button">X</button>
        // <input class="check-button" type="checkbox" ${roleData.complete ? 'checked': ''} data-id="${roleData.id}">
  
  return html;
}


  function checkRole(id) {

    
    axios
      .patch(`/api/roles/${id}/check`
      )
      
      .then((response) => {
        
        renderRoles()
      })
      
      .catch((error) => {
        
        const errorText = error.response.data.error || error;

        alert('could not update role:' + errorText);
      });
  }
  
/**
 * Get the role Data from the API and export. Displays an alert if there is an error.
 */
function renderRoles() {
  axios
    .get('/roles')
    
    .then((response) => {
      
      const htmlArray = response.data.map((roleItem) => {
        
        return getRoleHtml(roleItem);
      });
      
      const htmlString = htmlArray.join('');
      
      const roles = document.querySelector('#roles');
      
      roles.innerHTML = htmlString;
    })
    
    .catch((error) => {
      
      const errorText = error.response.data.error || error;
      
      alert('could not get roles: ' + error.response.data.error);
    });
}

/**
 * Add a role via the API and then adds it to the page. Displays an alert if there is an error in the request.
 * @param {string} text The name of the role that you wish to create
 */
function addrole(text) {
  axios
    .post('/roles', {
      role: text,
    })
   
    .then((response) => {
      
      const htmlString = getRoleHtml(response.data);
      
      const roles = document.querySelector('#roles');
      
      roles.innerHTML += htmlString;
    })
    .catch((error) => {

      const errorText = error.response.data.error || error;

      alert('could not add role:' + errorText);
    });
}

/**
 * Delete a role with the given ID and update the roles on the page. Displays an alert if there is an error in the request.
 * @param {integer} id the id of the role item that should be deleted
 */
function deleterole(id) {
  axios
    .delete(`/roles/${id}`)
    .then((response) => {
      renderroles()
    })
    .catch((error) => {

      const errorText = error.response.data.error || error;

      alert('could not add role:' + errorText);
    });
}

/**
 * Update the role with the given ID. Text will be updated based on the input matching the id. Displays an alert if there is an error in the request.
 * @param {integer} id The ID of the role to be updated.
 */
function updaterole(id) {
  const roleField = document.querySelector(`.js-role-item-${id}`);
  axios
    .put(`/roles/${id}`, {
      name: roleField.value,
    })
    .then((response) => {
      roleField.value = response.data.name;
    })
    .catch((error) => {
      const errorText = error.response.data.error || error;
      alert('could not update role:' + errorText);
    });
}

/* Start Execution */

const addForm = document.querySelector('.js-add-form');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.querySelector('.js-input').value;
  addRole(text);
  addForm.reset();
});
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-delete-button')) {
    const id = e.target.dataset.id;
    deleterole(id);
  }

  if (e.target.classList.contains('check-button')) {
    const id = e.target.dataset.id;
    checkRole(id);
  }
});

renderRoles();