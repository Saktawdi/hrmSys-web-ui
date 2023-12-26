<template>
    <page-container :title="'当前选择角色：' + role.rname">
        <div>
            <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="用户" name="user">
                    <!-- 用table列出用户，操作栏里加选择框 -->
                    <el-table :data="users" style="width: 100%" v-loading="loding">
                        <el-table-column prop="uid" label="用户编号"></el-table-column>
                        <el-table-column prop="uname" label="用户名称"></el-table-column>
                        <el-table-column label="分配操作">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.selected"></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="权限" name="auth">
                    <el-tree ref="tree" :data="menuTree" :props="defaultProps" node-key="id" show-checkbox
                        :default-expanded-keys="[999]" @check="handleCheckChange(data, obj)" />
                </el-tab-pane>
            </el-tabs>
            <el-card class="option-box">
                <el-button type="primary" @click="handlerUpdate">更新</el-button>
                <el-button type="info" @click="handlerCancal">取消</el-button>
            </el-card>
        </div>
    </page-container>
</template>

<script>
import { getAllUsersService } from "../../../api/user"
import { getAllMenusService } from "../../../api/menu"
import * as authApi from "../../../api/auth"
import { ref } from "vue";

export default {
    data() {
        return {
            activeName: 'user',
            role: {},
            users: [],
            loding: true,
            menus: [],
            checkList: [],
            menuTree: [
                {
                    id: 999,
                    label: '权限大全',
                    children: [],
                },
            ],
            userForm: {
                selectedUser: null,
            },
            defaultProps: {
                children: 'children',
                label: 'label',
                disabled: 'disabled',
            },
        };
    },
    mounted() {
        this.role.rname = this.$route.query.roleName;
        this.role.rid = this.$route.query.roleID;
        this.fetchAllUsers();
        this.fetchAllSelectedUser();
        this.fetchAllMenus();
        this.fetchRoleMenus();
    },
    methods: {
        //tab变更
        handleClick(tab, event) {
            if (tab.paneName === "auth") {
                this.activeName = 'auth'
                this.fetchRoleMenus();
            }
            if (tab.paneName === "user") {
                this.activeName = "user"
            }
        },
        handleUserChange(userId) {
            // Handle user selection change
            // Fetch permissions for the selected user from your API and update your data
        },
        handleCheckChange(data, obj) {

        },
        handlerUpdate() {
            const roleId = this.role.rid;
            if (this.activeName === "user") {
                //遍历this.users,如果this.users.selected === true的话,传入uid给接口。如果报错则停止;
                // 遍历this.users
                this.users.forEach(user => {
                    if (user.selected) {
                        const uid = user.uid;
                        // 调用接口，传递roleId和uid
                        authApi.addRoleService(roleId, uid)
                            .then(response => {
                            })
                            .catch(error => {
                                // 处理错误情况
                                console.error(`Error adding user ${uid} to role ${roleId}:`, error);
                            });
                    }
                });
                ElMessage.success("更新成功!")
            } else if(this.activeName === 'auth'){
                var checked = [];
                checked = this.$refs.tree.getCheckedKeys(true)
                checked.forEach(item => {
                    if(!this.checkList.includes(item)){
                        authApi.addMenuService(roleId, item)
                        .then(response => {
                        })
                        .catch(error => {
                            console.error(`Error adding 权限 ${item} to role ${roleId}:`, error);
                        });
                    }
                });
                this.checkList.forEach(item => {
                    if(!checked.includes(item)){
                        authApi.deleteMenuService(roleId,item)
                        .then(response => {

                        })
                        .catch(error => {
                            console.error(`Error adding 权限 ${item} to role ${roleId}:`, error);
                        });
                    }
                });
                ElMessage.success("更新成功!")
            }
        },
        handlerCancal() {
            this.$router.push("/sys/role")
        },
        async fetchAllUsers() {
            await getAllUsersService()
                .then((response) => {
                    this.users = response.data.data;
                })
                .catch((error) => {
                    ElMessage.error('获取所有用户时出错:', error);
                });
        },
        //获得当前this.role.rid 下所有users,并且在users对应uid下加selected = true;
        async fetchAllSelectedUser() {
            const roleId = this.role.rid;
            await authApi.getAllRolesService(roleId)
                .then((response) => {
                    const selectedUserIds = response.data.data.map((user) => user.uid);
                    this.users.forEach((user) => {
                        user.selected = selectedUserIds.includes(user.uid);
                    });
                    this.loding = false;
                })
                .catch((error) => {
                    console.error('获取角色的选定用户时出错:', error);
                });
        },
        async fetchAllMenus() {
            await getAllMenusService()
                .then((response) => {
                    this.menus = response.data.data;
                    this.menuTree[0].children = this.convertToTree(this.menus);
                    // console.log("menuTree:", this.menuTree)
                })
                .catch((error) => {
                    ElMessage.error('Error fetching all menus:', error);
                });
        },
        async fetchRoleMenus() {
            const roleId = this.role.rid;
            try {
                const response = await authApi.getAllMenusService(roleId);
                const menus = response.data.data;
                this.checkList = [];
                menus.forEach(item => {
                    this.checkList.push(item.mid)
                });
                this.$refs.tree.setCheckedKeys(this.checkList, false);
            } catch (error) {
                ElMessage.error('Error fetching role menus:', error);
            }
        },
        convertToTree(data) {
            const map = ref([]);
            data.forEach((item) => {
                const itemNew = { id: item.id, label: item.mname, children: [] }
                const id = item.id
                const parentId = item.parentId;
                if (!parentId) {
                    map.value[id] = itemNew;
                } else {
                    map.value[parentId].children.push(itemNew)
                }
            });
            return map.value;
        },

    },
};
</script>
  
<style>
/* Add your styles here */
</style>
  