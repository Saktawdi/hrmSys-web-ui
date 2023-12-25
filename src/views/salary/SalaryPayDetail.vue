<template>
  <el-card>
    <el-form>
      <div><label>薪酬发放编号：</label></div>
      <div><label>机构:</label></div>
      <div>
        <label>总人数: </label>
        <label>基本薪酬总额: </label>
        <label>实发总额: </label>
      </div>

      <el-table>
        <el-table-column label="档案编号" />
        <el-table-column label="姓名" />
        <el-table-column label="基本工资" />
        <el-table-column label="交通补助" />
        <el-table-column label="午餐补助" />
        <el-table-column label="通信补助" />
        <el-table-column label="养老保险" />
        <el-table-column label="失业保险" />
        <el-table-column label="医疗保险" />
        <el-table-column label="住房公积金" />
        <el-table-column label="奖励奖金" />
        <el-table-column label="应扣奖金" />
      </el-table>
    </el-form>
  </el-card>
</template>
