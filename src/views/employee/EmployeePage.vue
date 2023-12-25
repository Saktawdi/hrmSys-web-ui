<template>
  <page-container title="档案管理">
    <div v-loading="loading" class="dashboard-container">
      <div class="app-container">
        <el-card>
        </el-card>
        <el-table :data="employees" style="width: 100%">
          <el-table-column prop="eid" label="档案编号" />
          <el-table-column prop="ename" label="姓名" width="120" />
          <el-table-column prop="egender" label="性别" width="120" />
          <el-table-column prop="el2InstID" label="一级机构" width="150" />
          <el-table-column prop="el1InstID" label="二级机构" width="150" />
          <el-table-column prop="el1InstID" label="三级机构" width="150" />
          <el-table-column prop="epositionName" label="职位名称" width="140" />
          <el-table-column prop="estatus" label="状态">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.estatus)">{{ getStatusText(scope.row.estatus) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="check" label="操作">
            <template #default="scope">
              <el-button type="success" plain @click="reviewEmployee(scope.row)">详细</el-button>
              <el-button type="danger" plain @click="deleteEmployee(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </page-container>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <span>你确定要删除吗？这将使该档案变为"已删除”状态</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import * as employeeApi from "../../api/employee"

export default {
  data() {
    return {
      employees: [],
      dialogVisible: false,
      currentEmployee: [],
    }
  },
  mounted() {
    this.fetchAllEmployees();
  },
  methods: {
    reviewEmployee(form) {
      this.$router.push({
        path: "/employee/info",
        query: {
          formData: JSON.stringify(form),
          functionKey: "update",
          pathKey:"/employee/manage"
        },
      });
    },
    async deleteConfirm() {
      await employeeApi
        .deleteEmployeeService(this.currentEmployee.eid)
        .then(() => {
          this.dialogVisible = false;
          ElMessage.success("删除成功")
          this.fetchAllEmployees();
        })
        .catch((error) => {
          this.dialogVisible = false;
          ElMessage.error("删除员工时出错:", error);
        });
    },
    deleteEmployee(employee) {
      this.currentEmployee = employee;
      this.dialogVisible = true;
    },
    async fetchAllEmployees() {
      await employeeApi.getAllEmployeesService()
        .then((response) => {
          this.employees = response.data.data;
        })
        .catch((error) => {
          ElMessage.error('Error fetching all employees:', error);
        });
    },
    getTagType(estatus) {
      switch (estatus) {
        case -1:
          return "danger"; // red for "已删除"
        case 0:
          return "warning"; // yellow for "待复核"
        case 1:
          return "success"; // green for "已复核"
        default:
          return "info";
      }
    },
    getStatusText(estatus) {
      switch (estatus) {
        case -1:
          return "已删除";
        case 0:
          return "待复核";
        case 1:
          return "已复核";
        default:
          return "未知状态";
      }
    },
  },
}
</script>

<style></style>