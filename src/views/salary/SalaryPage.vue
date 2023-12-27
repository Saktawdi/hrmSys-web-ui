<template>
  <page-container title="薪酬标准">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="管理" name="salary">
        <!-- 操作栏 -->
        <el-card>
          <!-- 查询 -->
          <el-row>
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
              <el-form-item label="请输入薪酬标准编号">
                <el-input v-model="queryForm.sid"></el-input>
              </el-form-item>
              <el-form-item label="请输入关键字">
                <el-input v-model="queryForm.keyWord"></el-input>
              </el-form-item>
              <el-form-item label="请输入登记时间：">
                <el-col :span="8">
                  <el-input v-model="queryForm.StartRecodDate" placeholder="YYYY-MM-DD"></el-input>
                </el-col>
                至
                <el-col :span="8">
                  <el-input v-model="queryForm.EndRecodDate" placeholder="YYYY-MM-DD"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryHandler">查询</el-button>
                <el-button type="info" @click="reLoadQueryHandler">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-divider />
          <el-row>
            <el-button type="primary" @click="addSalaryHandler">登记薪酬标准</el-button>
          </el-row>
        </el-card>
        <el-table :data="salary" style="width: 100%">
          <el-table-column prop="sid" label="薪酬标准编号" />
          <el-table-column prop="sname" label="标准名" />
          <el-table-column prop="sbasic" label="基本工资" />
          <el-table-column prop="stransport" label="交通补助" />
          <el-table-column prop="slunch" label="午餐补助" />
          <el-table-column prop="scommunicate" label="通信补助" />
          <el-table-column prop="spension" label="养老保险" />
          <el-table-column prop="sunemployment" label="失业保险" />
          <el-table-column prop="smedical" label="医疗保险" />
          <el-table-column prop="shouse" label="住房公积金" />
          <el-table-column label="操作" width="240px">
            <template #default="scope">
              <el-button type="primary" @click="updateSalaryHandler(scope.row)">变更</el-button>
              <el-button type="danger" @click="deleteSalary(scope.row.sid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="复核" name="review">
        <el-table :data="review" style="width: 100%">
          <el-table-column prop="sid" label="薪酬标准编号" />
          <el-table-column prop="sname" label="标准名" />
          <el-table-column prop="sbasic" label="基本工资" />
          <el-table-column prop="stransport" label="交通补助" />
          <el-table-column prop="slunch" label="午餐补助" />
          <el-table-column prop="scommunicate" label="通信补助" />
          <el-table-column prop="spension" label="养老保险" />
          <el-table-column prop="sunemployment" label="失业保险" />
          <el-table-column prop="smedical" label="医疗保险" />
          <el-table-column prop="shouse" label="住房公积金" />
          <el-table-column label="操作" width="300">
            <template #default="scope">
              <el-button type="success" plain @click="approvedHandler(scope.row)">复核</el-button>
              <el-button type="primary" plain @click="approvedInfoHandler(scope.row)">详情</el-button>
              <el-button type="danger" @click="deleteSalary(scope.row.sid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </page-container>
  <!-- 登记复核详细表 -->
  <el-dialog v-model="dialogVisible" :title="'薪酬:' + optionKey" width="50%" :before-close="handleClose">
    <el-card>
      <el-form :model="currentSalaryForm" :rules="salaryRules" ref="salaryForm" label-position="top" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="薪酬编号" prop="sid">
              <el-input v-model="currentSalaryForm.sid" disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪酬标准名" prop="sname">
              <el-input v-model="currentSalaryForm.sname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="薪酬总额" prop="stotal">
              <el-input v-model="currentSalaryForm.stotal" disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="制定人" prop="smaker">
              <el-input v-model="currentSalaryForm.smaker"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记人" prop="srecorder">
              <el-input v-model="currentSalaryForm.srecorder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间" prop="srecordDate">
              <el-input v-model="currentSalaryForm.srecordDate" disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 复核意见 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="复核意见" prop="sopinion" v-if="activeName === 'review' || optionKey==='变更'">
              <el-input v-model="currentSalaryForm.sopinion" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                placeholder="复核意见" 
                :disabled="optionKey==='变更'"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 薪酬项目 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-table :data="salaryProjectData" style="width: 100%" border>
              <el-table-column prop="index" label="序号" />
              <el-table-column prop="name" label="薪酬项目名称" />
              <el-table-column prop="money" label="金额">
                <template #default="scope">
                  <el-input-number :controls="false" v-model="scope.row.money" :precision="2"
                    @change="sumProjectData(scope.row)" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="centered-buttons">
          <el-button class="custom-button" @click="dialogVisible = false">取消</el-button>
          <el-button class="custom-button" type="primary" @click="confirmHandler">{{ optionKey }}</el-button>
        </div>
      </div>
    </el-card>
  </el-dialog>
