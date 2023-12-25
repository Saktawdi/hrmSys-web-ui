<template>
    <div>
      <el-card>
        <el-button type="primary" @click="addEmployee">Add Employee</el-button>
      </el-card>
  
      <el-table :data="employees" style="width: 100%">
        <el-table-column prop="eid" label="Employee ID"></el-table-column>
        <el-table-column prop="ename" label="Name"></el-table-column>
        <el-table-column prop="egender" label="Gender"></el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="primary" @click="editEmployee(scope.row)">Edit</el-button>
            <el-button type="danger" @click="deleteEmployee(scope.row.eid)">Delete</el-button>
            <el-button @click="viewEmployee(scope.row.eid)">View Details</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog v-model="dialogVisible" :title="dialogTitle">
        <el-form :model="currentEmployee" :rules="employeeRules" ref="employeeForm" label-width="80px">
          <!-- Add more fields based on the Employee model -->
          <el-form-item label="Name" prop="ename">
            <el-input v-model="currentEmployee.ename"></el-input>
          </el-form-item>
          <el-form-item label="Gender" prop="egender">
            <el-radio-group v-model="currentEmployee.egender">
              <el-radio label="Male">Male</el-radio>
              <el-radio label="Female">Female</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEmployee">Save</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import * as employeeApi from "../../api/employee";
  
  export default {
    data() {
      return {
        employees: [],
        dialogVisible: false,
        dialogTitle: "",
        currentEmployee: {},
        employeeRules: {
          ename: [{ required: true, message: 'Name is required', trigger: 'blur' }],
          egender: [{ required: true, message: 'Gender is required', trigger: 'change' }],
          // Add more validation rules based on the Employee model
        },
      };
    },
    methods: {
      getAllEmployees() {
        employeeApi.getEmployeeListService().then((response) => {
          this.employees = response.data.data;
        }).catch((error) => {
          console.error('Error fetching employees:', error);
        });
      },
      addEmployee() {
        this.currentEmployee = {};
        this.dialogTitle = "Add Employee";
        this.dialogVisible = true;
      },
      editEmployee(employee) {
        this.currentEmployee = { ...employee };
        this.dialogTitle = "Edit Employee";
        this.dialogVisible = true;
      },
      saveEmployee() {
        this.$refs.employeeForm.validate((valid) => {
          if (valid) {
            if (this.currentEmployee.eid) {
              employeeApi.editEmployeeService(this.currentEmployee).then(() => {
                this.$message.success('Employee updated successfully');
                this.getAllEmployees();
                this.dialogVisible = false;
              }).catch((error) => {
                console.error('Error updating employee:', error);
              });
            } else {
              employeeApi.addEmployeeService(this.currentEmployee).then(() => {
                this.$message.success('Employee added successfully');
                this.getAllEmployees();
                this.dialogVisible = false;
              }).catch((error) => {
                console.error('Error adding employee:', error);
              });
            }
          } else {
            this.$message.error('Validation failed');
          }
        });
      },
      deleteEmployee(eID) {
        employeeApi.removeEmployeeService(eID).then(() => {
          this.$message.success('Employee deleted successfully');
          this.getAllEmployees();
        }).catch((error) => {
          console.error('Error deleting employee:', error);
        });
      },
      viewEmployee(eID) {
        // Implement code to navigate to the employee details page
        // You can use router.push('/employee-details/' + eID) or similar
      },
    },
    mounted() {
      this.getAllEmployees();
    },
  };
  </script>
  
  <style>
  /* Add custom styles as needed */
  </style>
  