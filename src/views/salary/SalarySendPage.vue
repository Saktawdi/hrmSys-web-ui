<template>
  <page-container title="薪酬发放">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="登记" name="all">
        <el-table :data="PayrollAll" style="width: 100%" border>
          <!-- <el-table-column prop="pid" label="薪酬发放单编号"/> -->
          <el-table-column prop="pl1InstName" label="一级机构" />
          <el-table-column prop="pl2InstName" label="二级机构" />
          <el-table-column prop="pl3InstName" label="三级机构" />
          <el-table-column prop="pcount" label="人数" />
          <el-table-column prop="psalarySum" label="基本酬薪总额" />
          <el-table-column fixed="right" label="登记">
            <template #default="scope">
              <el-button type="success" plain @click="addPayrollHandler(scope.row)">登记</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="发放" name="send">
        <el-card>
          <el-button type="primary" @click="AutoSendHandler">一键发放</el-button>
          <el-button type="primary" @click="showTaskHandler">定时发放</el-button>
        </el-card>
        <el-table :data="PayrollSend" style="width: 100%" border>
          <el-table-column prop="pid" label="薪酬发放单编号" width="124px" />
          <el-table-column prop="pl1InstName" label="一级机构" width="124px" />
          <el-table-column prop="pl2InstName" label="二级机构" width="124px" />
          <el-table-column prop="pl3InstName" label="三级机构" width="124px" />
          <el-table-column prop="pcount" label="人数" />
          <el-table-column prop="psalarySum" label="基本酬薪总额" />
          <el-table-column prop="lastExecutionTime" label="最近发放时间" />
          <el-table-column prop="pstatus" label="状态">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.pstatus)">{{ getTagName(scope.row.pstatus) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="发放操作">
            <template #default="scope">
              <el-button type="success" plain @click="sendPayrollInfo(scope.row)">详情</el-button>
              <el-button type="danger" plain @click="deletePayrollSend(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </page-container>
  <el-dialog v-model="dialogVisible" :title="'薪酬发放' + optionKey" width="80%" :before-close="handleClose">
    <el-card>
      <el-form label-position="top" label-width="100px" :model="currentPayroll" style="max-width: 460px">
        <el-row :gutter="20">
          <el-form-item label="薪酬发放单编号" v-if="activeName === 'send'">
            <el-input v-model="currentPayroll.pid" disabled="true" />
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="机构">
              <el-col :span="8">
                <el-input v-model="currentPayroll.pl1InstName" disabled="true" />
              </el-col>
              <el-col :span="8">
                <el-input v-model="currentPayroll.pl2InstName" disabled="true" />
              </el-col>
              <el-col :span="8">
                <el-input v-model="currentPayroll.pl3InstName" disabled="true" />
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="总人数">
              <el-input v-model="currentPayroll.pcount" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基本薪酬总额">
              <el-input v-model="currentPayroll.psalarySum" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记人">
              <el-input v-model="currentPayroll.pmaker" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="currentPayrollTable" style="width: 100%" border>
        <el-table-column prop="eid" label="档案编号" />
        <el-table-column prop="ename" label="姓名" />
        <el-table-column prop="sbasic" label="基本工资" />
        <el-table-column prop="stransport" label="交通补助" />
        <el-table-column prop="slunch" label="午餐补助" />
        <el-table-column prop="scommunicate" label="通信补助" />
        <el-table-column prop="spension" label="养老保险" />
        <el-table-column prop="sunemployment" label="失业保险" />
        <el-table-column prop="smedical" label="医疗保险" />
        <el-table-column prop="shouse" label="住房公积金" />
        <el-table-column prop="breward" label="奖励奖金">
          <template #default="scope">
            <el-input-number :controls="false" v-model="scope.row.breward" :precision="2" style="width: 88px;"
              @change="updateBonus(scope.row)" :disabled="optionKey === '详细'" />
          </template>
        </el-table-column>
        <el-table-column prop="breduce" label="应扣奖金">
          <template #default="scope">
            <el-input-number :controls="false" v-model="scope.row.breduce" :precision="2" style="width: 88px;"
              @change="updateBonus(scope.row)" :disabled="optionKey === '详细'" />
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <div class="centered-buttons">
          <el-button class="custom-button" @click="dialogVisible = false">取消</el-button>
          <el-button class="custom-button" type="primary" @click="confirmHandler">提交</el-button>
        </div>
      </div>
    </el-card>
  </el-dialog>
  <el-dialog v-model="showTaskSetting" title="定时任务设置" width="30%" :before-close="handleClose">
    <el-form :model="taskSettingForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="10秒一结">
            <el-switch v-model="taskSettingForm.testFlag" @change="switchHandler('testFlag')" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日结">
            <el-switch v-model="taskSettingForm.dayFlag" @change="switchHandler('dayFlag')" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="周结">
            <el-switch v-model="taskSettingForm.weekFlag" @change="switchHandler('weekFlag')" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月结">
            <el-switch v-model="taskSettingForm.monthFlag" @change="switchHandler('monthFlag')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="centered-buttons">
        <el-button class="custom-button" type="primary" @click="showTaskSetting = false">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as payrollApi from "../../api/payroll"