</template>
<script>
import * as salaryApi from "../../api/salary"
import { initdata } from "./salaryProject"
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus';
const userStore = useUserStore();
export default {
  data() {
    return {
      activeName: "salary",
      optionKey: "",//操作关键词
      queryForm: {},//查询表单数据
      currentSalaryForm: {}, // 登记复核详细表
      salary: [],//第一页列表数据
      review: [],//复核页面列表数据
      dialogVisible: false,
      salaryRules: {
        sname: [{ required: true, message: '薪酬标准名称不能为空', trigger: 'blur' }],
        smaker: [{ required: true, message: '制定人不能为空', trigger: 'blur' }],
        srecorder: [{ required: true, message: '登记人不能为空', trigger: 'blur' }],
      },//薪酬对话框表单规则
      salaryProjectData: initdata, //薪酬项目表数据
    }
  },
  created() {

  },
  mounted() {
    this.salaryProjectData = initdata
    this.fetchSalaryByStatus(1);
  },
  methods: {
    //tab变更
    handleClick(tab, event) {
      if (tab.paneName === "salary") {
        this.activeName = 'salary'
        this.fetchSalaryByStatus(1)
      }
      if (tab.paneName === "review") {
        this.activeName = "review"
        this.fetchSalaryByStatus(0)
      }
    },
    //初始化列表
    async fetchSalaryByStatus(sStatus) {
      if (sStatus === 1) {
        await salaryApi.getAllSalariesByStatusService(sStatus)
          .then((response) => {
            this.salary = response.data.data;
          })
          .catch((error) => {
            ElMessage.error("查询失败,", error)
          })
      } else if (sStatus === 0) {
        await salaryApi.getAllSalariesByStatusService(sStatus)
          .then((response) => {
            this.review = response.data.data;
          })
          .catch((error) => {
            ElMessage.error("查询失败,", error)
          })
      }
    },
    //对话框确定
    confirmHandler() {
      if (this.optionKey === "登记") {
        this.currentSalaryForm.sid = null;
        this.currentSalaryForm.srecordDate = null;
        this.salaryProjectData.forEach(item => {
          this.currentSalaryForm[item.code] = item.money;
        });
        console.log("登记表单::", this.currentSalaryForm)
        salaryApi.addSalaryService(this.currentSalaryForm)
          .then((response) => {
            ElMessage.success("登记成功，等待复核")
            this.dialogVisible = false;
          })
          .catch((error) => {
            ElMessage.success("登记失败，", error)
          })
      } else if (this.optionKey === "复核") {
        this.salaryProjectData.forEach(item => {
          this.currentSalaryForm[item.code] = item.money;
        });
        console.log(this.currentSalaryForm)
        salaryApi.approveSalaryService(this.currentSalaryForm)
        .then((response) => {
            ElMessage.success("复核通过")
            this.dialogVisible = false;
            this.fetchSalaryByStatus(0);
          })
          .catch((error) => {
            ElMessage.success("复核失败，", error)
          })
      }else if(this.optionKey === "变更"){
        this.salaryProjectData.forEach(item => {
          this.currentSalaryForm[item.code] = item.money;
        });
        salaryApi.updateSalaryService(this.currentSalaryForm)
        .then((response) => {
            ElMessage.success("变更成功，等待复核")
            this.dialogVisible = false;
            this.fetchSalaryByStatus(1);
          })
          .catch((error) => {
            ElMessage.success("变更失败，", error)
          })
      }
    },
    //直接复核
    async approvedHandler(data) {
      await salaryApi.approveSalaryByIdService(data.sid)
        .then((response) => {
          this.fetchSalaryByStatus(0);
          ElMessage.success("复核成功")
        })
        .catch((error) => {
          ElMessage.error("复核失败,", error)
        })
    },
    //salary数据更新
    updateSalaryHandler(data){
      this.optionKey = "变更";
      this.dialogVisible = true;
      this.currentSalaryForm = data;
      this.updateSalaryProjectTable();
    },
    //复核详情
    approvedInfoHandler(data) {
      this.optionKey = "复核";
      this.dialogVisible = true;
      this.currentSalaryForm = data;
      this.updateSalaryProjectTable();
    },
    //更新薪酬项目表格
    updateSalaryProjectTable(){
      this.salaryProjectData[0].money = this.currentSalaryForm.sbasic
      this.salaryProjectData[1].money = this.currentSalaryForm.stransport;
      this.salaryProjectData[2].money = this.currentSalaryForm.slunch;
      this.salaryProjectData[3].money = this.currentSalaryForm.scommunicate;
      this.salaryProjectData[4].money = this.currentSalaryForm.spension;
      this.salaryProjectData[5].money = this.currentSalaryForm.sunemployment;
      this.salaryProjectData[6].money = this.currentSalaryForm.smedical;
      this.salaryProjectData[7].money = this.currentSalaryForm.shouse;
      this.sumProjectData(this.salaryProjectData[0]);
    },
    //登记
    addSalaryHandler() {
      this.optionKey = "登记"
      this.dialogVisible = true;
      this.currentSalaryForm = {};
      this.currentSalaryForm.srecordDate = this.getCurrentDate();
      this.currentSalaryForm.srecorder = userStore.user.uid;
      this.salaryProjectData.forEach(item => {
        item.money = 0.00
      });
      this.currentSalaryForm.sid = "系统生成"
    },
    //删除
    deleteSalary(id) {
      ElMessageBox.confirm('你确定要删除吗?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning', 
      })
        .then(() => {
          // User clicked '确定'
          salaryApi.deleteSalaryService(id)
            .then(() => {
              ElMessage.success('已成功删除');
              if(this.activeName === "review"){
                this.fetchSalaryByStatus(0);
              }else if(this.activeName === "salary"){
                this.fetchSalaryByStatus(1);
              }
            })
            .catch((error) => {
              console.error('删除时出错:', error);
            });
        })
        .catch(() => {
          // User clicked '取消' or closed the dialog
          // No action needed
        });
    },
    //条件查询
    queryHandler() {
      if (this.queryForm.StartRecodDate || this.queryForm.EndRecodDate) {
        if (!this.validateDateInput(this.queryForm.StartRecodDate)) {
          ElMessage.error("请输入有效的开始日期（YYYY-MM-DD）");
          return;
        }
        if (!this.validateDateInput(this.queryForm.EndRecodDate)) {
          ElMessage.error("请输入有效的结束日期（YYYY-MM-DD）");
          return;
        }
      }
      this.queryForm.sid  =  parseInt(this.queryForm.sid);
      salaryApi.getSalariesByConditionsService(this.queryForm)
        .then((response) => {
          ElMessage.success(response.data.msg)
          this.salary = response.data.data;
        })
        .catch((error) => {
          ElMessage.error("错误:", error)
        })
    },
    reLoadQueryHandler() {
      this.queryForm = {}
      this.fetchSalaryByStatus(1)
    },
    //计算金额
    sumProjectData(data) {
      var sum = 0.00;
      if (data.code === "sbasic") {
        // console.log("data::", this.salaryProjectData)
        this.salaryProjectData[4].money = data.money * 0.08;
        this.salaryProjectData[6].money = data.money * 0.02 + 3;
        this.salaryProjectData[5].money = data.money * 0.005;
        this.salaryProjectData[7].money = data.money * 0.08;
      }
      this.salaryProjectData.forEach(item => {
          sum += item.money;
        });
      this.currentSalaryForm.stotal = sum;
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    validateDateInput(dateString) {
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      return dateRegex.test(dateString);
    },
  }
}
</script>

<style>
.centered-buttons {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.custom-button {
  width: 15%;
}
</style>