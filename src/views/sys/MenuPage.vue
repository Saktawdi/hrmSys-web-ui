<template>
  <page-container title="菜单管理">
    <div>
      <el-card>
        <el-button v-if="permissions.indexOf('menu.add') > -1 || permissions.indexOf('menu.*') > -1" type="primary"
          @click="addMenu">新增菜单</el-button>
      </el-card>
      <el-table :data="menus" style="width: 100%">
        <el-table-column prop="id" label="菜单 ID"></el-table-column>
        <el-table-column prop="parentId" label="父级菜单id"></el-table-column>
        <el-table-column prop="mname" label="菜单名称"></el-table-column>
        <el-table-column prop="mcode" label="菜单编码"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="editMenu(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteMenu(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" :title="optionKey + '菜单'">
        <el-form :model="currentMenu" :rules="menuRules" ref="menuForm" label-width="80px">
          <el-form-item label="菜单 ID" prop="id">
            <el-input v-model="currentMenu.id"></el-input>
          </el-form-item>
          <el-form-item label="父id" prop="parentId">
            <el-input v-model="currentMenu.parentId"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称" prop="mname">
            <el-input v-model="currentMenu.mname"></el-input>
          </el-form-item>
          <el-form-item label="菜单编码" prop="mcode">
            <el-input v-model="currentMenu.mcode"></el-input>
          </el-form-item>
          <el-form-item label="菜单编码" prop="sort">
            <el-input-number v-model="currentMenu.sort" :min="0" :max="99" @change="handleChange" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveMenu">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </page-container>
</template>
  
<script>
import * as menuApi from "../../api/menu";
import { useUserStore } from '@/stores';
const userStore = useUserStore();

export default {
  data() {
    return {
      menus: [],
      dialogVisible: false,
      currentMenu: {
        parentId: null,
        sort: 0
      },
      menuRules: {
        mname: [{ required: true, message: '菜单名称为必填项', trigger: 'blur' }],
        mcode: [{ required: true, message: '菜单代码是必需的', trigger: 'blur' }],
      },
      permissions: [],
      optionKey: "" // 操作key
    };
  },
  methods: {
    getAllMenus() {
      menuApi.getAllMenusService().then((response) => {
        this.menus = response.data.data;
      }).catch((error) => {
        console.error('Error fetching menus:', error);
      });
    },
    addMenu() {
      this.currentMenu = {};
      this.optionKey = "新增";
      this.dialogVisible = true;
    },
    editMenu(menu) {
      this.currentMenu = { ...menu };
      this.optionKey = "编辑";
      this.dialogVisible = true;
    },
    saveMenu() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (this.currentMenu.id) {
            menuApi.updateMenuService(this.currentMenu).then(() => {
              ElMessage.success('菜单更新成功');
              this.getAllMenus();
              this.dialogVisible = false;
            }).catch((error) => {
              console.error('更新菜单时出错:', error);
            });
          } else {
            menuApi.addMenuService(this.currentMenu).then(() => {
              ElMessage.success('菜单添加成功');
              this.getAllMenus();
              this.dialogVisible = false;
            }).catch((error) => {
              console.error('添加菜单时出错:', error);
            });
          }
        } else {
          ElMessage.error('验证失败');
        }
      });
    },
    deleteMenu(id) {
      ElMessageBox.confirm('你确定要删除菜单吗?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning', // Adjust the type based on your design preference
      })
        .then(() => {
          // User clicked '确定'
          menuApi.deleteMenuService(id)
            .then(() => {
              ElMessage.success('已成功删除菜单');
              this.getAllMenus();
            })
            .catch((error) => {
              console.error('删除菜单时出错:', error);
            });
        })
        .catch(() => {
          // User clicked '取消' or closed the dialog
          // No action needed
        });
    },
  },
  mounted() {
    this.getAllMenus();
    this.permissions = userStore.auth.permission;
    this.currentMenu.sort = 0;
    this.currentMenu.parentId = null;
  },
};
</script>
  
<style></style>