import * as taskApi from "../../api/task"

import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus';
const userStore = useUserStore();
export default {
  data() {
    return {
      activeName: 'all',
      optionKey: "复核",
      PayrollAll: [],//未复核列表
      PayrollSend: [],//复核后待发放列表
      currentPayroll: {},//表单
      currentPayrollTable: [],//该发放单旗下的所有档案
      dialogVisible: false,
      showTaskSetting: false,
      taskSettingForm: {},
      taskRecoder: [], //执行记录
    }
  },
  mounted() {
    this.feachLivePayrollList();
  },
  methods: {
    //tab变更
    handleClick(tab, event) {
      if (tab.paneName === "all") {
        this.activeName = 'all'
        this.optionKey = '复核'
        this.feachLivePayrollList();
      }
      if (tab.paneName === "send") {
        this.activeName = "send"
        this.optionKey = '详细'
        this.feachPayrollSendList();
        this.feachTaskRecoder();
      }
    },
    async feachTaskSetting(){
      taskApi.getAllTasksService()
      .then((res)=>{
        this.taskSettingForm =  res.data.data;
      })
      .catch((error)=>{
        ElMessage.error(error)
      })
    },
    async feachTaskRecoder() {
      await taskApi.getAllRecoder()
        .then((res) => {
          this.taskRecoder = res.data.data;
          this.PayrollSend = this.PayrollSend.map(payroll => {
            // 查找 taskRecoder 中匹配的对象
            const matchingRecord = this.taskRecoder.find(record => record.pid === payroll.pid);
            // 如果找到匹配的记录，将 lastExecutionTime 赋值到 PayrollSend 中
            if (matchingRecord) {
              payroll['lastExecutionTime'] = matchingRecord.lastExecutionTime;
              // console.log("匹配::",payroll)
            }
            return payroll;
          });
          // console.log("赋值后:",this.PayrollSend)
        })
        .catch((error) => {
          ElMessage.error("查询记录:",error)
        })
    },
    feachLivePayrollList() {
      payrollApi.getAllPayrollsService()
        .then((response) => {
          this.PayrollAll = response.data.data
        })
        .catch((error) => {
          ElMessage.error("获取失败,", error)
        })
    },
    async feachPayrollSendList() {
      await payrollApi.getStaticPayrollsService()
        .then((response) => {
          this.PayrollSend = response.data.data;
          this.PayrollSend.forEach(payroll => {
            payroll['lastExecutionTime'] = "N/A"
          });
        })
        .catch((error) => {
          ElMessage.error("获取失败,", error)
        })
    },
    //发放按钮：查看详细
    sendPayrollInfo(data) {
      // this.optionKey = '详情'
      this.dialogVisible = true;
      this.currentPayroll = data;
      console.log("data.pPayslips", data.ppayslips)
      this.currentPayrollTable = JSON.parse(data.ppayslips)
    },
    //删除待发放单
    deletePayrollSend(data) {
      ElMessageBox.confirm('你确定要删除吗?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          payrollApi.deleteStaticPayrollService(data.pid)
            .then(() => {
              ElMessage.success('删除成功');
              this.feachPayrollSendList();
            })
            .catch((error) => {
              ElMessage.error('删除失败', error);
            });
        })
        .catch(() => {
          // User clicked '取消' or closed the dialog
          // No action needed
        });
    },
    //登记复核提交->持久化
    async confirmHandler() {
      if (this.optionKey === '复核') {
        const payrollTabelJson = JSON.stringify(this.currentPayrollTable);
        this.currentPayroll['ppayslips'] = payrollTabelJson;
        await payrollApi.addPayrollService(this.currentPayroll)
          .then((response) => {
            ElMessage.success("复核通过")
            this.dialogVisible = false;
          })
          .catch((error) => {
            ElMessage.error("复核失败,", error)
          })
      } else if (this.optionKey === '详细') {
        payrollApi.updateStaticPayrollByID(this.currentPayroll.pid, 1)
          .then((response) => {
            ElMessage.success("发放成功")
            taskApi.updateRecoder(this.currentPayroll.pid);
            this.dialogVisible = false;
            this.feachPayrollSendList();
            this.feachTaskRecoder();
          })
          .catch((error) => {
            ElMessage.error("发放失败，", error)
          })
      }
    },
    //一键发放
    AutoSendHandler() {
      const loading = ElLoading.service({
        lock: true,
        text: '正在奋力发送中......',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.PayrollSend.forEach(item => {
        payrollApi.updateStaticPayrollByID(item.pid, 1)
          .then((response) => {
            this.feachPayrollSendList();
          })
          .catch((error) => {
            ElMessage.error("发放失败，", error)
            loading.close();
          })
      });
      loading.close();
    },
    //定时任务按钮
    showTaskHandler() {
      taskApi.getAllTasksService()
        .then((response) => {
          this.taskSettingForm = response.data.data;
          this.showTaskSetting = true;
        })
        .catch((error) => {
          ElMessage.error("获取任务flag失败", error)
        })
    },
    //某个开关按下
    async switchHandler(taskType) {
      //关闭其他开关
      Object.keys(this.taskSettingForm).forEach((key) => {
        if (key !== taskType) {
          this.taskSettingForm[key] = false;
        }
      });
      //关闭服务器任务
      Object.keys(this.taskSettingForm).forEach((key) => {
        taskApi.StopTaskService(key);
      });
      //如果这次按下是开启
      if (this.taskSettingForm[taskType]) {
        taskApi.StartTaskService(taskType)
          .then((response) => {
            ElMessage.success(response.data.msg)
            this.feachTaskSetting();
          })
          .catch((error) => {
            ElMessage.error(error)
          })
      } else {
        ElMessage.success("关闭目标任务成功")
      }
    },
    //登记详情里更改对应奖金：
    updateBonus(data) {
      const bonusData = {
        "eid": data.eid,
        "breward": data.breward,
        "breduce": data.breduce
      }
      payrollApi.updateBonusesService(bonusData)
        .then((response) => {
          ElMessage.success("更改成功")
        })
        .catch((error) => {
          ElMessage.error("更改失败", error)
        })
    },
    //登记
    async addPayrollHandler(data) {
      this.dialogVisible = true;
      this.currentPayroll = data;
      this.currentPayroll.pmaker = userStore.user.uid;
      await payrollApi.getPayslipsService(data.pl3InstID)
        .then((response) => {
          this.currentPayrollTable = response.data.data;
        })
        .catch((error) => {
          ElMessage.error("查询详细失败", error)
        })
    },
    getTagType(pstatus) {
      switch (pstatus) {
        case 1:
          return 'success';
        case 0:
          return 'warning';
        default:
          return 'info';
      }
    },
    getTagName(pstatus) {
      switch (pstatus) {
        case 1:
          return '已发放';
        case 0:
          return '未发放';
        default:
          return 'N/A';
      }
    },
  },
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