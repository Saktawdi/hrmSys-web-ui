<template>
  <page-container title="菜单管理">
    <div>
      <el-card>
        <el-button v-if="permissions.indexOf('menu.add') > -1 || permissions.indexOf('menu.*') > -1" type="primary"
          @click="addMenu">新增菜单</el-button>
      </el-card>
      <el-table :data="menusTree" lazy 
      :load="loadData" 
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%">
        <el-table-column prop="id" label="菜单 ID"></el-table-column>
        <!-- <el-table-column prop="parentId" label="父级菜单id"></el-table-column> -->
        <el-table-column prop="mname" label="菜单名称"></el-table-column>
        <el-table-column prop="mcode" label="菜单编码"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="plusMenu(scope.row)" plain>新增下级</el-button>
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
//TODO:更新树形结构
export default {
  data() {
    return {
      menus: [],
      menusTree:[],//树形结构
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
    findFirstLevel(list) {
            // 记录所有的parentId和id
            const allParentId = [];
            const allId = [];
            list.forEach((item) => {
                if (!allParentId.includes(item.parentId)) {
                    allParentId.push(item.parentId);
                }
                if (!allId.includes(item.id)) {
                    allId.push(item.id);
                }
            });
            // 先筛选出 父节点在所有数据中不存在的 --无父节点 --顶层节点
            this.menusTree = list.filter((item) => !allId.includes(item.parentId));
            // 再判断顶级节点是否有孩子 --hasChildren的值的判断
            this.menusTree.forEach((item) => {
                if (allParentId.includes(item.id)) {
                    item.hasChildren = true;
                }
            });
        },
        loadData(row, treeNode, resolve) {
            resolve(this.flagChildren(this.menus, row));
        },
        //判断数组中有没有自己的孩子 -- 返回一个加上是否有孩子标识字段的孩子数组
        flagChildren(list, parentItem, config = {}) {
            // list是扁平化数组  parentItem是点击的行的数据对象 config是参数配置
            config = Object.assign({}, { id: "id", parentId: "parentId" }, config);
            const allParentId = [];
            list.forEach((item) => {
                if (!allParentId.includes(item[config.parentId])) {
                    allParentId.push(item[config.parentId]);
                }
            });
            // 筛选出是这个节点孩子的 节点的数组
            const childrenArr = list.filter((item) => {
                return item[config.parentId] == parentItem[config.id];
            });
            childrenArr.forEach((item) => {
                // console.log("遍历孩子对象：",item)
                if (allParentId.includes(item[config.id])) {
                    // 证明有孩子节点
                    item["hasChildren"] = true;
                }
            });
            return childrenArr;
    },
    getAllMenus() {
      menuApi.getAllMenusService().then((response) => {
        this.menus = response.data.data;
        this.findFirstLevel(this.menus)
      }).catch((error) => {
        console.error('Error fetching menus:', error);
      });
    },
    plusMenu(data){
      this.currentMenu = {};
      this.currentMenu.parentId = data.id;
      this.currentMenu.mcode = data.mcode.split('.')[0] + '.';
      this.optionKey = "新增";
      this.dialogVisible = true;
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
