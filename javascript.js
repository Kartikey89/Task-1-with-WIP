document.addEventListener("DOMContentLoaded", function () {
    const employeeForm = document.getElementById("employeeForm");
    const employeeTableBody = document.getElementById("employeeTableBody");
    let employees = [];
    let editIndex = -1;

    function renderTable() {
        employeeTableBody.innerHTML = "";
        employees.forEach((employee, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.mobile}</td>
                <td>${employee.position}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    }

    function resetForm() {
        employeeForm.reset();
        editIndex = -1;
    }

    window.editEmployee = function (index) {
        const employee = employees[index];
        document.getElementById("employeeName").value = employee.name;
        document.getElementById("employeeEmail").value = employee.email;
        document.getElementById("employeeMobile").value = employee.mobile;
        document.getElementById("employeePosition").value = employee.position;
        document.getElementById("employeeIndex").value = index;
        editIndex = index;
    };

    window.deleteEmployee = function (index) {
        if (confirm("Are you sure you want to delete this employee?")) {
            employees.splice(index, 1);
            renderTable();
        }
    };

    employeeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const employeeName = document.getElementById("employeeName").value.trim();
        const employeeEmail = document.getElementById("employeeEmail").value.trim();
        const employeeMobile = document.getElementById("employeeMobile").value.trim();
        const employeePosition = document.getElementById("employeePosition").value.trim();

        if (employeeForm.checkValidity() === false) {
            event.stopPropagation();
            employeeForm.classList.add("was-validated");
            return;
        }

        const newEmployee = {
            name: employeeName,
            email: employeeEmail,
            mobile: employeeMobile,
            position: employeePosition,
        };

        if (editIndex >= 0) {
            employees[editIndex] = newEmployee;
            editIndex = -1;
        } else {
            employees.push(newEmployee);
        }

        renderTable();
        resetForm();
        employeeForm.classList.remove("was-validated");
    });
});
