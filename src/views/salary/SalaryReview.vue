<template>
  <el-card>
    <div style="margin-bottom: 15px">
      <label style="width: 120px; display: inline-block">薪酬标准编号：</label>
      <el-input style="width: 100px; margin-right: 20px"></el-input>
      <label style="width: 120px; display: inline-block">薪酬标准名称：</label
      ><el-input style="width: 100px; margin-right: 20px"></el-input>
      <label style="width: 100px; display: inline-block">薪酬总额：</label
      ><el-input style="width: 100px; margin-right: 20px"></el-input>
    </div>
    <div style="margin-bottom: 15px">
      <label style="width: 120px; display: inline-block">制定人：</label
      ><el-input style="width: 100px; margin-right: 20px"></el-input>
      <label style="width: 120px; display: inline-block">登记人：</label
      ><el-input style="width: 100px; margin-right: 20px"></el-input>
      <label style="width: 100px; display: inline-block">登记时间：</label
      ><el-input style="width: 100px; margin-right: 20px"></el-input>
    </div>
    <div>
      <el-button type="primary" style="margin-bottom: 15px; margin-left: 800px"
        >复核通过</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="450" />
      <el-table-column prop="name" label="薪资项目名称" width="450" />
      <el-table-column prop="address" label="金额" />
    </el-table>
  </el-card>
</template>

<script></script>
<style scoped></style>
