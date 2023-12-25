<template>
  <page-container title="档案复核">
    <div  class="dashboard-container">
      <div class="app-container">
        <el-card>

        </el-card>
        <el-table :data="employees" v-loading="loading" style="width: 100%">
          <el-table-column type="index" :index="indexMethod" prop="index" width="50"/>
          <el-table-column prop="eid" label="档案编号" />
          <el-table-column prop="ename" label="姓名" width="120" />
          <el-table-column prop="egender" label="性别" width="120" />
          <el-table-column prop="el1Name" label="一级机构" width="150">
          </el-table-column>
          <el-table-column prop="el2Name" label="二级机构" width="150">
          </el-table-column>
          <el-table-column prop="el3Name" label="三级机构" width="150">
          </el-table-column>
          <el-table-column prop="epositionName" label="职位名称" width="140"/>
          <el-table-column prop="check" label="操作">
            <template #default="scope">
              <el-button type="success" plain @click="reviewEmployee(scope.row)">复核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </page-container>
 
</template>

<script>
import * as employeeApi from "../../api/employee";
import {getInstitutionService} from "../../api/institution"

export default {
  data() {
    return {
      employees: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchEmployeeData();
  },
  methods: {
    indexMethod(index){
      return index++;
    },
    fetchInstitution(){
      this.loading = true;
      this.employees.forEach(item => {
        getInstitutionService(item.el1InstID)
        .then((response) =>{
          item.el1Name = response.data.data.iname
        })
        .catch((error)=>{
          ElMessage.error("错误:",error)
        })
        getInstitutionService(item.el2InstID)
        .then((response) =>{
          item.el2Name=response.data.data.iname
        })
        .catch((error)=>{
          ElMessage.error("错误:",error)
        })
        getInstitutionService(item.el3InstID)
        .then((response) =>{
          item.el3Name=response.data.data.iname
        })
        .catch((error)=>{
          ElMessage.error("错误:",error)
        })
      });
      this.loading = false;
    },
    async fetchEmployeeData() {
      this.loading = true;
      await employeeApi
        .getEmployeeByStatusService(0)
        .then((response) => {
          this.employees = response.data.data;
          this.fetchInstitution();
        })
        .catch((error) => {
          ElMessage.error("Error fetching employee data:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async reviewEmployee(employee) {
      const eID = employee.eid;
      await employeeApi
        .approveEmployeeByIdService(eID)
        .then((response) => {
          ElMessage.success(response.data.msg)
          this.fetchEmployeeData();
        })
        .catch((error) => {
          ElMessage.error("Error approving employee:", error);
        });
    },
  },
};
</script>


<style></style>