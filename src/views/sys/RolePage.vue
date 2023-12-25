<template>
    <page-container title="角色管理">
        <div>
            <el-card>
                <el-button v-if="permissions.indexOf('role.add') > -1 || permissions.indexOf('role.*') > -1" type="primary"
                    @click="addRole">新增角色</el-button>
            </el-card>
            <el-table :data="roles" style="width: 100%">
                <el-table-column prop="rid" label="Role ID"></el-table-column>
                <el-table-column prop="rname" label="Role Name"></el-table-column>
                <el-table-column prop="rcode" label="Role Code"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="success" plain @click="assignPermissions(scope.row)">分配权限</el-button>
                        <el-button v-if="permissions.indexOf('role.update') > -1 || permissions.indexOf('role.*') > -1"
                            type="primary" @click="editRole(scope.row)">编辑</el-button>
                        <el-button v-if="permissions.indexOf('role.delete') > -1 || permissions.indexOf('role.*') > -1"
                            type="danger" @click="deleteRole(scope.row.rid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog v-model="dialogVisible" :title="optionKey + '角色'">
                <el-form :model="currentRole" :rules="roleRules" ref="roleForm" label-width="80px">
                    <el-form-item label="角色编号" prop="rid">
                        <el-input v-model="currentRole.rid"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="rname">
                        <el-input v-model="currentRole.rname"></el-input>
                    </el-form-item>
                    <el-form-item label="角色编码" prop="rcode">
                        <el-input v-model="currentRole.rcode"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveRole">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </page-container>
</template>
  
<script>
import * as roleApi from "../../api/role"
import { useUserStore } from '@/stores'
const userStore = useUserStore();
export default {
    data() {
        return {
            roles: [],
            dialogVisible: false,
            currentRole: {},
            roleRules: {
                rname: [{ required: true, message: 'Role Name is required', trigger: 'blur' }],
                rcode: [{ required: true, message: 'Role Code is required', trigger: 'blur' }],
            },
            permissions: [],
            optionKey: "" // 操作key
        };
    },
    methods: {
        assignPermissions(row) {
            this.$router.push({
                path: '/sys/auth', 
                query: {
                    roleID: row.rid,
                    roleName:row.rname
                },
            });
        },
        getAllRoles() {
            roleApi.getAllRolesService().then((response) => {
                this.roles = response.data.data;
            }).catch((error) => {
                ElMessage.error('Error fetching roles:', error);
            });
        },
        addRole() {
            this.currentRole = {};
            this.optionKey = "新增"
            this.dialogVisible = true;
        },
        editRole(role) {
            this.currentRole = { ...role };
            this.optionKey = "编辑"
            this.dialogVisible = true;
        },
        saveRole() {
            this.$refs.roleForm.validate((valid) => {
                if (valid) {
                    if (this.currentRole.rid) {
                        roleApi.updateRoleService(this.currentRole).then(() => {
                            ElMessage.success('已成功更新角色');
                            this.getAllRoles();
                            this.dialogVisible = false; // Close the dialog
                        }).catch((error) => {
                            ElMessage.error('更新角色时出错:', error);
                        });
                    } else {
                        roleApi.addRoleService(this.currentRole).then(() => {
                            ElMessage.success('新增角色成功');
                            this.getAllRoles();
                            this.dialogVisible = false; // Close the dialog
                        }).catch((error) => {
                            ElMessage.error('新增角色失败', error);
                        });
                    }
                } else {
                    ElMessage.error('验证失败');
                }
            });
        },
        deleteRole(rID) {
            roleApi.deleteRoleService(rID).then(() => {
                ElMessage.success('删除成功');
                this.getAllRoles();
            }).catch((error) => {
                ElMessage.error('删除失败', error);
            });
        },
    },
    mounted() {
        this.getAllRoles();
        this.permissions = userStore.auth.permission
    },
};
</script>
  
<style></style>