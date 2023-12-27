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
          <el-button type="primary">一键发放</el-button>
          <el-button type="primary">定时发放</el-button>
        </el-card>
        <el-table :data="PayrollSend" style="width: 100%" border>
          <el-table-column prop="pid" label="薪酬发放单编号" />
          <el-table-column prop="pl1InstName" label="一级机构" />
          <el-table-column prop="pl2InstName" label="二级机构" />
          <el-table-column prop="pl3InstName" label="三级机构" />
          <el-table-column prop="pcount" label="人数" />
          <el-table-column prop="psalarySum" label="基本酬薪总额" />
          <el-table-column fixed="right" label="发放操作">
            <template #default="scope">
              <el-button type="success" plain>发放</el-button>
              <el-button type="danger" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </page-container>
  <el-dialog v-model="dialogVisible" title="薪酬发放复核" width="60%" :before-close="handleClose">
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
                  <el-input-number :controls="false" v-model="scope.row.breward" :precision="2"
                    @change="updateBonus(scope.row)" />
                </template>
        </el-table-column>
        <el-table-column prop="breduce" label="应扣奖金">
          <template #default="scope">
                  <el-input-number :controls="false" v-model="scope.row.breduce" :precision="2"
                    @change="updateBonus(scope.row)" />
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
</template>

<script>
import { useUserStore } from '@/stores'
const userStore = useUserStore();
export default {
  data() {
    return {
      activeName: 'all',
      PayrollAll: [
        { pl1InstName: "一级机构", pl2InstName: "二级机构", pl3InstName: "三级机构", pcount: 8, psalarySum: 5000 }
      ],//未复核列表
      PayrollSend: [],//复核后待发放列表
      currentPayroll: {},//表单
      currentPayrollTable: [],//该发放单旗下的所有档案
      dialogVisible: false,
    }
  },
  mounted() {

  },
  methods: {
    //tab变更
    handleClick(tab, event) {
      if (tab.paneName === "all") {
        this.activeName = 'all'

      }
      if (tab.paneName === "send") {
        this.activeName = "send"

      }
    },
    //登记复核提交->持久化
    confirmHandler(){
      const payrollTabelJson =  JSON.stringify(this.currentPayrollTable);

    },
    //登记详情里更改对应奖金：
    updateBonus(data){
      data.eid
      data.breward
      data.breduce

    },
    //登记
    addPayrollHandler(data) {
      this.dialogVisible = true;
      this.currentPayroll = data;
      this.currentPayroll.pmaker = userStore.user.uid;
    }
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