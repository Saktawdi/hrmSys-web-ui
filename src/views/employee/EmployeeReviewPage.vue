<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->

      <!-- <ApprovalPageTool /> -->
      <el-card class="hr-block">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="档案编号" width="150" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="gender" label="性别" width="120" />
          <el-table-column prop="firstDep" label="一级机构" width="150" />
          <el-table-column prop="secondDep" label="二级机构" width="150" />
          <el-table-column prop="thirdDep" label="三级机构" width="150" />
          <el-table-column prop="position" label="职位名称" width="140" />
          <el-table-column prop="check" label="复核" width="120" />
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          align="middle"
          justify="center"
          style="height: 60px"
        >
          <el-pagination background layout="prev, pager, next" :total="100" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script></script>

<style></style>
