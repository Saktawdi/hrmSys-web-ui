<template>
  <page-container title="档案管理">
    <div v-loading="loading" class="dashboard-container">
      <div class="app-container">
        <el-card>
          <!-- 多条件查询操作栏 -->
          <el-form :inline="true" :model="form" :rules="queryRule" class="query-form">
            <el-row>
              <el-form-item label="I级机构" prop="el1InstID">
                <el-select v-model="form.el1InstID" placeholder="请选择" @change="chooseInstitution(1, form.el1InstID)">
                  <el-option v-for="item in institution[0]" :key="item.iid" :label="item.iname" :value="item.iid" />
                </el-select>
              </el-form-item>
              <el-form-item label="Ⅱ级机构" prop="el2InstID">
                <el-select v-model="form.el2InstID" placeholder="请先选择上级机构" @change="chooseInstitution(2, form.el2InstID)">
                  <el-option v-for="item in institution[1]" :key="item.iid" :label="item.iname" :value="item.iid" />
                </el-select>
              </el-form-item>
              <el-form-item label="Ⅲ级机构" prop="el3InstID">
                <el-select v-model="form.el3InstID" placeholder="请先选择上级机构">
                  <el-option v-for="item in institution[2]" :key="item.iid" :label="item.iname" :value="item.iid" />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="职位分类" prop="epositionCategory">
                <el-select v-model="form.epositionCategory" placeholder="请选择" @change="updatePositions">
                  <el-option v-for="(positions, category) in position" :key="category" :label="category"
                    :value="category">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称" prop="epositionName">
                <el-select v-model="form.epositionName" placeholder="请先选择分类">
                  <el-option v-for="pname in selectedPositions" :key="pname" :label="pname" :value="pname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <!-- 建档时间： -->
              <el-form-item label="建档时间">
                <!-- <el-date-picker v-model="form.filingTimeRange" type="daterange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                  :picker-options="pickerOptions"></el-date-picker> -->
                <el-col :span="8">
                  <el-input v-model="form.StartRecodDate" placeholder="YYYY-MM-DD"></el-input>
                </el-col>
                至
                <el-col :span="8">
                  <el-input v-model="form.EndRecodDate" placeholder="YYYY-MM-DD"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="resetQueryForm">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-table :data="employees" style="width: 100%">
          <el-table-column prop="eid" label="档案编号" />
          <el-table-column prop="ename" label="姓名" width="120" />
          <el-table-column prop="egender" label="性别" width="120" />
          <el-table-column prop="el1InstID" label="一级机构" width="150" />
          <el-table-column prop="el2InstID" label="二级机构" width="150" />
          <el-table-column prop="el3InstID" label="三级机构" width="150" />
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
import { ElMessage } from 'element-plus'
import * as employeeApi from "../../api/employee"
import { getInstitutionByLevelService, getInstitutionByLevelAndParentService } from "../../api/institution"
import { getPositionListService } from "../../api/position"

export default {
  data() {
    return {
      employees: [],
      dialogVisible: false,
      currentEmployee: [],
      form: {}, //查询表单
      queryRule: [],//规则
      institution: [
        [],
        [],
        []
      ],//机构列表,1,2,3级
      position: [],// 职位分类下的列表
      selectedPositions: [], // 选定的职位的数据属性
    }
  },
  mounted() {
    this.fetchAllEmployees();
    this.fetchInstitutionByLevel(1);
    this.fetchPositionList();
  },
  methods: {
    reviewEmployee(form) {
      this.$router.push({
        path: "/employee/info",
        query: {
          formData: JSON.stringify(form),
          functionKey: "update",
          pathKey: "/employee/manage"
        },
      });
    },
    resetQueryForm() {
      this.form = {}
      this.selectedPositions = []
      this.fetchAllEmployees();
    },
    handleQuery() {
      if (this.form.StartRecodDate || this.form.EndRecodDate) {
        if (!this.validateDateInput(this.form.StartRecodDate)) {
          ElMessage.error("请输入有效的开始日期（YYYY-MM-DD）");
          return;
        }
        if (!this.validateDateInput(this.form.EndRecodDate)) {
          ElMessage.error("请输入有效的结束日期（YYYY-MM-DD）");
          return;
        }
      }
      console.log("查询：",this.form)
      employeeApi.getEmployeesByConditionsService(this.form)
        .then((response) => {
          this.employees = response.data.data;
          ElMessage.success(response.data.msg)
        })
        .catch((error) => {
          ElMessage.error("错误:", error)
        })
    },
    validateDateInput(dateString) {
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      return dateRegex.test(dateString);
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
          //加载机构名称
          // this.fetchInstitution();
        })
        .catch((error) => {
          ElMessage.error('Error fetching all employees:', error);
        });
    },
    fetchInstitutionByLevel(level, pid) {
      if (level === 1) {
        getInstitutionByLevelService(level)
          .then((response) => {
            this.institution[level - 1] = response.data.data;
          })
          .catch((error) => {
            console.error(`获取级别的机构数据时出错 ${level}:`, error);
          });
      } else {
        getInstitutionByLevelAndParentService(level, pid)
          .then((response) => {
            this.institution[level - 1] = response.data.data;
          })
          .catch((error) => {
            console.error(`获取级别的机构数据时出错 ${level}:`, error);
          });
      }
    },
    chooseInstitution(level, pid) {
      if (level === 1) {
        this.form.el2InstID = ""
        this.form.el3InstID = ""
        this.institution[2] = [];
      }
      if (level === 2) {
        this.form.el3InstID = ""
      }
      console.log("choose:", pid)
      this.fetchInstitutionByLevel(level + 1, pid);
    },
    fetchPositionList() {
      getPositionListService()
        .then((response) => {
          //根据pCategory分类：
          //遍历response 根据 pcategory 赋值  this.position.{$pcategory}.pname
          //数据结构如下：
          // this.position = [
          //     {"pcategory1" : ["pname1","pname2"]},
          //     {"pcategory2" : ["pname3","pname8"]},
          // ]
          const positions = response.data.data;
          const categorizedPositions = {};
          positions.forEach((position) => {
            const { pcategory, pname } = position;
            if (!categorizedPositions[pcategory]) {
              categorizedPositions[pcategory] = [];
            }
            categorizedPositions[pcategory].push(pname);
          });
          this.position = categorizedPositions;
        })
        .catch((error) => {
          console.error('Error fetching position list:', error);
        });
    },
    updatePositions() {
      this.selectedPositions = this.position[this.form.epositionCategory] || [];
      this.form.epositionName = '';
    },
    //TODO:显示机构名称
    fetchInstitution() {
      this.loading = true;
      this.employees.forEach(item => {
        getInstitutionService(item.el1InstID)
          .then((response) => {
            item.el1Name = response.data.data.iname
          })
          .catch((error) => {
            ElMessage.error("错误:", error)
          })
        getInstitutionService(item.el2InstID)
          .then((response) => {
            item.el2Name = response.data.data.iname
          })
          .catch((error) => {
            ElMessage.error("错误:", error)
          })
        getInstitutionService(item.el3InstID)
          .then((response) => {
            item.el3Name = response.data.data.iname
          })
          .catch((error) => {
            ElMessage.error("错误:", error)
          })
      });
      this.loading = false;
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